import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';
import { PlaceSelection } from 'src/place-selections/entities/place-selections.entity';
import { Route } from 'src/routes/entities/route.entity';
import { SelectionSessionInterest } from '../../selection-session-interests/entities/selection-session-interests.entity';

@Entity('selection_sessions')
export class SelectionSession {
    @ApiProperty({ example: 1 })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: 1 })
    @Column({ name: 'user_id' })
    userId: number;

    @ApiProperty({ example: '2024-06-09T15:00:00Z' })
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @ApiProperty({ example: false })
    @Column({ default: false })
    is_completed: boolean;

    @ManyToOne(() => User, user => user.selectionSessions)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @OneToMany(() => SelectionSessionInterest, i => i.session, { cascade: true })
    interests: SelectionSessionInterest[];

    @OneToMany(() => PlaceSelection, ps => ps.session, { cascade: true })
    placeSelections: PlaceSelection[];

    @OneToMany(() => Route, route => route.session, { cascade: true })
    routes: Route[];
}