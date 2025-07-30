import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PlacesService } from './places.service';
import { CreatePlaceDto } from './dto/create-place.dto';
import { Place } from './entities/place.entity';

@ApiTags('places')
@Controller('places')
export class PlacesController {
    constructor(private readonly placesService: PlacesService) { }

    @Post()
    @ApiOperation({ summary: 'Создать место' })
    @ApiResponse({ status: 201, type: Place })
    create(@Body() dto: CreatePlaceDto) {
        return this.placesService.create(dto);
    }

    @Get()
    @ApiOperation({ summary: 'Получить все места' })
    @ApiResponse({ status: 200, type: [Place] })
    findAll() {
        return this.placesService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Получить место по ID' })
    @ApiResponse({ status: 200, type: Place })
    findOne(@Param('id') id: string) {
        return this.placesService.findOne(+id);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Удалить место' })
    @ApiResponse({ status: 200 })
    remove(@Param('id') id: string) {
        return this.placesService.remove(+id);
    }
}
