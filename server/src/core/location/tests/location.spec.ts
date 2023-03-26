import { LocationDatabaseModel } from '../location.model';
import { SequelizeModule, getModelToken } from '@nestjs/sequelize';
import { LocationsService } from '../location.service';
import { LocationsController } from '../location.controller';
import { Test, TestingModule } from '@nestjs/testing';

describe('LocationTest', () => {
  let controller: LocationsController;
  let service: LocationsService;

  const mockLocationService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SequelizeModule.forFeature([LocationDatabaseModel])],
      controllers: [LocationsController],
      providers: [LocationsService],
    })
      .overrideProvider(getModelToken(LocationDatabaseModel))
      .useValue(mockLocationService)
      .compile();

    controller = module.get<LocationsController>(LocationsController);
    service = module.get<LocationsService>(LocationsService);
  });

  it('Сервис сущностей местоположения должен быть определен', () => {
    expect(service).toBeDefined();
  });
  it('Контроллер сущностей местоположения должен быть определен', () => {
    expect(controller).toBeDefined();
  });
});
