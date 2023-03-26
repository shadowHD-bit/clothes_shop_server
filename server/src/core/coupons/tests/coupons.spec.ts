import { SequelizeModule, getModelToken } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { CouponController } from '../coupon.controller';
import { CouponDatabaseModel } from '../coupon.model';
import { CouponsService } from '../coupon.service';

describe('CouponsControllerTests', () => {
  let controller: CouponController;
  let service: CouponsService;

  const mockService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
        controllers: [CouponController],
        providers: [CouponsService],
        imports: [
          SequelizeModule.forFeature([
            CouponDatabaseModel,
          ]),
        ],
        exports: [CouponsService],
    })
      .overrideProvider(getModelToken(CouponDatabaseModel))
      .useValue(mockService)
      .compile();

    controller = module.get<CouponController>(CouponController);
    service = module.get<CouponsService>(CouponsService);
  });

  it('Контроллер сущности купона должен быть определен', () => {
    expect(controller).toBeDefined();
  });

  it('Сервисы сущности купона должены быть определены', () => {
    expect(service).toBeDefined();
  });
});
