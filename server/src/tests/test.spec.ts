import { INestApplication } from '@nestjs/common';
import { getModelToken, SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { Sequelize } from 'sequelize-typescript';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import { LocationsController } from '../core/location/location.controller';
import { LocationDatabaseModel } from '../core/location/location.model';
import { LocationsModule } from '../core/location/location.module';
import { LocationsService } from '../core/location/location.service';

describe('Integration Tests Location Entity (e2e)', () => {
  let app: INestApplication;

  const mockLocationService = {
    getOneProduct: jest.fn(),
    getAllProduct: jest.fn(),
  };

  const mockRepository = {
    findOne: jest.fn().mockResolvedValue({}),
    findAll: jest.fn().mockResolvedValue({}),
    findAndCountAll: jest.fn().mockResolvedValue({}),
    create: jest.fn().mockResolvedValue({}),
    destroy: jest.fn().mockResolvedValue({}),
    update: jest.fn().mockResolvedValue({})
  }

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [LocationsModule, SequelizeModule.forFeature([LocationDatabaseModel])],
    })
      .overrideProvider(mockLocationService)
      .useValue(mockLocationService)
      .overrideProvider(getModelToken(LocationDatabaseModel))
      .useValue(mockRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GET: /api/location/get-one/:id', () => {
    beforeEach(() => {
      jest.spyOn(mockLocationService, 'getOneProduct');
    });

    it('Должен возвращаться статус 200', async () => {
      await request(app.getHttpServer()).get('/api/locations/get-one/1').expect(200);
    });
    it('Должен возвращаться статус 404', async () => {
      await request(app.getHttpServer()).get('/api/locations/getone/1').expect(404);
    });
  });

  describe('GET: /api/location/get-all/', () => {
    beforeEach(() => {
      jest.spyOn(mockLocationService, 'getAllProduct');
    });

    it('Должен возвращаться статус 200', async () => {
      await request(app.getHttpServer()).get('/api/locations/get-all').expect(200);
    });
    it('Должен возвращаться статус 404', async () => {
      await request(app.getHttpServer()).get('/api/locations/getall').expect(404);
    });
  });

  //  describe('GET: todo/all', () => {
  //    beforeEach(() => {
  //      jest.spyOn(mockTodoService, 'getAll');
  //    });

  //    it('should return OK', async () => {
  //      await request(app.getHttpServer()).get('/todo/all').expect(200, {});
  //    });
  //  });

  //  describe('POST: todo', () => {
  //    beforeEach(() => {
  //      jest.spyOn(mockTodoService, 'create');
  //    });

  //    it('should return OK', async () => {
  //      await request(app.getHttpServer()).post('/todo').expect(201, {});
  //    });
  //  });

  //  describe('PUT: todo', () => {
  //    beforeEach(() => {
  //      jest.spyOn(mockTodoService, 'update');
  //    });

  //    it('should return OK', async () => {
  //      await request(app.getHttpServer()).put('/todo').expect(200, {});
  //    });
  //  });

  //  describe('PUT: todo/inactive/:id', () => {
  //    beforeEach(() => {
  //      jest.spyOn(mockTodoService, 'update');
  //    });

  //    it('should return OK', async () => {
  //      await request(app.getHttpServer())
  //        .put('/todo/inactive/:id')
  //        .expect(200, {});
  //    });
  //  });

  //  describe('DELETE: todo/:id', () => {
  //    beforeEach(() => {
  //      jest.spyOn(mockTodoService, 'delete');
  //    });

  //    it('should return OK', async () => {
  //      await request(app.getHttpServer()).delete('/todo/:id').expect(200, {});
  //    });
  //  });
});
