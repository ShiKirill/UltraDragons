import { Test, TestingModule } from '@nestjs/testing';
import { SelectionSessionsService } from './selection-sessions.service';

describe('SelectionSessionsService', () => {
  let service: SelectionSessionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SelectionSessionsService],
    }).compile();

    service = module.get<SelectionSessionsService>(SelectionSessionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
