import { MailerService } from '@nestjs-modules/mailer';
import { Test, TestingModule } from '@nestjs/testing';
import { MailService } from '../mail.service';
import { MailController } from '../mail.controller';

describe('MailTests', () => {
  let controller: MailController;
  let service: MailService;

  const mockMailService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MailController],
      providers: [MailService],
      imports: [],
      exports: [MailService],
    })
      .overrideProvider(MailService)
      .useValue(mockMailService)
      .compile();

    controller = module.get<MailController>(MailController);
    service = module.get<MailService>(MailService);
  });

  it('Сервис службы отправки должен быть определен', () => {
    expect(service).toBeDefined();
  });
  it('Контроллер службы отправки должен быть определен', () => {
    expect(controller).toBeDefined();
  });
});
