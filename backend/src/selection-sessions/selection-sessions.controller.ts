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
import { SelectionSessionsService } from './selection-sessions.service';
import { CreateSelectionSessionDto } from './dto/create-selection-session.dto';
import { UpdateSelectionSessionDto } from './dto/update-selection-session.dto';
import { SelectionSession } from './entities/selection-sessions.entity';

@ApiTags('Selection Sessions')
@Controller('selection-sessions')
export class SelectionSessionsController {
    constructor(private readonly sessionsService: SelectionSessionsService) {}

    @Get()
    @ApiOperation({ summary: 'Get all selection sessions' })
    @ApiResponse({ status: 200, type: [SelectionSession] })
    findAll() {
        return this.sessionsService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get selection session by ID' })
    @ApiResponse({ status: 200, type: SelectionSession })
    findOne(@Param('id') id: string) {
        return this.sessionsService.findOne(+id);
    }

    @Post()
    @ApiOperation({ summary: 'Create a new selection session for user' })
    @ApiResponse({ status: 201, type: SelectionSession })
    create(@Body() dto: CreateSelectionSessionDto) {
        return this.sessionsService.create(dto);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update selection session (e.g. mark completed)' })
    @ApiResponse({ status: 200, type: SelectionSession })
    update(@Param('id') id: string, @Body() dto: UpdateSelectionSessionDto) {
        return this.sessionsService.update(+id, dto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete selection session' })
    @ApiResponse({ status: 200, description: 'Session deleted successfully' })
    remove(@Param('id') id: string) {
        return this.sessionsService.remove(+id);
    }
}
