import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Sequelize } from 'sequelize';
import { BasketProductUserDataModel } from '../basket/models/basket-product.model';
import { BasketDataModel } from '../basket/models/basket.model';
import { NotificationService } from '../notification/notification.service';
import { ProductBrandDatabaseModel } from '../products/product-brands/product-brand.model';
import { ProductTypeDatabaseModel } from '../products/product-types/product-type.model';
import { ProductDatabaseModel } from '../products/product.model';
import { ReviewDatabaseModel } from '../reviews/review.model';
import { ProductSizeDatabaseModel } from '../sizes/models/size-product.model';
import { SizeDatabaseModel } from '../sizes/models/size.model';
import { OrderDetailDto } from './dto/order-details.dto';
import { GetOrderCompleteDto } from './dto/order-get-complete.dto';
import { OrderDetailsUserDatabaseModel } from './model/order-details.model';
import { OrderProductUserDataModel } from './model/order-product.model';
import { OrderDatabaseModel } from './model/order.model';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(OrderDatabaseModel)
    private orderRepository: typeof OrderDatabaseModel,
    @InjectModel(OrderProductUserDataModel)
    private orderProductRepository: typeof OrderProductUserDataModel,
    @InjectModel(BasketDataModel)
    private basketRepository: typeof BasketDataModel,
    @InjectModel(BasketProductUserDataModel)
    private basketProductRepository: typeof BasketProductUserDataModel,
    @InjectModel(ProductDatabaseModel)
    private productRepository: typeof ProductDatabaseModel,
    @InjectModel(OrderDetailsUserDatabaseModel)
    private orderDetailRepository: typeof OrderDetailsUserDatabaseModel,
    @InjectModel(SizeDatabaseModel)
    private sizeRepository: typeof SizeDatabaseModel,
    @InjectModel(ProductSizeDatabaseModel)
    private productSizeRepository: typeof ProductSizeDatabaseModel,
    private notificationService: NotificationService,
    private jwtService: JwtService,
  ) {}

  async createOrder(dto: OrderDetailDto, req: any) {
    // try{
    const token = req.headers.authorization.split(' ')[1];
    const user = this.jwtService.decode(token);

    const basket = await this.basketRepository.findOne({
      where: { userId: user['id'] },
    });

    if (!basket) {
      throw new HttpException('Корзина не найдена!', HttpStatus.NOT_FOUND);
    }

    const basketProducts = await this.basketProductRepository.findAll({
      where: { basketId: basket['id'] },
    });

    if (!basketProducts) {
      throw new HttpException('Корзина пустая!', HttpStatus.NOT_FOUND);
    }

    const order = await this.orderRepository.create({
      isComplete: false,
      userId: user['id'],
    });

    await this.orderDetailRepository.create({
      ...dto,
      orderId: order['id'],
    });

    for (let productInBasket of basketProducts) {
      const product = await this.productRepository.findOne({
        where: { id: productInBasket['productId'] },
      });
      const size = await this.sizeRepository.findOne({
        where: { id: productInBasket['sizeId'] },
      });

      const countProduct = await this.productSizeRepository.findOne({
        where: {
          productId: productInBasket['productId'],
          sizeId: productInBasket['sizeId'],
        },
      });

      if (countProduct.count != 0) {
        await this.productSizeRepository.update(
          {
            count: Sequelize.literal(
              `count - ${productInBasket['count'].toString()}`,
            ),
          },
          {
            where: {
              productId: productInBasket['productId'],
              sizeId: productInBasket['sizeId'],
            },
          },
        );

        const countProductAll =
          await this.productSizeRepository.findAndCountAll({
            where: {
              count: { [Op.ne]: 0 },
              productId: productInBasket['productId'],
            },
          });

        if (countProductAll.count == 0) {
          this.productRepository.update(
            {
              isDisplay: false,
            },
            {
              where: {
                id: productInBasket['productId'],
              },
            },
          );
        }

        await this.orderProductRepository.create({
          countproduct: productInBasket.count,
          productId: productInBasket.productId,
          orderId: order['id'],
          price: product['price'],
          sizeProduct: size['size'],
        });
      }
    }

    await this.basketProductRepository.destroy({
      where: { basketId: basket['id'] },
    });

    await this.notificationService.createMessageUser({
      userId: user['id'],
      message: `Ваш заказ №${order.id} успешно оформлен! Мы уведомим вас, когда товар приедет к вам.`,
    });

    return 'Ваш заказ оформлен!';
    // }catch{
    //   throw new HttpException('Неудалось выполнить операцию!', HttpStatus.BAD_REQUEST);
    // }
  }

  async updateStatusOrder(id: number, dto: GetOrderCompleteDto) {
    const order = await this.orderRepository.findOne({ where: { id } });
    if (!order) {
      throw new HttpException('Заказ не найден!', HttpStatus.NOT_FOUND);
    }
    await this.orderRepository.update(
      { isComplete: dto.isComplete },
      { where: { id: id } },
    );
    if (dto.isComplete) {
      this.notificationService.createMessageUser({
        userId: order.userId,
        message: `Ваш заказ №${id} успешно прибыл в пунк назначения! Ждем ваш отзыв по данному товару.`,
      });
    }
    return 'Статус изменен!';
  }

  async deleteOrder(id: number) {
    const order = await this.orderRepository.findOne({ where: { id: id } });
    if (!order) {
      throw new HttpException('Заказ не найден!', HttpStatus.NOT_FOUND);
    }
    try {
      await this.orderDetailRepository.destroy({ where: { orderId: id } });
      await this.orderProductRepository.destroy({ where: { orderId: id } });
      await this.orderRepository.destroy({ where: { id: id } });
      return 'Заказ удален!';
    } catch (e) {
      throw new HttpException('Неизвестная ошибка!', HttpStatus.BAD_REQUEST);
    }
  }

  async getAllOrder(limit: number, page: number, complete: string) {
    page = page || 1;
    limit = limit || 7;
    let offset = page * limit - limit;
    let products;
    if (complete === 'not-completed') {
      products = await this.orderRepository.findAndCountAll({
        where: { isComplete: false },
        limit,
        offset,
      });
    } else if (complete === 'completed') {
      products = await this.orderRepository.findAndCountAll({
        where: { isComplete: true },
        limit,
        offset,
      });
    } else {
      products = await this.orderRepository.findAndCountAll({
        limit,
        offset,
      });
    }

    return products;
  }

  async getOneOrder(id: number) {
    let orderData = {};

    let prod;
    let infoProducts = [];

    const order = await this.orderRepository.findOne({
      where: { id },
      include: [
        {
          model: OrderDetailsUserDatabaseModel,
        },
      ],
    });
    orderData['description'] = order;

    prod = await this.orderProductRepository.findAll({
      attributes: ['productId', 'countproduct', 'sizeProduct'],
      where: { orderId: order.id },
    });

    const orderDetail = await this.orderDetailRepository.findOne({
      where: { orderId: id },
    });
    orderData['detail'] = orderDetail;

    for (let product of prod) {
      const productData = await this.productRepository.findOne({
        attributes: ['id', 'name', 'imgMain', 'price'],
        where: { id: product.productId },
        include: [
          {
            attributes: ['name'],
            model: ProductTypeDatabaseModel,
          },
          {
            attributes: ['name'],
            model: ProductBrandDatabaseModel,
          },
          {
            model: ReviewDatabaseModel,
            where: {
              userId: orderData['description'].userId,
            },
            required: false,
          },
        ],
      });

      let newObject = {
        description: productData,
        count: product.countproduct,
        size: product.sizeProduct,
      };
      infoProducts.push(newObject);
    }
    orderData['products'] = infoProducts;

    return orderData;
  }

  async getOneUserOrders(
    userId: number,
    limit: number,
    page: number,
    complete: string,
  ) {
    page = page || 1;
    limit = limit || 7;
    let offset = page * limit - limit;
    let products;
    if (complete === 'not-completed') {
      products = await this.orderRepository.findAndCountAll({
        where: { isComplete: false, userId: userId },
        limit,
        offset,
      });
    } else if (complete === 'completed') {
      products = await this.orderRepository.findAndCountAll({
        where: { isComplete: true, userId: userId },
        limit,
        offset,
      });
    } else {
      products = await this.orderRepository.findAndCountAll({
        where: { userId: userId },
        limit,
        offset,
      });
    }

    return products;
  }
}
