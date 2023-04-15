import { INestApplication } from '@nestjs/common';
import { getModelToken, SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { OrderProductUserDataModel } from '../../orders/model/order-product.model';
import { OrderDatabaseModel } from '../../orders/model/order.model';
import { ProductDatabaseModel } from '../../products/product.model';
import { User } from '../../users/users.model';
import { LikeModule } from '../likes.module';
import { LikeService } from '../likes.service';
import { LikeProductUserDataModel } from '../models/like-products.model';
import { LikeDatabaseModel } from '../models/likes.model';
import { BannedUserModel } from '../../users/users-banned.model';
import { BasketDataModel } from '../../basket/models/basket.model';

describe('Integration Tests FAQ Entity (e2e)', () => {
  let app: INestApplication;

  const mockLikesService = {
    createLike: jest.fn(),
    getOneLike: jest.fn(),
    getAllLikes: jest.fn(),
    deleteLikeCart: jest.fn(),
    addProduct: jest.fn(),
    getProductFromBasket: jest.fn(),
    deleteProductFromLike: jest.fn(),
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
      imports: [LikeModule],
    })
      .overrideProvider(LikeService)
      .useValue(mockLikesService)
      .overrideProvider(getModelToken(LikeDatabaseModel))
      .useValue(mockRepository)
      .overrideProvider(getModelToken(LikeProductUserDataModel))
      .useValue(mockRepository)
      .overrideProvider(getModelToken(ProductDatabaseModel))
      .useValue(mockRepository)
      .overrideProvider(getModelToken(User))
      .useValue(mockRepository)
      .overrideProvider(getModelToken(OrderDatabaseModel))
      .useValue(mockRepository)
      .overrideProvider(getModelToken(OrderProductUserDataModel))
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

  describe('POST: /api/like/create', () => {
    beforeEach(() => {
      jest.spyOn(mockLikesService, 'createLike');
    });

    it('Должен возвращаться статус 201', async () => {
      await request(app.getHttpServer())
        .post('/api/like/create')
        .send({})
        .expect(201);
    });
    it('Должен возвращаться статус 404', async () => {
      await request(app.getHttpServer())
        .post('/api/likes/create')
        .send({})
        .expect(404);
    });
  });

  describe('GET: /api/like/get-one/:id', () => {
    beforeEach(() => {
      jest.spyOn(mockLikesService, 'getOneLike');
    });

    it('Должен возвращаться статус 200', async () => {
      await request(app.getHttpServer())
        .get('/api/like/get-one/1')
        .expect(200);
    });
    it('Должен возвращаться статус 404', async () => {
      await request(app.getHttpServer())
        .get('/api/likes/get-one/1')
        .expect(404);
    });
  });

  describe('GET: /api/like/get-all', () => {
    beforeEach(() => {
      jest.spyOn(mockLikesService, 'getAllLikes');
    });

    it('Должен возвращаться статус 200', async () => {
      await request(app.getHttpServer())
        .get('/api/like/get-all')
        .expect(200);
    });
    it('Должен возвращаться статус 404', async () => {
      await request(app.getHttpServer())
        .get('/api/likes/get-all')
        .expect(404);
    });
  });

  describe('DELETE: /api/like/delete/:id', () => {
    beforeEach(() => {
      jest.spyOn(mockLikesService, 'deleteLikeCart');
    });

    it('Должен возвращаться статус 200', async () => {
      await request(app.getHttpServer())
        .delete('/api/like/delete/1')
        .expect(200);
    });
    it('Должен возвращаться статус 404', async () => {
      await request(app.getHttpServer())
        .delete('/api/likes/delete/1')
        .expect(404);
    });
  });


  describe('POST: /api/like/products/add-product/:id', () => {
    beforeEach(() => {
      jest.spyOn(mockLikesService, 'addProduct');
    });

    it('Должен возвращаться статус 201', async () => {
      await request(app.getHttpServer())
        .post('/api/like/products/add-product/1')
        .send({})
        .expect(201);
    });
    it('Должен возвращаться статус 404', async () => {
      await request(app.getHttpServer())
        .post('/api/likes/products/add-product/1')
        .send({})
        .expect(404);
    });
  });

  describe('GET: /api/like/products/get-user-like-product', () => {
    beforeEach(() => {
      jest.spyOn(mockLikesService, 'getProductFromBasket');
    });

    it('Должен возвращаться статус 200', async () => {
      await request(app.getHttpServer())
        .get('/api/like/products/get-user-like-product')
        .expect(200);
    });
    it('Должен возвращаться статус 404', async () => {
      await request(app.getHttpServer())
        .get('/api/likes/products/get-user-like-product')
        .expect(404);
    });
  });

  describe('DELETE: /api/like/products/delete/:id', () => {
    beforeEach(() => {
      jest.spyOn(mockLikesService, 'deleteProductFromLike');
    });

    it('Должен возвращаться статус 200', async () => {
      await request(app.getHttpServer())
        .delete('/api/like/products/delete/1')
        .expect(200);
    });
    it('Должен возвращаться статус 404', async () => {
      await request(app.getHttpServer())
        .delete('/api/likes/products/delete/1')
        .expect(404);
    });
  });
});
