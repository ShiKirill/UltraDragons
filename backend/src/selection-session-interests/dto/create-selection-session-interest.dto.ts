import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class CreateSelectionSessionInterestDto {
    @ApiProperty() @IsInt() session_id: number;
    @ApiProperty() @IsInt() interest_category_id: number;
}