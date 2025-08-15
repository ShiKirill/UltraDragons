import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlacesController } from './places.controller';
import { PlacesService } from './places.service';
import { Place } from './entities/place.entity';
import { CitiesModule } from '../cities/cities.module';
import { PicturesModule } from 'src/pictures/pictures.module';
import { InterestCategoriesModule } from 'src/interest-categories/interest-categories.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Place]),
    CitiesModule,
    PicturesModule,
    InterestCategoriesModule
  ],
  controllers: [PlacesController],
  providers: [PlacesService],
  exports: [PlacesService],
})
export class PlacesModule { }