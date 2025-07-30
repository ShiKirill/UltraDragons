import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('pictures')
export class Picture {
    @ApiProperty({ example: 1, description: 'ID изображения' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: 'https://example.com/image.jpg', description: 'URL изображения' })
    @Column()
    url: string;

    @ApiProperty({ example: 'image.jpg', description: 'Имя файла' })
    @Column()
    file_name: string;

    @ApiProperty({ example: 'image/jpeg', description: 'Тип файла' })
    @Column()
    file_type: string;

    @ApiProperty({ example: '2025-07-30T12:00:00Z', description: 'Дата загрузки' })
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
}
