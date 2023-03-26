import { JwtModule } from '@nestjs/jwt';
import { FilesModule } from './../../files/files.module';
import { OrderDatabaseModel } from './../orders/model/order.model';
import { SocialGoogleUserDataModel } from './../../auth/social-auth/google-auth/google-auth.model';
import { SequelizeModule, getModelToken } from '@nestjs/sequelize';
import { User } from './users.model';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TestingModule, Test } from '@nestjs/testing';

describe('UserControllerTests', () => {
  let controller: UsersController;
  let service: UsersService;

  const mockUserService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        SequelizeModule.forFeature([User, OrderDatabaseModel]),
        FilesModule,
        JwtModule,
      ],
      controllers: [UsersController],
      providers: [UsersService],
    })
      .overrideProvider(getModelToken(User))
      .useValue(mockUserService)
      .overrideProvider(getModelToken(OrderDatabaseModel))
      .useValue(mockUserService)
      .compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('Контроллер пользователя должен быть определен', () => {
    expect(controller).toBeDefined();
  });

  it('Сервисы пользователя должены быть определены', () => {
    expect(controller).toBeDefined();
  });
});
