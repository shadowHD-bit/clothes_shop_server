import { INestApplication } from '@nestjs/common';
import { getModelToken, SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { ProductDatabaseModel } from '../../product.model';
import { ProductTypeDatabaseModel } from '../product-type.model';
import { ProductTypesModule } from '../product-type.module';


describe('Integration Tests Product Types Entity (e2e)', () => {
  let app: INestApplication;

  const mockService = {
    createType: jest.fn(),
    deleteType: jest.fn(),
    getType: jest.fn(),
    getAllTypes: jest.fn(),
    updateType: jest.fn(),
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
      imports: [ProductTypesModule],
    })
      .overrideProvider(getModelToken(ProductDatabaseModel))
      .useValue(mockRepository)
      .overrideProvider(getModelToken(ProductTypeDatabaseModel))
      .useValue(mockRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('POST: /api/types/create', () => {
    beforeEach(() => {
      jest.spyOn(mockService, 'createType');
    });

    it('Должен возвращаться статус 400 (нет изображения)', async () => {
      await request(app.getHttpServer())
        .post('/api/types/create')
        .send({})
        .expect(400);
    });
    it('Должен возвращаться статус 404', async () => {
      await request(app.getHttpServer())
        .post('/api/type/create')
        .send({})
        .expect(404);
    });
  });

  describe('DELETE: /api/types/delete/:id', () => {
    beforeEach(() => {
      jest.spyOn(mockService, 'deleteType');
    });

    it('Должен возвращаться статус 400 (нет изображения)', async () => {
      await request(app.getHttpServer())
        .delete('/api/types/delete/1')
        .expect(400);
    });
    it('Должен возвращаться статус 404', async () => {
      await request(app.getHttpServer())
        .delete('/api/type/delete/1')
        .expect(404);
    });
  });

  describe('GET: /api/types/get-one/:id', () => {
    beforeEach(() => {
      jest.spyOn(mockService, 'getType');
    });

    it('Должен возвращаться статус 200', async () => {
      await request(app.getHttpServer())
        .get('/api/types/get-one/1')
        .expect(200);
    });
    it('Должен возвращаться статус 404', async () => {
      await request(app.getHttpServer())
        .get('/api/type/get-one/1')
        .expect(404);
    });
  });

  describe('GET: /api/types/get-all', () => {
    beforeEach(() => {
      jest.spyOn(mockService, 'getAllTypes');
    });

    it('Должен возвращаться статус 200', async () => {
      await request(app.getHttpServer())
        .get('/api/types/get-all')
        .expect(200);
    });
    it('Должен возвращаться статус 404', async () => {
      await request(app.getHttpServer())
        .get('/api/type/get-all')
        .expect(404);
    });
  });

  describe('PUT: /api/types/update/:id', () => {
    beforeEach(() => {
      jest.spyOn(mockService, 'updateType');
    });

    it('Должен возвращаться статус 200', async () => {
      await request(app.getHttpServer())
        .put('/api/types/update/1')
        .expect(200);
    });
    it('Должен возвращаться статус 404', async () => {
      await request(app.getHttpServer())
        .put('/api/type/update/1')
        .expect(404);
    });
  });
});
