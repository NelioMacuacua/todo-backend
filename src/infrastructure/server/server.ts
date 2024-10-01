import Fastify from 'fastify';
import { createUserHandler } from '../../interfaces/http/controllers/UserController';

const server = Fastify();

server.post('/users', createUserHandler);

server.listen(3000, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
