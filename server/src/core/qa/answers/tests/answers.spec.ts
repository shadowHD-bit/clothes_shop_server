import { forwardRef } from '@nestjs/common';
import { getModelToken, SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { NotificationDatabaseModel } from '../../../notification/notification.model';
import { NotificationModule } from '../../../notification/notification.module';
import { OrderProductUserDataModel } from '../../../orders/model/order-product.model';
import { OrderDatabaseModel } from '../../../orders/model/order.model';
import { ProductDatabaseModel } from '../../../products/product.model';
import { User } from '../../../users/users.model';
import { QuestionDatabaseModel } from '../../questions/question.model';
import { AnswerController } from '../answer.controller';
import { AnswersDatabaseModel } from '../answer.model';
import { AnswerService } from '../answer.service';

describe('AnswersTests', () => {
  let controller: AnswerController;
  let service: AnswerService;

  const mockLikesService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnswerController],
      providers: [AnswerService],
      imports: [
        SequelizeModule.forFeature([
          QuestionDatabaseModel,
          AnswersDatabaseModel,
        ]),
        NotificationModule,
      ],
      exports: [AnswerService],
    })
      .overrideProvider(getModelToken(AnswersDatabaseModel))
      .useValue(mockLikesService)
      .overrideProvider(getModelToken(QuestionDatabaseModel))
      .useValue(mockLikesService)
      .overrideProvider(getModelToken(NotificationDatabaseModel))
      .useValue(mockLikesService)
      .overrideProvider(getModelToken(OrderDatabaseModel))
      .useValue(mockLikesService)
      .overrideProvider(getModelToken(OrderProductUserDataModel))
      .useValue(mockLikesService)
      .overrideProvider(getModelToken(ProductDatabaseModel))
      .useValue(mockLikesService)
      .overrideProvider(getModelToken(User))
      .useValue(mockLikesService)
      .compile();

    controller = module.get<AnswerController>(AnswerController);
    service = module.get<AnswerService>(AnswerService);
  });

  it('Контроллер ответов должен быть определен', () => {
    expect(controller).toBeDefined();
  });

  it('Сервисы ответов должены быть определены', () => {
    expect(service).toBeDefined();
  });
});
