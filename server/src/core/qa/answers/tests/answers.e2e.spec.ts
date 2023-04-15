import { INestApplication } from '@nestjs/common';
import { getModelToken, SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { NotificationDatabaseModel } from '../../../notification/notification.model';
import { OrderProductUserDataModel } from '../../../orders/model/order-product.model';
import { OrderDatabaseModel } from '../../../orders/model/order.model';
import { ProductDatabaseModel } from '../../../products/product.model';
import { User } from '../../../users/users.model';
import { QuestionDatabaseModel } from '../../questions/question.model';
import { AnswersDatabaseModel } from '../answer.model';
import { AnswerModule } from '../answer.module';
import { BannedUserModel } from '../../../users/users-banned.model';
import { LikeDatabaseModel } from '../../../likes/models/likes.model';
import { BasketDataModel } from '../../../basket/models/basket.model';

describe('Integration Tests Answers Entity (e2e)', () => {
  let app: INestApplication;

  const mockService = {
    createAnswer: jest.fn(),
    getOneAnswer: jest.fn(),
    updateAnswer: jest.fn(),
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
      imports: [AnswerModule],
    })
    .overrideProvider(getModelToken(AnswersDatabaseModel))
    .useValue(mockRepository)
    .overrideProvider(getModelToken(QuestionDatabaseModel))
    .useValue(mockRepository)
    .overrideProvider(getModelToken(NotificationDatabaseModel))
    .useValue(mockRepository)
    .overrideProvider(getModelToken(OrderDatabaseModel))
    .useValue(mockRepository)
    .overrideProvider(getModelToken(OrderProductUserDataModel))
    .useValue(mockRepository)
    .overrideProvider(getModelToken(ProductDatabaseModel))
    .useValue(mockRepository)
    .overrideProvider(getModelToken(User))
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

  describe('POST: /api/answers/create', () => {
    beforeEach(() => {
      jest.spyOn(mockService, 'createAnswer');
    });

    it('Должен возвращаться статус 500 (не данных)', async () => {
      await request(app.getHttpServer())
        .post('/api/answers/create')
        .send({})
        .expect(500);
    });
    it('Должен возвращаться статус 404', async () => {
      await request(app.getHttpServer())
        .post('/api/answer/create')
        .send({})
        .expect(404);
    });
  });

  describe('GET: /api/answers/get-one/:id', () => {
    beforeEach(() => {
      jest.spyOn(mockService, 'getOneAnswer');
    });

    it('Должен возвращаться статус 200', async () => {
      await request(app.getHttpServer())
        .get('/api/answers/get-one/1')
        .expect(200);
    });
    it('Должен возвращаться статус 404', async () => {
      await request(app.getHttpServer())
        .get('/api/answer/get-one/1')
        .expect(404);
    });
  });

  describe('PUT: /api/answers/update/:id', () => {
    beforeEach(() => {
      jest.spyOn(mockService, 'updateAnswer');
    });

    it('Должен возвращаться статус 200', async () => {
      await request(app.getHttpServer())
        .put('/api/answers/update/1')
        .expect(200);
    });
    it('Должен возвращаться статус 404', async () => {
      await request(app.getHttpServer())
        .put('/api/answer/update/1')
        .expect(404);
    });
  });
});
