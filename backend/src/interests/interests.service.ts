import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Interest } from './entities/interest.entity';
import { CreateInterestDto } from './dto/create-interest.dto';

@Injectable()
export class InterestsService {
  constructor(
    @InjectRepository(Interest)
    private interestRepository: Repository<Interest>,
  ) {}

  create(createInterestDto: CreateInterestDto): Promise<Interest> {
    const interest = this.interestRepository.create(createInterestDto);
    return this.interestRepository.save(interest);
  }

  findAll(): Promise<Interest[]> {
    return this.interestRepository.find();
  }

  findOne(id: number): Promise<Interest | null> {
    return this.interestRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.interestRepository.delete(id);
  }
}
