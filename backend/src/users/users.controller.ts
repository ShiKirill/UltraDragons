import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { UsersService } from './users.service';

@ApiTags('Пользователи (вроде работает)')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    @ApiOperation({ summary: 'Список пользователей' })
    findAll() {
        return this.usersService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Найти пользователя по id' })
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(Number(id));
    }

    @Post()
    @ApiOperation({ summary: 'Создать пользователя' })
    create(@Body() dto: CreateUserDto) {
        return this.usersService.create(dto);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Обновить пользователя' })
    update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
        return this.usersService.update(Number(id), dto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Удалить пользователя' })
    remove(@Param('id') id: string) {
        return this.usersService.remove(Number(id));
    }
}
