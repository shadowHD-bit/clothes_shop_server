import { VkAuthService } from './vk-auth.service';
import { VkAuthController } from './vk-auth.controller';
import { ProductDatabaseModel } from './../../../core/products/product.model';
import { BasketProductUserDataModel } from './../../../core/basket/models/basket-product.model';
import { LikeProductUserDataModel } from './../../../core/likes/models/like-products.model';
import { BasketDataModel } from './../../../core/basket/models/basket.model';
import { OrderDatabaseModel } from './../../../core/orders/model/order.model';
import { forwardRef } from '@nestjs/common';
import { BasketModule } from 'src/core/basket/basket.module';
import { User } from './../../../core/users/users.model';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule, getModelToken } from '@nestjs/sequelize';
import { SocialUserDataModel } from '../vk-auth/vk-auth.model';
import { AuthModule } from '../../auth.module';
import { UsersModule } from '../../../core/users/users.module';
import { LikeModule } from '../../../core/likes/likes.module';
import { LikeDatabaseModel } from '../../../core/likes/models/likes.model';
import { BannedUserModel } from '../../../core/users/users-banned.model';

describe('AuthGoogleTests', () => {
  let controller: VkAuthController;
  let service: VkAuthService;

  const mockVkAuthService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VkAuthController],
      providers: [VkAuthService],
      imports: [
        SequelizeModule.forFeature([
          User,
          SocialUserDataModel,
          OrderDatabaseModel,
          LikeDatabaseModel,
          BasketDataModel,
          LikeProductUserDataModel,
          BasketProductUserDataModel,
          ProductDatabaseModel,
        ]),
        forwardRef(() => AuthModule),
        forwardRef(() => UsersModule),
        forwardRef(() => LikeModule),
        forwardRef(() => BasketModule),
      ],
      exports: [VkAuthService],
    })
      .overrideProvider(getModelToken(User))
      //   .useValue(mockVkAuthService)
      //   .overrideProvider(getModelToken(SocialGoogleUserDataModel))
      .useValue(mockVkAuthService)
      .overrideProvider(getModelToken(SocialUserDataModel))
      .useValue(mockVkAuthService)
      .overrideProvider(getModelToken(OrderDatabaseModel))
      .useValue(mockVkAuthService)
      .overrideProvider(getModelToken(LikeDatabaseModel))
      .useValue(mockVkAuthService)
      .overrideProvider(getModelToken(BasketDataModel))
      .useValue(mockVkAuthService)
      .overrideProvider(getModelToken(LikeProductUserDataModel))
      .useValue(mockVkAuthService)
      .overrideProvider(getModelToken(BasketProductUserDataModel))
      .useValue(mockVkAuthService)
      .overrideProvider(getModelToken(ProductDatabaseModel))
      .useValue(mockVkAuthService)
      .overrideProvider(getModelToken(BannedUserModel))
      .useValue(mockVkAuthService)
      .compile();

    controller = module.get<VkAuthController>(VkAuthController);
    service = module.get<VkAuthService>(VkAuthService);
  });

  it('Контроллер авторизации через VK должен быть определен', () => {
    expect(controller).toBeDefined();
  });

  it('Сервисы авторизации через VK быть определены', () => {
    expect(service).toBeDefined();
  });
});
