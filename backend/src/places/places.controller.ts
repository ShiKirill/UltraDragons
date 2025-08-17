import { Controller, Get, Post, Put, Body, Delete, Param } from '@nestjs/common';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { PlacesService } from './places.service';

@ApiTags('Места')
@Controller('places')
export class PlacesController {
    constructor(private readonly placesService: PlacesService) { }

    @Get()
    @ApiOperation({ summary: 'Получить все места' })
    findAll() {
        return this.placesService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Получить место по id' })
    findOne(@Param('id') id: string) {
        return this.placesService.findOne(Number(id));
    }

    @Post()
    @ApiOperation({ summary: 'Создать место' })
    create(@Body() dto: CreatePlaceDto) {
        return this.placesService.create(dto);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Обновить место' })
    update(@Param('id') id: string, @Body() dto: UpdatePlaceDto) {
        return this.placesService.update(Number(id), dto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Удалить место' })
    remove(@Param('id') id: string) {
        return this.placesService.remove(Number(id));
    }
}