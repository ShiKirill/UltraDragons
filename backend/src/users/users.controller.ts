import { Controller, Post, Get, Param, Body, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from './entities/user.entity';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    @ApiOperation({ summary: 'Создать пользователя' })
    @ApiResponse({ status: 201, description: 'Пользователь создан', type: User })
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Get()
    @ApiOperation({ summary: 'Получить всех пользователей' })
    @ApiResponse({ status: 200, description: 'Список пользователей', type: [User] })
    findAll() {
        return this.usersService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Получить пользователя по ID' })
    @ApiResponse({ status: 200, description: 'Информация о пользователе', type: User })
    @ApiResponse({ status: 404, description: 'Пользователь не найден' })
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(+id);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Удалить пользователя' })
    @ApiResponse({ status: 200, description: 'Пользователь удалён' })
    remove(@Param('id') id: string) {
        return this.usersService.remove(+id);
    }
}
