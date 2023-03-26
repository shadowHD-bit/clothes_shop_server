import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { TestingModule, Test } from '@nestjs/testing';

describe('FilesController', () => {
  let controller: FilesController;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilesController],
      providers: [FilesService],
    }).compile();

    controller = module.get<FilesController>(FilesController);
  });

  it('Контроллер авторизации должен быть определен', () => {
    expect(controller).toBeDefined();
  });
});
