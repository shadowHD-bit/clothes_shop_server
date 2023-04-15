import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from 'src/files/files.service';
import * as fs from 'fs';
import { Op } from 'sequelize';
import { SizeDatabaseModel } from './models/size.model';
import { ProductSizeDatabaseModel } from './models/size-product.model';
import { CreateSizeDto } from './dto/size.dto';
import { CreateSizeProductDto } from './dto/size-product.dto';
import { ProductDatabaseModel } from '../products/product.model';

@Injectable()
export class SizeService {
  constructor(
    @InjectModel(SizeDatabaseModel)
    private sizeRepository: typeof SizeDatabaseModel,
    @InjectModel(ProductSizeDatabaseModel)
    private productSizeRepository: typeof ProductSizeDatabaseModel,
    @InjectModel(ProductDatabaseModel)
    private productRepository: typeof ProductDatabaseModel,
  ) {}

  async createSize(dto: CreateSizeDto) {
    try {
      const size = await this.sizeRepository.create({
        ...dto,
      });
      return size;
    } catch {
      throw new HttpException(
        'Неудалось выполнить операцию. Попвторить позднее!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getSizes() {
    try {
      const sizes = await this.sizeRepository.findAndCountAll();
      return sizes;
    } catch {
      throw new HttpException(
        'Неудалось выполнить операцию. Попвторить позднее!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getSizesOneProduct(id: number) {
    try {
      const sizes = await this.productSizeRepository.findAll({
        where: { productId: id },
        include: [
          {
            model: SizeDatabaseModel,
          },
        ],
      });
      return sizes;
    } catch {
      throw new HttpException(
        'Неудалось выполнить операцию. Повторить позднее!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async deleteSize(id: number) {
    try {
      await this.productSizeRepository.destroy({ where: { sizeId: id } });
      await this.sizeRepository.destroy({ where: { id } });
      return 'Размер удален';
    } catch {
      throw new HttpException(
        'Неудалось выполнить операцию. Попвторить позднее!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async createSizeProduct(dto: CreateSizeProductDto) {
    try {
      const size = await this.productSizeRepository.create({
        sizeId: dto.sizeId,
        productId: dto.productId,
        count: dto.count,
      });
      return size;
    } catch (e) {
      throw new HttpException(
        'Неудалось выполнить операцию. Попвторить позднее!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async updateCountSizeProduct(dto: CreateSizeProductDto) {
    try {
      const size = await this.productSizeRepository.findOne({
        where: {
          sizeId: dto.sizeId,
          productId: dto.productId,
        },
      });

      if (size) {
        const sizeUpdate = await this.productSizeRepository.update(
          { count: dto.count },
          {
            where: {
              sizeId: dto.sizeId,
              productId: dto.productId,
            },
          },
        );
        return sizeUpdate;
      }

      throw new HttpException(
        'Неудалось найти размер. Попвторить позднее!',
        HttpStatus.NOT_FOUND,
      );
    } catch (e) {
      throw new HttpException(
        'Неудалось выполнить операцию. Попвторить позднее!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async deleteSizeProduct(dto: CreateSizeProductDto) {
    try {
      const productSize = await this.productSizeRepository.findOne({
        where: { productId: dto.productId, sizeId: dto.sizeId },
      });

      if (productSize) {
        await this.productSizeRepository.destroy({
          where: { productId: dto.productId, sizeId: dto.sizeId },
        });

        const productSizeCheck = await this.productSizeRepository.findOne({
          where: { productId: dto.productId },
        });

        if (!productSizeCheck) {
          this.productRepository.update(
            { isDisplay: false },
            {
              where: {
                id: dto.productId
              },
            },
          );
        }

        return 'Размер удален';
      } else {
        throw new HttpException(
          'Неудалось найти размер!',
          HttpStatus.NOT_FOUND,
        );
      }
    } catch (e) {
      throw new HttpException(
        'Неудалось выполнить операцию. Попвторить позднее!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
