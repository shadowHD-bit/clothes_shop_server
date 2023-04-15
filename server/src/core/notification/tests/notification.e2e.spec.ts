import { INestApplication } from '@nestjs/common';
import { getModelToken, SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { OrderDatabaseModel } from '../../orders/model/order.model';
import { User } from '../../users/users.model';
import { NotificationDatabaseModel } from '../notification.model';
import { NotificationModule } from '../notification.module';
import { NotificationService } from '../notification.service';
import { BannedUserModel } from '../../users/users-banned.model';
import { LikeDatabaseModel } from '../../likes/models/likes.model';
import { BasketDataModel } from '../../basket/models/basket.model';

describe('Integration Tests Notification Entity (e2e)', () => {
  let app: INestApplication;

  const mockNotificationService = {
    createMessageUser: jest.fn(),
    createMessageAllUsers: jest.fn(),
    getMessageByUser: jest.fn(),
    deleteMessage: jest.fn(),
  };

  const mockRepository = {
    findOne: jest.fn().mockResolvedValue({}),
    findAll: jest.fn().mockResolvedValue({}),
    findAndCountAll: jest.fn().mockResolvedValue({}),
    create: jest.fn().mockResolvedValue({}),
    destroy: jest.fn().mockResolvedValue({}),
    update: jest.fn().mockResolvedValue({}),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [NotificationModule],
    })
      .overrideProvider(NotificationService)
      .useValue(mockNotificationService)
      .overrideProvider(getModelToken(NotificationDatabaseModel))
      .useValue(mockRepository)
      .overrideProvider(getModelToken(User))
      .useValue(mockRepository)
      .overrideProvider(getModelToken(OrderDatabaseModel))
      .useValue(mockRepository)
      .overrideProvider(getModelToken(BannedUserModel))
      .useValue(mockRepository)
      .overrideProvider(getModelToken(LikeDatabaseModel))
      .useValue(mockRepository)
      .overrideProvider(getModelToken(BasketDataModel))
      .useValue(mockRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('POST: /api/locations/notification-one', () => {
    beforeEach(() => {
      jest.spyOn(mockNotificationService, 'createMessageUser');
    });

    it('Должен возвращаться статус 201', async () => {
      await request(app.getHttpServer())
        .post('/api/notification/notification-one')
        .send({})
        .expect(201);
    });
    it('Должен возвращаться статус 404', async () => {
      await request(app.getHttpServer())
        .post('/api/notifications/notification-one')
        .send({})
        .expect(404);
    });
  });

  describe('POST: /api/locations/notification-all', () => {
    beforeEach(() => {
      jest.spyOn(mockNotificationService, 'createMessageAllUsers');
    });

    it('Должен возвращаться статус 201', async () => {
      await request(app.getHttpServer())
        .post('/api/notification/notification-all')
        .send({})
        .expect(201);
    });
    it('Должен возвращаться статус 404', async () => {
      await request(app.getHttpServer())
        .post('/api/notifications/notification-all')
        .send({})
        .expect(404);
    });
  });

  describe('GET: /api/notification/:id', () => {
    beforeEach(() => {
      jest.spyOn(mockNotificationService, 'getMessageByUser');
    });

    it('Должен возвращаться статус 200', async () => {
      await request(app.getHttpServer())
        .get('/api/notification/1')
        .expect(200);
    });
    it('Должен возвращаться статус 404', async () => {
      await request(app.getHttpServer())
        .get('/api/notifications/1')
        .expect(404);
    });
  });

  describe('DELETE: /api/notification/:id', () => {
    beforeEach(() => {
      jest.spyOn(mockNotificationService, 'deleteMessage');
    });

    it('Должен возвращаться статус 200', async () => {
      await request(app.getHttpServer())
        .delete('/api/notification/1')
        .expect(200);
    });
    it('Должен возвращаться статус 404', async () => {
      await request(app.getHttpServer())
        .delete('/api/notifications/1')
        .expect(404);
    });
  });
});
