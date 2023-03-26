import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ParamsProductDto } from './dto/create-params.dto';
import { ProductParamsDatabaseModel } from './product-params.model';

@Injectable()
export class ProductParamsService {
  constructor(
    @InjectModel(ProductParamsDatabaseModel)
    private productParamsRepository: typeof ProductParamsDatabaseModel,
  ) {}

  async createParam(dto: ParamsProductDto) {
    try {
      const param = this.productParamsRepository.create({
        ...dto,
      });
      return param;
    } catch {
      throw new HttpException(
        'Произошла непредвиденная ошибка! Повторите позднее.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async deleteParam(id: number) {
    const param = await this.productParamsRepository.findOne({
      where: { id: id },
    });
    if (!param) {
      throw new HttpException(
        'Параметр не найден! Повторите позднее.',
        HttpStatus.NOT_FOUND,
      );
    }

    try {
      await this.productParamsRepository.destroy({
        where: { id: id },
      });

      return 'Параметр удален!';
    } catch {
      throw new HttpException(
        'Произошла непредвиденная ошибка! Повторите позднее.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getParam(id: number) {
    const param = await this.productParamsRepository.findOne({
      where: { id: id },
    });
    if (!param) {
      throw new HttpException(
        'Параметр не найден! Повторите позднее.',
        HttpStatus.NOT_FOUND,
      );
    }
    return param;
  }

  async updateParam(id: number, dto: ParamsProductDto) {
    const param = await this.productParamsRepository.findOne({
      where: { id: id },
    });

    if (!param) {
      throw new HttpException(
        'Параметр не найден! Повторите позднее.',
        HttpStatus.NOT_FOUND,
      );
    }
    await this.productParamsRepository.update(
      {
        ...dto,
      },
      {
        where: { id: id },
      },
    );
    return 'Параметр обновлен!';
  }

  async getAllParams() {
    try {
      const params = await this.productParamsRepository.findAndCountAll();
      return params;
    } catch {
      throw new HttpException(
        'Произошла непредвиденная ошибка! Повторите позднее.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getAllParamsByProduct(productId: number) {
    try {
      const params = await this.productParamsRepository.findAndCountAll({
        where: { productId: productId },
      });
      return params;
    } catch {
      throw new HttpException(
        'Произошла непредвиденная ошибка! Повторите позднее.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
