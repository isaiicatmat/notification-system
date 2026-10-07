import { Type, type Static } from '@sinclair/typebox';

export const UpdateUserSchema = Type.Object({
    username: Type.Optional(Type.String({ minLength: 3 })),
    email: Type.Optional(Type.String({ format: 'email' })),
    password: Type.Optional(Type.String({ minLength: 8 }))
});

export type UpdateUserDto = Static<typeof UpdateUserSchema>;