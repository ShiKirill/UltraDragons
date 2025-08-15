import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { PicturesService } from 'src/pictures/pictures.service';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepo: Repository<User>,
        private readonly picturesService: PicturesService,
    ) { }

    async findAll(): Promise<User[]> {
        return this.userRepo.find({ relations: ['avatar', 'selectionSessions'] });
    }

    async findOne(id: number): Promise<User> {
        const user = await this.userRepo.findOne({
            where: { id },
            relations: ['avatar', 'selectionSessions'],
        });
        if (!user) throw new NotFoundException(`Пользователь с id=${id} не найден`);
        return user;
    }

    async create(dto: CreateUserDto): Promise<User> {
        let avatar: any = null;
        if (dto.avatarId) {
            avatar = await this.picturesService.findOne(dto.avatarId);
            if (!avatar) throw new NotFoundException('Картинка-аватар не найдена');
        }
        const user = this.userRepo.create({
            ...dto,
            avatar,
        });
        return this.userRepo.save(user);
    }

    async update(id: number, dto: UpdateUserDto): Promise<User> {
        const user = await this.findOne(id);
        if (dto.avatarId) {
            const picture = await this.picturesService.findOne(dto.avatarId);
            if (picture) user.avatar = picture;
        }
        Object.assign(user, dto);
        return this.userRepo.save(user);
    }

    async remove(id: number): Promise<void> {
        const user = await this.findOne(id);
        await this.userRepo.remove(user);
    }
}