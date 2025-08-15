import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class RoutePlaceDto {
    @ApiProperty() @IsInt() place_id: number;
    @ApiProperty({ enum: ['selected', 'skipped'] }) status: 'selected' | 'skipped';
    @ApiProperty() @IsInt() visit_order: number;
}

export class CreateRouteDto {
    @ApiProperty() @IsInt() user_id: number;
    @ApiProperty() @IsInt() session_id: number;
    @ApiPropertyOptional() @IsOptional() created_at?: Date;

    @ApiPropertyOptional({ type: [RoutePlaceDto] })
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => RoutePlaceDto)
    route_places?: RoutePlaceDto[];
}
