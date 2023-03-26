import { INestApplication } from '@nestjs/common';
import { getModelToken, SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { ProductDatabaseModel } from '../../product.model';
import { ProductBrandDatabaseModel } from '../product-brand.model';
import { ProductBrandsModule } from '../product-brand.module';


describe('Integration Tests Product Brands Entity (e2e)', () => {
  let app: INestApplication;

  const mockService = {
    createBrand: jest.fn(),
    deleteBrand: jest.fn(),
    getBrand: jest.fn(),
    getAllBrands: jest.fn(),
    updateBrand: jest.fn(),
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
      imports: [ProductBrandsModule],
    })
      .overrideProvider(getModelToken(ProductDatabaseModel))
      .useValue(mockRepository)
      .overrideProvider(getModelToken(ProductBrandDatabaseModel))
      .useValue(mockRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('POST: /api/brands/create', () => {
    beforeEach(() => {
      jest.spyOn(mockService, 'createBrand');
    });

    it('Должен возвращаться статус 400 (нет изображения)', async () => {
      await request(app.getHttpServer())
        .post('/api/brands/create')
        .send({})
        .expect(400);
    });
    it('Должен возвращаться статус 404', async () => {
      await request(app.getHttpServer())
        .post('/api/brand/create')
        .send({})
        .expect(404);
    });
  });

  describe('DELETE: /api/brands/delete/:id', () => {
    beforeEach(() => {
      jest.spyOn(mockService, 'deleteBrand');
    });

    it('Должен возвращаться статус 400 (нет изображения)', async () => {
      await request(app.getHttpServer())
        .delete('/api/brands/delete/1')
        .expect(400);
    });
    it('Должен возвращаться статус 404', async () => {
      await request(app.getHttpServer())
        .delete('/api/brand/delete/1')
        .expect(404);
    });
  });

  describe('GET: /api/brands/get-one/:id', () => {
    beforeEach(() => {
      jest.spyOn(mockService, 'getBrand');
    });

    it('Должен возвращаться статус 200', async () => {
      await request(app.getHttpServer())
        .get('/api/brands/get-one/1')
        .expect(200);
    });
    it('Должен возвращаться статус 404', async () => {
      await request(app.getHttpServer())
        .get('/api/brand/get-one/1')
        .expect(404);
    });
  });

  describe('GET: /api/brands/get-all', () => {
    beforeEach(() => {
      jest.spyOn(mockService, 'getAllBrands');
    });

    it('Должен возвращаться статус 200', async () => {
      await request(app.getHttpServer())
        .get('/api/brands/get-all')
        .expect(200);
    });
    it('Должен возвращаться статус 404', async () => {
      await request(app.getHttpServer())
        .get('/api/brand/get-all')
        .expect(404);
    });
  });

  describe('PUT: /api/brands/update/:id', () => {
    beforeEach(() => {
      jest.spyOn(mockService, 'updateBrand');
    });

    it('Должен возвращаться статус 200', async () => {
      await request(app.getHttpServer())
        .put('/api/brands/update/1')
        .expect(200);
    });
    it('Должен возвращаться статус 404', async () => {
      await request(app.getHttpServer())
        .put('/api/brand/update/1')
        .expect(404);
    });
  });
});
