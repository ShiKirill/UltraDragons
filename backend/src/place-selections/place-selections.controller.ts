import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { PlaceSelectionsService } from './place-selections.service';
import { CreatePlaceSelectionDto } from './dto/create-place-selection.dto';
import { UpdatePlaceSelectionDto } from './dto/update-place-selection.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('PlaceSelections')
@Controller('place-selections')
export class PlaceSelectionsController {
    constructor(private readonly service: PlaceSelectionsService) { }

    @Get()
    @ApiOperation({ summary: 'Получить список всех выборов мест (для админки или аналитики)' })
    findAll() {
        return this.service.findAll();
    }

    @Get('by-session/:sessionId')
    @ApiOperation({ summary: 'Получить список выборов для сессии' })
    findBySessionId(@Param('sessionId') sessionId: string) {
        return this.service.findBySessionId(Number(sessionId));
    }

    @Get(':id')
    @ApiOperation({ summary: 'Получить выбор места по id' })
    findOne(@Param('id') id: string) {
        return this.service.findOne(Number(id));
    }

    @Post()
    @ApiOperation({ summary: 'Создать выбор места' })
    create(@Body() dto: CreatePlaceSelectionDto) {
        return this.service.create(dto);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Изменить выбор места' })
    update(@Param('id') id: string, @Body() dto: UpdatePlaceSelectionDto) {
        return this.service.update(Number(id), dto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Удалить выбор места' })
    remove(@Param('id') id: string) {
        return this.service.remove(Number(id));
    }
}