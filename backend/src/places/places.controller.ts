import {
    Controller,
    Get,
    Post,
    Patch,
    Body,
    Delete,
    Param,
    Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { PlacesService } from './places.service';
import { Place } from './entities/place.entity';

@ApiTags('Places')
@Controller('places')
export class PlacesController {
    constructor(private readonly placesService: PlacesService) {}

    @Get()
    @ApiOperation({ summary: 'Get all places (optionally filtered)' })
    @ApiResponse({ status: 200, type: [Place] })
    findAll(
        @Query('cityId') cityId?: string,
        @Query('interestIds') interestIds?: string,
    ) {
        const parsedInterests = interestIds
            ? interestIds.split(',').map((id) => Number(id))
            : [];

        return this.placesService.findAll(
            cityId ? Number(cityId) : undefined,
            parsedInterests,
        );
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get place by ID' })
    @ApiResponse({ status: 200, type: Place })
    findOne(@Param('id') id: string) {
        return this.placesService.findOne(+id);
    }

    @Post()
    @ApiOperation({ summary: 'Create new place' })
    @ApiResponse({ status: 201, type: Place })
    create(@Body() dto: CreatePlaceDto) {
        return this.placesService.create(dto);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update place data' })
    @ApiResponse({ status: 200, type: Place })
    update(@Param('id') id: string, @Body() dto: UpdatePlaceDto) {
        return this.placesService.update(+id, dto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Soft delete place' })
    @ApiResponse({ status: 200, description: 'Place deleted successfully' })
    remove(@Param('id') id: string) {
        return this.placesService.remove(+id);
    }

    @Get('for-session/:sessionId')
    @ApiOperation({
        summary: 'Получить места для конкретной сессии (по 5 за раз)',
    })
    @ApiResponse({ status: 200, type: [Place] })
    getPlacesForSession(
        @Param('sessionId') sessionId: string,
        @Query('limit') limit?: string,
    ) {
        return this.placesService.getPlacesForSession(
            Number(sessionId),
            limit ? Number(limit) : 5,
        );
    }
}
