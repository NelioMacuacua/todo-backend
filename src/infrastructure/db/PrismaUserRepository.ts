import { PrismaClient } from '@prisma/client';
import { UserRepository } from '../../domain/repositorys/UserRepository';
import { User } from '../../domain/entities/User';

const prisma = new PrismaClient();

export class PrismaUserRepository implements UserRepository {
    async create(user: User): Promise<User> {
        const createdUser = await prisma.user.create({
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
                password: user.password,
            },
        });
        return new User(createdUser.id, createdUser.name, createdUser.email, createdUser.password);
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return null;
        return new User(user.id, user.name, user.email, user.password);
    }
}
