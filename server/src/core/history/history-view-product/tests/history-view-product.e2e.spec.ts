import { INestApplication } from '@nestjs/common';
import { getModelToken, SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { OrderDatabaseModel } from '../../../orders/model/order.model';
import { ProductDatabaseModel } from '../../../products/product.model';
import { User } from '../../../users/users.model';
import { HistoryViewProductsDataModel } from '../history-view-product.model';
import { HistoryViewProductModule } from '../history-view-product.module';
import { HistoryViewProductService } from '../history-view-product.service';
import { BannedUserModel } from '../../../users/users-banned.model';
import { BasketDataModel } from '../../../basket/models/basket.model';
import { LikeDatabaseModel } from '../../../likes/models/likes.model';

describe('Integration Tests History View Product Entity (e2e)', () => {
  let app: INestApplication;

  const mockHistoryViewService = {
    addProductInHistory: jest.fn(),
    getHistoryUser: jest.fn(),

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
      imports: [HistoryViewProductModule],
    })
      .overrideProvider(HistoryViewProductService)
      .useValue(mockHistoryViewService)
      .overrideProvider(getModelToken(HistoryViewProductsDataModel))
      .useValue(mockRepository)
      .overrideProvider(getModelToken(User))
      .useValue(mockRepository)
      .overrideProvider(getModelToken(ProductDatabaseModel))
      .useValue(mockRepository)
      .overrideProvider(getModelToken(OrderDatabaseModel))
      .useValue(mockRepository)
      .overrideProvider(getModelToken(BannedUserModel))
      .useValue(mockRepository)
      .overrideProvider(getModelToken(BasketDataModel))
      .useValue(mockRepository)
      .overrideProvider(getModelToken(LikeDatabaseModel))
      .useValue(mockRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('POST: /api/history-view-product/add', () => {
    beforeEach(() => {
      jest.spyOn(mockHistoryViewService, 'addProductInHistory');
    });

    it('Должен возвращаться статус 201', async () => {
      await request(app.getHttpServer())
        .post('/api/history-view-product/add')
        .send({})
        .expect(201);
    });
    it('Должен возвращаться статус 404', async () => {
      await request(app.getHttpServer())
        .post('/api/historyview-product/add')
        .send({})
        .expect(404);
    });
  });

  describe('GET: /api/history-view-product/get-all', () => {
    beforeEach(() => {
      jest.spyOn(mockHistoryViewService, 'getHistoryUser');
    });

    it('Должен возвращаться статус 200', async () => {
      await request(app.getHttpServer())
        .get('/api/history-view-product/get-all')
        .expect(200);
    });
    it('Должен возвращаться статус 404', async () => {
      await request(app.getHttpServer())
        .get('/api/historyview-product/get-all')
        .expect(404);
    });
  });
});
