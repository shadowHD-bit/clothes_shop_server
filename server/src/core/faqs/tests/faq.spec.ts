import { SequelizeModule, getModelToken } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { FaqController } from '../faq.controller';
import { FaqDatabaseModel } from '../faq.model';
import { FaqService } from '../faq.service';


describe('FAQControllerTests', () => {
  let controller: FaqController;
  let service: FaqService;

  const mockService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
        controllers: [FaqController],
        providers: [FaqService],
        imports: [SequelizeModule.forFeature([FaqDatabaseModel])],
        exports: [FaqService],
    })
      .overrideProvider(getModelToken(FaqDatabaseModel))
      .useValue(mockService)
      .compile();

    controller = module.get<FaqController>(FaqController);
    service = module.get<FaqService>(FaqService);
  });

  it('Контроллер сущности частозадаваемых вопроов должен быть определен', () => {
    expect(controller).toBeDefined();
  });

  it('Сервисы сущности частозадаваемых вопроов должены быть определены', () => {
    expect(service).toBeDefined();
  });
});
