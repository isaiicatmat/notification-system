import { Type, type Static } from '@sinclair/typebox';

export const UserResponseSchema = Type.Object({
    id: Type.Number(),
    username: Type.String({ minLength: 3 }),
    email: Type.String({ format: 'email' }),
    createdAt: Type.Optional(Type.String()),
    updatedAt: Type.Optional(Type.String())
});

export type UserResponseDto = Static<typeof UserResponseSchema>;