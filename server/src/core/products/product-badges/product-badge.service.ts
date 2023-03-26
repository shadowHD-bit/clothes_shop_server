import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateBadgeDto } from './dto/create-badge.dto';
import { ProductBadgeDatabaseModel } from './product-badge.model';

@Injectable()
export class ProductBadgeService {
  constructor(
    @InjectModel(ProductBadgeDatabaseModel)
    private productBadgeRepository: typeof ProductBadgeDatabaseModel,
  ) {}

  async createBadge(dto: CreateBadgeDto) {
    try {
      const badge = await this.productBadgeRepository.create({
        name: dto.name,
      });
      return badge;
    } catch {
      throw new HttpException(
        'Неудалось создать бадж. Попвторить позднее!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async deleteBadge(id: number) {
    try {
      const badge = await this.productBadgeRepository.findOne({
        where: {
          id: id,
        },
      });
      if (!badge) {
        throw new HttpException(
          'Данный бадж не найден! Проверьте данные.',
          HttpStatus.NOT_FOUND,
        );
      }
      await this.productBadgeRepository.destroy({
        where: {
          id: id,
        },
      });

      return 'Бадж товара удален!';
    } catch {
      throw new HttpException(
        'Неудалось удалить товар. Попвторить позднее!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getBadge(id: number) {
    try {
      const badge = await this.productBadgeRepository.findOne({
        where: {
          id: id,
        },
      });
      if (!badge) {
        throw new HttpException(
          'Данный бадж не найден! Проверьте данные.',
          HttpStatus.NOT_FOUND,
        );
      }

      return badge;
    } catch {
      throw new HttpException(
        'Неудалось удалить товар. Попвторить позднее!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getAllBadges() {
    try {
      const badges = await this.productBadgeRepository.findAndCountAll();
      if (!badges) {
        throw new HttpException('Нет данных', HttpStatus.NOT_FOUND);
      }
      return badges;
    } catch {
      throw new HttpException(
        'Неудалось получить баджи. Попвторить позднее!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
