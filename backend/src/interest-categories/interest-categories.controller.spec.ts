import { Test, TestingModule } from '@nestjs/testing';
import { InterestCategoriesController } from './interest-categories.controller';

describe('InterestCategoriesController', () => {
  let controller: InterestCategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InterestCategoriesController],
    }).compile();

    controller = module.get<InterestCategoriesController>(InterestCategoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
