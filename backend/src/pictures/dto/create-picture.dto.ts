import { ApiProperty } from '@nestjs/swagger';

export class CreatePictureDto {
    @ApiProperty({
        example: 'https://example.com/image.jpg',
        description: 'URL изображения',
    })
    url: string;

    @ApiProperty({ example: 'image.jpg', description: 'Имя файла' })
    file_name: string;

    @ApiProperty({ example: 'image/jpeg', description: 'Тип файла' })
    file_type: string;
}
