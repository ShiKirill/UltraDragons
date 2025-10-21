import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class CreateRouteDto {
    @ApiProperty({ example: 1 })
    @IsInt()
    user_id: number;

    @ApiProperty({ example: 42 })
    @IsInt()
    session_id: number;
}
