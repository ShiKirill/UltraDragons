import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepo: Repository<User>,
    ) {}

    async findAll(): Promise<User[]> {
        return this.userRepo.find({
            relations: ['avatar', 'selectionSessions'],
        });
    }

    async findOne(id: number): Promise<User> {
        const user = await this.userRepo.findOne({
            where: { id },
            relations: ['avatar', 'selectionSessions'],
        });
        if (!user)
            throw new NotFoundException(`Пользователь с id=${id} не найден`);
        return user;
    }

    async create(dto: CreateUserDto): Promise<User> {
        const user = this.userRepo.create({
            ...dto,
        });
        return this.userRepo.save(user);
    }

    async update(id: number, dto: UpdateUserDto): Promise<User> {
        const user = await this.findOne(id);
        Object.assign(user, dto);
        return this.userRepo.save(user);
    }

    async remove(id: number): Promise<void> {
        const user = await this.findOne(id);
        await this.userRepo.remove(user);
    }
}
