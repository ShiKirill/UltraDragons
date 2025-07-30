import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Route } from './entities/route.entity';
import { CreateRouteDto } from './dto/create-route.dto';

@Injectable()
export class RoutesService {
    constructor(
        @InjectRepository(Route)
        private routesRepository: Repository<Route>,
    ) { }

    create(dto: CreateRouteDto): Promise<Route> {
        const route = this.routesRepository.create(dto);
        return this.routesRepository.save(route);
    }

    findAll(): Promise<Route[]> {
        return this.routesRepository.find();
    }

    findOne(id: number): Promise<Route | null> {
        return this.routesRepository.findOne({ where: { id } });
    }

    async remove(id: number): Promise<void> {
        await this.routesRepository.delete(id);
    }
}
