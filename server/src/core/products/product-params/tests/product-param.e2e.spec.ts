import { INestApplication } from '@nestjs/common';
import { getModelToken, SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { ProductDatabaseModel } from '../../product.model';
import { ProductParamsDatabaseModel } from '../product-params.model';
import { ProductParamsModule } from '../product-params.module';

describe('Integration Tests Product Params Entity (e2e)', () => {
  let app: INestApplication;

  const mockService = {
    createParam: jest.fn(),
    deleteParam: jest.fn(),
    getParam: jest.fn(),
    getAllParams: jest.fn(),
    getAllParamsByProduct: jest.fn(),
    updateParam: jest.fn(),
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
      imports: [ProductParamsModule],
    })
      .overrideProvider(getModelToken(ProductDatabaseModel))
      .useValue(mockRepository)
      .overrideProvider(getModelToken(ProductParamsDatabaseModel))
      .useValue(mockRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('POST: /api/products/params/create', () => {
    beforeEach(() => {
      jest.spyOn(mockService, 'createParam');
    });

    it('Должен возвращаться статус 201', async () => {
      await request(app.getHttpServer())
        .post('/api/products/params/create')
        .send({})
        .expect(201);
    });
    it('Должен возвращаться статус 404', async () => {
      await request(app.getHttpServer())
        .post('/api/products/param/create')
        .send({})
        .expect(404);
    });
  });

  describe('DELETE: /api/products/params/delete/:id', () => {
    beforeEach(() => {
      jest.spyOn(mockService, 'deleteParam');
    });

    it('Должен возвращаться статус 200', async () => {
      await request(app.getHttpServer())
        .delete('/api/products/params/delete/1')
        .expect(200);
    });
    it('Должен возвращаться статус 404', async () => {
      await request(app.getHttpServer())
        .delete('/api/products/param/delete/1')
        .expect(404);
    });
  });

  describe('GET: /api/products/params/get-one/:id', () => {
    beforeEach(() => {
      jest.spyOn(mockService, 'getParam');
    });

    it('Должен возвращаться статус 200', async () => {
      await request(app.getHttpServer())
        .get('/api/products/params/get-one/1')
        .expect(200);
    });
    it('Должен возвращаться статус 404', async () => {
      await request(app.getHttpServer())
        .get('/api/products/param/get-one/1')
        .expect(404);
    });
  });

  describe('GET: /api/products/params/get-all', () => {
    beforeEach(() => {
      jest.spyOn(mockService, 'getAllParams');
    });

    it('Должен возвращаться статус 200', async () => {
      await request(app.getHttpServer())
        .get('/api/products/params/get-all')
        .expect(200);
    });
    it('Должен возвращаться статус 404', async () => {
      await request(app.getHttpServer())
        .get('/api/products/param/get-all')
        .expect(404);
    });
  });

  describe('GET: /api/products/params/get-all-product/:id', () => {
    beforeEach(() => {
      jest.spyOn(mockService, 'getAllParamsByProduct');
    });

    it('Должен возвращаться статус 200', async () => {
      await request(app.getHttpServer())
        .get('/api/products/params/get-all-product/1')
        .expect(200);
    });
    it('Должен возвращаться статус 404', async () => {
      await request(app.getHttpServer())
        .get('/api/products/param/get-all-product/1')
        .expect(404);
    });
  });


  describe('PUT: /api/products/params/update/:id', () => {
    beforeEach(() => {
      jest.spyOn(mockService, 'updateParam');
    });

    it('Должен возвращаться статус 200', async () => {
      await request(app.getHttpServer())
        .put('/api/products/params/update/1')
        .expect(200);
    });
    it('Должен возвращаться статус 404', async () => {
      await request(app.getHttpServer())
        .put('/api/products/param/update/1')
        .expect(404);
    });
  });
});
