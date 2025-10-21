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
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    @ApiOperation({ summary: 'Get all users' })
    @ApiResponse({ status: 200, type: [User] })
    findAll() {
        return this.usersService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get user by ID' })
    @ApiResponse({ status: 200, type: User })
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(+id);
    }

    @Post()
    @ApiOperation({ summary: 'Create a new user' })
    @ApiResponse({ status: 201, type: User })
    create(@Body() dto: CreateUserDto) {
        return this.usersService.create(dto);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update user info' })
    @ApiResponse({ status: 200, type: User })
    update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
        return this.usersService.update(+id, dto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Soft delete user' })
    @ApiResponse({ status: 200, description: 'User deleted successfully' })
    remove(@Param('id') id: string) {
        return this.usersService.remove(+id);
    }
}
