import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
} from '@nestjs/common';
import { CreateSelectionSessionDto } from './dto/create-selection-session.dto';
import { UpdateSelectionSessionDto } from './dto/update-selection-session.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { SelectionSessionsService } from './selection-sessions.service';

@ApiTags(
    'Сессии выбора (тут точно создание работает и получение, апдейт врят ли)',
)
@Controller('selection-sessions')
export class SelectionSessionsController {
    constructor(private readonly sessionsService: SelectionSessionsService) {}

    @Get()
    @ApiOperation({ summary: 'Получить список всех сессий' })
    findAll() {
        return this.sessionsService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Получить сессию по id' })
    findOne(@Param('id') id: string) {
        return this.sessionsService.findOne(Number(id));
    }

    @Post()
    @ApiOperation({ summary: 'Создать новую сессию (для юзера)' })
    create(@Body() dto: CreateSelectionSessionDto) {
        return this.sessionsService.create(dto);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Обновить параметры сессии' })
    update(@Param('id') id: string, @Body() dto: UpdateSelectionSessionDto) {
        return this.sessionsService.update(Number(id), dto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Удалить сессию' })
    remove(@Param('id') id: string) {
        return this.sessionsService.remove(Number(id));
    }
}
