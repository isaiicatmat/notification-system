import type { FastifyInstance } from 'fastify';
import { PostgresUserRepository } from './postgres-user.repository.ts';
import { UserService } from './user.service.ts';
import { UserController } from './user.controller.ts';

export async function registerUserRoutes(fastify: FastifyInstance) {
    const userRepository = new PostgresUserRepository();
    const userService = new UserService(userRepository);
    const userController = new UserController(userService);

    fastify.post(
        '/users',
        {
            schema: {
                description: 'Crear nuevo usuario',
                tags: ['Users'],
                body: {
                    type: 'object',
                    required: ['username', 'email', 'password'],
                    properties: {
                        username: { type: 'string', minLength: 3 },
                        email: { type: 'string', format: 'email' },
                        password: { type: 'string', minLength: 8 },
                    },
                },
                response: {
                    201: {
                        type: 'object',
                        properties: {
                            id: { type: 'number' },
                            username: { type: 'string' },
                            email: { type: 'string' },
                            createdAt: { type: 'string' },
                            updatedAt: { type: 'string' },
                        },
                    },
                },
            },
        },
        (req, reply) => userController.create(req, reply)
    );

    fastify.get(
        '/users',
        {
            schema: {
                description: 'Obtener todos los usuarios',
                tags: ['Users'],
                response: {
                    200: {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                id: { type: 'number' },
                                username: { type: 'string' },
                                email: { type: 'string' },
                                createdAt: { type: 'string' },
                                updatedAt: { type: 'string' },
                            },
                        },
                    },
                },
            },
        },
        (req, reply) => userController.findAll(req, reply)
    );

    fastify.get(
        '/users/:id',
        {
            schema: {
                description: 'Obtener usuario por ID',
                tags: ['Users'],
                params: {
                    type: 'object',
                    properties: { id: { type: 'string' } },
                },
                response: {
                    200: {
                        type: 'object',
                        properties: {
                            id: { type: 'number' },
                            username: { type: 'string' },
                            email: { type: 'string' },
                            createdAt: { type: 'string' },
                            updatedAt: { type: 'string' },
                        },
                    },
                },
            },
        },
        (req, reply) => userController.findById(req, reply)
    );

    fastify.put(
        '/users/:id',
        {
            schema: {
                description: 'Actualizar usuario',
                tags: ['Users'],
                params: {
                    type: 'object',
                    properties: { id: { type: 'string' } },
                },
                body: {
                    type: 'object',
                    properties: {
                        username: { type: 'string', minLength: 3 },
                        email: { type: 'string', format: 'email' },
                        password: { type: 'string', minLength: 8 },
                    },
                },
                response: {
                    200: {
                        type: 'object',
                        properties: {
                            id: { type: 'number' },
                            username: { type: 'string' },
                            email: { type: 'string' },
                            createdAt: { type: 'string' },
                            updatedAt: { type: 'string' },
                        },
                    },
                },
            },
        },
        (req, reply) => userController.update(req, reply)
    );

    fastify.delete(
        '/users/:id',
        {
            schema: {
                description: 'Eliminar usuario',
                tags: ['Users'],
                params: {
                    type: 'object',
                    properties: { id: { type: 'string' } },
                },
                response: {
                    204: {
                        description: 'Usuario eliminado correctamente',
                        type: 'null'
                    }
                }
            },
        },
        (req, reply) => userController.delete(req, reply)
    );
}