import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePlaceDto } from './dto/create-place.dto';
import { Place } from './entities/place.entity';

@Injectable()
export class PlacesService {
    constructor(
        @InjectRepository(Place)
        private readonly placesRepo: Repository<Place>,
    ) { }

    create(dto: CreatePlaceDto): Promise<Place> {
        const place = this.placesRepo.create(dto);
        return this.placesRepo.save(place);
    }

    findAll(): Promise<Place[]> {
        return this.placesRepo.find();
    }

    findOne(id: number): Promise<Place | null> {
        return this.placesRepo.findOne({ where: { id } });
    }

    async remove(id: number): Promise<void> {
        await this.placesRepo.delete(id);
    }
}
