import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('places')
export class Place {
    @ApiProperty({ example: 1, description: 'ID места' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: 'Парк Горького' })
    @Column()
    name: string;

    @ApiProperty({ example: 'Красивый городской парк' })
    @Column('text')
    description: string;

    @ApiProperty({ example: 'ул. Крымский Вал, 9' })
    @Column()
    address: string;

    @ApiProperty({ example: 'https://gorkypark.ru' })
    @Column({ nullable: true })
    website?: string;

    @ApiProperty({ example: '@gorkypark' })
    @Column({ nullable: true })
    tg?: string;

    @ApiProperty({ example: 'gorkypark' })
    @Column({ nullable: true })
    zalo?: string;

    @ApiProperty({ example: '2025-07-30T10:00:00Z' })
    @Column({ type: 'timestamp', nullable: true })
    start_time?: Date;

    @ApiProperty({ example: '2025-07-30T20:00:00Z' })
    @Column({ type: 'timestamp', nullable: true })
    end_time?: Date;

    @ApiProperty({ example: { lat: 55.7, lon: 37.6 } })
    @Column({ type: 'json' })
    coordinates: { lat: number; lon: number };

    @ApiProperty({ example: ['uuid1', 'uuid2'] })
    @Column('text', { array: true, default: '{}' })
    picture_ids: string[];

    @ApiProperty({ example: false })
    @Column({ default: false })
    is_deleted: boolean;

    @ApiProperty({ example: false })
    @Column({ default: false })
    is_favorite: boolean;
}
