import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsString, IsInt, IsBoolean, IsOptional } from 'class-validator';
import { Role } from '../enums/role.enum';

export class CreateUserDto {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiPropertyOptional({ default: false })
    @IsBoolean()
    @IsOptional()
    email_confirmed?: boolean = false;

    @ApiProperty({ enum: Role, required: false, default: Role.User })
    @IsInt()
    @IsOptional()
    role?: Role = Role.User;

    @ApiPropertyOptional()
    @IsInt()
    @IsOptional()
    avatarId?: number;

    @ApiPropertyOptional({ default: false })
    @IsBoolean()
    @IsOptional()
    is_deleted?: boolean = false;
}