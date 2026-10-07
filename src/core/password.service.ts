import bcrypt from 'bcrypt';

export class PasswordService {
    private static readonly SALT_ROUNDS = 10;
    private static readonly MIN_LENGTH = 8;
    private static readonly MAX_LENGTH = 128;

    static async hash(plainPassword: string): Promise<string> {
        this.validatePassword(plainPassword);
        return bcrypt.hash(plainPassword, this.SALT_ROUNDS)
    }

    static async compare(plain: string, hashed: string): Promise<boolean> {
        return bcrypt.compare(plain, hashed);
    }

    private static validatePassword(password: string): void {
        if (!password || password.length < 8) {
            throw new Error('Password debe tener mínimo 8 caracteres');
        }

        if (password.length > 128) {
            throw new Error('Password muy largo');
        }
    }
}
