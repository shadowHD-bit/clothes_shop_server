import { forwardRef } from '@nestjs/common';
import { SequelizeModule, getModelToken } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthModule } from '../../../../auth/auth.module';
import { OrderDatabaseModel } from '../../../orders/model/order.model';
import { ProductDatabaseModel } from '../../../products/product.model';
import { User } from '../../../users/users.model';
import { HistoryViewProductController } from '../history-view-product.controller';
import { HistoryViewProductsDataModel } from '../history-view-product.model';
import { HistoryViewProductService } from '../history-view-product.service';
import { LikeDatabaseModel } from '../../../likes/models/likes.model';
import { BasketDataModel } from '../../../basket/models/basket.model';
import { BannedUserModel } from '../../../users/users-banned.model';
import { ProductBadgeDatabaseModel } from '../../../products/product-badges/product-badge.model';
import { ProductBrandDatabaseModel } from '../../../products/product-brands/product-brand.model';
import { ProductTypeDatabaseModel } from '../../../products/product-types/product-type.model';

describe('HistoryProductControllerTests', () => {
  let controller: HistoryViewProductController;
  let service: HistoryViewProductService;

  const mockService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HistoryViewProductController],
      providers: [HistoryViewProductService],
      imports: [
        SequelizeModule.forFeature([
          HistoryViewProductsDataModel,
          User,
          ProductDatabaseModel,
          OrderDatabaseModel,
          LikeDatabaseModel,
          BasketDataModel,
          ProductBadgeDatabaseModel,
          ProductBrandDatabaseModel,
          ProductTypeDatabaseModel,
        ]),
        forwardRef(() => AuthModule),
      ],
      exports: [HistoryViewProductService],
    })
      .overrideProvider(getModelToken(HistoryViewProductsDataModel))
      .useValue(mockService)
      .overrideProvider(getModelToken(User))
      .useValue(mockService)
      .overrideProvider(getModelToken(ProductDatabaseModel))
      .useValue(mockService)
      .overrideProvider(getModelToken(OrderDatabaseModel))
      .useValue(mockService)
      .overrideProvider(getModelToken(LikeDatabaseModel))
      .useValue(mockService)
      .overrideProvider(getModelToken(BasketDataModel))
      .useValue(mockService)
      .overrideProvider(getModelToken(BannedUserModel))
      .useValue(mockService)
      .overrideProvider(getModelToken(ProductBadgeDatabaseModel))
      .useValue(mockService)
      .overrideProvider(getModelToken(ProductBrandDatabaseModel))
      .useValue(mockService)
      .overrideProvider(getModelToken(ProductTypeDatabaseModel))
      .useValue(mockService)
      .compile();

    controller = module.get<HistoryViewProductController>(
      HistoryViewProductController,
    );
    service = module.get<HistoryViewProductService>(HistoryViewProductService);
  });

  it('Контроллер сущности истории просмотров должен быть определен', () => {
    expect(controller).toBeDefined();
  });

  it('Сервисы сущности истории просмотров должены быть определены', () => {
    expect(service).toBeDefined();
  });
});
