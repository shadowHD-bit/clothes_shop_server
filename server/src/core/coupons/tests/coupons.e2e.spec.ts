import { INestApplication } from '@nestjs/common';
import { getModelToken, SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { CouponDatabaseModel } from '../coupon.model';
import { CouponsModule } from '../coupon.module';
import { CouponsService } from '../coupon.service';

describe('Integration Tests Coupons Entity (e2e)', () => {
  let app: INestApplication;

  const mockCouponsService = {
    createCoupon: jest.fn(),
    getOneCoupon: jest.fn(),
    getAllCoupon: jest.fn(),
    deleteCoupon: jest.fn(),
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
      imports: [CouponsModule],
    })
      .overrideProvider(CouponsService)
      .useValue(mockCouponsService)
      .overrideProvider(getModelToken(CouponDatabaseModel))
      .useValue(mockRepository).compile()
    

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('POST: /api/coupons/create', () => {
    beforeEach(() => {
      jest.spyOn(mockCouponsService, 'createCoupon');
    });

    it('Должен возвращаться статус 201', async () => {
      await request(app.getHttpServer())
        .post('/api/coupons/create')
        .expect(201);
    });
    it('Должен возвращаться статус 404', async () => {
      await request(app.getHttpServer())
        .post('/api/couponss/create')
        .expect(404);
    });
  });

  describe('GET: /api/coupons/get-one/:code', () => {
    beforeEach(() => {
      jest.spyOn(mockCouponsService, 'getOneCoupon');
    });

    it('Должен возвращаться статус 200', async () => {
      await request(app.getHttpServer())
        .get('/api/coupons/get-one/test')
        .expect(200);
    });
    it('Должен возвращаться статус 404', async () => {
      await request(app.getHttpServer())
        .get('/api/couponss/get-one/test')
        .expect(404);
    });
  });

  describe('GET: /api/coupons/get-all', () => {
    beforeEach(() => {
      jest.spyOn(mockCouponsService, 'getAllCoupon');
    });

    it('Должен возвращаться статус 200', async () => {
      await request(app.getHttpServer())
        .get('/api/coupons/get-all')
        .expect(200);
    });
    it('Должен возвращаться статус 404', async () => {
      await request(app.getHttpServer())
        .get('/api/couponss/get-all')
        .expect(404);
    });
  });

  describe('DELETE: /api/coupons/delete/:id', () => {
    beforeEach(() => {
      jest.spyOn(mockCouponsService, 'deleteCoupon');
    });

    it('Должен возвращаться статус 200', async () => {
      await request(app.getHttpServer())
        .delete('/api/coupons/delete/1')
        .expect(200);
    });
    it('Должен возвращаться статус 404', async () => {
      await request(app.getHttpServer())
        .delete('/api/couponss/delete/1')
        .expect(404);
    });
  });
});
