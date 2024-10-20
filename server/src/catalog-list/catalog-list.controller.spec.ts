import { Test, TestingModule } from '@nestjs/testing';
import { CatalogListController } from './catalog-list.controller';
import { CatalogListService } from './catalog-list.service';

describe('CatalogListController', () => {
  let controller: CatalogListController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatalogListController],
      providers: [CatalogListService],
    }).compile();

    controller = module.get<CatalogListController>(CatalogListController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
