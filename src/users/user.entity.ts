import { PasswordService } from '../core/password.service.ts';

export class User {
    constructor(
        public id: number,
        public username: string, 
        public email: string,
        public password: string,
        public createdAt: string,
        public updatedAt: string
    ) {}

    canLogin(): boolean{
        return true;
    }

    changeEmail(newEmail: string, updatedAt?: Date): void {
        if (!this.validateEmailFormat(newEmail)) {
            throw new Error('Email inválido')
        }
        this.email = newEmail;
        this.updatedAt = (updatedAt || new Date()).toISOString();
    }

    changeUsername(newUserName: string, updatedAt?: Date): void {
        this.username = newUserName;
        this.updatedAt = (updatedAt || new Date()).toISOString();
    }

    private validateEmailFormat(email: string): boolean {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    async updatePassword(newPassword: string, updatedAt?: Date): Promise<void> {
        const newHash = await PasswordService.hash(newPassword);
        this.password = newHash;
        this.updatedAt = (updatedAt || new Date()).toISOString();
    }
}