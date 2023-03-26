import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsController } from '../payment.controller';
import { PaymentService } from '../payment.service';

describe('PaymentTest', () => {
  let controller: PaymentsController;
  let service: PaymentService;

  const mockPaymentService = {
    create: jest.fn((dto) => {
      return {
        ...dto,
      };
    }),
  };

  const mockValueAmount = {
    amount: 200,
    description: 'Test',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentsController],
      providers: [PaymentService],
      imports: [],
      exports: [PaymentService],
    })
      .overrideProvider(PaymentService)
      .useValue(mockPaymentService)
      .compile();

    controller = module.get<PaymentsController>(PaymentsController);
    service = module.get<PaymentService>(PaymentService);
  });

  it('Сервис оплаты должен быть определен', () => {
    expect(service).toBeDefined();
  });
  it('Контроллер оплаты должен быть определен', () => {
    expect(controller).toBeDefined();
  });
});
