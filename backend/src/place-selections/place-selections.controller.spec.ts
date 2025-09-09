import { Test, TestingModule } from '@nestjs/testing';
import { PlaceSelectionsController } from './place-selections.controller';

describe('PlaceSelectionController', () => {
    let controller: PlaceSelectionsController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [PlaceSelectionsController],
        }).compile();

        controller = module.get<PlaceSelectionsController>(
            PlaceSelectionsController,
        );
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
