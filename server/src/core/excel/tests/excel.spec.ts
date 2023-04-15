import { SequelizeModule, getModelToken } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { OrderProductUserDataModel } from '../../orders/model/order-product.model';
import { OrderDatabaseModel } from '../../orders/model/order.model';
import { ProductBrandDatabaseModel } from '../../products/product-brands/product-brand.model';
import { ProductTypeDatabaseModel } from '../../products/product-types/product-type.model';
import { ProductDatabaseModel } from '../../products/product.model';
import { User } from '../../users/users.model';
import { ExcelController } from '../excel.controller';
import { ExcelService } from '../excel.service';
import { SizeDatabaseModel } from '../../sizes/models/size.model';
import { ProductSizeDatabaseModel } from '../../sizes/models/size-product.model';
import { BannedUserModel } from '../../users/users-banned.model';

describe('ExcelControllerTests', () => {
  let controller: ExcelController;
  let service: ExcelService;

  const mockService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExcelController],
      providers: [ExcelService],
      imports: [
        SequelizeModule.forFeature([
          ProductDatabaseModel,
          ProductTypeDatabaseModel,
          ProductBrandDatabaseModel,
          OrderProductUserDataModel,
          User,
          OrderDatabaseModel,
          SizeDatabaseModel,
          ProductSizeDatabaseModel
        ]),
      ],
      exports: [ExcelService],
    })
      .overrideProvider(getModelToken(ProductDatabaseModel))
      .useValue(mockService)
      .overrideProvider(getModelToken(ProductTypeDatabaseModel))
      .useValue(mockService)
      .overrideProvider(getModelToken(ProductBrandDatabaseModel))
      .useValue(mockService)
      .overrideProvider(getModelToken(OrderProductUserDataModel))
      .useValue(mockService)
      .overrideProvider(getModelToken(User))
      .useValue(mockService)
      .overrideProvider(getModelToken(OrderDatabaseModel))
      .useValue(mockService)
      .overrideProvider(getModelToken(SizeDatabaseModel))
      .useValue(mockService)
      .overrideProvider(getModelToken(ProductSizeDatabaseModel))
      .useValue(mockService)
      .overrideProvider(getModelToken(BannedUserModel))
      .useValue(mockService)
      .compile();

    controller = module.get<ExcelController>(ExcelController);
    service = module.get<ExcelService>(ExcelService);
  });

  it('Контроллер работы с эксель документом должен быть определен', () => {
    expect(controller).toBeDefined();
  });

  it('Сервисы работы с эксель документом должены быть определены', () => {
    expect(service).toBeDefined();
  });
});
