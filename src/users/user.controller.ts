import type { FastifyRequest, FastifyReply } from "fastify";
import { UserService } from './user.service.ts';
import type { CreateUserDto } from './dto/create-user.dto.ts';
import type { UpdateUserDto } from './dto/update-user.dto.ts';

export class UserController {
    constructor(private userService: UserService){}
    
    async create(req: FastifyRequest, reply: FastifyReply) {
        try {
            const dto = req.body as CreateUserDto;
            const result = await this.userService.create(dto);
            return reply.code(201).send(result);
        } catch(error) {
            return reply.code(400).send({ error: (error as Error).message});
        }
    }

    async findById(req: FastifyRequest, reply: FastifyReply) {
        try {
            const { id } = req.params as {id: string};
            const result = await this.userService.findById(Number(id));
            return reply.send(result);
        } catch(error) {
            return reply.code(404).send({ error: (error as Error).message});
        }
    }

    async findAll(req: FastifyRequest, reply: FastifyReply) {
        try {
            const result = await this.userService.findAll();
            return reply.send(result);
        } catch(error) {
            return reply.code(500).send({error: (error as Error).message });
        }
    }

    async update(req: FastifyRequest, reply: FastifyReply) {
        try {
            const { id } = req.params as { id: string };
            const dto = req.body as Partial<UpdateUserDto>;
            const result = await this.userService.update(Number(id), dto);
            return reply.send(result);
        } catch(error) {
            return reply.code(400).send({error: (error as Error).message });
        }
    }

    async delete(req: FastifyRequest, reply: FastifyReply) {
        try {
            const { id } = req.params as {id: string};
            await this.userService.delete(Number(id));
            return reply.code(204).send();
        } catch(error) {
            return reply.code(400).send({error: (error as Error).message });
        }
    }
}