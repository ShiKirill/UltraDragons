import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RoutesService } from './routes.service';
import { CreateRouteDto } from './dto/create-route.dto';
import { Route } from './entities/route.entity';

@ApiTags('routes')
@Controller('routes')
export class RoutesController {
    constructor(private readonly routesService: RoutesService) { }

    @Post()
    @ApiOperation({ summary: 'Создать маршрут' })
    @ApiResponse({ status: 201, type: Route })
    create(@Body() dto: CreateRouteDto) {
        return this.routesService.create(dto);
    }

    @Get()
    @ApiOperation({ summary: 'Получить все маршруты' })
    findAll() {
        return this.routesService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Получить маршрут по ID' })
    findOne(@Param('id') id: string) {
        return this.routesService.findOne(+id);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Удалить маршрут' })
    remove(@Param('id') id: string) {
        return this.routesService.remove(+id);
    }
}
