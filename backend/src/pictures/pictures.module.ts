import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PicturesController } from './pictures.controller';
import { PicturesService } from './pictures.service';
import { Picture } from './entities/picture.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Picture])],
    controllers: [PicturesController],
    providers: [PicturesService],
    exports: [PicturesService],
})
export class PicturesModule {}
