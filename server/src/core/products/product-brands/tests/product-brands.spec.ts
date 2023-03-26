import { forwardRef } from '@nestjs/common';
import { getModelToken, SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { FilesModule } from '../../../../files/files.module';
import { User } from '../../../users/users.model';
import { ProductDatabaseModel } from '../../product.model';
import { ProductBrandController } from '../product brand.controller';
import { ProductBrandDatabaseModel } from '../product-brand.model';
import { ProductBrandsService } from '../product-brand.service';

describe('ProductBrandsTest', () => {
  let controller: ProductBrandController;
  let service: ProductBrandsService;

  const mockProductRepository = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductBrandController],
      providers: [ProductBrandsService],
      imports: [
        SequelizeModule.forFeature([
          ProductDatabaseModel,
          ProductBrandDatabaseModel,
        ]),FilesModule
      ],
      exports: [ProductBrandsService],
    })
      .overrideProvider(getModelToken(ProductDatabaseModel))
      .useValue(mockProductRepository)
      .overrideProvider(getModelToken(ProductBrandDatabaseModel))
      .useValue(mockProductRepository)
      .overrideProvider(getModelToken(User))
      .useValue(mockProductRepository)
      .compile();

    controller = module.get<ProductBrandController>(ProductBrandController);
    service = module.get<ProductBrandsService>(ProductBrandsService);
  });

  it('Контроллер брендов должен быть определен', () => {
    expect(controller).toBeDefined();
  });

  it('Сервисы брендов должены быть определены', () => {
    expect(service).toBeDefined();
  });
});
