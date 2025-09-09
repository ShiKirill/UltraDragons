import {
    Injectable,
    NotFoundException,
    BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Route } from './entities/route.entity';
import { RoutePlace } from './entities/route-place.entity';
import { SelectionSessionsService } from 'src/selection-sessions/selection-sessions.service';
import { UsersService } from 'src/users/users.service';
import { PlacesService } from 'src/places/places.service';
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';

@Injectable()
export class RoutesService {
    constructor(
        @InjectRepository(Route)
        private readonly routeRepository: Repository<Route>,
        @InjectRepository(RoutePlace)
        private readonly routePlaceRepository: Repository<RoutePlace>,
        private readonly sessionsService: SelectionSessionsService,
        private readonly userService: UsersService,
        private readonly placeService: PlacesService,
    ) {}

    async findAll(): Promise<Route[]> {
        return this.routeRepository.find({
            relations: ['user', 'session', 'routePlaces', 'routePlaces.place'],
            order: { id: 'ASC' },
        });
    }

    async findOne(id: number): Promise<Route> {
        const route = await this.routeRepository.findOne({
            where: { id },
            relations: ['user', 'session', 'routePlaces', 'routePlaces.place'],
        });
        if (!route) throw new NotFoundException(`Маршрут id=${id} не найден`);
        return route;
    }

    async create(dto: CreateRouteDto): Promise<Route> {
        const user = await this.userService.findOne(dto.user_id);
        if (!user) throw new NotFoundException('Пользователь не найден');
        const session = await this.sessionsService.findOne(dto.session_id);
        if (!session) throw new NotFoundException('Сессия не найдена');

        let routePlaces: RoutePlace[] = [];
        if (dto.route_places?.length) {
            for (let rp of dto.route_places) {
                const place = await this.placeService.findOne(rp.place_id);
                if (!place)
                    throw new NotFoundException(
                        `Место id=${rp.place_id} не найдено`,
                    );
                routePlaces.push(
                    this.routePlaceRepository.create({
                        place,
                        status: rp.status,
                        visitOrder: rp.visit_order,
                    }),
                );
            }
        }

        const route = this.routeRepository.create({
            user,
            session,
            created_at: dto.created_at,
            routePlaces: routePlaces.length
                ? await this.routePlaceRepository.save(routePlaces)
                : [],
        });

        return this.routeRepository.save(route);
    }

    async update(id: number, dto: UpdateRouteDto): Promise<Route> {
        const route = await this.findOne(id);
        Object.assign(route, dto);
        return this.routeRepository.save(route);
    }

    async remove(id: number): Promise<void> {
        const route = await this.findOne(id);
        await this.routeRepository.remove(route);
    }
}
