import { INestApplication } from '@nestjs/common';
import { getModelToken, SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { ProductDatabaseModel } from '../../products/product.model';
import { ReviewDatabaseModel } from '../../reviews/review.model';
import { ProductSizeDatabaseModel } from '../../sizes/models/size-product.model';
import { SizeDatabaseModel } from '../../sizes/models/size.model';
import { User } from '../../users/users.model';
import { ProductBadgeDatabaseModel } from '../product-badges/product-badge.model';
import { ProductBrandDatabaseModel } from '../product-brands/product-brand.model';
import { ProductParamsDatabaseModel } from '../product-params/product-params.model';
import { ProductTypeDatabaseModel } from '../product-types/product-type.model';
import { ProductsModule } from '../product.module';


describe('Integration Tests Products Entity (e2e)', () => {
  let app: INestApplication;

  const mockProductService = {
    createProduct: jest.fn(),
    createMoreProducts: jest.fn(),
    updateProduct: jest.fn(),
    updateDisplayProduct: jest.fn(),
    deleteProduct: jest.fn(),
    getProduct: jest.fn(),
    getAllProducts: jest.fn(),
    searchAllProductByName: jest.fn(),
    getProductForAdmin: jest.fn(),
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
      imports: [ProductsModule],
    })
    .overrideProvider(getModelToken(ProductBrandDatabaseModel))
    .useValue(mockRepository)
    .overrideProvider(getModelToken(ProductSizeDatabaseModel))
    .useValue(mockRepository)
    .overrideProvider(getModelToken(ProductDatabaseModel))
    .useValue(mockRepository)
    .overrideProvider(getModelToken(ProductParamsDatabaseModel))
    .useValue(mockRepository)
    .overrideProvider(getModelToken(ProductTypeDatabaseModel))
    .useValue(mockRepository)
    .overrideProvider(getModelToken(ProductBadgeDatabaseModel))
    .useValue(mockRepository)
    .overrideProvider(getModelToken(ReviewDatabaseModel))
    .useValue(mockRepository)
    .overrideProvider(getModelToken(SizeDatabaseModel))
    .useValue(mockRepository)
    .overrideProvider(getModelToken(ProductSizeDatabaseModel))
    .useValue(mockRepository)
    .overrideProvider(getModelToken(User))
    .useValue(mockRepository)
    .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('POST: /api/products/create', () => {
    beforeEach(() => {
      jest.spyOn(mockProductService, 'createProduct');
    });

    it('Должен возвращаться статус 500 (Не заданы параметры)', async () => {
      await request(app.getHttpServer())
        .post('/api/products/create')
        .send({})
        .expect(500);
    });
    it('Должен возвращаться статус 404', async () => {
      await request(app.getHttpServer())
        .post('/api/product/create')
        .send({})
        .expect(404);
    });
  });

  describe('POST: /api/products/create/more-product', () => {
    beforeEach(() => {
      jest.spyOn(mockProductService, 'createMoreProducts');
    });

    it('Должен возвращаться статус 500 (Не заданы параметры)', async () => {
      await request(app.getHttpServer())
        .post('/api/products/create/more-product')
        .send({})
        .expect(500);
    });
    it('Должен возвращаться статус 404', async () => {
      await request(app.getHttpServer())
        .post('/api/product/create/more-product')
        .send({})
        .expect(404);
    });
  });

  describe('PUT: /api/products/update/:id', () => {
    beforeEach(() => {
      jest.spyOn(mockProductService, 'updateProduct');
    });

    it('Должен возвращаться статус 200', async () => {
      await request(app.getHttpServer())
        .put('/api/products/update/1')
        .expect(200);
    });
    it('Должен возвращаться статус 404', async () => {
      await request(app.getHttpServer())
        .put('/api/product/update/1')
        .expect(404);
    });
  });

  describe('PUT: /api/products/update-display', () => {
    beforeEach(() => {
      jest.spyOn(mockProductService, 'updateDisplayProduct');
    });

    it('Должен возвращаться статус 200', async () => {
      await request(app.getHttpServer())
        .put('/api/products/update-display')
        .expect(200);
    });
    it('Должен возвращаться статус 404', async () => {
      await request(app.getHttpServer())
        .put('/api/product/update-display')
        .expect(404);
    });
  });

  describe('DELETE: /api/products/delete/:id', () => {
    beforeEach(() => {
      jest.spyOn(mockProductService, 'updateDisplayProduct');
    });

    it('Должен возвращаться статус 200', async () => {
      await request(app.getHttpServer())
        .delete('/api/products/delete/1')
        .expect(200);
    });
    it('Должен возвращаться статус 404', async () => {
      await request(app.getHttpServer())
        .delete('/api/product/delete/1')
        .expect(404);
    });
  });

  describe('GET: /api/products/get-one/:id', () => {
    beforeEach(() => {
      jest.spyOn(mockProductService, 'getProduct');
    });

    it('Должен возвращаться статус 200', async () => {
      await request(app.getHttpServer())
        .get('/api/products/get-one/1')
        .expect(200);
    });
    it('Должен возвращаться статус 404', async () => {
      await request(app.getHttpServer())
        .get('/api/product/get-one/1')
        .expect(404);
    });
  });

  describe('GET: /api/products/get-all', () => {
    beforeEach(() => {
      jest.spyOn(mockProductService, 'getAllProducts');
    });

    it('Должен возвращаться статус 200', async () => {
      await request(app.getHttpServer())
        .get('/api/products/get-all')
        .expect(200);
    });
    it('Должен возвращаться статус 404', async () => {
      await request(app.getHttpServer())
        .get('/api/product/get-all')
        .expect(404);
    });
  });

  describe('GET: /api/products/search-by-name/:name', () => {
    beforeEach(() => {
      jest.spyOn(mockProductService, 'searchAllProductByName');
    });

    it('Должен возвращаться статус 200', async () => {
      await request(app.getHttpServer())
        .get('/api/products/search-by-name/test')
        .expect(200);
    });
    it('Должен возвращаться статус 404', async () => {
      await request(app.getHttpServer())
        .get('/api/product/search-by-name/test')
        .expect(404);
    });
  });

  describe('GET: /api/products/for-admin/get-all', () => {
    beforeEach(() => {
      jest.spyOn(mockProductService, 'getProductForAdmin');
    });

    it('Должен возвращаться статус 200', async () => {
      await request(app.getHttpServer())
        .get('/api/products/for-admin/get-all')
        .expect(200);
    });
    it('Должен возвращаться статус 404', async () => {
      await request(app.getHttpServer())
        .get('/api/product/for-admin/get-all')
        .expect(404);
    });
  });
});
