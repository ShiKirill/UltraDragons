import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { InterestCategoriesService } from './interest-categories.service';
import { CreateInterestCategoryDto } from './dto/create-interest-category.dto';
import { InterestCategory } from './entities/interest-category.entity';

@ApiTags('Категории интересов (вроде работает)')
@Controller('interest-categories')
export class InterestCategoriesController {
    constructor(
        private readonly categoriesService: InterestCategoriesService,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Создать категорию интересов' })
    @ApiResponse({
        status: 201,
        description: 'Категория успешно создана',
        type: InterestCategory,
    })
    create(@Body() dto: CreateInterestCategoryDto) {
        return this.categoriesService.create(dto);
    }

    @Get()
    @ApiOperation({ summary: 'Получить все категории интересов' })
    @ApiResponse({
        status: 200,
        description: 'Список категорий',
        type: [InterestCategory],
    })
    findAll() {
        return this.categoriesService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Получить категорию по ID' })
    @ApiResponse({
        status: 200,
        description: 'Категория интересов',
        type: InterestCategory,
    })
    findOne(@Param('id') id: string) {
        return this.categoriesService.findOne(+id);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Удалить категорию' })
    @ApiResponse({ status: 200, description: 'Категория удалена' })
    remove(@Param('id') id: string) {
        return this.categoriesService.remove(+id);
    }
}
