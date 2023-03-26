import { forwardRef } from '@nestjs/common';
import { getModelToken, SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { FilesModule } from '../../../files/files.module';
import { ProductDatabaseModel } from '../../products/product.model';
import { ReviewDatabaseModel } from '../../reviews/review.model';
import { ProductSizeDatabaseModel } from '../../sizes/models/size-product.model';
import { SizeDatabaseModel } from '../../sizes/models/size.model';
import { SizeModule } from '../../sizes/size.module';
import { User } from '../../users/users.model';
import { ProductBadgeDatabaseModel } from '../product-badges/product-badge.model';
import { ProductBrandDatabaseModel } from '../product-brands/product-brand.model';
import { ProductParamsDatabaseModel } from '../product-params/product-params.model';
import { ProductParamsModule } from '../product-params/product-params.module';
import { ProductTypeDatabaseModel } from '../product-types/product-type.model';
import { ProductsController } from '../product.controller';
import { ProductsService } from '../product.service';

describe('ProductTest', () => {
  let controller: ProductsController;
  let service: ProductsService;

  const mockProductRepository = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [ProductsService],
      imports: [
        SequelizeModule.forFeature([
          ProductSizeDatabaseModel,
          ProductDatabaseModel,
          ProductParamsDatabaseModel,
          ProductTypeDatabaseModel,
          ProductBadgeDatabaseModel,
          ProductBrandDatabaseModel,
          ReviewDatabaseModel,
        ]),
        ProductParamsModule,
        FilesModule,
        SizeModule,
      ],
      exports: [ProductsService],
    })
      .overrideProvider(getModelToken(ProductBrandDatabaseModel))
      .useValue(mockProductRepository)
      .overrideProvider(getModelToken(ProductSizeDatabaseModel))
      .useValue(mockProductRepository)
      .overrideProvider(getModelToken(ProductDatabaseModel))
      .useValue(mockProductRepository)
      .overrideProvider(getModelToken(ProductParamsDatabaseModel))
      .useValue(mockProductRepository)
      .overrideProvider(getModelToken(ProductTypeDatabaseModel))
      .useValue(mockProductRepository)
      .overrideProvider(getModelToken(ProductBadgeDatabaseModel))
      .useValue(mockProductRepository)
      .overrideProvider(getModelToken(ReviewDatabaseModel))
      .useValue(mockProductRepository)
      .overrideProvider(getModelToken(SizeDatabaseModel))
      .useValue(mockProductRepository)
      .overrideProvider(getModelToken(ProductSizeDatabaseModel))
      .useValue(mockProductRepository)
      .overrideProvider(getModelToken(User))
      .useValue(mockProductRepository)
      .compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  it('Контроллер товаров должен быть определен', () => {
    expect(controller).toBeDefined();
  });

  it('Сервисы товаров должены быть определены', () => {
    expect(service).toBeDefined();
  });
});
