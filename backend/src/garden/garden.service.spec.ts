import { Test, TestingModule } from '@nestjs/testing';
import { GardenService } from './garden.service';

describe('GardenService', () => {
  let service: GardenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GardenService],
    }).compile();

    service = module.get<GardenService>(GardenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
