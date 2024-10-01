import { UserRepository } from '../../domain/repositorys/UserRepository';
import { User } from '../../domain/entities/User';

interface CreateUserRequest {
    name: string;
    email: string;
    password: string;
}

export class CreateUser {
    constructor(private userRepository: UserRepository) { }

    async execute(data: CreateUserRequest): Promise<User> {
        const userExists = await this.userRepository.findByEmail(data.email);
        if (userExists) {
            throw new Error('User already exists');
        }

        const user = new User('generated-id', data.name, data.email, data.password);
        return this.userRepository.create(user);
    }
}
