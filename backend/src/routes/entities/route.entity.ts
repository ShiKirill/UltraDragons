import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('routes')
export class Route {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number;

    @Column()
    @ApiProperty()
    name: string;

    @Column()
    @ApiProperty()
    city_id: number;

    @Column({ type: 'json' })
    @ApiProperty()
    start_point: { lat: number; lon: number };

    @Column('int', { array: true, default: '{}' })
    @ApiProperty()
    accepted_places_ids: number[];

    @Column('int', { array: true, default: '{}' })
    @ApiProperty()
    skipped_places_ids: number[];
}
