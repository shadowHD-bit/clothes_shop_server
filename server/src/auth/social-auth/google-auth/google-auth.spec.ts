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
import { GoogleAuthService } from './google-auth.service';
import { GoogleAuthController } from './google-auth.controller';
import { SocialGoogleUserDataModel } from './google-auth.model';
import { SocialUserDataModel } from '../vk-auth/vk-auth.model';
import { AuthModule } from '../../auth.module';
import { UsersModule } from '../../../core/users/users.module';
import { LikeModule } from '../../../core/likes/likes.module';
import { LikeDatabaseModel } from '../../../core/likes/models/likes.model';
import { BannedUserModel } from '../../../core/users/users-banned.model';

describe('AuthGoogleTests', () => {
  let controller: GoogleAuthController;
  let service: GoogleAuthService;

  const mockGoogleAuthService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GoogleAuthController],
      providers: [GoogleAuthService],
      imports: [
        SequelizeModule.forFeature([
          User,
          SocialGoogleUserDataModel,
          SocialUserDataModel,
          OrderDatabaseModel,
          LikeDatabaseModel,
          BasketDataModel,
          LikeProductUserDataModel,
          BasketProductUserDataModel, ProductDatabaseModel
        ]),
        forwardRef(() => AuthModule),
        forwardRef(() => UsersModule),
        forwardRef(() => LikeModule),
        forwardRef(() => BasketModule),
      ],
      exports: [GoogleAuthService],
    })
      .overrideProvider(getModelToken(User))
      .useValue(mockGoogleAuthService)
      .overrideProvider(getModelToken(SocialGoogleUserDataModel))
      .useValue(mockGoogleAuthService)
      .overrideProvider(getModelToken(SocialUserDataModel))
      .useValue(mockGoogleAuthService)
      .overrideProvider(getModelToken(OrderDatabaseModel))
      .useValue(mockGoogleAuthService)
      .overrideProvider(getModelToken(LikeDatabaseModel))
      .useValue(mockGoogleAuthService)
      .overrideProvider(getModelToken(BasketDataModel))
      .useValue(mockGoogleAuthService)
      .overrideProvider(getModelToken(LikeProductUserDataModel))
      .useValue(mockGoogleAuthService)
      .overrideProvider(getModelToken(BasketProductUserDataModel))
      .useValue(mockGoogleAuthService)
      .overrideProvider(getModelToken(ProductDatabaseModel))
      .useValue(mockGoogleAuthService)
      .overrideProvider(getModelToken(BannedUserModel))
      .useValue(mockGoogleAuthService)
      .compile();

    controller = module.get<GoogleAuthController>(GoogleAuthController);
    service = module.get<GoogleAuthService>(GoogleAuthService);
  });

  it('Контроллер авторизации через Google должен быть определен', () => {
    expect(controller).toBeDefined();
  });

  it('Сервисы авторизации через Google быть определены', () => {
    expect(service).toBeDefined();
  });
});
