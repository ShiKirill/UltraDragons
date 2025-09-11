import { Test, TestingModule } from '@nestjs/testing';
import { PlaceSelectionsService } from './place-selections.service';

describe('PlaceSelectionsService', () => {
    let service: PlaceSelectionsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [PlaceSelectionsService],
        }).compile();

        service = module.get<PlaceSelectionsService>(PlaceSelectionsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
