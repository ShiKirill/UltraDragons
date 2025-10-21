import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RoutesService } from './routes.service';
import { CreateRouteDto } from './dto/create-route.dto';
import { Route } from './entities/route.entity';

@ApiTags('Маршруты')
@Controller('routes')
export class RoutesController {
    constructor(private readonly routesService: RoutesService) {}

    @Get()
    @ApiOperation({ summary: 'Получить список маршрутов' })
    @ApiResponse({ status: 200, type: [Route] })
    findAll() {
        return this.routesService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Получить маршрут по ID' })
    @ApiResponse({ status: 200, type: Route })
    findOne(@Param('id') id: string) {
        return this.routesService.findOne(Number(id));
    }

    @Post()
    @ApiOperation({
        summary: 'Создать маршрут на основе выбранных мест из сессии выбора',
    })
    @ApiResponse({ status: 201, type: Route })
    create(@Body() dto: CreateRouteDto) {
        return this.routesService.create(dto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Удалить маршрут' })
    @ApiResponse({ status: 200, description: 'Маршрут успешно удалён' })
    remove(@Param('id') id: string) {
        return this.routesService.remove(Number(id));
    }
}
