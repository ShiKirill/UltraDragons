import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class CreateSelectionSessionDto {
    @ApiProperty({ example: 1, description: 'ID пользователя' })
    @IsInt()
    user_id: number;
}