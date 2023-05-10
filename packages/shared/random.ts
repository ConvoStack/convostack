import crypto from 'crypto';

export const generateRandomID = (length: number): string => {
  return crypto.randomBytes(length).toString('hex');
};
