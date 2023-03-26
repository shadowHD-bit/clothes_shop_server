import { INestApplication } from '@nestjs/common';
import { getModelToken, SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { FaqDatabaseModel } from '../faq.model';
import { FaqModule } from '../faq.module';
import { FaqService } from '../faq.service';

describe('Integration Tests FAQ Entity (e2e)', () => {
  let app: INestApplication;

  const mockFaqService = {
    createFaq: jest.fn(),
    getOneFaq: jest.fn(),
    getAllFaq: jest.fn(),
    deleteFaq: jest.fn(),
    updateFaq: jest.fn(),
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
      imports: [FaqModule],
    })
      .overrideProvider(FaqService)
      .useValue(mockFaqService)
      .overrideProvider(getModelToken(FaqDatabaseModel))
      .useValue(mockRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('POST: /api/faq/create', () => {
    beforeEach(() => {
      jest.spyOn(mockFaqService, 'createFaq');
    });

    it('Должен возвращаться статус 201', async () => {
      await request(app.getHttpServer())
        .post('/api/faq/create')
        .send({})
        .expect(201);
    });
    it('Должен возвращаться статус 404', async () => {
      await request(app.getHttpServer())
        .post('/api/faqs/create')
        .send({})
        .expect(404);
    });
  });

  describe('GET: /api/faq/get-one/:id', () => {
    beforeEach(() => {
      jest.spyOn(mockFaqService, 'getOneFaq');
    });

    it('Должен возвращаться статус 200', async () => {
      await request(app.getHttpServer())
        .get('/api/faq/get-one/1')
        .expect(200);
    });
    it('Должен возвращаться статус 404', async () => {
      await request(app.getHttpServer())
        .get('/api/faqs/get-one/1')
        .expect(404);
    });
  });

  describe('GET: /api/faq/get-all', () => {
    beforeEach(() => {
      jest.spyOn(mockFaqService, 'getAllFaq');
    });

    it('Должен возвращаться статус 200', async () => {
      await request(app.getHttpServer())
        .get('/api/faq/get-all')
        .expect(200);
    });
    it('Должен возвращаться статус 404', async () => {
      await request(app.getHttpServer())
        .get('/api/faqs/get-all')
        .expect(404);
    });
  });

  describe('DELETE: /api/faq/delete/:id', () => {
    beforeEach(() => {
      jest.spyOn(mockFaqService, 'getAllFaq');
    });

    it('Должен возвращаться статус 200', async () => {
      await request(app.getHttpServer())
        .delete('/api/faq/delete/1')
        .expect(200);
    });
    it('Должен возвращаться статус 404', async () => {
      await request(app.getHttpServer())
        .delete('/api/faqs/delete/1')
        .expect(404);
    });
  });

  describe('PUT: /api/faq/update/:id', () => {
    beforeEach(() => {
      jest.spyOn(mockFaqService, 'updateFaq');
    });

    it('Должен возвращаться статус 200', async () => {
      await request(app.getHttpServer())
        .put('/api/faq/update/1')
        .expect(200);
    });
    it('Должен возвращаться статус 404', async () => {
      await request(app.getHttpServer())
        .put('/api/faqs/update/1')
        .expect(404);
    });
  });
});
