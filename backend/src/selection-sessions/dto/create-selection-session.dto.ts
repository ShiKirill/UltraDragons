import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsInt } from 'class-validator';

export class CreateSelectionSessionDto {
    @ApiProperty({ example: 1, description: 'ID пользователя' })
    @IsInt()
    user_id: number;

    @ApiProperty({ example: [1], description: 'ID интересов' })
    @ArrayNotEmpty()
    interests_ids: number[];

    @ApiProperty({ example: 3, description: 'ID города' })
    @IsInt()
    city_id: number;
}
