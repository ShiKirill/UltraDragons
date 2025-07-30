import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('interests')
export class Interest {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number;

    @Column()
    @ApiProperty()
    user_id: number;

    @Column()
    @ApiProperty()
    place_id: number;

    @Column()
    @ApiProperty()
    status: string;

    @CreateDateColumn()
    @ApiProperty()
    created_at: Date;
}
