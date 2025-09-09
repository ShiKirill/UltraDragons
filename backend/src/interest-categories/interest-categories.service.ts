import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { InterestCategory } from './entities/interest-category.entity';
import { CreateInterestCategoryDto } from './dto/create-interest-category.dto';

@Injectable()
export class InterestCategoriesService {
    constructor(
        @InjectRepository(InterestCategory)
        private categoriesRepository: Repository<InterestCategory>,
    ) {}

    create(dto: CreateInterestCategoryDto): Promise<InterestCategory> {
        const category = this.categoriesRepository.create(dto);
        return this.categoriesRepository.save(category);
    }

    findAll(): Promise<InterestCategory[]> {
        return this.categoriesRepository.find();
    }

    findOne(id: number): Promise<InterestCategory | null> {
        return this.categoriesRepository.findOne({ where: { id } });
    }

    async findManyByIds(ids: number[]): Promise<InterestCategory[]> {
        return this.categoriesRepository.find({ where: { id: In(ids) } });
    }

    async remove(id: number): Promise<void> {
        await this.categoriesRepository.delete(id);
    }
}
