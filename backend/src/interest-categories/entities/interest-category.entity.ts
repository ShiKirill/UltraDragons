import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('interest_categories')
export class InterestCategory {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Кофейни' })
  @Column()
  title: string;

  @ApiProperty({ example: 'https://example.com/icon.png' })
  @Column()
  icon_url: string;
}