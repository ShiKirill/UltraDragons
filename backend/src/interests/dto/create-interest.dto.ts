import { ApiProperty } from '@nestjs/swagger';

export class CreateInterestDto {
    @ApiProperty({ example: 1, description: 'ID пользователя' })
    user_id: number;

    @ApiProperty({ example: 5, description: 'ID места' })
    place_id: number;

    @ApiProperty({ example: 'interested', description: 'Статус интереса' })
    status: string;
}
