import { Test, TestingModule } from '@nestjs/testing';
import { InterestCategoriesService } from './interest-categories.service';

describe('InterestCategoriesService', () => {
  let service: InterestCategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InterestCategoriesService],
    }).compile();

    service = module.get<InterestCategoriesService>(InterestCategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
