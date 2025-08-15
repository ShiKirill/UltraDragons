import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateSelectionSessionDto } from './dto/create-selection-session.dto';
import { UpdateSelectionSessionDto } from './dto/update-selection-session.dto';
import { SelectionSession } from './entities/selection-sessions.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class SelectionSessionsService {
    constructor(
        @InjectRepository(SelectionSession)
        private readonly sessionRepository: Repository<SelectionSession>,
        private readonly usersService: UsersService,
    ) { }

    async findAll(): Promise<SelectionSession[]> {
        return this.sessionRepository.find({
            relations: ['user', 'interests', 'placeSelections', 'routes'],
            order: { id: 'ASC' },
        });
    }

    async findOne(id: number): Promise<SelectionSession> {
        const session = await this.sessionRepository.findOne({
            where: { id },
            relations: ['user', 'interests', 'interests.interestCategory', 'placeSelections', 'routes'],
        });
        if (!session) throw new NotFoundException(`Сессия id=${id} не найдена`);
        return session;
    }

    async create(dto: CreateSelectionSessionDto): Promise<SelectionSession> {
        const user = await this.usersService.findOne(dto.user_id);
        if (!user) throw new NotFoundException('Пользователь не найден');
        const session = this.sessionRepository.create({
            user,
            is_completed: false,
        });
        return this.sessionRepository.save(session);
    }

    async update(id: number, dto: UpdateSelectionSessionDto): Promise<SelectionSession> {
        const session = await this.findOne(id);
        Object.assign(session, dto);
        return this.sessionRepository.save(session);
    }

    async remove(id: number): Promise<void> {
        const session = await this.findOne(id);
        await this.sessionRepository.remove(session);
    }
}