import { ApiProperty } from '@nestjs/swagger';

export class CreateCityDto {
    @ApiProperty({ example: 'Москва', description: 'Название города' })
    name: string;

    @ApiProperty({ example: 55.7558, description: 'Широта' })
    lat: number;

    @ApiProperty({ example: 37.6173, description: 'Долгота' })
    lon: number;

    @ApiProperty({ example: 55.8, description: 'Верхняя левая широта ограничивающего прямоугольника' })
    bbox_top_left_lat: number;

    @ApiProperty({ example: 37.5, description: 'Верхняя левая долгота ограничивающего прямоугольника' })
    bbox_top_left_lon: number;

    @ApiProperty({ example: 55.7, description: 'Нижняя правая широта ограничивающего прямоугольника' })
    bbox_bottom_right_lat: number;

    @ApiProperty({ example: 37.7, description: 'Нижняя правая долгота ограничивающего прямоугольника' })
    bbox_bottom_right_lon: number;
}