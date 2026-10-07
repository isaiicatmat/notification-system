import { PrismaClient } from "@prisma/client";
import { User } from './user.entity.ts';
import type { IUserRepository } from './user.repository.ts';

export class PostgresUserRepository implements IUserRepository {
    private static prisma = new PrismaClient();

    async create(user: User): Promise<User> {
        const newUser = await PostgresUserRepository.prisma.user.create({
            data: {
                username: user.username,
                email: user.email,
                password: user.password
            }
        });

        return this.toDomainEntity(newUser);
    }

    async findById(userId: number): Promise<User | null> {
        const foundUser = await PostgresUserRepository.prisma.user.findUnique({
            where: {
                id: userId
            }
        });

        if (!foundUser) return null;

        return this.toDomainEntity(foundUser);
    }

    async findAll(): Promise<User[] > {
        const users = await PostgresUserRepository.prisma.user.findMany();

        return users.map(user => this.toDomainEntity(user));
    }

    async update(userId: number, user: User): Promise<User> {
        const updateUser = await PostgresUserRepository.prisma.user.update({
            where: { id: userId },
            data: {
                username: user.username,
                email: user.email,
                password: user.password
            }
        });

        return this.toDomainEntity(updateUser);
    }

    async delete(userId: number) {
        const user = await PostgresUserRepository.prisma.user.findUnique({
            where: { id: userId}
        });

        if (!user) throw new Error('Usuario no encontrado');

        await PostgresUserRepository.prisma.user.delete({
            where: {
                id: userId
            }
        });

    }

    private toDomainEntity(data: any): User {
        return new User(
            data.id,
            data.username,
            data.email,
            data.password,
            data.createdAt.toISOString(),
            data.updatedAt.toISOString()
        );
    }
}