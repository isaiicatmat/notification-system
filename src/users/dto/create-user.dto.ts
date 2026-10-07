import { Type, type Static } from '@sinclair/typebox';

export const CreateUserSchema = Type.Object({
    username: Type.String({ minLength: 3 }),
    email: Type.String({ format: 'email' }),
    password: Type.String({ minLength: 8 })
});

export type CreateUserDto = Static<typeof CreateUserSchema>;