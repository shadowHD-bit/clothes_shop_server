import { MailerModule } from '@nestjs-modules/mailer';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from './../../mail/mail.module';
import { User } from './../../core/users/users.model';
import { ResetPasswordDatabaseModel } from 'src/auth/reset-psw/reset-psw.model';
import { ResetPasswordService } from './reset-psw.service';
import { ResetPasswordController } from './reset-psw.controller';
import { forwardRef } from '@nestjs/common';
import { UsersModule } from 'src/core/users/users.module';
import { SequelizeModule, getModelToken } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { MailService } from '../../mail/mail.service';
import { OrderDatabaseModel } from '../../core/orders/model/order.model';

describe('ResetPasswordTests', () => {
  let controller: ResetPasswordController;
  let service: ResetPasswordService;

  const mockResetPasswordService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResetPasswordController],
      providers: [ResetPasswordService],
      imports: [
        SequelizeModule.forFeature([User, ResetPasswordDatabaseModel]),
        forwardRef(() => UsersModule),
        forwardRef(() => MailModule),
        JwtModule.register({
          secret: process.env.PRIVATE_KEY_RESET_LINK || 'SECRET_KEY',
          signOptions: {
            expiresIn: '15m',
          },
        }),
      ],
      exports: [ResetPasswordService],
    })
      .overrideProvider(getModelToken(User))
      .useValue(mockResetPasswordService)
      .overrideProvider(MailService)
      .useValue(mockResetPasswordService)
      .overrideProvider(getModelToken(ResetPasswordDatabaseModel))
      .useValue(mockResetPasswordService)
      .overrideProvider(getModelToken(OrderDatabaseModel))
      .useValue(mockResetPasswordService)
      .compile();

    controller = module.get<ResetPasswordController>(ResetPasswordController);
    service = module.get<ResetPasswordService>(ResetPasswordService);
  });

  it('Контроллер сброса пароля должен быть определен', () => {
    expect(controller).toBeDefined();
  });

  it('Сервисы сброса пароля быть определены', () => {
    expect(service).toBeDefined();
  });
});
