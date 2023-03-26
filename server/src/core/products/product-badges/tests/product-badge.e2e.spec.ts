import { INestApplication } from '@nestjs/common';
import { getModelToken, SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { ProductDatabaseModel } from '../../product.model';
import { ProductBadgeDatabaseModel } from '../product-badge.model';
import { ProductBadgeModule } from '../product-badge.module';


describe('Integration Tests Product Badge Entity (e2e)', () => {
  let app: INestApplication;

  const mockService = {
    createBadge: jest.fn(),
    getBadge: jest.fn(),
    getAllBadges: jest.fn(),
    deleteBadge: jest.fn(),
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
      imports: [ProductBadgeModule],
    })
      .overrideProvider(getModelToken(ProductDatabaseModel))
      .useValue(mockRepository)
      .overrideProvider(getModelToken(ProductBadgeDatabaseModel))
      .useValue(mockRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('POST: /api/product-badge/create', () => {
    beforeEach(() => {
      jest.spyOn(mockService, 'createBadge');
    });

    it('Должен возвращаться статус 201', async () => {
      await request(app.getHttpServer())
        .post('/api/product-badge/create')
        .send({})
        .expect(201);
    });
    it('Должен возвращаться статус 404', async () => {
      await request(app.getHttpServer())
        .post('/api/product-badges/create')
        .send({})
        .expect(404);
    });
  });

  describe('DELETE: /api/product-badge/delete/:id', () => {
    beforeEach(() => {
      jest.spyOn(mockService, 'deleteBadge');
    });

    it('Должен возвращаться статус 200', async () => {
      await request(app.getHttpServer())
        .delete('/api/product-badge/delete/1')
        .expect(200);
    });
    it('Должен возвращаться статус 404', async () => {
      await request(app.getHttpServer())
        .delete('/api/product-badges/delete/1')
        .expect(404);
    });
  });

  describe('GET: /api/product-badge/get-one/:id', () => {
    beforeEach(() => {
      jest.spyOn(mockService, 'getBadge');
    });

    it('Должен возвращаться статус 200', async () => {
      await request(app.getHttpServer())
        .get('/api/product-badge/get-one/1')
        .expect(200);
    });
    it('Должен возвращаться статус 404', async () => {
      await request(app.getHttpServer())
        .get('/api/product-badges/get-one/1')
        .expect(404);
    });
  });

  describe('GET: /api/product-badge/get-all', () => {
    beforeEach(() => {
      jest.spyOn(mockService, 'getAllBadges');
    });

    it('Должен возвращаться статус 200', async () => {
      await request(app.getHttpServer())
        .get('/api/product-badge/get-all')
        .expect(200);
    });
    it('Должен возвращаться статус 404', async () => {
      await request(app.getHttpServer())
        .get('/api/product-badges/get-all')
        .expect(404);
    });
  });
});
