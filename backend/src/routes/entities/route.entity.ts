import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { RoutePlace } from './route-place.entity';
import { SelectionSession } from 'src/selection-sessions/entities/selection-sessions.entity';
import { User } from 'src/users/entities/user.entity';

@Entity('routes')
export class Route {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column({ name: 'session_id' })
    sessionId: number;

    @ApiProperty()
    @Column({ name: 'user_id' })
    userId: number;

    @ApiProperty()
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @ManyToOne(() => SelectionSession, (session) => session.routes, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'session_id' })
    session: SelectionSession;

    @ManyToOne(() => User, (user) => user.id)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @OneToMany(() => RoutePlace, (rp) => rp.route, { cascade: true })
    routePlaces: RoutePlace[];
}
