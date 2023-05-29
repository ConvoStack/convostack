import * as crypto from "crypto";
import * as express from "express";
import {IGQLAuthContext, IStorageEngine, IUser} from "@convostack/models";
import {IAuthProvider, ILoginParams, IRefreshParams, ISuccessfulAuthResponse} from "@convostack/auth";
import {addSecondsToDate, unixTimestamp, generateRandomID} from "@convostack/shared";
import {sign, SignOptions, verify, VerifyOptions} from "jsonwebtoken";
import isEmail from 'validator/lib/isEmail';

type JWT_TOKEN_KIND_ACCESS = "access"
type JWT_TOKEN_KIND_REFRESH = "refresh"

export interface IAuthJWTOptions {
    jwtSecret: string;
    allowAnonUsers?: boolean;
    requireUserVerificationHash?: boolean;
    userDataVerificationSecret?: string;
    accessTokenTTL?: number;
    refreshTokenTTL?: number;
}

interface IJWTPayload {
    userId: string;
    email?: string;
    kind: JWT_TOKEN_KIND_ACCESS | JWT_TOKEN_KIND_REFRESH;
}

export class AuthJWT implements IAuthProvider {
    constructor(private storage: IStorageEngine, private options: IAuthJWTOptions) {
        if (!this.options.jwtSecret || this.options.jwtSecret.length < 32) {
            throw new Error("AuthJWT 'jwtSecret' option must be at least 32 characters in length");
        }
        if (this.options.requireUserVerificationHash && (!this.options.userDataVerificationSecret || this.options.userDataVerificationSecret.length < 32)) {
            throw new Error("AuthJWT 'userDataVerificationSecret' option must be at least 32 characters in length");
        }
        if (!this.options.accessTokenTTL || this.options.accessTokenTTL < 1) {
            this.options.accessTokenTTL = 60 * 15; // 15 minutes default
        }
        if (!this.options.refreshTokenTTL || this.options.refreshTokenTTL < 1) {
            this.options.refreshTokenTTL = 60 * 60 * 24 * 7; // 7 days default
        }
    }

    private async validateTokenFromAuthorizationValueIfProvided(authHeaderValue?: string): Promise<IGQLAuthContext> {
        if (!authHeaderValue) {
            return {
                user: null
            };
        }

        let token = "";
        if (authHeaderValue.startsWith("Bearer ")) {
            token = authHeaderValue.substring(7, authHeaderValue.length);
        } else {
            throw new Error("Access denied. Invalid Authorization header.");
        }

        try {
            const decoded = await this.validateAccessToken(token);
            const user = await this.storage.findUser({id: decoded.userId});
            if (!user || user.id != decoded.userId) {
                throw new Error("Access denied. Invalid token.");
            }
            return {
                user
            };
        } catch (err) {
            throw new Error("Access denied. Invalid token.");
        }
    }

    async getGQLAuthContextHTTP(req: express.Request): Promise<IGQLAuthContext> {
        return await this.validateTokenFromAuthorizationValueIfProvided(req.headers["authorization"]);
    }

    async getGQLAuthContextWS(connectionParams: Readonly<Record<string, unknown>>): Promise<IGQLAuthContext> {
        // This requires Authorization to be properly title-cased
        return await this.validateTokenFromAuthorizationValueIfProvided(connectionParams["Authorization"] as any);
    }

    async login(req: express.Request, {
        email,
        externalId,
        name,
        anonymousId,
        hash
    }: ILoginParams): Promise<ISuccessfulAuthResponse> {
        let user: IUser;
        // Trim key inputs that aren't null/undefined
        if (typeof email === "string") {
            email = email.trim();
        }
        if (typeof name === "string") {
            name = name.trim();
        }
        if (typeof externalId === "string") {
            externalId = externalId.trim();
        }
        // Set any potential empty strings to null
        if (!email) {
            email = null;
        }
        if (!name) {
            name = null;
        }
        if (!externalId) {
            externalId = null;
        }
        if (!anonymousId) {
            anonymousId = null;
        }
        // Validate inputs
        if ((email || externalId) && anonymousId) {
            throw new Error("anonymous users cannot have email or external id");
        }
        if (email && !this.isValidEmail(email)) {
            throw new Error("provided email is not a valid email");
        }
        const isAnon = (!email && !externalId) || anonymousId;
        if (!this.options.allowAnonUsers && isAnon) {
            throw new Error("anonymous users are not allowed");
        }
        if (!isAnon && this.options.requireUserVerificationHash) {
            const correctHash = this.generateVerificationHash(this.options.userDataVerificationSecret, externalId, email, name);
            if (correctHash !== hash) {
                throw new Error("user data verification hash is invalid");
            }
        }
        // Find the user
        if (anonymousId) {
            user = await this.storage.findUser({
                anonymousId
            });
        } else if (externalId) {
            user = await this.storage.findUser({
                externalId
            });
            if (!user) {
                user = await this.storage.createUser({
                    name,
                    email,
                    externalId
                });
            } else {
                if (user.name != name || user.email != email) {
                    user = await this.storage.updateUser(user.id,
                        {
                            name,
                            email
                        }
                    );
                }
            }
        } else if (email) {
            user = await this.storage.findUser({
                email
            });
            if (!user) {
                user = await this.storage.createUser({
                    name,
                    email
                });
            } else {
                if (user.name != name) {
                    user = await this.storage.updateUser(user.id,
                        {
                            name: name
                        }
                    );
                }
            }
        } else {
            user = await this.storage.createUser({
                anonymousId: generateRandomID(64)
            });
        }

        if (!user) {
            throw new Error("Login failed");
        }

        const accessToken = this.generateAccessToken(user);
        const refreshToken = this.generateRefreshToken(user);
        return {
            accessToken,
            anonymousId: user.anonymousId,
            refreshToken,
            anonymous: !!user.anonymousId,
            email: user.email,
            name: user.name,
            userId: user.id
        };
    }

    async refresh(req: express.Request, params: IRefreshParams): Promise<ISuccessfulAuthResponse> {
        const tknPayload = await this.validateRefreshToken(params.refreshToken);
        const user = await this.storage.findUser({
            id: tknPayload.userId
        });
        if (!user) {
            throw new Error("Login failed");
        }

        const accessToken = this.generateAccessToken(user);
        const refreshToken = this.generateRefreshToken(user);
        return {
            accessToken,
            anonymousId: user.anonymousId,
            refreshToken,
            anonymous: !!user.anonymousId,
            email: user.email,
            name: user.name,
            userId: user.id
        };
    }

    private sign(secret: string, ttlSecs: number, payload: IJWTPayload): string {
        const signOptions: SignOptions = {
            algorithm: "HS256",
            expiresIn: ttlSecs
        };
        return sign(payload, secret, signOptions);
    }

    private validate(secret: string, token: string, kind: JWT_TOKEN_KIND_ACCESS | JWT_TOKEN_KIND_REFRESH): Promise<IJWTPayload> {
        const verifyOptions: VerifyOptions = {
            algorithms: ["HS256"]
        };
        return new Promise((resolve, reject) => {
            verify(token, secret, verifyOptions, (error, decoded) => {
                if (error) {
                    return reject(error);
                }
                if (!decoded) {
                    return reject(new Error("invalid jwt payload on validation"));
                }
                if (decoded["kind"] !== kind) {
                    return reject(new Error("invalid token kind"));
                }
                resolve(decoded as IJWTPayload);
            });
        });
    }


    private generateAccessToken(user: any) {
        const payload: IJWTPayload = {
            userId: user.id,
            email: user.email,
            kind: "access"
        };
        const tkn = this.sign(this.options.jwtSecret, this.options.accessTokenTTL, payload);
        return {
            token: tkn,
            expAt: unixTimestamp(
                addSecondsToDate(
                    new Date(),
                    this.options.accessTokenTTL
                )
            )
        };
    }

    private generateRefreshToken(user: any) {
        const payload: IJWTPayload = {
            userId: user.id,
            email: user.email,
            kind: "refresh"
        };
        const tkn = this.sign(this.options.jwtSecret, this.options.refreshTokenTTL, payload);
        return {
            token: tkn,
            expAt: unixTimestamp(
                addSecondsToDate(
                    new Date(),
                    this.options.refreshTokenTTL
                )
            )
        };
    }

    private validateRefreshToken(token: string) {
        try {
            return this.validate(this.options.jwtSecret, token, "refresh");
        } catch (err) {
            throw new Error("Invalid refresh token");
        }
    }

    private validateAccessToken(token: string) {
        try {
            return this.validate(this.options.jwtSecret, token, "access");
        } catch (err) {
            throw new Error("Invalid access token");
        }
    }

    /***
     * Returns a string hash of the user data for verifying ConvoStack users. Ensure that you trim all of the strings that you send as leading/trailing spaces will cause issues with uniqueness.
     * @param hashSecret This is the 'secret' used for generating and verifying the hashes
     * @param userId This is the user ID of the user in the host platform. This is the ID that you give to your own users, not the ID that ConvoStack uses internally. Set to null if not available or used with ConvoStack. You must provide at least an email or userId when using user verification. We recommend providing a user ID in case you allow users to change/update their email addresses.
     * @param email User email address. Set to null if not available or used with ConvoStack. You must provide at least an email or userId when using user verification
     * @param name User's name. Set to null if not available or used with ConvoStack
     */
    private generateVerificationHash(hashSecret: string, userId: string | null, email: string | null, name: string | null): string {
        if (!hashSecret) {
            throw new Error("user data hash verification failed because no secret was provided");
        }
        // Configure the hash
        const hmac = crypto.createHmac("sha256", hashSecret);
        // Setup the payload. Pay special attention to the handling of null data, newlines, and the absence of a trailing newline. Since hashes are exact, the format must follow the requirements exactly.
        const payload = `userId:${userId ? userId : "null"}\nemail:${email ? email : "null"}\n${name ? name : "null"}`;
        // Add the payload to the hash
        hmac.update(payload);
        // Return the string hash
        return hmac.digest("hex");
    }

    private isValidEmail(email: string): boolean {
        // Regular expression for email validation
        return isEmail(email);
    }
}
