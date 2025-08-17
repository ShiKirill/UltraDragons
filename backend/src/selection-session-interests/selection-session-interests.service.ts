import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSelectionSessionInterestDto } from './dto/create-selection-session-interest.dto';
import { SelectionSessionInterest } from './entities/selection-session-interests.entity';
import { SelectionSessionsService } from 'src/selection-sessions/selection-sessions.service';
import { InterestCategoriesService } from 'src/interest-categories/interest-categories.service';

@Injectable()
export class SelectionSessionInterestsService {
    constructor(
        @InjectRepository(SelectionSessionInterest)
        private readonly repo: Repository<SelectionSessionInterest>,
        private readonly sessionsService: SelectionSessionsService,
        private readonly categoriesService: InterestCategoriesService,
    ) { }

    async findAll(): Promise<SelectionSessionInterest[]> {
        return this.repo.find({ relations: ['session', 'interestCategory'] });
    }

    async findBySession(sessionId: number): Promise<SelectionSessionInterest[]> {
        await this.sessionsService.findOne(sessionId);
        return this.repo.find({ where: { sessionId }, relations: ['interestCategory'] });
    }

    async create(dto: CreateSelectionSessionInterestDto): Promise<SelectionSessionInterest> {
        const session = await this.sessionsService.findOne(dto.session_id);
        if (!session) throw new NotFoundException('Сессия не найдена');
        const category = await this.categoriesService.findOne(dto.interest_category_id);
        if (!category) throw new NotFoundException('Категория интереса не найдена');
        const entity = this.repo.create({
            sessionId: dto.session_id,
            interestCategoryId: dto.interest_category_id,
            session,
            interestCategory: category,
        });
        return this.repo.save(entity);
    }

    async remove(sessionId: number, interestCategoryId: number): Promise<void> {
        const item = await this.repo.findOne({ where: { sessionId, interestCategoryId } });
        if (!item) throw new NotFoundException('Связь не найдена');
        await this.repo.remove(item);
    }
}