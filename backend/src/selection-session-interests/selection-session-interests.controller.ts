import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { CreateSelectionSessionInterestDto } from './dto/create-selection-session-interest.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { SelectionSessionInterestsService } from './selection-session-interests.service';

@ApiTags('Интересы выбранные в сессии')
@Controller('selection-session-interests')
export class SelectionSessionInterestsController {
    constructor(private readonly service: SelectionSessionInterestsService) { }

    @Get()
    @ApiOperation({ summary: 'Все связи сессий и интересов' })
    findAll() {
        return this.service.findAll();
    }

    @Get('by-session/:sessionId')
    @ApiOperation({ summary: 'Интересы по сессии' })
    findBySession(@Param('sessionId') sessionId: string) {
        return this.service.findBySession(Number(sessionId));
    }

    @Post()
    @ApiOperation({ summary: 'Добавить интерес к сессии' })
    create(@Body() dto: CreateSelectionSessionInterestDto) {
        return this.service.create(dto);
    }

    @Delete(':sessionId/:interestCategoryId')
    @ApiOperation({ summary: 'Удалить интерес из сессии' })
    remove(
        @Param('sessionId') sessionId: string,
        @Param('interestCategoryId') categoryId: string,
    ) {
        return this.service.remove(Number(sessionId), Number(categoryId));
    }
}