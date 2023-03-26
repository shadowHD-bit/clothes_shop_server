import { forwardRef } from '@nestjs/common';
import { getModelToken, SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../../../users/users.model';
import { ProductDatabaseModel } from '../../product.model';
import { ProductBadgeController } from '../product-badge.controller';
import { ProductBadgeDatabaseModel } from '../product-badge.model';
import { ProductBadgeService } from '../product-badge.service';


describe('ProductBadgeTest', () => {
  let controller: ProductBadgeController;
  let service: ProductBadgeService;

  const mockProductRepository = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductBadgeController],
      providers: [ProductBadgeService],
      imports: [
        SequelizeModule.forFeature([
          ProductDatabaseModel,
          ProductBadgeDatabaseModel,
        ]),
      ],
      exports: [ProductBadgeService],
    })
      .overrideProvider(getModelToken(ProductDatabaseModel))
      .useValue(mockProductRepository)
      .overrideProvider(getModelToken(ProductBadgeDatabaseModel))
      .useValue(mockProductRepository)
      .overrideProvider(getModelToken(User))
      .useValue(mockProductRepository)
      .compile();

    controller = module.get<ProductBadgeController>(ProductBadgeController);
    service = module.get<ProductBadgeService>(ProductBadgeService);
  });

  it('Контроллер баджей должен быть определен', () => {
    expect(controller).toBeDefined();
  });

  it('Сервисы баджей должены быть определены', () => {
    expect(service).toBeDefined();
  });
});
