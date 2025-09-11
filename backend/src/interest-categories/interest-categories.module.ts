import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InterestCategoriesController } from './interest-categories.controller';
import { InterestCategoriesService } from './interest-categories.service';
import { InterestCategory } from './entities/interest-category.entity';

@Module({
    imports: [TypeOrmModule.forFeature([InterestCategory])],
    controllers: [InterestCategoriesController],
    providers: [InterestCategoriesService],
    exports: [InterestCategoriesService],
})
export class InterestCategoriesModule {}
