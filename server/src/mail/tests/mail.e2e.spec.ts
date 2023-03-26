import { INestApplication } from '@nestjs/common';
import { getModelToken, SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { Sequelize } from 'sequelize-typescript';
import * as request from 'supertest';
import { MailDto } from '../dto/mail.dto';
import { MailModule } from '../mail.module';
import { MailService } from '../mail.service';

describe('Integration Tests Mail Entity (e2e)', () => {
  let app: INestApplication;

  const mockMailService = {
    sendEmail: jest.fn(),
    sendResetPasswordMail: jest.fn(),
    test: jest.fn(),
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
      imports: [MailModule],
    })
      .overrideProvider(MailService)
      .useValue(mockMailService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('POST: /api/mail/send-mail', () => {
    beforeEach(() => {
      jest.spyOn(mockMailService, 'sendEmail');
    });

    it('Должен возвращаться статус 201', async () => {
      await request(app.getHttpServer())
        .post('/api/mail/send-mail')
        .expect(201);
    });
    it('Должен возвращаться статус 404', async () => {
      await request(app.getHttpServer())
        .post('/api/mail/sendmail')
        .expect(404);
    });
  });

  describe('POST: /api/mail/send-mail-reset', () => {
    beforeEach(() => {
      jest.spyOn(mockMailService, 'sendResetPasswordMail');
    });

    it('Должен возвращаться статус 201', async () => {
      await request(app.getHttpServer())
        .post('/api/mail/send-mail-reset')
        .expect(500);
    });
    it('Должен возвращаться статус 404', async () => {
      await request(app.getHttpServer())
        .post('/api/mail/sendmailreset')
        .send({})
        .expect(404);
    });
  });
});
