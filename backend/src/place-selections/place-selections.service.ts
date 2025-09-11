import {
    Injectable,
    NotFoundException,
    BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreatePlaceSelectionDto } from './dto/create-place-selection.dto';
import { UpdatePlaceSelectionDto } from './dto/update-place-selection.dto';
import { SelectionSessionsService } from '../selection-sessions/selection-sessions.service';
import { PlacesService } from '../places/places.service';
import { PlaceSelection } from './entities/place-selections.entity';

@Injectable()
export class PlaceSelectionsService {
    constructor(
        @InjectRepository(PlaceSelection)
        private readonly selectionsRepository: Repository<PlaceSelection>,
        private readonly sessionsService: SelectionSessionsService,
        private readonly placesService: PlacesService,
    ) {}

    async create(dto: CreatePlaceSelectionDto): Promise<PlaceSelection> {
        const session = await this.sessionsService.findOne(dto.session_id);
        if (!session) throw new BadRequestException('Сессия не найдена');
        if (session.is_completed) {
            throw new BadRequestException(
                'Сессия уже завершена, нельзя добавить новые выборы',
            );
        }
        const place = await this.placesService.findOne(dto.place_id);
        if (!place) throw new BadRequestException('Место не найдено');

        const selection = this.selectionsRepository.create({
            session: { id: dto.session_id },
            place: { id: dto.place_id },
            status: dto.status,
            sequence: dto.sequence,
        });

        return this.selectionsRepository.save(selection);
    }

    async findBySessionId(sessionId: number): Promise<PlaceSelection[]> {
        await this.sessionsService.findOne(sessionId);
        return this.selectionsRepository.find({
            where: { sessionId },
            relations: ['place', 'place.city', 'place.interestCategories'],
            order: { sequence: 'ASC' },
        });
    }

    async findAll(): Promise<PlaceSelection[]> {
        return this.selectionsRepository.find({
            relations: [
                'session',
                'place',
                'place.city',
                'place.interestCategories',
            ],
            order: { sequence: 'ASC' },
        });
    }

    async findOne(id: number): Promise<PlaceSelection> {
        const selection = await this.selectionsRepository.findOne({
            where: { id },
            relations: ['session', 'place'],
        });

        if (!selection) {
            throw new NotFoundException(`Выбор места с ID ${id} не найден`);
        }

        return selection;
    }

    async update(
        id: number,
        dto: UpdatePlaceSelectionDto,
    ): Promise<PlaceSelection> {
        const selection = await this.findOne(id);

        if (dto.status !== undefined) {
            selection.status = dto.status;
        }
        if (dto.sequence !== undefined) {
            selection.sequence = dto.sequence;
        }

        return this.selectionsRepository.save(selection);
    }

    async remove(id: number): Promise<void> {
        const selection = await this.findOne(id);
        await this.selectionsRepository.remove(selection);
    }
}
