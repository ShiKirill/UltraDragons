import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { City } from 'src/cities/entities/city.entity';
import { Picture } from 'src/pictures/entities/picture.entity';
import { InterestCategory } from 'src/interest-categories/entities/interest-category.entity';

@Entity('places')
export class Place {
    @ApiProperty({ example: 1 })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: 'Парк Горького' })
    @Column()
    name: string;

    @ApiProperty({ example: 'Лучший парк города' })
    @Column('text')
    description: string;

    @ApiProperty({ example: 'ул. Крымский Вал, 9' })
    @Column()
    address: string;

    @ApiProperty({ example: 'https://...' })
    @Column({ nullable: true })
    website: string;

    @ApiProperty({ example: '@gorkypark' })
    @Column({ nullable: true })
    tg: string;

    @ApiProperty({ example: 'gorkyparkid' })
    @Column({ nullable: true })
    zalo: string;

    @ApiProperty({ example: '08:00:00' })
    @Column({ type: 'time', nullable: true })
    start_time: string;

    @ApiProperty({ example: '22:00:00' })
    @Column({ type: 'time', nullable: true })
    end_time: string;

    @ApiProperty({ example: 55.7522 })
    @Column('numeric', { precision: 9, scale: 6 })
    lat: number;

    @ApiProperty({ example: 37.6156 })
    @Column('numeric', { precision: 9, scale: 6 })
    lon: number;

    @ApiProperty({ example: false })
    @Column({ default: false })
    is_deleted: boolean;

    @ApiProperty({ type: () => City })
    @ManyToOne(() => City, city => city.places, { eager: true })
    @JoinColumn({ name: 'city_id' })
    city: City;

    @ManyToMany(() => Picture)
    @JoinTable({
        name: 'place_pictures',
        joinColumn: { name: 'place_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'picture_id', referencedColumnName: 'id' },
    })
    pictures: Picture[];

    @ManyToMany(() => InterestCategory)
    @JoinTable({
        name: 'place_interest_category',
        joinColumn: { name: 'place_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'interest_category_id', referencedColumnName: 'id' },
    })
    interestCategories: InterestCategory[];
}