import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Picture } from '../../pictures/entities/picture.entity';
import { Role } from '../enums/role.enum';
import { SelectionSession } from 'src/selection-sessions/entities/selection-sessions.entity';

@Entity('users')
export class User {
    @ApiProperty({ example: 1 })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: 'Иван Иванов' })
    @Column()
    name: string;

    @ApiProperty({ example: 'ivan@example.com' })
    @Column({ unique: true })
    email: string;

    @ApiProperty({ example: true })
    @Column({ default: false })
    email_confirmed: boolean;

    @ApiProperty({
        enum: Role,
        example: Role.User,
        description: 'Роль пользователя (0 - пользователь, 1 - админ)',
    })
    @Column({ type: 'int' })
    role: Role;

    @ApiProperty({ example: 5, nullable: true })
    @Column({ name: 'avatar_id', nullable: true })
    avatarId: number;

    @ApiProperty({ type: () => Picture, required: false, nullable: true })
    @ManyToOne(() => Picture, {
        nullable: true,
        eager: true,
        onDelete: 'SET NULL',
    })
    @JoinColumn({ name: 'avatar_id' })
    avatar: Picture;

    @ApiProperty({ example: '2023-11-22T18:00:00Z' })
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @ApiProperty({ example: false })
    @Column({ default: false })
    is_deleted: boolean;

    @ApiProperty({ type: () => [SelectionSession] })
    @OneToMany(() => SelectionSession, (session) => session.user)
    selectionSessions: SelectionSession[];
}
