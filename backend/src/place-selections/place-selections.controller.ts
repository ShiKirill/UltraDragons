import {
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Param,
    Body,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PlaceSelectionsService } from './place-selections.service';
import { CreatePlaceSelectionDto } from './dto/create-place-selection.dto';
import { UpdatePlaceSelectionDto } from './dto/update-place-selection.dto';
import { PlaceSelection } from './entities/place-selections.entity';

@ApiTags('Place Selections')
@Controller('place-selections')
export class PlaceSelectionsController {
    constructor(private readonly service: PlaceSelectionsService) {}

    @Get()
    @ApiOperation({
        summary: 'Get all place selections (for analytics/admin)',
    })
    @ApiResponse({ status: 200, type: [PlaceSelection] })
    findAll() {
        return this.service.findAll();
    }

    @Get('by-session/:sessionId')
    @ApiOperation({ summary: 'Get all selections for a given session' })
    @ApiResponse({ status: 200, type: [PlaceSelection] })
    findBySessionId(@Param('sessionId') sessionId: string) {
        return this.service.findBySessionId(+sessionId);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a single place selection' })
    @ApiResponse({ status: 200, type: PlaceSelection })
    findOne(@Param('id') id: string) {
        return this.service.findOne(+id);
    }

    @Post()
    @ApiOperation({ summary: 'Create a new place selection (user swipe)' })
    @ApiResponse({ status: 201, type: PlaceSelection })
    create(@Body() dto: CreatePlaceSelectionDto) {
        return this.service.create(dto);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update selection status or sequence' })
    @ApiResponse({ status: 200, type: PlaceSelection })
    update(@Param('id') id: string, @Body() dto: UpdatePlaceSelectionDto) {
        return this.service.update(+id, dto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete selection (admin/debug only)' })
    @ApiResponse({ status: 200, description: 'Selection deleted successfully' })
    remove(@Param('id') id: string) {
        return this.service.remove(+id);
    }
}
