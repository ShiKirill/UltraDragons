import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { InterestsService } from './interests.service';
import { CreateInterestDto } from './dto/create-interest.dto';
import { Interest } from './entities/interest.entity';

@ApiTags('interests')
@Controller('interests')
export class InterestsController {
    constructor(private readonly interestsService: InterestsService) { }

    @Post()
    @ApiOperation({ summary: 'Создать интерес' })
    @ApiResponse({ status: 201, type: Interest })
    create(@Body() dto: CreateInterestDto) {
        return this.interestsService.create(dto);
    }

    @Get()
    @ApiOperation({ summary: 'Получить все интересы' })
    findAll() {
        return this.interestsService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Получить интерес по ID' })
    findOne(@Param('id') id: string) {
        return this.interestsService.findOne(+id);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Удалить интерес' })
    remove(@Param('id') id: string) {
        return this.interestsService.remove(+id);
    }
}
