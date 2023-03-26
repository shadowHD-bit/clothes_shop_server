import { INestApplication } from '@nestjs/common';
import { getModelToken, SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { Sequelize } from 'sequelize-typescript';
import * as request from 'supertest';
import { OrderProductUserDataModel } from '../../orders/model/order-product.model';
import { OrderDatabaseModel } from '../../orders/model/order.model';
import { ProductDatabaseModel } from '../../products/product.model';
import { User } from '../../users/users.model';
import { BasketModule } from '../basket.module';
import { BasketService } from '../basket.service';
import { BasketProductUserDataModel } from '../models/basket-product.model';
import { BasketDataModel } from '../models/basket.model';

describe('Integration Tests Basket Entity (e2e)', () => {
  let app: INestApplication;

  const mockBasketService = {
    createBasket: jest.fn(),
    getOneBasket: jest.fn(),
    getAllBasket: jest.fn(),
    deleteBasket: jest.fn(),
    addProduct: jest.fn(),
    getProductFromBasket: jest.fn(),
    changeCountProductInBasket: jest.fn(),
    deleteProductFromBasket: jest.fn(),
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
      imports: [BasketModule],
    })
      .overrideProvider(BasketService)
      .useValue(mockBasketService)
      .overrideProvider(getModelToken(BasketProductUserDataModel))
      .useValue(mockRepository)
      .overrideProvider(getModelToken(BasketDataModel))
      .useValue(mockRepository)
      .overrideProvider(getModelToken(ProductDatabaseModel))
      .useValue(mockRepository)
      .overrideProvider(getModelToken(User))
      .useValue(mockRepository)
      .overrideProvider(getModelToken(OrderDatabaseModel))
      .useValue(mockRepository)
      .overrideProvider(getModelToken(OrderProductUserDataModel))
      .useValue(mockRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('POST: /api/basket/create', () => {
    beforeEach(() => {
      jest.spyOn(mockBasketService, 'createBasket');
    });

    it('Должен возвращаться статус 201', async () => {
      await request(app.getHttpServer())
        .post('/api/basket/create')
        .expect(201);
    });
    it('Должен возвращаться статус 404', async () => {
      await request(app.getHttpServer())
        .post('/api/baskets/create')
        .expect(404);
    });
  });

  describe('GET: /api/basket/get-one/:id', () => {
    beforeEach(() => {
      jest.spyOn(mockBasketService, 'getOneBasket');
    });

    it('Должен возвращаться статус 200', async () => {
      await request(app.getHttpServer())
        .get('/api/basket/get-one/1')
        .expect(200);
    });
    it('Должен возвращаться статус 404', async () => {
      await request(app.getHttpServer())
        .get('/api/basket/getone/1')
        .expect(404);
    });
  });

  describe('GET: /api/basket/get-all', () => {
    beforeEach(() => {
      jest.spyOn(mockBasketService, 'getAllBasket');
    });

    it('Должен возвращаться статус 200', async () => {
      await request(app.getHttpServer())
        .get('/api/basket/get-all')
        .expect(200);
    });
    it('Должен возвращаться статус 404', async () => {
      await request(app.getHttpServer())
        .get('/api/basket/getall')
        .expect(404);
    });
  });

  describe('DELETE: /api/basket/delete/:id', () => {
    beforeEach(() => {
      jest.spyOn(mockBasketService, 'deleteBasket');
    });

    it('Должен возвращаться статус 200', async () => {
      await request(app.getHttpServer())
        .delete('/api/basket/delete/1')
        .expect(200);
    });
    it('Должен возвращаться статус 404', async () => {
      await request(app.getHttpServer())
        .delete('/api/basket/deletes/1')
        .expect(404);
    });
  });

  describe('POST: /api/basket/products/add-product', () => {
    beforeEach(() => {
      jest.spyOn(mockBasketService, 'addProduct');
    });

    it('Должен возвращаться статус 201', async () => {
      await request(app.getHttpServer())
        .post('/api/basket/products/add-product')
        .send({})
        .expect(201);
    });
    it('Должен возвращаться статус 404', async () => {
      await request(app.getHttpServer())
        .post('/api/basket/addproduct')
        .expect(404);
    });
  });

  describe('GET: /api/basket/products/get-user-basket-product', () => {
    beforeEach(() => {
      jest.spyOn(mockBasketService, 'getProductFromBasket');
    });

    it('Должен возвращаться статус 200', async () => {
      await request(app.getHttpServer())
        .get('/api/basket/products/get-user-basket-product')
        .expect(200);
    });
    it('Должен возвращаться статус 404', async () => {
      await request(app.getHttpServer())
        .get('/api/basket/getuser-basket-product')
        .expect(404);
    });
  });

  describe('POST: /api/basket/products/change-count', () => {
    beforeEach(() => {
      jest.spyOn(mockBasketService, 'getProductFromBasket');
    });

    it('Должен возвращаться статус 201', async () => {
      await request(app.getHttpServer())
        .post('/api/basket/products/change-count')
        .expect(201);
    });
    it('Должен возвращаться статус 404', async () => {
      await request(app.getHttpServer())
        .post('/api/basket/changecount')
        .expect(404);
    });
  });

  describe('DELETE: /api/basket/products/delete', () => {
    beforeEach(() => {
      jest.spyOn(mockBasketService, 'deleteProductFromBasket');
    });

    it('Должен возвращаться статус 200', async () => {
      await request(app.getHttpServer())
        .delete('/api/basket/products/delete')
        .expect(200);
    });
    it('Должен возвращаться статус 404', async () => {
      await request(app.getHttpServer())
        .delete('/api/basket/deletes')
        .expect(404);
    });
  });
});
