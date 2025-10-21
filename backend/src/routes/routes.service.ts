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
import { PlaceSelectionsService } from 'src/place-selections/place-selections.service';
import { CreateRouteDto } from './dto/create-route.dto';

@Injectable()
export class RoutesService {
    constructor(
        @InjectRepository(Route)
        private readonly routeRepository: Repository<Route>,
        @InjectRepository(RoutePlace)
        private readonly routePlaceRepository: Repository<RoutePlace>,
        private readonly sessionsService: SelectionSessionsService,
        private readonly userService: UsersService,
        private readonly placeSelectionsService: PlaceSelectionsService,
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

        if (session.userId !== dto.user_id) {
            throw new BadRequestException('Сессия не принадлежит пользователю');
        }

        // Получаем все выборы мест из сессии
        const selections = await this.placeSelectionsService.findBySessionId(
            dto.session_id,
        );

        const selected = selections.filter((s) => s.status === 'selected');
        if (!selected.length) {
            throw new BadRequestException('Нет выбранных мест для маршрута');
        }

        // Преобразуем PlaceSelection → RoutePlace
        const routePlaces = selected.map((s, i) =>
            this.routePlaceRepository.create({
                place: s.place,
                status: s.status,
                visitOrder: s.sequence ?? i + 1,
            }),
        );

        const route = this.routeRepository.create({
            user,
            session,
            routePlaces,
        });

        return this.routeRepository.save(route);
    }

    async remove(id: number): Promise<void> {
        const route = await this.findOne(id);
        await this.routeRepository.remove(route);
    }
}
