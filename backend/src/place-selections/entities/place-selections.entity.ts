import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { SelectionSession } from 'src/selection-sessions/entities/selection-sessions.entity';
import { Place } from 'src/places/entities/place.entity';

@Entity('place_selections')
export class PlaceSelection {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column({ name: 'session_id' })
    sessionId: number;

    @ApiProperty()
    @Column({ name: 'place_id' })
    placeId: number;

    @ApiProperty({ enum: ['selected', 'skipped'] })
    @Column()
    status: string;

    @ApiProperty()
    @Column()
    sequence: number;

    @ManyToOne(() => SelectionSession, (session) => session.placeSelections, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'session_id' })
    session: SelectionSession;

    @ManyToOne(() => Place, { eager: true })
    @JoinColumn({ name: 'place_id' })
    place: Place;
}
