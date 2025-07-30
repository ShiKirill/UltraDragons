import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Picture } from 'src/pictures/entities/picture.entity';

@Entity('users')
export class User {
    @ApiProperty({ example: 1, description: 'ID пользователя' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: 'Иван', description: 'Имя' })
    @Column()
    name: string;

    @ApiProperty({ example: 'ivan@example.com', description: 'Email' })
    @Column({ unique: true })
    email: string;

    @ApiProperty({ example: true, description: 'Подтверждён ли email' })
    @Column({ default: false })
    email_confirmed: boolean;

    @ApiProperty({ example: 1, description: 'Роль (0 — пользователь, 1 — админ)' })
    @Column()
    role: number;

    @ApiProperty({ example: 5, description: 'ID аватара' })
    @Column({ nullable: true })
    avatar_id: number;

    @ManyToOne(() => Picture)
    @JoinColumn({ name: 'avatar_id' })
    avatar: Picture;

    @ApiProperty({ example: '2025-07-30T12:00:00Z', description: 'Дата создания' })
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
}
