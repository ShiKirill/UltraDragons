import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CitiesModule } from './cities/cities.module';
import { City } from './cities/entities/city.entity';
import { UsersModule } from './users/users.module';
import { PicturesModule } from './pictures/pictures.module';
import { PlacesModule } from './places/places.module';
import { InterestsModule } from './interests/interests.module';
import { RoutesModule } from './routes/routes.module';
import configuration from './config/config';

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
        entities: [City],
        synchronize: configService.get('db.synchronize'),
        ssl: configService.get('db.ssl'),
      }),
    }),
    CitiesModule,
    UsersModule,
    PicturesModule,
    PlacesModule,
    InterestsModule,
    RoutesModule,
  ],
})
export class AppModule { }