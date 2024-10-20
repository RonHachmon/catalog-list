import { Test, TestingModule } from '@nestjs/testing';
import { CatalogListService } from './catalog-list.service';

describe('CatalogListService', () => {
  let service: CatalogListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CatalogListService],
    }).compile();

    service = module.get<CatalogListService>(CatalogListService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
