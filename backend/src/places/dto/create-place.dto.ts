import { ApiProperty } from '@nestjs/swagger';

export class CreatePlaceDto {
    @ApiProperty({ example: 'Парк Горького', description: 'Название места' })
    name: string;

    @ApiProperty({ example: 'Красивый городской парк...', description: 'Описание' })
    description: string;

    @ApiProperty({ example: 'ул. Крымский Вал, 9', description: 'Адрес' })
    address: string;

    @ApiProperty({ example: 'https://gorkypark.ru', description: 'Сайт' })
    website?: string;

    @ApiProperty({ example: '@gorkypark', description: 'Telegram' })
    tg?: string;

    @ApiProperty({ example: 'gorkypark', description: 'Zalo' })
    zalo?: string;

    @ApiProperty({ example: '2025-07-30T10:00:00Z', description: 'Время начала' })
    start_time?: Date;

    @ApiProperty({ example: '2025-07-30T20:00:00Z', description: 'Время окончания' })
    end_time?: Date;

    @ApiProperty({ example: { lat: 55.7, lon: 37.6 }, description: 'Координаты' })
    coordinates: { lat: number; lon: number };

    @ApiProperty({ example: ['uuid1', 'uuid2'], description: 'Список ID изображений' })
    picture_ids: string[];

    @ApiProperty({ example: false, description: 'Флаг удаления' })
    is_deleted?: boolean;

    @ApiProperty({ example: false, description: 'Флаг избранного' })
    is_favorite?: boolean;
}
