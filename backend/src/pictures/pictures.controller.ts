import { Controller, Post, Get, Param, Body, Delete } from '@nestjs/common';
import { PicturesService } from './pictures.service';
import { CreatePictureDto } from './dto/create-picture.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Picture } from './entities/picture.entity';

@ApiTags('pictures')
@Controller('pictures')
export class PicturesController {
    constructor(private readonly picturesService: PicturesService) { }

    @Post()
    @ApiOperation({ summary: 'Загрузить изображение' })
    @ApiResponse({ status: 201, description: 'Изображение сохранено', type: Picture })
    create(@Body() createPictureDto: CreatePictureDto) {
        return this.picturesService.create(createPictureDto);
    }

    @Get()
    @ApiOperation({ summary: 'Получить все изображения' })
    @ApiResponse({ status: 200, description: 'Список изображений', type: [Picture] })
    findAll() {
        return this.picturesService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Получить изображение по ID' })
    @ApiResponse({ status: 200, description: 'Информация об изображении', type: Picture })
    findOne(@Param('id') id: string) {
        return this.picturesService.findOne(+id);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Удалить изображение' })
    @ApiResponse({ status: 200, description: 'Изображение удалено' })
    remove(@Param('id') id: string) {
        return this.picturesService.remove(+id);
    }
}
