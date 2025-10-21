import {
    Injectable,
    NotFoundException,
    ConflictException,
    InternalServerErrorException,
    BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateCityDto } from './dto/create-city.dto';
import { City } from './entities/city.entity';
import { isPostgresError } from 'src/utils/handle-db-error';

@Injectable()
export class CitiesService {
    constructor(
        @InjectRepository(City)
        private citiesRepository: Repository<City>,
        private readonly dataSource: DataSource,
    ) {}

    async create(createCityDto: CreateCityDto): Promise<City> {
        try {
            const city = this.citiesRepository.create(createCityDto);
            return await this.citiesRepository.save(city);
        } catch (error) {
            if (isPostgresError(error)) {
                const { code } = error.driverError;

                if (code === '23505') {
                    throw new ConflictException(
                        `City "${createCityDto.name}" already exists`,
                    );
                }
            }

            throw new InternalServerErrorException('Unexpected database error');
        }
    }

    findAll(): Promise<City[]> {
        return this.citiesRepository.find();
    }

    async findOne(id: number): Promise<City> {
        const city = await this.citiesRepository.findOne({ where: { id } });
        if (!city) throw new NotFoundException(`City with ID ${id} not found`);
        return city;
    }

    async remove(id: number) {
        const result = await this.citiesRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`City with ID ${id} not found`);
        }
        return { message: `City with ID ${id} deleted successfully` };
    }

    bulkCreate(dtos: CreateCityDto[]): Promise<City[]> {
        if (!dtos?.length) {
            throw new BadRequestException('Пустой список городов');
        }

        return this.dataSource.transaction(async (manager) => {
            const repo = manager.getRepository(City);

            const entities = repo.create(dtos);

            try {
                return await repo.save(entities);
            } catch (err) {
                if (err.code === '23505') {
                    throw new BadRequestException(
                        'Найден дубликат (город уже существует)',
                    );
                }
                throw err;
            }
        });
    }
}
