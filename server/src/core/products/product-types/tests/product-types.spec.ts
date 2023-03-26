import { forwardRef } from '@nestjs/common';
import { getModelToken, SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { FilesModule } from '../../../../files/files.module';
import { User } from '../../../users/users.model';
import { ProductDatabaseModel } from '../../product.model';
import { ProductTypeController } from '../product-type.controller';
import { ProductTypeDatabaseModel } from '../product-type.model';
import { ProductTypesService } from '../product-type.service';


describe('ProductTypesTest', () => {
  let controller: ProductTypeController;
  let service: ProductTypesService;

  const mockProductRepository = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductTypeController],
      providers: [ProductTypesService],
      imports: [
        SequelizeModule.forFeature([
          ProductDatabaseModel,
          ProductTypeDatabaseModel,
        ]),FilesModule
      ],
      exports: [ProductTypesService],
    })
      .overrideProvider(getModelToken(ProductDatabaseModel))
      .useValue(mockProductRepository)
      .overrideProvider(getModelToken(ProductTypeDatabaseModel))
      .useValue(mockProductRepository)
      .overrideProvider(getModelToken(User))
      .useValue(mockProductRepository)
      .compile();

    controller = module.get<ProductTypeController>(ProductTypeController);
    service = module.get<ProductTypesService>(ProductTypesService);
  });

  it('Контроллер типов должен быть определен', () => {
    expect(controller).toBeDefined();
  });

  it('Сервисы типов должены быть определены', () => {
    expect(service).toBeDefined();
  });
});
