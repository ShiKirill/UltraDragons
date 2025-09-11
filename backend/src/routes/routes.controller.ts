import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Put,
    Delete,
} from '@nestjs/common';
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { RoutesService } from './routes.service';

@ApiTags('Маршруты (пока не трогал, это на потом)')
@Controller('routes')
export class RoutesController {
    constructor(private readonly routesService: RoutesService) {}

    @Get()
    @ApiOperation({ summary: 'Получить список маршрутов' })
    findAll() {
        return this.routesService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Получить маршрут по id' })
    findOne(@Param('id') id: string) {
        return this.routesService.findOne(Number(id));
    }

    @Post()
    @ApiOperation({ summary: 'Создать маршрут' })
    create(@Body() dto: CreateRouteDto) {
        return this.routesService.create(dto);
    }

    @Put(':id')
    @ApiOperation({
        summary: 'Обновить маршрут (например, изменить состав мест)',
    })
    update(@Param('id') id: string, @Body() dto: UpdateRouteDto) {
        return this.routesService.update(Number(id), dto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Удалить маршрут' })
    remove(@Param('id') id: string) {
        return this.routesService.remove(Number(id));
    }
}
