import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoutesService } from './routes.service';
import { RoutesController } from './routes.controller';
import { Route } from './entities/route.entity';
import { RoutePlace } from './entities/route-place.entity';
import { CitiesModule } from '../cities/cities.module';
import { UsersModule } from '../users/users.module';
import { PlacesModule } from '../places/places.module';
import { SelectionSessionsModule } from 'src/selection-sessions/selection-sessions.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Route, RoutePlace]),
    SelectionSessionsModule,
    UsersModule,
    PlacesModule,
  ],
  controllers: [RoutesController],
  providers: [RoutesService],
  exports: [RoutesService],
})
export class RoutesModule { }