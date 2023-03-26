import { forwardRef } from "@nestjs/common";
import { getModelToken, SequelizeModule } from "@nestjs/sequelize";
import { Test, TestingModule } from "@nestjs/testing";
import { AuthModule } from "../../../auth/auth.module";
import { OrderDatabaseModel } from "../../orders/model/order.model";
import { ProductDatabaseModel } from "../../products/product.model";
import { User } from "../../users/users.model";
import { LikeController } from "../likes.controller";
import { LikeService } from "../likes.service";
import { LikeProductUserDataModel } from "../models/like-products.model";
import { LikeDatabaseModel } from "../models/likes.model";

describe('LikesTests', () => {
  let controller: LikeController;
  let service: LikeService;

  const mockLikesService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
        controllers: [LikeController],
        providers: [LikeService],
        imports: [
          SequelizeModule.forFeature([
            LikeDatabaseModel,
            LikeProductUserDataModel,
            ProductDatabaseModel, User, OrderDatabaseModel
          ]),
          forwardRef(() => AuthModule),
        ],
        exports: [LikeService],
    })
      .overrideProvider(getModelToken(LikeProductUserDataModel))
      .useValue(mockLikesService)
      .overrideProvider(getModelToken(User))
      .useValue(mockLikesService)
      .overrideProvider(getModelToken(LikeDatabaseModel))
      .useValue(mockLikesService)
      .overrideProvider(getModelToken(ProductDatabaseModel))
      .useValue(mockLikesService)
      .overrideProvider(getModelToken(OrderDatabaseModel))
      .useValue(mockLikesService)
      .compile();

    controller = module.get<LikeController>(LikeController);
    service = module.get<LikeService>(LikeService);
  });

  it('Контроллер корзины понравившихся товаров должен быть определен', () => {
    expect(controller).toBeDefined();
  });

  it('Сервисы корзины понравившихся товаров должены быть определены', () => {
    expect(service).toBeDefined();
  });
});
