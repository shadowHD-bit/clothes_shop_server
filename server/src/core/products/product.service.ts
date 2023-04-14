import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from 'src/files/files.service';
import { CreateProductDto } from './dto/product-create.dto';
import { ProductDatabaseModel } from './product.model';
import * as fs from 'fs';
import { ProductParamsDatabaseModel } from './product-params/product-params.model';
import { Op, where } from 'sequelize';
import { ProductSizeDatabaseModel } from '../sizes/models/size-product.model';
import { UpdateDisplayProductDto } from './dto/update-display.dto';
import { ProductBrandDatabaseModel } from './product-brands/product-brand.model';
import { ProductTypeDatabaseModel } from './product-types/product-type.model';
import { UpdateProductDto } from './dto/product-update.dto';
import { ProductBadgeDatabaseModel } from './product-badges/product-badge.model';
import { ReviewDatabaseModel } from '../reviews/review.model';
import sequelize from 'sequelize';

interface IParamObject {
  title: string;
  description: string;
}

interface INewValueObject {
  productBrandId: number;
  productTypeId: number;
  name: string;
  price: number;
  productBadgeId: number;
  description: string;
}

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(ProductDatabaseModel)
    private productRepository: typeof ProductDatabaseModel,
    @InjectModel(ProductParamsDatabaseModel)
    private productParamsRepository: typeof ProductParamsDatabaseModel,
    @InjectModel(ReviewDatabaseModel)
    private reviewRepository: typeof ReviewDatabaseModel,
    @InjectModel(ProductSizeDatabaseModel)
    private productSizeRepository: typeof ProductSizeDatabaseModel,
    private fileService: FilesService,
  ) {}

  async createProduct(dto: CreateProductDto, files) {
    const imgMainFileName = await this.fileService.createFile(
      files.imgMain[0],
      'product',
    );
    const imgAdditionallyFirstFileName = await this.fileService.createFile(
      files.imgAdditionallyFirst[0],
      'product',
    );
    const imgAdditionallySecondFileName = await this.fileService.createFile(
      files.imgAdditionallySecond[0],
      'product',
    );
    const imgAdditionallyThirdFileName = await this.fileService.createFile(
      files.imgAdditionallyThird[0],
      'product',
    );
    const nonInfoDto = { ...dto };
    delete nonInfoDto['info'];

    const productCreate = await this.productRepository.create({
      ...nonInfoDto,
      imgMain: imgMainFileName,
      imgAdditionallyFirst: imgAdditionallyFirstFileName,
      imgAdditionallySecond: imgAdditionallySecondFileName,
      imgAdditionallyThird: imgAdditionallyThirdFileName,
    });

    const info = JSON.parse(dto.info);

    for (let i = 0; i < info.length; i++) {
      await this.productParamsRepository.create({
        title: info[i].title,
        description: info[i].description,
        productId: productCreate.id,
      });
    }

    delete nonInfoDto['info'];

    const product = await this.productRepository.findOne({
      where: { id: productCreate.id },
      include: [{ model: ProductParamsDatabaseModel, as: 'params' }],
    });

    return product;
  }

  async deleteProduct(id: number) {
    try {
      const product = await this.productRepository.findOne({
        where: { id: id },
      });

      if (!product) {
        throw new HttpException(
          'Неудалось найти товар. Проверьте данные!',
          HttpStatus.NOT_FOUND,
        );
      }

      if (product.imgMain) {
        await this.fileService.deleteFile(product.imgMain, 'product');
      }
      if (product.imgAdditionallyFirst) {
        await this.fileService.deleteFile(
          product.imgAdditionallyFirst,
          'product',
        );
      }
      if (product.imgAdditionallySecond) {
        await this.fileService.deleteFile(
          product.imgAdditionallySecond,
          'product',
        );
      }
      if (product.imgAdditionallyThird) {
        await this.fileService.deleteFile(
          product.imgAdditionallyThird,
          'product',
        );
      }

      await this.productRepository.destroy({
        where: { id: id },
      });

      //Delete product params
      await this.productParamsRepository.destroy({
        where: { productId: id },
      });

      return 'Товар удален!';
    } catch {
      throw new HttpException(
        'Неудалось удалить товар. Попвторить позднее!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getProduct(id: number) {
    try {
      const product = await this.productRepository.findOne({
        where: { id: id },
        include: [
          {
            model: ProductParamsDatabaseModel,
          },
          { model: ProductBrandDatabaseModel },
          { model: ProductTypeDatabaseModel },
        ],
      });

      if (!product) {
        throw new HttpException(
          'Неудалось найти товар. Проверьте данные!',
          HttpStatus.NOT_FOUND,
        );
      }
      return product;
    } catch {
      throw new HttpException(
        'Неудалось получить товар. Повторите позднее!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getAllProducts(productTypeId: number, productBrandId: number) {
    try {
      let product;
      if (!productBrandId && !productTypeId) {
        product = await this.productRepository.findAndCountAll({
          include: [
            { model: ProductBrandDatabaseModel },
            { model: ProductTypeDatabaseModel },
            { model: ProductBadgeDatabaseModel },
            { model: ReviewDatabaseModel },
          ],
        });
      }
      if (productBrandId && !productTypeId) {
        product = await this.productRepository.findAndCountAll({
          where: { productBrandId },
          include: [
            { model: ProductBrandDatabaseModel },
            { model: ProductTypeDatabaseModel },
            { model: ProductBadgeDatabaseModel },
            { model: ReviewDatabaseModel },
          ],
        });
      }
      if (!productBrandId && productTypeId) {
        product = await this.productRepository.findAndCountAll({
          where: { productTypeId },
          include: [
            { model: ProductBrandDatabaseModel },
            { model: ProductTypeDatabaseModel },
            { model: ProductBadgeDatabaseModel },
            { model: ReviewDatabaseModel },
          ],
        });
      }
      if (productBrandId && productTypeId) {
        product = await this.productRepository.findAndCountAll({
          where: { productTypeId, productBrandId },
          include: [
            { model: ProductBrandDatabaseModel },
            { model: ProductTypeDatabaseModel },
            { model: ProductBadgeDatabaseModel },
            { model: ReviewDatabaseModel },
          ],
        });
      }

      if (!product) {
        throw new HttpException(
          'Неудалось найти товары. Проверьте данные!',
          HttpStatus.NOT_FOUND,
        );
      }

      return product;
    } catch {
      throw new HttpException(
        'Неудалось удалить товар. Попвторить позднее!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getProductForAdmin() {
    const products = await this.productRepository.findAndCountAll({
      include: [
        { model: ProductParamsDatabaseModel, as: 'params' },
        {
          model: ProductSizeDatabaseModel,
        },
      ],
    });
    return products;
  }

  async getPopularProduct() {
    const products = await this.productRepository.findAll({
      include: [
        { model: ProductBrandDatabaseModel, attributes: ['name'] },
        { model: ProductTypeDatabaseModel, attributes: ['name'] },
        { model: ProductBadgeDatabaseModel, attributes: ['name'] },
        { model: ReviewDatabaseModel, attributes: [], required: true, duplicating: false},
      ],
      attributes: [
        'id',
        'name',
        'price',
        'imgMain',
        'imgAdditionallyFirst',
        'imgAdditionallySecond',
        'imgAdditionallyThird',
        [sequelize.fn('SUM', sequelize.col('review.rate')), 'rate_sum'],
        [sequelize.fn('COUNT', sequelize.col('review.id')), 'rate_count'],
        [
          sequelize.literal(
            'COALESCE(SUM(review.rate), 0) / COALESCE(COUNT(review.id), 0)',
          ),
          'all_rate',
        ],
      ],
      order: [[sequelize.col('all_rate'), 'DESC']],
      group: [
        'ProductDatabaseModel.id',
        'brand.id',
        'type.id',
        'badge.id',
      ],
      having: sequelize.literal('count(review.id) <> 0'),
      limit: 4
    });
    return products;
  }

  async getLastProduct() {
    const products = await this.productRepository.findAll({
      include: [
        { model: ProductBrandDatabaseModel, attributes: ['name'] },
        { model: ProductTypeDatabaseModel, attributes: ['name'] },
        { model: ProductBadgeDatabaseModel, attributes: ['name'] },
      ],
      attributes: [
        'id',
        'name',
        'price',
        'imgMain',
        'imgAdditionallyFirst',
        'imgAdditionallySecond',
        'imgAdditionallyThird',
      ],
      order: [[sequelize.col('ProductDatabaseModel.createdAt'), 'DESC']],
      group: [
        'ProductDatabaseModel.id',
        'brand.id',
        'type.id',
        'badge.id',
      ],
      limit: 4
    });
    return products;
  }

  async updateProduct(id: number, dto: UpdateProductDto, files: any) {
    const product = await this.productRepository.findOne({ where: { id } });
    if (product) {
      let newVal = {};

      newVal['productBrandId'] = dto.productBrandId;

      dto.productTypeId ? (newVal['productTypeId'] = dto.productTypeId) : false;
      dto.name ? (newVal['name'] = dto.name) : false;
      dto.price ? (newVal['price'] = dto.price) : false;
      dto.description ? (newVal['description'] = dto.description) : false;
      dto.productBadgeId
        ? (newVal['productBadgeId'] = dto.productBadgeId)
        : false;

      if (files) {
        if (files.imgMain) {
          const imgMainFileName = await this.fileService.createFile(
            files.imgMain[0],
            'product',
          );
          await this.productRepository.update(
            {
              imgMain: imgMainFileName,
            },
            { where: { id } },
          );
        }

        if (files.imgFirst) {
          const imgAdditionallyFirstFileName =
            await this.fileService.createFile(
              files.imgAdditionallyFirst[0],
              'product',
            );
          await this.productRepository.update(
            {
              imgAdditionallyFirst: imgAdditionallyFirstFileName,
            },
            { where: { id } },
          );
        }

        if (files.imgSecond) {
          const imgAdditionallySecondFileName =
            await this.fileService.createFile(
              files.imgAdditionallySecond[0],
              'product',
            );
          await this.productRepository.update(
            {
              imgAdditionallySecond: imgAdditionallySecondFileName,
            },
            { where: { id } },
          );
        }

        if (files.imgThird) {
          const imgAdditionallyThirdFileName =
            await this.fileService.createFile(
              files.imgAdditionallyThird[0],
              'product',
            );
          await this.productRepository.update(
            {
              imgAdditionallyThird: imgAdditionallyThirdFileName,
            },
            { where: { id } },
          );
        }
      }

      if (dto.info) {
        const parseInfo = JSON.parse(dto.info);
        for (const item of parseInfo) {
          const param = await this.productParamsRepository.findOne({
            where: { id: item.id },
          });

          if (param) {
            await this.productParamsRepository.update(
              {
                title: item.title,
                description: item.description,
              },
              { where: { id: item.id } },
            );
          } else {
            await this.productParamsRepository.create({
              title: item.title,
              description: item.description,
              productId: id,
            });
          }
        }
      }

      await this.productRepository
        .update(
          {
            ...newVal,
          },
          { where: { id } },
        )
        .then(() => {
          return 'Продукт обновлен';
        });
    } else {
      throw new HttpException(
        'Товара нет в базе данных. Попвторить позднее!',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async updateDisplayProduct(dto: UpdateDisplayProductDto) {
    const product = await this.productRepository.findOne({
      where: { id: dto.id },
    });

    const countProductAll = await this.productSizeRepository.findAndCountAll({
      where: {
        count: { [Op.ne]: 0 },
        productId: dto.id,
      },
    });

    if (product && countProductAll.count != 0) {
      await this.productRepository.update(
        {
          isDisplay: dto.isDisplay,
        },
        { where: { id: dto.id } },
      );
      return 'Продукт обновлен';
    } else {
      throw new HttpException(
        'Этого продукта нет в базе данных или не установлен размер! Проверьте данные',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async searchAllProductByName(name: string) {
    try {
      const products = await this.productRepository.findAndCountAll({
        attributes: ['name', 'price', 'id'],
        where: {
          name: {
            [Op.like]: `%${name}%`,
          },
          isDisplay: true,
        },
        limit: 5,
      });

      return products;
    } catch (e) {
      throw new HttpException(
        'Неудалось выполнить операцию. Попвторить позднее!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async createMoreProducts(products) {
    await products.map((prod) => {
      try {
        // let { name, price, productBrandId, productTypeId }
        let name = prod.name;
        let price = prod.price;
        let productBrandId = prod.productBrandId;
        let productTypeId = prod.productTypeId;
        let description = prod.description;

        const product = this.productRepository.create({
          name,
          price,
          productBrandId,
          productTypeId,
          description,
        });

        return product;
      } catch (e) {
        throw new HttpException(
          'Неудалось выполнить операцию. Попвторить позднее!',
          HttpStatus.BAD_REQUEST,
        );
      }
    });
  }
}
