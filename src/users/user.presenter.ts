import { User } from './user.entity.ts'
import type { UserResponseDto } from './dto/user-response.dto.ts'

export class UserPresenter {
    static toJSON(user: User): Omit<UserResponseDto, 'password'> {
        return {
            id: user.id,
            username: user.username,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        }
    }
}