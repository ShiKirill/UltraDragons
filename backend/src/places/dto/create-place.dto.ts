import { ApiProperty } from '@nestjs/swagger';
import {
    IsNotEmpty,
    IsString,
    IsOptional,
    IsNumber,
    IsArray,
    Min,
    Max,
    IsLatitude,
    IsLongitude,
    ValidateNested,
    ArrayMinSize
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePlaceDto {
    @ApiProperty({ example: 'Парк Горького', description: 'Название места' })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({ example: 'Красивый городской парк...', description: 'Описание' })
    @IsNotEmpty()
    @IsString()
    description: string;

    @ApiProperty({ example: 'ул. Крымский Вал, 9', description: 'Адрес' })
    @IsNotEmpty()
    @IsString()
    address: string;

    @ApiProperty({ example: 'https://gorkypark.ru', description: 'Сайт', required: false })
    @IsOptional()
    @IsString()
    website?: string;

    @ApiProperty({ example: '@gorkypark', description: 'Telegram', required: false })
    @IsOptional()
    @IsString()
    tg?: string;

    @ApiProperty({ example: 'gorkypark', description: 'Zalo', required: false })
    @IsOptional()
    @IsString()
    zalo?: string;

    @ApiProperty({ example: '10:00:00', description: 'Время начала работы (HH:mm:ss)', required: false })
    @IsOptional()
    @IsString()
    start_time?: string;

    @ApiProperty({ example: '20:00:00', description: 'Время окончания работы (HH:mm:ss)', required: false })
    @IsOptional()
    @IsString()
    end_time?: string;

    @ApiProperty({ example: 55.7289, description: 'Широта' })
    @IsNumber()
    @IsLatitude()
    lat: number;

    @ApiProperty({ example: 37.6173, description: 'Долгота' })
    @IsNumber()
    @IsLongitude()
    lon: number;

    @ApiProperty({
        example: [1, 2],
        description: 'Список ID категорий интересов',
        required: false
    })
    @IsOptional()
    @IsArray()
    @IsNumber({}, { each: true })
    interest_category_ids?: number[];

    @ApiProperty({
        example: [1, 2],
        description: 'Список ID изображений',
        required: false
    })
    @IsOptional()
    @IsArray()
    @IsNumber({}, { each: true })
    picture_ids?: number[];

    @ApiProperty({ example: 1, description: 'ID города' })
    @IsNotEmpty()
    @IsNumber()
    city_id: number;

    @ApiProperty({ example: false, description: 'Флаг удаления', required: false })
    @IsOptional()
    is_deleted?: boolean;
}