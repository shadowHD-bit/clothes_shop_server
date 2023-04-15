import { OrderDatabaseModel } from './../core/orders/model/order.model';
import { User } from '../core/users/users.model';

import { SequelizeModule, getModelToken } from '@nestjs/sequelize';
import { UsersModule } from '../core/users/users.module';
import { forwardRef } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Test, TestingModule } from '@nestjs/testing';
import { BasketDataModel } from '../core/basket/models/basket.model';
import { LikeDatabaseModel } from '../core/likes/models/likes.model';
import { BannedUserModel } from '../core/users/users-banned.model';

describe('AuthControllerTests', () => {
  let controller: AuthController;
  let service: AuthService;

  const mockAuthService = {};
  const mockJwtService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
      imports: [
        forwardRef(() => UsersModule),
        SequelizeModule.forFeature([
          User, BasketDataModel, LikeDatabaseModel
        ]),
        JwtModule.register({
          secret: process.env.PRIVATE_KEY || 'SECRET_KEY',
          signOptions: {
            expiresIn: '24h'
          }
        })
      ],
      exports: [
        AuthService,
        JwtModule
      ]
    })
      .overrideProvider(getModelToken(User))
      .useValue(mockAuthService)
      .overrideProvider(getModelToken(OrderDatabaseModel))
      .useValue(mockAuthService)
      .overrideProvider(getModelToken(LikeDatabaseModel))
      .useValue(mockAuthService)
      .overrideProvider(getModelToken(BasketDataModel))
      .useValue(mockAuthService)
      .overrideProvider(getModelToken(BannedUserModel))
      .useValue(mockAuthService)
      .overrideProvider(JwtService)
      .useValue(mockJwtService)
      .compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('Контроллер авторизации должен быть определен', () => {
    expect(controller).toBeDefined();
  });

  it('Сервисы авторизации должены быть определены', () => {
    expect(service).toBeDefined();
  });
});
