import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateSelectionSessionDto {
  @ApiProperty({ 
    example: true, 
    description: 'Завершена ли сессия',
    required: false
  })
  @IsOptional()
  @IsBoolean()
  is_completed?: boolean;
}