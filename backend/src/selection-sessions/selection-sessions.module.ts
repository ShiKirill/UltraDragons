import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SelectionSessionsController } from './selection-sessions.controller';
import { SelectionSessionsService } from './selection-sessions.service';
import { SelectionSession } from './entities/selection-sessions.entity';
import { UsersModule } from '../users/users.module';
import { InterestCategoriesModule } from '../interest-categories/interest-categories.module';
import { CitiesModule } from 'src/cities/cities.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([SelectionSession]),
        UsersModule,
        InterestCategoriesModule,
        CitiesModule,
    ],
    controllers: [SelectionSessionsController],
    providers: [SelectionSessionsService],
    exports: [SelectionSessionsService],
})
export class SelectionSessionsModule {}
