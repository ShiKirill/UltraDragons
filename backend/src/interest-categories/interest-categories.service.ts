import {
    Injectable,
    NotFoundException,
    ConflictException,
    InternalServerErrorException,
    BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { InterestCategory } from './entities/interest-category.entity';
import { CreateInterestCategoryDto } from './dto/create-interest-category.dto';
import { isPostgresError } from 'src/utils/handle-db-error';

@Injectable()
export class InterestCategoriesService {
    constructor(
        @InjectRepository(InterestCategory)
        private categoriesRepository: Repository<InterestCategory>,
    ) {}

    async create(dto: CreateInterestCategoryDto): Promise<InterestCategory> {
        try {
            const category = this.categoriesRepository.create(dto);
            return await this.categoriesRepository.save(category);
        } catch (error) {
            if (isPostgresError(error)) {
                throw new ConflictException(
                    `Category "${dto.title}" already exists`,
                );
            }
            throw new InternalServerErrorException('Unexpected database error');
        }
    }

    findAll(): Promise<InterestCategory[]> {
        return this.categoriesRepository.find();
    }

    async findOne(id: number): Promise<InterestCategory> {
        const category = await this.categoriesRepository.findOne({
            where: { id },
        });
        if (!category) {
            throw new NotFoundException(`Category with ID ${id} not found`);
        }
        return category;
    }

    async findManyByIds(ids: number[]): Promise<InterestCategory[]> {
        return this.categoriesRepository.find({ where: { id: In(ids) } });
    }

    async remove(id: number): Promise<{ message: string }> {
        const result = await this.categoriesRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Category with ID ${id} not found`);
        }
        return { message: `Category with ID ${id} deleted successfully` };
    }

    async bulkCreate(
        dtos: CreateInterestCategoryDto[],
    ): Promise<InterestCategory[]> {
        if (!dtos?.length) {
            throw new BadRequestException('Пустой список категорий');
        }

        return this.categoriesRepository.manager.transaction(
            async (manager) => {
                const repo = manager.getRepository(InterestCategory);
                const entities = repo.create(dtos);
                try {
                    return await repo.save(entities);
                } catch (err) {
                    if (err.code === '23505') {
                        throw new BadRequestException(
                            'Обнаружен дубликат категории интересов',
                        );
                    }
                    throw err;
                }
            },
        );
    }
}
