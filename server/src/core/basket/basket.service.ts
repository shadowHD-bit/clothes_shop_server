import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { ProductParamsDatabaseModel } from '../products/product-params/product-params.model';
import { ProductDatabaseModel } from '../products/product.model';
import { ProductSizeDatabaseModel } from '../sizes/models/size-product.model';
import { AddProductInBasketDto } from './dto/add-product.dto';
import { ChangeCountProductInBasketDto } from './dto/change-count-product-basket.dto';
import { CreateBasketDto } from './dto/create-basket-product.dto';
import { BasketProductUserDataModel } from './models/basket-product.model';
import { BasketDataModel } from './models/basket.model';

@Injectable()
export class BasketService {
  constructor(
    @InjectModel(BasketDataModel)
    private basketRepository: typeof BasketDataModel,
    @InjectModel(BasketProductUserDataModel)
    private basketProductRepository: typeof BasketProductUserDataModel,
    @InjectModel(ProductDatabaseModel)
    private productRepository: typeof ProductDatabaseModel,
    private jwtService: JwtService,
  ) {}

  async createBasket(dto: CreateBasketDto) {
    try {
      const basket = await this.basketRepository.create({
        ...dto,
      });
      return basket;
    } catch {
      throw new HttpException(
        'Неудалось выполнить операцию. Повторить позднее!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getAllBasket() {
    try {
      const baskets = await this.basketRepository.findAndCountAll();
      return baskets;
    } catch {
      throw new HttpException(
        'Неудалось выполнить операцию. Повторить позднее!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getOneBasket(id: number) {
    const basket = await this.basketRepository.findOne({
      where: { id: id },
    });
    if (!basket) {
      throw new HttpException('Корзина не найдена!', HttpStatus.BAD_REQUEST);
    }
    return basket;
  }

  async deleteBasket(id: number) {
    const basket = await this.basketRepository.findOne({
      where: { id: id },
    });
    if (!basket) {
      throw new HttpException('Корзина не найдена!', HttpStatus.BAD_REQUEST);
    }
    try {
      await this.basketProductRepository.destroy({
        where: { basketId: basket.id },
      });
      await this.basketRepository.destroy({
        where: { id: id },
      });
    } catch {
      throw new HttpException(
        'Неудалось выполнить операцию. Повторить позднее!',
        HttpStatus.BAD_REQUEST,
      );
    }
    return 'Корзина удалена!';
  }

  async addProduct(dto: AddProductInBasketDto, req: any) {
    try {
      const token = req.headers.authorization.split(' ')[1]; // Bearer asfasnfkajsfnjk
      if (!token) {
        return new HttpException('Не авторизован!', HttpStatus.UNAUTHORIZED);
      }
      const user = this.jwtService.verify(token);
      const basket = await this.basketRepository.findOne({
        where: { userId: user['id'] },
      });

      if (basket) {
        await this.basketProductRepository.create({
          sizeId: dto.sizeId,
          productId: dto.productId,
          count: dto.count,
          basketId: basket['id'],
        });
      }

      return 'Товар добавлен!';
    } catch {
      throw new HttpException(
        'Неудалось выполнить операцию. Повторить позднее!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getProductFromBasket(req: any) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const user = this.jwtService.verify(token);

      const basket = await this.basketRepository.findOne({
        where: { userId: user['id'] },
      });
      const basketProduct = await this.basketProductRepository.findAll({
        where: { basketId: basket['id'] },
      });

      const basketArr = [];

      for (let i = 0; i < basketProduct.length; i++) {
        let products = await this.productRepository.findOne({
          where: {
            id: basketProduct[i].productId,
          },
          include: {
            model: ProductSizeDatabaseModel,
          },
        });

        const size = { sizeId: basketProduct[i].sizeId };
        const count = { count: basketProduct[i].count };
        const resultOne = Object.assign(products.dataValues, size);
        const result = Object.assign(resultOne, count);

        basketArr.push(result);
      }

      return basketArr;
    } catch {
      throw new HttpException(
        'Неудалось выполнить операцию. Повторить позднее!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async changeCountProductInBasket(
    dto: ChangeCountProductInBasketDto,
    req: any,
  ) {
    const token = req.headers.authorization.split(' ')[1];
    const user = this.jwtService.verify(token);

    const basket = await this.basketRepository.findOne({
      where: { userId: user['id'] },
    });

    if (dto.action == '-') {
      await this.basketProductRepository.update(
        {
          count: Sequelize.literal('count - 1'),
        },
        {
          where: {
            basketId: basket['id'],
            productId: dto.productId,
            sizeId: dto.sizeId,
          },
        },
      );
      return 'Количество уменьшено!';
    } else if (dto.action == '+') {
      await this.basketProductRepository.update(
        {
          count: Sequelize.literal('count + 1'),
        },
        {
          where: {
            basketId: basket['id'],
            productId: dto.productId,
            sizeId: dto.sizeId,
          },
        },
      );
      return 'Количество уменьшено!';
    } else {
      throw new HttpException(
        'Неудалось выполнить операцию. Повторить позднее!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async deleteProductFromBasket(req: any, dto: AddProductInBasketDto) {
    const token = req.headers.authorization.split(' ')[1];
    const user = this.jwtService.verify(token);

    const basket = await this.basketRepository.findOne({
      where: { userId: user['id'] },
    });

    try {
      await this.basketProductRepository.destroy({
        where: {
          productId: dto.productId,
          sizeId: dto.sizeId,
          basketId: basket.id,
        },
      });

      return 'Товар удален!';
    } catch {
      throw new HttpException(
        'Неудалось выполнить операцию. Повторить позднее!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
