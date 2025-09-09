import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Route } from './route.entity';
import { Place } from 'src/places/entities/place.entity';

@Entity('route_places')
export class RoutePlace {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column({ name: 'route_id' })
    routeId: number;

    @ApiProperty()
    @Column({ name: 'place_id' })
    placeId: number;

    @ApiProperty({ enum: ['selected', 'skipped'] })
    @Column()
    status: string;

    @ApiProperty()
    @Column({ name: 'visit_order' })
    visitOrder: number;

    @ManyToOne(() => Route, (route) => route.routePlaces, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'route_id' })
    route: Route;

    @ManyToOne(() => Place, { eager: true })
    @JoinColumn({ name: 'place_id' })
    place: Place;
}
