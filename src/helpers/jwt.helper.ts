import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';
import * as path from 'path';

/**
 * @class jwtHelper
 * @description Utility class for handling JWT generation, verification, decoding, and RSA key management.
 */
export class jwtHelper {

    /**
     * @description Generates an RSA key pair and stores it in the 'src/keys' directory.
     * @returns {Promise<{ publicKey: string; privateKey: string; }>} The generated RSA keys.
     */
    static async generateKeyPair(): Promise<{ publicKey: string; privateKey: string; }> {
        const keysDir = path.join('src', 'keys');

        if (!fs.existsSync(keysDir)) {
            fs.mkdirSync(keysDir, { recursive: true });
        }

        const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
            modulusLength: 4096,
            publicKeyEncoding: { type: 'spki', format: 'pem' },
            privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
        });

        const keysExist = await this.checkKeys(keysDir);

        if (!keysExist) {
            fs.writeFileSync(path.join(keysDir, 'public.pem'), publicKey);
            fs.writeFileSync(path.join(keysDir, 'private.pem'), privateKey);
        }

        const publicKeyEncoding = fs.readFileSync(path.join(keysDir, 'public.pem'), 'utf8');
        const privateKeyEncoding = fs.readFileSync(path.join(keysDir, 'private.pem'), 'utf8');

        return { publicKey: publicKeyEncoding, privateKey: privateKeyEncoding };
    }

    /**
     * @description Checks if both public and private RSA key files exist.
     * @param {string} keysDir - Directory where the keys should be stored.
     * @returns {Promise<boolean>} True if both keys exist, otherwise false.
     */
    static async checkKeys(keysDir: string): Promise<boolean> {
        const publicKeyPath = path.join(keysDir, 'public.pem');
        const privateKeyPath = path.join(keysDir, 'private.pem');
        return fs.existsSync(publicKeyPath) && fs.existsSync(privateKeyPath);
    }

    /**
     * @description Retrieves the stored public key from 'src/keys/public.pem'.
     * @returns {string} Public key in PEM format.
     */
    static get publicKey(): string {
        const keysDir = path.join('src', 'keys');
        return fs.readFileSync(path.join(keysDir, 'public.pem'), 'utf8');
    }

    /**
     * @description Verifies and decodes a JWT token using the provided public key.
     * @param {string} token - JWT token to verify and decode.
     * @param {string} publicKey - Public RSA key for verification.
     * @returns {any} Decoded token payload if valid.
     * @throws {Error} If token is invalid or expired.
     */
    static decodeToken(token: any, publicKey: string): any {
        try {
            const decoded = jwt.verify(token, publicKey, { algorithms: ['RS256'] });
            console.log('Token successfully verified');
            return decoded;
        } catch (err: any) {
            console.error('Error verifying token:', err.message);
            throw new Error('Invalid or expired token');
        }
    }

    /**
     * @description Checks if a JWT token has expired.
     * @param {string} token - JWT token to check.
     * @returns {boolean} True if expired, false otherwise.
     */
    static isTokenExpired(token: string): boolean {
        const decoded = jwt.decode(token);

        if (decoded && typeof decoded !== 'string') {
            const { exp } = decoded as jwt.JwtPayload;
            if (exp !== undefined) {
                const now = Date.now().valueOf() / 1000;
                return exp < now;
            }
        }

        return false;
    }

    /**
     * @description Extracts the JWT token from the Authorization header of an Express request.
     * @param {Request} req - Express request object.
     * @returns {Promise<string>} The extracted token string.
     */
    static async getToken(req: any): Promise<string> {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];
        return token;
    }

    /**
     * @description Decodes a JWT token without verifying its signature.
     * @param {string} token - JWT token to decode.
     * @returns {any} The complete decoded token content.
     */
    static getCompleteToken(token: any): any {
        try {
            const decoded = jwt.decode(token, { complete: true });
            return decoded;
        } catch (err: any) {
            console.error('Error decoding token:', err.message);
            return null;
        }
    }

    /**
     * @description Generates a signed JWT token using the private RSA key and the provided payload.
     * @param {any} payload - Data to include inside the JWT token.
     * @returns {Promise<string>} The generated JWT token.
     * @throws {Error} If token generation fails.
     */
    static async generateJwtToken(payload: any): Promise<string> {
        try {
            const { privateKey } = await jwtHelper.generateKeyPair();
            const token = jwt.sign(payload, privateKey, { algorithm: 'RS256', expiresIn: '2h' });
            return token;
        } catch (err: any) {
            console.error('Error generating JWT token:', err.message);
            throw err;
        }
    }

    /**
     * @description Retrieves the 'sub' claim from a JWT token.
     * @param {string} token - JWT token to decode.
     * @returns {string} The 'sub' claim value.
     */
    static getTokenSub(token: string): string {
        const decoded = jwt.decode(token) as { sub: string };
        return decoded.sub;
    }
}
