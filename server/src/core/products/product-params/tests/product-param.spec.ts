import { forwardRef } from '@nestjs/common';
import { getModelToken, SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { FilesModule } from '../../../../files/files.module';
import { User } from '../../../users/users.model';
import { ProductDatabaseModel } from '../../product.model';
import { ProductParamsController } from '../product-params.conroller';
import { ProductParamsDatabaseModel } from '../product-params.model';
import { ProductParamsService } from '../product-params.services';

describe('ProductParamsTest', () => {
  let controller: ProductParamsController;
  let service: ProductParamsService;

  const mockProductRepository = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductParamsController],
      providers: [ProductParamsService],
      imports: [
        SequelizeModule.forFeature([
          ProductDatabaseModel,
          ProductParamsDatabaseModel,
        ]),FilesModule
      ],
      exports: [ProductParamsService],
    })
      .overrideProvider(getModelToken(ProductDatabaseModel))
      .useValue(mockProductRepository)
      .overrideProvider(getModelToken(ProductParamsDatabaseModel))
      .useValue(mockProductRepository)
      .overrideProvider(getModelToken(User))
      .useValue(mockProductRepository)
      .compile();

    controller = module.get<ProductParamsController>(ProductParamsController);
    service = module.get<ProductParamsService>(ProductParamsService);
  });

  it('Контроллер параметров товара должен быть определен', () => {
    expect(controller).toBeDefined();
  });

  it('Сервисы параметров товара должены быть определены', () => {
    expect(service).toBeDefined();
  });
});
