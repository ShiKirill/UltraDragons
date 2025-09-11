import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SelectionSessionsController } from './selection-sessions.controller';
import { SelectionSessionsService } from './selection-sessions.service';
import { SelectionSession } from './entities/selection-sessions.entity';
import { UsersModule } from '../users/users.module';

@Module({
    imports: [TypeOrmModule.forFeature([SelectionSession]), UsersModule],
    controllers: [SelectionSessionsController],
    providers: [SelectionSessionsService],
    exports: [SelectionSessionsService],
})
export class SelectionSessionsModule {}
