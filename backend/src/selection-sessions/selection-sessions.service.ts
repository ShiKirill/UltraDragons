import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateSelectionSessionDto } from './dto/create-selection-session.dto';
import { UpdateSelectionSessionDto } from './dto/update-selection-session.dto';
import { SelectionSession } from './entities/selection-sessions.entity';
import { UsersService } from 'src/users/users.service';
import { CitiesService } from 'src/cities/cities.service';

@Injectable()
export class SelectionSessionsService {
    constructor(
        @InjectRepository(SelectionSession)
        private readonly sessionRepository: Repository<SelectionSession>,
        private readonly usersService: UsersService,
        private readonly citiesService: CitiesService,
    ) {}

    async findAll(): Promise<SelectionSession[]> {
        return this.sessionRepository.find({
            relations: ['user', 'interests', 'placeSelections', 'routes'],
            order: { id: 'ASC' },
        });
    }

    async findOne(id: number): Promise<SelectionSession> {
        const session = await this.sessionRepository.findOne({
            where: { id },
            relations: ['user', 'interests', 'placeSelections', 'routes'],
        });
        if (!session) {
            throw new NotFoundException(
                `Selection session with ID ${id} not found`,
            );
        }
        return session;
    }

    async create(dto: CreateSelectionSessionDto): Promise<SelectionSession> {
        const user = await this.usersService.findOne(dto.user_id);
        if (!user) throw new NotFoundException('Пользователь не найден');

        const city = await this.citiesService.findOne(dto.city_id);
        if (!city) throw new NotFoundException('Город не найден');

        if (!dto.interests_ids?.length) {
            throw new BadRequestException(
                'Сессия должна содержать хотя бы один интерес',
            );
        }

        const session = this.sessionRepository.create({
            user,
            city,
            is_completed: false,
            interests: dto.interests_ids.map((id) => ({ id })),
        });

        return this.sessionRepository.save(session);
    }

    async update(
        id: number,
        dto: UpdateSelectionSessionDto,
    ): Promise<SelectionSession> {
        const session = await this.findOne(id);

        // обновляем только разрешённые поля
        if (dto.is_completed !== undefined) {
            session.is_completed = dto.is_completed;
        }

        return this.sessionRepository.save(session);
    }

    async remove(id: number): Promise<{ message: string }> {
        const session = await this.findOne(id);
        await this.sessionRepository.remove(session);
        return {
            message: `Selection session with ID ${id} deleted successfully`,
        };
    }
}
