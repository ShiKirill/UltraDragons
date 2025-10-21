import {
    Injectable,
    NotFoundException,
    ConflictException,
    InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { isPostgresError } from 'src/utils/handle-db-error';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepo: Repository<User>,
    ) {}

    async findAll(): Promise<User[]> {
        return this.userRepo.find({
            where: { is_deleted: false },
            relations: ['avatar', 'selectionSessions'],
        });
    }

    async findOne(id: number): Promise<User> {
        const user = await this.userRepo.findOne({
            where: { id, is_deleted: false },
            relations: ['avatar', 'selectionSessions'],
        });
        if (!user) throw new NotFoundException(`User with ID ${id} not found`);
        return user;
    }

    async create(dto: CreateUserDto): Promise<User> {
        try {
            const user = this.userRepo.create(dto);
            return await this.userRepo.save(user);
        } catch (error) {
            if (isPostgresError(error)) {
                throw new ConflictException(
                    `Email "${dto.email}" already exists`,
                );
            }
            throw new InternalServerErrorException('Unexpected database error');
        }
    }

    async update(id: number, dto: UpdateUserDto): Promise<User> {
        const user = await this.findOne(id);
        Object.assign(user, dto);
        return this.userRepo.save(user);
    }

    async remove(id: number): Promise<{ message: string }> {
        const user = await this.findOne(id);
        user.is_deleted = true;
        await this.userRepo.save(user);
        return { message: `User with ID ${id} deleted successfully` };
    }
}
