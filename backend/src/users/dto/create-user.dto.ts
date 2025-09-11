import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsInt, IsOptional } from 'class-validator';
import { Role } from '../enums/role.enum';

export class CreateUserDto {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty({ enum: Role, required: false, default: Role.User })
    @IsInt()
    @IsOptional()
    role?: Role = Role.User;
}
