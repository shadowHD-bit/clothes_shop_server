import { forwardRef } from "@nestjs/common";
import { getModelToken, SequelizeModule } from "@nestjs/sequelize";
import { Test, TestingModule } from "@nestjs/testing";
import { AuthModule } from "../../../auth/auth.module";
import { BasketProductUserDataModel } from "../../basket/models/basket-product.model";
import { BasketDataModel } from "../../basket/models/basket.model";
import { NotificationDatabaseModel } from "../../notification/notification.model";
import { NotificationModule } from "../../notification/notification.module";
import { OrderDatabaseModel } from "../../orders/model/order.model";
import { ProductDatabaseModel } from "../../products/product.model";
import { ProductSizeDatabaseModel } from "../../sizes/models/size-product.model";
import { SizeDatabaseModel } from "../../sizes/models/size.model";
import { User } from "../../users/users.model";
import { OrderDetailsUserDatabaseModel } from "../model/order-details.model";
import { OrderProductUserDataModel } from "../model/order-product.model";
import { OrderController } from "../order.controller";
import { OrderService } from "../order.service";

describe('OrdersTest', () => {
  let controller: OrderController;
  let service: OrderService;

  const mockOrdersService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
        controllers: [OrderController],
        providers: [OrderService],
        imports: [
          SequelizeModule.forFeature([
            OrderDatabaseModel,
            OrderProductUserDataModel,
            ProductDatabaseModel, User, BasketDataModel, BasketProductUserDataModel, SizeDatabaseModel, ProductSizeDatabaseModel, OrderDetailsUserDatabaseModel
          ]),
          forwardRef(() => AuthModule),NotificationModule
        ],
        exports: [OrderService],
    })
      .overrideProvider(getModelToken(User))
      .useValue(mockOrdersService)
      .overrideProvider(getModelToken(OrderDatabaseModel))
      .useValue(mockOrdersService)
      .overrideProvider(getModelToken(ProductDatabaseModel))
      .useValue(mockOrdersService)
      .overrideProvider(getModelToken(OrderProductUserDataModel))
      .useValue(mockOrdersService)
      .overrideProvider(getModelToken(BasketDataModel))
      .useValue(mockOrdersService)
      .overrideProvider(getModelToken(BasketProductUserDataModel))
      .useValue(mockOrdersService)
      .overrideProvider(getModelToken(SizeDatabaseModel))
      .useValue(mockOrdersService)
      .overrideProvider(getModelToken(ProductSizeDatabaseModel))
      .useValue(mockOrdersService)
      .overrideProvider(getModelToken(OrderDetailsUserDatabaseModel))
      .useValue(mockOrdersService)
      .overrideProvider(getModelToken(NotificationDatabaseModel))
      .useValue(mockOrdersService)
      .compile();

    controller = module.get<OrderController>(OrderController);
    service = module.get<OrderService>(OrderService);
  });

  it('Контроллер заказов должен быть определен', () => {
    expect(controller).toBeDefined();
  });

  it('Сервисы заказов должены быть определены', () => {
    expect(service).toBeDefined();
  });
});
