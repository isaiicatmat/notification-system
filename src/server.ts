import Fastify from 'fastify';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import { registerUserRoutes } from './users/users.routes.ts';

const fastify = Fastify({ logger: true });
const PORT = 3000;

const start = async () => {
    try {
        // Swagger
        await fastify.register(fastifySwagger, {
            swagger: {
                info: { title: 'Users API', version: '1.0.0' },
                host: 'localhost:3000',
                schemes: ['http'],
                consumes: ['application/json'],
                produces: ['application/json'],
            },
        });

        await fastify.register(fastifySwaggerUi, {
            routePrefix: '/docs',
        });

        await registerUserRoutes(fastify);

        await fastify.listen({ port: PORT, host: '0.0.0.0' });
        console.log(`Server running at http://localhost:${PORT}/docs`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();