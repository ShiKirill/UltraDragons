import { Test, TestingModule } from '@nestjs/testing';
import { SelectionSessionInterestsController } from './selection-session-interests.controller';

describe('SelectionSessionInterestsController', () => {
  let controller: SelectionSessionInterestsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SelectionSessionInterestsController],
    }).compile();

    controller = module.get<SelectionSessionInterestsController>(SelectionSessionInterestsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
