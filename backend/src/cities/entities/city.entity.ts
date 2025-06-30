import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Max, Min } from 'class-validator';

@Entity('cities')
export class City {
  @ApiProperty({ example: 1, description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Москва', description: 'Название города' })
  @Column()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 55.7558, description: 'Широта' })
  @Column('numeric')
  @Min(-90)
  @Max(90)
  lat: number;

  @ApiProperty({ example: 37.6173, description: 'Долгота' })
  @Column('numeric')
  @Min(-90)
  @Max(90)
  lon: number;

  @ApiProperty({ example: 55.8, description: 'Верхняя левая широта ограничивающего прямоугольника' })
  @Column('numeric')
  @Min(-90)
  @Max(90)
  bbox_top_left_lat: number;

  @ApiProperty({ example: 37.5, description: 'Верхняя левая долгота ограничивающего прямоугольника' })
  @Column('numeric')
  @Min(-90)
  @Max(90)
  bbox_top_left_lon: number;

  @ApiProperty({ example: 55.7, description: 'Нижняя правая широта ограничивающего прямоугольника' })
  @Column('numeric')
  @Min(-90)
  @Max(90)
  bbox_bottom_right_lat: number;

  @ApiProperty({ example: 37.7, description: 'Нижняя правая долгота ограничивающего прямоугольника' })
  @Column('numeric')
  @Min(-90)
  @Max(90)
  bbox_bottom_right_lon: number;
}