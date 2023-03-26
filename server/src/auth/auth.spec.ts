import { OrderDatabaseModel } from './../core/orders/model/order.model';
import { User } from '../core/users/users.model';

import { SequelizeModule, getModelToken } from '@nestjs/sequelize';
import { UsersModule } from '../core/users/users.module';
import { forwardRef } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Test, TestingModule } from '@nestjs/testing';

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
          User
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
