import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from 'src/files/files.service';
import { ProductTypeDto } from './dto/product-type.dto';
import { ProductTypeDatabaseModel } from './product-type.model';

@Injectable()
export class ProductTypesService {
  constructor(
    @InjectModel(ProductTypeDatabaseModel)
    private productTypeRepository: typeof ProductTypeDatabaseModel,
    private fileService: FilesService,
  ) {}

  async createType(dto: ProductTypeDto, img: any) {
    try {
      const imgFileName = await this.fileService.createFile(img, 'types');

      const type = await this.productTypeRepository.create({
        ...dto,
        img: imgFileName,
      });
      return type;
    } catch {
      throw new HttpException(
        'Произошла непредвиденная ошибка! Повторите позднее.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async deleteType(id: number) {
    try {
      const type = await this.productTypeRepository.findOne({
        where: { id: id },
      });
      if (!type) {
        throw new HttpException(
          'Тип не найден! Повторите позднее.',
          HttpStatus.NOT_FOUND,
        );
      }
      await this.fileService.deleteFile(type.img, 'types');

      await this.productTypeRepository.destroy({
        where: { id: id },
      });

      return 'Тип удален!';
    } catch {
      throw new HttpException(
        'Произошла непредвиденная ошибка! Повторите позднее.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getType(id: number) {
    const type = await this.productTypeRepository.findOne({
      where: { id: id },
    });
    if (!type) {
      throw new HttpException(
        'Тип не найден! Повторите позднее.',
        HttpStatus.NOT_FOUND,
      );
    }
    return type;
  }

  async getAllTypes() {
    try {
      const types = await this.productTypeRepository.findAndCountAll({});
      return types;
    } catch {
      throw new HttpException(
        'Произошла непредвиденная ошибка! Повторите позднее.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async updateType(dto: ProductTypeDto, img: any, id: number) {
    const type = await this.productTypeRepository.findOne({
      where: { id: id },
    });
    if (!type) {
      throw new HttpException(
        'Тип не найден! Повторите позднее.',
        HttpStatus.NOT_FOUND,
      );
    }

    try {
      if (img) {
        const newImgFileName = await this.fileService.createFile(img, 'types');
        await this.fileService.deleteFile(type.img, 'types');
        const updatedType = await this.productTypeRepository.update(
          {
            name: dto.name,
            img: newImgFileName,
          },
          {
            where: {
              id: id,
            },
          },
        );
        return updatedType;
      }
      await this.productTypeRepository.update(
        {
          name: dto.name,
        },
        {
          where: {
            id: id,
          },
        },
      );
      return 'Тип обновлен!';
    } catch {
      throw new HttpException(
        'Произошла непредвиденная ошибка! Повторите позднее.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
