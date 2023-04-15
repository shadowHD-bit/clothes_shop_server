import { INestApplication } from '@nestjs/common';
import { getModelToken, SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { OrderProductUserDataModel } from '../../orders/model/order-product.model';
import { OrderDatabaseModel } from '../../orders/model/order.model';
import { ProductBrandDatabaseModel } from '../../products/product-brands/product-brand.model';
import { ProductTypeDatabaseModel } from '../../products/product-types/product-type.model';
import { ProductDatabaseModel } from '../../products/product.model';
import { User } from '../../users/users.model';
import { ExcelModule } from '../excel.module';
import { ExcelService } from '../excel.service';
import { ProductSizeDatabaseModel } from '../../sizes/models/size-product.model';
import { SizeDatabaseModel } from '../../sizes/models/size.model';

describe('Integration Tests Excel Entity (e2e)', () => {
  let app: INestApplication;

  const mockCouponsService = {
    getUsersToExcel: jest.fn(),
    getTypeToExcel: jest.fn(),
    getBrandToExcel: jest.fn(),
    getProductToExcel: jest.fn(),
    getOrderToExcel: jest.fn(),
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
      imports: [ExcelModule],
    })
      .overrideProvider(ExcelService)
      .useValue(mockCouponsService)
      .overrideProvider(getModelToken(User))
      .useValue(mockRepository)
      .overrideProvider(getModelToken(ProductDatabaseModel))
      .useValue(mockRepository)
      .overrideProvider(getModelToken(OrderDatabaseModel))
      .useValue(mockRepository)
      .overrideProvider(getModelToken(ProductTypeDatabaseModel))
      .useValue(mockRepository)
      .overrideProvider(getModelToken(OrderProductUserDataModel))
      .useValue(mockRepository)
      .overrideProvider(getModelToken(ProductBrandDatabaseModel))
      .useValue(mockRepository)
      .overrideProvider(getModelToken(ProductSizeDatabaseModel))
      .useValue(mockRepository)
      .overrideProvider(getModelToken(SizeDatabaseModel))
      .useValue(mockRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GET: /api/document/excel/get-user', () => {
    beforeEach(() => {
      jest.spyOn(mockCouponsService, 'getUsersToExcel');
    });

    it('Должен возвращаться статус 200', async () => {
      await request(app.getHttpServer())
        .get('/api/document/excel/get-user')
        .expect(200);
    });
    it('Должен возвращаться статус 404', async () => {
      await request(app.getHttpServer())
        .get('/api/document/excels/get-user')
        .expect(404);
    });
  });

  describe('GET: /api/document/excel/get-types', () => {
    beforeEach(() => {
      jest.spyOn(mockCouponsService, 'getTypeToExcel');
    });

    it('Должен возвращаться статус 200', async () => {
      await request(app.getHttpServer())
        .get('/api/document/excel/get-types')
        .expect(200);
    });
    it('Должен возвращаться статус 404', async () => {
      await request(app.getHttpServer())
        .get('/api/document/excels/get-types')
        .expect(404);
    });
  });
  describe('GET: /api/document/excel/get-brands', () => {
    beforeEach(() => {
      jest.spyOn(mockCouponsService, 'getBrandToExcel');
    });

    it('Должен возвращаться статус 200', async () => {
      await request(app.getHttpServer())
        .get('/api/document/excel/get-brands')
        .expect(200);
    });
    it('Должен возвращаться статус 404', async () => {
      await request(app.getHttpServer())
        .get('/api/document/excels/get-brands')
        .expect(404);
    });
  });
  describe('GET: /api/document/excel/get-products', () => {
    beforeEach(() => {
      jest.spyOn(mockCouponsService, 'getProductToExcel');
    });

    it('Должен возвращаться статус 200', async () => {
      await request(app.getHttpServer())
        .get('/api/document/excel/get-products')
        .expect(200);
    });
    it('Должен возвращаться статус 404', async () => {
      await request(app.getHttpServer())
        .get('/api/document/excels/get-products')
        .expect(404);
    });
  });
  describe('GET: /api/document/excel/get-orders?', () => {
    beforeEach(() => {
      jest.spyOn(mockCouponsService, 'getOrderToExcel');
    });

    it('Должен возвращаться статус 200', async () => {
      await request(app.getHttpServer())
        .get('/api/document/excel/get-orders?complete=All')
        .expect(200);
    });
    it('Должен возвращаться статус 404', async () => {
      await request(app.getHttpServer())
        .get('/api/document/excels/get-orders?complete=All')
        .expect(404);
    });
  });
});
