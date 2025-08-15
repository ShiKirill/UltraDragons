import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('pictures')
export class Picture {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column()
    url: string;

    @ApiProperty()
    @Column()
    file_name: string;

    @ApiProperty()
    @Column()
    file_type: string;
}