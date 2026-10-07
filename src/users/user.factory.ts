import { User } from './user.entity.ts';
import { PasswordService } from '../core/password.service.ts';

export class UserFactory {
    static async create(
        username: string,
        email: string,
        password: string
    ): Promise <User> {
        const hashedPassword = await PasswordService.hash(password);
        return new User(
            1,
            username,
            email,
            hashedPassword,
            new Date().toISOString(),
            new Date().toISOString(),
        );
    }
}