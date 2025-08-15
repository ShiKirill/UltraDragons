import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { Place } from './entities/place.entity';
import { CitiesService } from 'src/cities/cities.service';
import { PicturesService } from 'src/pictures/pictures.service';
import { InterestCategoriesService } from 'src/interest-categories/interest-categories.service';
import { InterestCategory } from 'src/interest-categories/entities/interest-category.entity';
import { Picture } from 'src/pictures/entities/picture.entity';

@Injectable()
export class PlacesService {
    constructor(
        @InjectRepository(Place)
        private readonly placeRepository: Repository<Place>,
        private readonly citiesService: CitiesService,
        private readonly pictureService: PicturesService,
        private readonly interestCategoryService: InterestCategoriesService,
    ) { }

    async findAll(): Promise<Place[]> {
        return this.placeRepository.find({
            relations: ['city', 'pictures', 'interestCategories'],
            order: { id: 'ASC' },
        });
    }

    async findOne(id: number): Promise<Place> {
        const place = await this.placeRepository.findOne({
            where: { id },
            relations: ['city', 'pictures', 'interestCategories'],
        });
        if (!place) throw new NotFoundException(`Место с id ${id} не найдено`);
        return place;
    }

    async create(dto: CreatePlaceDto): Promise<Place> {
        const city = await this.citiesService.findOne(dto.city_id);
        if (!city) throw new NotFoundException('Город не найден');

        let interestCategories: InterestCategory[] = [];
        if (dto.interest_category_ids?.length) {
            interestCategories = await this.interestCategoryService.findManyByIds(dto.interest_category_ids);
        }

        let pictures: Picture[] = [];
        if (dto.picture_ids?.length) {
            pictures = await this.pictureService.findManyByIds(dto.picture_ids);
        }

        const place = this.placeRepository.create({
            ...dto,
            city,
            pictures,
            interestCategories,
        });

        return this.placeRepository.save(place);
    }

    async update(id: number, dto: UpdatePlaceDto): Promise<Place> {
        const place = await this.findOne(id);
        if (dto.city_id) {
            const city = await this.citiesService.findOne(dto.city_id);
            if (city) place.city
        }
        if (dto.interest_category_ids) {
            place.interestCategories = await this.interestCategoryService.findManyByIds(dto.interest_category_ids);
        }
        if (dto.picture_ids) {
            place.pictures = await this.pictureService.findManyByIds(dto.picture_ids);
        }
        Object.assign(place, dto);
        return this.placeRepository.save(place);
    }

    async remove(id: number): Promise<void> {
        const place = await this.findOne(id);
        await this.placeRepository.remove(place);
    }
}