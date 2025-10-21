import {
    Injectable,
    NotFoundException,
    BadRequestException,
    forwardRef,
    Inject,
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
        @Inject(forwardRef(() => PlacesService))
        private readonly placesService: PlacesService,
    ) {}

    async create(dto: CreatePlaceSelectionDto): Promise<PlaceSelection> {
        const session = await this.sessionsService.findOne(dto.session_id);
        if (session.is_completed) {
            throw new BadRequestException(
                'Сессия уже завершена, нельзя добавить новые выборы',
            );
        }

        const place = await this.placesService.findOne(dto.place_id);

        const existing = await this.selectionsRepository.findOne({
            where: { sessionId: dto.session_id, placeId: dto.place_id },
        });
        if (existing) {
            throw new BadRequestException(
                'Место уже было выбрано или пропущено в этой сессии',
            );
        }

        const selection = this.selectionsRepository.create({
            session,
            place,
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
            order: { id: 'ASC' },
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

        if (dto.status) selection.status = dto.status;
        if (dto.sequence !== undefined) selection.sequence = dto.sequence;

        return this.selectionsRepository.save(selection);
    }

    async remove(id: number): Promise<{ message: string }> {
        const selection = await this.findOne(id);
        await this.selectionsRepository.remove(selection);
        return {
            message: `Place selection with ID ${id} deleted successfully`,
        };
    }

    async findViewedPlaceIds(sessionId: number): Promise<number[]> {
        const selections = await this.selectionsRepository.find({
            where: { sessionId },
            select: ['placeId'],
        });
        return selections.map((s) => s.placeId);
    }
}
