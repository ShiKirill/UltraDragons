import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateCityDto } from './dto/create-city.dto';
import { City } from './entities/city.entity';

@Injectable()
export class CitiesService {
    constructor(
        @InjectRepository(City)
        private citiesRepository: Repository<City>,
    ) {}

    create(createCityDto: CreateCityDto): Promise<City> {
        const city = this.citiesRepository.create(createCityDto);
        return this.citiesRepository.save(city);
    }

    findAll(): Promise<City[]> {
        return this.citiesRepository.find();
    }

    findOne(id: number): Promise<City | null> {
        return this.citiesRepository.findOne({ where: { id } });
    }

    remove(id: number) {
        return this.citiesRepository.delete(id);
    }
}
