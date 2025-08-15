import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CitiesModule } from './cities/cities.module';
import { UsersModule } from './users/users.module';
import { PicturesModule } from './pictures/pictures.module';
import { PlacesModule } from './places/places.module';
import { RoutesModule } from './routes/routes.module';
import { InterestCategoriesModule } from './interest-categories/interest-categories.module';
import configuration from './config/config';

import { User } from './users/entities/user.entity';
import { Picture } from './pictures/entities/picture.entity';
import { Place } from './places/entities/place.entity';
import { InterestCategory } from './interest-categories/entities/interest-category.entity';
import { Route } from './routes/entities/route.entity';
import { RoutePlace } from './routes/entities/route-place.entity';
import { City } from './cities/entities/city.entity';

import { SelectionSessionsModule } from './selection-sessions/selection-sessions.module';
import { PlaceSelectionsModule } from './place-selections/place-selections.module';
import { SelectionSessionInterestsModule } from './selection-session-interests/selection-session-interests.module';
import { PlaceSelection } from './place-selections/entities/place-selections.entity';
import { SelectionSession } from './selection-sessions/entities/selection-sessions.entity';
import { SelectionSessionInterest } from './selection-session-interests/entities/selection-session-interests.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration]
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('db.host'),
        port: configService.get('db.port'),
        username: configService.get('db.username'),
        password: configService.get('db.password'),
        database: configService.get('db.database'),
        entities: [
          City,
          User,
          Picture,
          Place,
          InterestCategory,
          Route,
          RoutePlace,
          PlaceSelection,
          SelectionSession,
          SelectionSessionInterest,
        ],
        synchronize: configService.get('db.synchronize'),
        ssl: configService.get('db.ssl'),
        autoLoadEntities: true,
      }),
    }),
    CitiesModule,
    UsersModule,
    PicturesModule,
    PlacesModule,
    RoutesModule,
    InterestCategoriesModule,
    SelectionSessionsModule,
    PlaceSelectionsModule,
    SelectionSessionInterestsModule,
  ],
})
export class AppModule { }