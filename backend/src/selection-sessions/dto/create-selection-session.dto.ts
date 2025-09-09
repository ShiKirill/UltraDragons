import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsInt } from 'class-validator';

export class CreateSelectionSessionDto {
    @ApiProperty({ example: 1, description: 'ID пользователя' })
    @IsInt()
    user_id: number;

    @ApiProperty({ example: [1], description: 'ID интересов' })
    @ArrayNotEmpty()
    interests_ids: number[];
}
