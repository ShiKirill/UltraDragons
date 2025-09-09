import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Min, Max, IsOptional } from 'class-validator';

export class CreateCityDto {
    @ApiProperty({ example: 'Москва', description: 'Название города' })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({ example: 55.7558, description: 'Широта' })
    @Min(-90)
    @Max(90)
    lat: number;

    @ApiProperty({ example: 37.6173, description: 'Долгота' })
    @Min(-180)
    @Max(180)
    lon: number;

    @ApiProperty({
        example: 55.8,
        description: 'Верхняя левая широта ограничивающего прямоугольника',
        required: false,
    })
    @Min(-90)
    @Max(90)
    @IsOptional()
    bbox_top_left_lat?: number;

    @ApiProperty({
        example: 37.5,
        description: 'Верхняя левая долгота ограничивающего прямоугольника',
        required: false,
    })
    @Min(-180)
    @Max(180)
    @IsOptional()
    bbox_top_left_lon?: number;

    @ApiProperty({
        example: 55.7,
        description: 'Нижняя правая широта ограничивающего прямоугольника',
        required: false,
    })
    @Min(-90)
    @Max(90)
    @IsOptional()
    bbox_bottom_right_lat?: number;

    @ApiProperty({
        example: 37.7,
        description: 'Нижняя правая долгота ограничивающего прямоугольника',
        required: false,
    })
    @Min(-180)
    @Max(180)
    @IsOptional()
    bbox_bottom_right_lon?: number;

    @ApiProperty({
        example: 'Europe/Moscow',
        description: 'Часовой пояс города',
    })
    @IsNotEmpty()
    @IsString()
    timezone: string;
}
