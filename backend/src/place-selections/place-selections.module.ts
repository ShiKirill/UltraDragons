import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaceSelectionsController } from './place-selections.controller';
import { PlaceSelectionsService } from './place-selections.service';
import { PlaceSelection } from './entities/place-selections.entity';
import { SelectionSessionsModule } from '../selection-sessions/selection-sessions.module';
import { PlacesModule } from '../places/places.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PlaceSelection]),
    SelectionSessionsModule,
    PlacesModule,
  ],
  controllers: [PlaceSelectionsController],
  providers: [PlaceSelectionsService],
  exports: [PlaceSelectionsService],
})
export class PlaceSelectionsModule { }