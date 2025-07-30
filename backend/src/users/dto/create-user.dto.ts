import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({ example: 'Иван', description: 'Имя пользователя' })
    name: string;

    @ApiProperty({ example: 'ivan@example.com', description: 'Email пользователя' })
    email: string;

    @ApiProperty({ example: true, description: 'Подтверждён ли email' })
    email_confirmed: boolean;

    @ApiProperty({ example: 1, description: 'Роль пользователя' })
    role: number;

    @ApiProperty({ example: 2, description: 'ID аватара (picture_id)' })
    avatar_id: number;
}
