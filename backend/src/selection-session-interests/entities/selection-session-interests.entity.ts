import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { SelectionSession } from '../../selection-sessions/entities/selection-sessions.entity';
import { InterestCategory } from 'src/interest-categories/entities/interest-category.entity';

@Entity('selection_session_interests')
export class SelectionSessionInterest {
    @ApiProperty()
    @PrimaryColumn({ name: 'session_id' })
    sessionId: number;

    @ApiProperty()
    @PrimaryColumn({ name: 'interest_category_id' })
    interestCategoryId: number;

    @ManyToOne(() => SelectionSession, session => session.interests, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'session_id' })
    session: SelectionSession;

    @ManyToOne(() => InterestCategory)
    @JoinColumn({ name: 'interest_category_id' })
    interestCategory: InterestCategory;
}