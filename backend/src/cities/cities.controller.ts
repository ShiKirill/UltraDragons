import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { CitiesService } from './cities.service';
import { CreateCityDto } from './dto/create-city.dto';
import { City } from './entities/city.entity';

@ApiTags('Города (вроде работает)')
@Controller('cities')
export class CitiesController {
    constructor(private readonly citiesService: CitiesService) {}

    @Post()
    @ApiOperation({ summary: 'Создать город' })
    @ApiResponse({
        status: 201,
        description: 'Город успешно создан',
        type: City,
    })
    create(@Body() createCityDto: CreateCityDto) {
        return this.citiesService.create(createCityDto);
    }

    @Get()
    @ApiOperation({ summary: 'Получить все города' })
    @ApiResponse({
        status: 200,
        description: 'Список всех городов',
        type: [City],
    })
    findAll() {
        return this.citiesService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Получить город по ID' })
    @ApiResponse({
        status: 200,
        description: 'Информация о городе',
        type: City,
    })
    @ApiResponse({ status: 404, description: 'Город не найден' })
    findOne(@Param('id') id: string) {
        return this.citiesService.findOne(+id);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Удалить город' })
    @ApiResponse({ status: 200, description: 'Город успешно удален' })
    @ApiResponse({ status: 404, description: 'Город не найден' })
    remove(@Param('id') id: string) {
        return this.citiesService.remove(+id);
    }

    @Post('bulk')
    @ApiOperation({ summary: 'Массовое создание городов (batch insert)' })
    @ApiResponse({ status: 201, type: [City] })
    @ApiBody({
        description: 'Список городов для массового создания',
        type: CreateCityDto,
        isArray: true,
    })
    bulkCreate(@Body() cities: CreateCityDto[]) {
        return this.citiesService.bulkCreate(cities);
    }
}
