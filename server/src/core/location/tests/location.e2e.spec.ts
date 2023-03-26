import { INestApplication } from '@nestjs/common';
import { getModelToken, SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { LocationDatabaseModel } from '../location.model';
import { LocationsModule } from '../location.module';
import { LocationsService } from '../location.service';

describe('Integration Tests Location Entity (e2e)', () => {
  let app: INestApplication;

  const mockFaqService = {
    createLocation: jest.fn(),
    getOneLocation: jest.fn(),
    getAllLocation: jest.fn(),
    deleteLocation: jest.fn(),
    updateLocation: jest.fn(),
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
      imports: [LocationsModule],
    })
      .overrideProvider(LocationsService)
      .useValue(mockFaqService)
      .overrideProvider(getModelToken(LocationDatabaseModel))
      .useValue(mockRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('POST: /api/locations/create', () => {
    beforeEach(() => {
      jest.spyOn(mockFaqService, 'createLocation');
    });

    it('Должен возвращаться статус 201', async () => {
      await request(app.getHttpServer())
        .post('/api/locations/create')
        .send({})
        .expect(201);
    });
    it('Должен возвращаться статус 404', async () => {
      await request(app.getHttpServer())
        .post('/api/location/create')
        .send({})
        .expect(404);
    });
  });

  describe('GET: /api/locations/get-one/:id', () => {
    beforeEach(() => {
      jest.spyOn(mockFaqService, 'getOneLocation');
    });

    it('Должен возвращаться статус 200', async () => {
      await request(app.getHttpServer())
        .get('/api/locations/get-one/1')
        .expect(200);
    });
    it('Должен возвращаться статус 404', async () => {
      await request(app.getHttpServer())
        .get('/api/location/get-one/1')
        .expect(404);
    });
  });

  describe('GET: /api/locations/get-all', () => {
    beforeEach(() => {
      jest.spyOn(mockFaqService, 'getAllLocation');
    });

    it('Должен возвращаться статус 200', async () => {
      await request(app.getHttpServer())
        .get('/api/locations/get-all')
        .expect(200);
    });
    it('Должен возвращаться статус 404', async () => {
      await request(app.getHttpServer())
        .get('/api/location/get-all')
        .expect(404);
    });
  });

  describe('DELETE: /api/locations/delete/:id', () => {
    beforeEach(() => {
      jest.spyOn(mockFaqService, 'deleteLocation');
    });

    it('Должен возвращаться статус 200', async () => {
      await request(app.getHttpServer())
        .delete('/api/locations/delete/1')
        .expect(200);
    });
    it('Должен возвращаться статус 404', async () => {
      await request(app.getHttpServer())
        .delete('/api/location/delete/1')
        .expect(404);
    });
  });

  describe('PUT: /api/locations/update/:id', () => {
    beforeEach(() => {
      jest.spyOn(mockFaqService, 'updateLocation');
    });

    it('Должен возвращаться статус 200', async () => {
      await request(app.getHttpServer())
        .put('/api/locations/update/1')
        .expect(200);
    });
    it('Должен возвращаться статус 404', async () => {
      await request(app.getHttpServer())
        .put('/api/location/update/1')
        .expect(404);
    });
  });
});
