import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Place } from 'src/places/entities/place.entity';

@Entity('cities')
export class City {
    @ApiProperty({ example: 1 })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: 'Москва' })
    @Column({ unique: true })
    name: string;

    @ApiProperty({ example: 55.7558 })
    @Column('numeric')
    lat: number;

    @ApiProperty({ example: 37.6173 })
    @Column('numeric')
    lon: number;

    @ApiProperty({ example: 55.8, required: false })
    @Column('numeric', { nullable: true })
    bbox_top_left_lat: number;

    @ApiProperty({ example: 37.5, required: false })
    @Column('numeric', { nullable: true })
    bbox_top_left_lon: number;

    @ApiProperty({ example: 55.7, required: false })
    @Column('numeric', { nullable: true })
    bbox_bottom_right_lat: number;

    @ApiProperty({ example: 37.7, required: false })
    @Column('numeric', { nullable: true })
    bbox_bottom_right_lon: number;

    @ApiProperty({ example: 'Europe/Moscow' })
    @Column()
    timezone: string;

    @OneToMany(() => Place, (place) => place.city)
    places: Place[];
}
