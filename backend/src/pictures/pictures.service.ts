import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreatePictureDto } from './dto/create-picture.dto';
import { Picture } from './entities/picture.entity';

@Injectable()
export class PicturesService {
    constructor(
        @InjectRepository(Picture)
        private readonly picturesRepository: Repository<Picture>,
    ) {}

    create(createPictureDto: CreatePictureDto): Promise<Picture> {
        const picture = this.picturesRepository.create(createPictureDto);
        return this.picturesRepository.save(picture);
    }

    findAll(): Promise<Picture[]> {
        return this.picturesRepository.find();
    }

    findOne(id: number): Promise<Picture | null> {
        return this.picturesRepository.findOne({ where: { id } });
    }

    async findManyByIds(ids: number[]): Promise<Picture[]> {
        return this.picturesRepository.find({ where: { id: In(ids) } });
    }

    async remove(id: number): Promise<void> {
        await this.picturesRepository.delete(id);
    }
}
