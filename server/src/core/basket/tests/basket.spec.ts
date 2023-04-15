import { forwardRef } from "@nestjs/common";
import { getModelToken, SequelizeModule } from "@nestjs/sequelize";
import { Test, TestingModule } from "@nestjs/testing";
import { AuthModule } from "../../../auth/auth.module";
import { OrderDatabaseModel } from "../../orders/model/order.model";
import { ProductDatabaseModel } from "../../products/product.model";
import { User } from "../../users/users.model";
import { BasketController } from "../basket.controller";
import { BasketService } from "../basket.service";
import { BasketProductUserDataModel } from "../models/basket-product.model";
import { BasketDataModel } from "../models/basket.model";
import { BannedUserModel } from "../../users/users-banned.model";
import { LikeDatabaseModel } from "../../likes/models/likes.model";

describe('BasketControllerTests', () => {
  let controller: BasketController;
  let service: BasketService;

  const mockBasketService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
        controllers: [BasketController],
        providers: [BasketService],
        imports: [
          SequelizeModule.forFeature([
            BasketProductUserDataModel,
            BasketDataModel,
            ProductDatabaseModel, User, OrderDatabaseModel, LikeDatabaseModel
          ]),
          forwardRef(() => AuthModule),
        ],
        exports: [BasketService],
    })
      .overrideProvider(getModelToken(BasketProductUserDataModel))
      .useValue(mockBasketService)
      .overrideProvider(getModelToken(User))
      .useValue(mockBasketService)
      .overrideProvider(getModelToken(BasketDataModel))
      .useValue(mockBasketService)
      .overrideProvider(getModelToken(ProductDatabaseModel))
      .useValue(mockBasketService)
      .overrideProvider(getModelToken(OrderDatabaseModel))
      .useValue(mockBasketService)
      .overrideProvider(getModelToken(BannedUserModel))
      .useValue(mockBasketService)
      .overrideProvider(getModelToken(LikeDatabaseModel))
      .useValue(mockBasketService)
      .compile();

    controller = module.get<BasketController>(BasketController);
    service = module.get<BasketService>(BasketService);
  });

  it('Контроллер корзины покупок должен быть определен', () => {
    expect(controller).toBeDefined();
  });

  it('Сервисы корзины покупок должены быть определены', () => {
    expect(service).toBeDefined();
  });
});
