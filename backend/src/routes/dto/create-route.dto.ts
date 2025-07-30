import { ApiProperty } from '@nestjs/swagger';

export class CreateRouteDto {
    @ApiProperty({ example: 'Маршрут по центру Москвы' })
    name: string;

    @ApiProperty({ example: 1, description: 'ID города' })
    city_id: number;

    @ApiProperty({ example: { lat: 55.75, lon: 37.6 } })
    start_point: { lat: number; lon: number };

    @ApiProperty({ example: [1, 2, 3], description: 'Принятые места' })
    accepted_places_ids: number[];

    @ApiProperty({ example: [4, 5], description: 'Пропущенные места' })
    skipped_places_ids: number[];
}
