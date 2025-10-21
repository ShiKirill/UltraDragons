import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlacesController } from './places.controller';
import { PlacesService } from './places.service';
import { Place } from './entities/place.entity';
import { CitiesModule } from '../cities/cities.module';
import { PicturesModule } from 'src/pictures/pictures.module';
import { InterestCategoriesModule } from 'src/interest-categories/interest-categories.module';
import { SelectionSessionsModule } from 'src/selection-sessions/selection-sessions.module';
import { PlaceSelectionsModule } from 'src/place-selections/place-selections.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Place]),
        CitiesModule,
        PicturesModule,
        InterestCategoriesModule,
        SelectionSessionsModule,
        forwardRef(() => PlaceSelectionsModule),
    ],
    controllers: [PlacesController],
    providers: [PlacesService],
    exports: [PlacesService],
})
export class PlacesModule {}
