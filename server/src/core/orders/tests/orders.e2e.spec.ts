import { INestApplication } from '@nestjs/common';
import { getModelToken, SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { BasketProductUserDataModel } from '../../basket/models/basket-product.model';
import { BasketDataModel } from '../../basket/models/basket.model';
import { NotificationDatabaseModel } from '../../notification/notification.model';
import { ProductDatabaseModel } from '../../products/product.model';
import { ProductSizeDatabaseModel } from '../../sizes/models/size-product.model';
import { SizeDatabaseModel } from '../../sizes/models/size.model';
import { User } from '../../users/users.model';
import { OrderDetailsUserDatabaseModel } from '../model/order-details.model';
import { OrderProductUserDataModel } from '../model/order-product.model';
import { OrderDatabaseModel } from '../model/order.model';
import { OrderModule } from '../order.module';
import { OrderService } from '../order.service';

describe('Integration Tests Orders Entity (e2e)', () => {
  let app: INestApplication;

  const mockOrdersService = {
    createOrder: jest.fn(),
    updateStatusOrder: jest.fn(),
    deleteOrder: jest.fn(),
    getAllOrder: jest.fn(),
    getOneOrder: jest.fn(),
    getOneUserOrders: jest.fn(),
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
      imports: [OrderModule],
    })
      .overrideProvider(OrderService)
      .useValue(mockOrdersService)
      .overrideProvider(getModelToken(OrderDatabaseModel))
      .useValue(mockRepository)
      .overrideProvider(getModelToken(OrderProductUserDataModel))
      .useValue(mockRepository)
      .overrideProvider(getModelToken(User))
      .useValue(mockRepository)
      .overrideProvider(getModelToken(ProductDatabaseModel))
      .useValue(mockRepository)
      .overrideProvider(getModelToken(SizeDatabaseModel))
      .useValue(mockRepository)
      .overrideProvider(getModelToken(ProductSizeDatabaseModel))
      .useValue(mockRepository)
      .overrideProvider(getModelToken(BasketProductUserDataModel))
      .useValue(mockRepository)
      .overrideProvider(getModelToken(BasketDataModel))
      .useValue(mockRepository)
      .overrideProvider(getModelToken(OrderDetailsUserDatabaseModel))
      .useValue(mockRepository)
      .overrideProvider(getModelToken(NotificationDatabaseModel))
      .useValue(mockRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('POST: /api/orders/create', () => {
    beforeEach(() => {
      jest.spyOn(mockOrdersService, 'createOrder');
    });

    it('Должен возвращаться статус 201', async () => {
      await request(app.getHttpServer())
        .post('/api/orders/create')
        .send({})
        .expect(201);
    });
    it('Должен возвращаться статус 404', async () => {
      await request(app.getHttpServer())
        .post('/api/order/create')
        .send({})
        .expect(404);
    });
  });

  describe('PUT: /api/orders/update-status/:id', () => {
    beforeEach(() => {
      jest.spyOn(mockOrdersService, 'updateStatusOrder');
    });

    it('Должен возвращаться статус 200', async () => {
      await request(app.getHttpServer())
        .put('/api/orders/update-status/1')
        .send({})
        .expect(200);
    });
    it('Должен возвращаться статус 404', async () => {
      await request(app.getHttpServer())
        .put('/api/order/update-status/1')
        .send({})
        .expect(404);
    });
  });

  describe('DELETE: /api/orders/delete/:id', () => {
    beforeEach(() => {
      jest.spyOn(mockOrdersService, 'deleteOrder');
    });

    it('Должен возвращаться статус 200', async () => {
      await request(app.getHttpServer())
        .delete('/api/orders/delete/1')
        .expect(200);
    });
    it('Должен возвращаться статус 404', async () => {
      await request(app.getHttpServer())
        .delete('/api/order/delete/1')
        .expect(404);
    });
  });
});
