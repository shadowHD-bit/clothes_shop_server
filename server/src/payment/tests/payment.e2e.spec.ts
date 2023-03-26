import { INestApplication } from '@nestjs/common';
import { getModelToken, SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { Sequelize } from 'sequelize-typescript';
import * as request from 'supertest';
import { PaymentModule } from '../payment.module';
import { PaymentService } from '../payment.service';

describe('Integration Tests Payment Entity (e2e)', () => {
  let app: INestApplication;

  const mockPaymentService = {
    create: jest.fn(),
    getPaymentStatus: jest.fn(),
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
      imports: [PaymentModule],
    })
      .overrideProvider(PaymentService)
      .useValue(mockPaymentService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('POST: /api/payment/create', () => {
    beforeEach(() => {
      jest.spyOn(mockPaymentService, 'create');
    });

    it('Должен возвращаться статус 201', async () => {
      await request(app.getHttpServer())
        .post('/api/payment/create')
        .expect(201);
    });
    it('Должен возвращаться статус 404', async () => {
      await request(app.getHttpServer())
        .post('/api/payments/create')
        .expect(404);
    });
  });

  describe('GET: /api/payment/get-status-payment', () => {
    beforeEach(() => {
      jest.spyOn(mockPaymentService, 'getPaymentStatus');
    });

    it('Должен возвращаться статус 201', async () => {
      await request(app.getHttpServer())
        .post('/api/payment/get-status-payment')
        .send({})
        .expect(201);
    });
    it('Должен возвращаться статус 404', async () => {
      await request(app.getHttpServer())
        .post('/api/payments/get-status-payment')
        .expect(404);
    });
  });
});
