import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateInterestCategoryDto {
    @ApiProperty({
        example: 'Кофейни',
        description: 'Название категории интересов',
    })
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty({
        example: 'https://example.com/icons/coffee.png',
        description: 'URL иконки категории',
    })
    @IsUrl()
    icon_url: string;
}
