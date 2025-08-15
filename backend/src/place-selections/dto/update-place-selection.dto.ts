import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsIn, IsOptional } from 'class-validator';

export class UpdatePlaceSelectionDto {
    @ApiProperty({
        enum: ['selected', 'skipped'],
        example: 'selected',
        description: 'Статус выбора',
        required: false
    })
    @IsOptional()
    @IsIn(['selected', 'skipped'])
    status?: string;

    @ApiProperty({
        example: 2,
        description: 'Порядковый номер выбора',
        required: false
    })
    @IsOptional()
    @IsInt()
    sequence?: number;
}