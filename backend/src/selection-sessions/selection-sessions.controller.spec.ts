import { Test, TestingModule } from '@nestjs/testing';
import { SelectionSessionsController } from './selection-sessions.controller';

describe('SelectionSessionsController', () => {
    let controller: SelectionSessionsController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [SelectionSessionsController],
        }).compile();

        controller = module.get<SelectionSessionsController>(
            SelectionSessionsController,
        );
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
