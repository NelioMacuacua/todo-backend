import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateUser } from '../../../application/use-cases/CreateUser';
import { PrismaUserRepository } from '../../../infrastructure/db/PrismaUserRepository';

export async function createUserHandler(req: FastifyRequest, reply: FastifyReply) {
  const { name, email, password } = req.body as any;
  
  const userRepository = new PrismaUserRepository();
  const createUser = new CreateUser(userRepository);
  
  try {
    const user = await createUser.execute({ name, email, password });
    reply.status(201).send(user);
  } catch (error) {
    reply.status(400).send({ error: error.message });
  }
}
