import { OrderDatabaseModel } from '../../orders/model/order.model';
import { forwardRef } from '@nestjs/common';
import { UsersModule } from 'src/core/users/users.module';
import { AuthModule } from 'src/auth/auth.module';
import { SequelizeModule, getModelToken } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { NotificationService } from '../notification.service';
import { NotificationController } from '../notification.controller';
import { NotificationDatabaseModel } from '../notification.model';
import { User } from '../../users/users.model';

describe('NotificationTests', () => {
  let controller: NotificationController;
  let service: NotificationService;

  const mockNotificationService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotificationController],
      providers: [NotificationService],
      imports: [
        SequelizeModule.forFeature([
          User,
          OrderDatabaseModel,
          NotificationDatabaseModel,
        ]),
        forwardRef(() => AuthModule),
        forwardRef(() => UsersModule),
      ],
      exports: [NotificationService],
    })
      .overrideProvider(getModelToken(User))
      .useValue(mockNotificationService)
      .overrideProvider(getModelToken(NotificationDatabaseModel))
      .useValue(mockNotificationService)
      .overrideProvider(getModelToken(OrderDatabaseModel))
      .useValue(mockNotificationService)
      .compile();

    controller = module.get<NotificationController>(NotificationController);
    service = module.get<NotificationService>(NotificationService);
  });

  it('Контроллер рассылки уведомлений должен быть определен', () => {
    expect(controller).toBeDefined();
  });

  it('Сервисы рассылки уведомлений быть определены', () => {
    expect(service).toBeDefined();
  });
});
