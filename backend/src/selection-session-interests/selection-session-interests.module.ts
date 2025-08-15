import { Module } from '@nestjs/common';
import { SelectionSessionInterestsService } from './selection-session-interests.service';
import { SelectionSessionInterestsController } from './selection-session-interests.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SelectionSessionInterest } from './entities/selection-session-interests.entity';
import { SelectionSessionsModule } from 'src/selection-sessions/selection-sessions.module';
import { InterestCategoriesModule } from 'src/interest-categories/interest-categories.module';

@Module({
  imports: [TypeOrmModule.forFeature([SelectionSessionInterest]), SelectionSessionsModule, InterestCategoriesModule],
  providers: [SelectionSessionInterestsService],
  controllers: [SelectionSessionInterestsController],
  exports: [SelectionSessionInterestsService]
})
export class SelectionSessionInterestsModule { }
