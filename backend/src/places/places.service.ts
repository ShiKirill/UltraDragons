import {
    Injectable,
    NotFoundException,
    InternalServerErrorException,
    Inject,
    forwardRef,
    BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { Place } from './entities/place.entity';
import { CitiesService } from 'src/cities/cities.service';
import { PicturesService } from 'src/pictures/pictures.service';
import { InterestCategoriesService } from 'src/interest-categories/interest-categories.service';
import { SelectionSessionsService } from 'src/selection-sessions/selection-sessions.service';
import { PlaceSelectionsService } from 'src/place-selections/place-selections.service';

@Injectable()
export class PlacesService {
    constructor(
        @InjectRepository(Place)
        private readonly placeRepository: Repository<Place>,
        private readonly citiesService: CitiesService,
        private readonly pictureService: PicturesService,
        private readonly interestCategoryService: InterestCategoriesService,
        private readonly selectionSessionsService: SelectionSessionsService,
        @Inject(forwardRef(() => PlaceSelectionsService))
        private readonly placeSelectionsService: PlaceSelectionsService,
    ) {}

    async findAll(cityId?: number, interestIds?: number[]): Promise<Place[]> {
        const where: any = { is_deleted: false };

        if (cityId) {
            where.city = { id: cityId };
        }

        const query = this.placeRepository
            .createQueryBuilder('place')
            .leftJoinAndSelect('place.city', 'city')
            .leftJoinAndSelect('place.pictures', 'pictures')
            .leftJoinAndSelect('place.interestCategories', 'interestCategories')
            .where('place.is_deleted = false');

        if (cityId) {
            query.andWhere('city.id = :cityId', { cityId });
        }

        if (interestIds?.length) {
            query.andWhere('interestCategories.id IN (:...interestIds)', {
                interestIds,
            });
        }

        return query.orderBy('place.id', 'ASC').getMany();
    }

    async findOne(id: number): Promise<Place> {
        const place = await this.placeRepository.findOne({
            where: { id, is_deleted: false },
            relations: ['city', 'pictures', 'interestCategories'],
        });

        if (!place) {
            throw new NotFoundException(`Место с ID ${id} не найдено`);
        }

        return place;
    }

    async create(dto: CreatePlaceDto): Promise<Place> {
        const city = await this.citiesService.findOne(dto.city_id);
        if (!city) throw new NotFoundException('Город не найден');

        const interestCategories = dto.interest_category_ids?.length
            ? await this.interestCategoryService.findManyByIds(
                  dto.interest_category_ids,
              )
            : [];

        if (!interestCategories.length) {
            throw new BadRequestException(
                'Место должно принадлежать хотя бы одной категории интересов',
            );
        }

        const pictures = dto.picture_ids?.length
            ? await this.pictureService.findManyByIds(dto.picture_ids)
            : [];

        const place = this.placeRepository.create({
            ...dto,
            city,
            pictures,
            interestCategories,
        });

        try {
            return await this.placeRepository.save(place);
        } catch {
            throw new InternalServerErrorException('Ошибка при создании места');
        }
    }

    async update(id: number, dto: UpdatePlaceDto): Promise<Place> {
        const place = await this.findOne(id);

        if (dto.city_id) {
            const city = await this.citiesService.findOne(dto.city_id);
            if (city) place.city = city;
        }

        if (dto.interest_category_ids) {
            place.interestCategories =
                await this.interestCategoryService.findManyByIds(
                    dto.interest_category_ids,
                );
        }

        if (dto.picture_ids) {
            place.pictures = await this.pictureService.findManyByIds(
                dto.picture_ids,
            );
        }

        Object.assign(place, dto);

        return this.placeRepository.save(place);
    }

    async remove(id: number): Promise<{ message: string }> {
        const place = await this.findOne(id);
        place.is_deleted = true;
        await this.placeRepository.save(place);
        return { message: `Место с ID ${id} успешно удалено (soft delete)` };
    }

    async getPlacesForSession(sessionId: number, limit = 5): Promise<Place[]> {
        const session = await this.selectionSessionsService.findOne(sessionId);
        if (!session) throw new NotFoundException('Сессия не найдена');

        const cityId = session.cityId;
        const interestIds = session.interests.map((i) => i.id);

        // все просмотренные места
        const viewedPlaceIds =
            await this.placeSelectionsService.findViewedPlaceIds(sessionId);

        const query = this.placeRepository
            .createQueryBuilder('place')
            .leftJoinAndSelect('place.city', 'city')
            .leftJoinAndSelect('place.interestCategories', 'ic')
            .leftJoinAndSelect('place.pictures', 'pictures')
            .where('place.is_deleted = false')
            .andWhere('city.id = :cityId', { cityId })
            .andWhere('ic.id IN (:...interestIds)', { interestIds });

        if (viewedPlaceIds.length) {
            query.andWhere('place.id NOT IN (:...viewedPlaceIds)', {
                viewedPlaceIds,
            });
        }

        query.orderBy('RANDOM()').limit(limit);

        const newPlaces = await query.getMany();

        if (!newPlaces.length) return [];

        await Promise.all(
            newPlaces.map((place, index) =>
                this.placeSelectionsService.create({
                    session_id: sessionId,
                    place_id: place.id,
                    status: 'shown',
                    sequence: viewedPlaceIds.length + index + 1,
                }),
            ),
        );

        return newPlaces;
    }
}
