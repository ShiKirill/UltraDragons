import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsIn } from 'class-validator';

export class CreatePlaceSelectionDto {
    @ApiProperty({ example: 1, description: 'ID сессии' })
    @IsInt()
    session_id: number;

    @ApiProperty({ example: 5, description: 'ID места' })
    @IsInt()
    place_id: number;

    @ApiProperty({
        enum: ['selected', 'skipped'],
        example: 'selected',
        description: 'Статус выбора'
    })
    @IsIn(['selected', 'skipped'])
    status: string;

    @ApiProperty({
        example: 1,
        description: 'Порядковый номер выбора'
    })
    @IsInt()
    sequence: number;
}