import {IUser} from "./storage-engine";

export interface IGQLAuthContext {
    user: IUser | null;
}
