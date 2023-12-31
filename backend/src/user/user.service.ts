import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { USER_ROLE, User } from './entities/user.entity';
import { CreateUserDto, UserLoginDto } from './dto/user.dto';
import { compare, hash } from 'bcryptjs';
import { UserRepository } from './repositories/user.repository';
import { UpdateUserDto } from './dto/updateUser.dto';
import { CreateAgentDto } from './dto/createAgent.dto';

@Injectable()
export class UserService {
    constructor (
        @InjectRepository(User)
        private readonly usersRepository: UserRepository
    ) { }

    async create (createUserDto: CreateUserDto): Promise<User> {
        const hashedPassword = await hash(createUserDto.password, 10);
        const user = this.usersRepository.create({ ...createUserDto, password: hashedPassword });
        return this.usersRepository.save(user);
    }

    async findOne (id: string): Promise<User> {
        return this.usersRepository.findOneBy({
            id: id
        });
    }

    async findOneByEmail (email: string): Promise<User> {
        return this.usersRepository.findOneBy({
            email: email
        });
    }

    async validateUser (userLoginDto: UserLoginDto): Promise<User> {
        const { email, password } = userLoginDto;
        const user = await this.usersRepository.findOneBy({ email: email });
        if (user && (await compare(password, user.password))) {
            return user;
        }
        return null;
    }

    async updateUser (id: string, updateUserDto: UpdateUserDto): Promise<User> {
        const user = await this.usersRepository.preload({ id: id, ...updateUserDto });
        if (!user) {
            throw new Error('User not found');
        }

        return this.usersRepository.save(user);
    }

    async getAgents (): Promise<User[]> {
        return this.usersRepository.findBy({ role: USER_ROLE.AGENT });
    }

    async createAgent (createAgentDto: CreateAgentDto): Promise<User> {
        const password = 'agent123';
        const hashedPassword = await hash(password, 10);
        const user = this.usersRepository.create({ ...createAgentDto, password: hashedPassword, role: USER_ROLE.AGENT });
        return this.usersRepository.save(user);
    }
}