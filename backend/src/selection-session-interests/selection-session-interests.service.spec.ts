import { Test, TestingModule } from '@nestjs/testing';
import { SelectionSessionInterestsService } from './selection-session-interests.service';

describe('SelectionSessionInterestsService', () => {
  let service: SelectionSessionInterestsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SelectionSessionInterestsService],
    }).compile();

    service = module.get<SelectionSessionInterestsService>(SelectionSessionInterestsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
