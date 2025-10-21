import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoutesService } from './routes.service';
import { RoutesController } from './routes.controller';
import { Route } from './entities/route.entity';
import { RoutePlace } from './entities/route-place.entity';
import { UsersModule } from '../users/users.module';
import { PlacesModule } from '../places/places.module';
import { SelectionSessionsModule } from 'src/selection-sessions/selection-sessions.module';
import { PlaceSelectionsModule } from 'src/place-selections/place-selections.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Route, RoutePlace]),
        SelectionSessionsModule,
        UsersModule,
        PlacesModule,
        PlaceSelectionsModule,
    ],
    controllers: [RoutesController],
    providers: [RoutesService],
    exports: [RoutesService],
})
export class RoutesModule {}
