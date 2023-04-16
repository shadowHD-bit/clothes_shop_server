import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { OrderProductUserDataModel } from '../orders/model/order-product.model';
import { OrderDatabaseModel } from '../orders/model/order.model';
import { ProductBrandDatabaseModel } from '../products/product-brands/product-brand.model';
import { ProductTypeDatabaseModel } from '../products/product-types/product-type.model';
import { ProductDatabaseModel } from '../products/product.model';
import { User } from '../users/users.model';
import { SizeDatabaseModel } from '../sizes/models/size.model';
import { ProductSizeDatabaseModel } from '../sizes/models/size-product.model';

@Injectable()
export class ExcelService {
  constructor(
    @InjectModel(User)
    private userRepository: typeof User,
    @InjectModel(ProductTypeDatabaseModel)
    private typeRepository: typeof ProductTypeDatabaseModel,
    @InjectModel(ProductBrandDatabaseModel)
    private brandRepository: typeof ProductBrandDatabaseModel,
    @InjectModel(ProductDatabaseModel)
    private productRepository: typeof ProductDatabaseModel,
    @InjectModel(SizeDatabaseModel)
    private sizeRepository: typeof SizeDatabaseModel,
    @InjectModel(ProductSizeDatabaseModel)
    private productSizeRepository: typeof ProductSizeDatabaseModel,
    @InjectModel(OrderDatabaseModel)
    private orderRepository: typeof OrderDatabaseModel,
    @InjectModel(OrderProductUserDataModel)
    private orderProductRepository: typeof OrderProductUserDataModel,
  ) {}

  async getProductToExcel() {
    try {
      const product = await this.productRepository.findAndCountAll({
        attributes: [
          ['id', 'ID'],
          ['name', 'Наименование'],
          ['price', 'Цена'],
        ],
        include: [
          { model: ProductBrandDatabaseModel, attributes: ['name'] },
          { model: ProductTypeDatabaseModel, attributes: ['name'] },
        ],
      });

      return product;
    } catch {
      throw new HttpException(
        'Неудалось выполнить операцию. Повторить позднее!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getRemnants() {
    try {
      const remnants = await this.productSizeRepository.findAndCountAll({
        attributes: [
          ['count', 'Количество'],
        ],
        include: [
          { model: ProductDatabaseModel, attributes: [['name', 'НаименованиеТовара'], ['price', 'ЦенаТовара']] },
          { model: SizeDatabaseModel, attributes: [['size', 'НаименованиеРазмера']] },
        ],
      });

      return remnants;
    } catch {
      throw new HttpException(
        'Неудалось выполнить операцию. Повторить позднее!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getOrderToExcel(complete: string) {
  //  try {
    let products;
    if (complete === "not-completed") {
      products = await this.orderRepository.findAndCountAll({
        attributes: [
          ["isComplete", "Статус_заказа"],
          ["userId", "ID_пользователя"],
          ["createdAt", "Дата_оформления"],
          ["updatedAt", "Дата_завершения"],
        ],
        where: { isComplete: false },
        include: [
          {
            model: OrderProductUserDataModel,
            attributes: [
              ["id", "ID"],
              ["productId", "ID_товара"],
              ["orderId", "ID_заказа"],
              ["count", "Количество_товара"],
            ],
            include: [
              {
                model: ProductDatabaseModel,
                attributes: [
                  ["name", "Наименование_товара"],
                  ["price", "Цена_товара"],
                ],
                include: [
                  { model: ProductBrandDatabaseModel, attributes: ["name"] },
                  { model: ProductTypeDatabaseModel, attributes: ["name"] },
                ],
              },
            ],
          },
          {
            model: User,
            attributes: [
              ["firstName", "Имя"],
              ["firstName", "Фамилия"],
            ],
          },
        ],
        group: ['OrderDatabaseModel.id', 'order_products.id', 'order_products->product.id', 'order_products->product->brand.id', 'order_products->product->type.id', 'user.id']
      });
    } else if (complete === "completed") {
      products = await this.orderRepository.findAndCountAll({
        attributes: [
          ["isComplete", "Статус_заказа"],
          ["userId", "ID_пользователя"],
          ["createdAt", "Дата_оформления"],
          ["updatedAt", "Дата_завершения"],
        ],
        where: { isComplete: true },
        include: [
          {
            model: OrderProductUserDataModel,
            attributes: [
              ["id", "ID"],
              ["productId", "ID_товара"],
              ["orderId", "ID_заказа"],
              ["count", "Количество_товара"],
            ],
            include: [
              {
                model: ProductDatabaseModel,
                attributes: [
                  ["name", "Наименование_товара"],
                  ["price", "Цена_товара"],
                ],
                include: [
                  { model: ProductBrandDatabaseModel, attributes: ["name"] },
                  { model: ProductTypeDatabaseModel, attributes: ["name"] },
                ],
              },
            ],
          },
          {
            model: User,
            attributes: [
              ["firstName", "Имя"],
              ["firstName", "Фамилия"],
            ],
          },
        ],
        group: ['OrderDatabaseModel.id', 'order_products.id', 'order_products->product.id', 'order_products->product->brand.id', 'order_products->product->type.id', 'user.id']
      });
    } else {
      products = await this.orderRepository.findAndCountAll({
        attributes: [
          ["isComplete", "Статус_заказа"],
          ["userId", "ID_пользователя"],
          ["createdAt", "Дата_оформления"],
          ["updatedAt", "Дата_завершения"],
        ],
        include: [
          {
            model: OrderProductUserDataModel,
            attributes: [
              ["id", "ID"],
              ["productId", "ID_товара"],
              ["orderId", "ID_заказа"],
              ["count", "Количество_товара"],
            ],
            include: [
              {
                model: ProductDatabaseModel,
                attributes: [
                  ["name", "Наименование_товара"],
                  ["price", "Цена_товара"],
                ],
                include: [
                  { model: ProductBrandDatabaseModel, attributes: ["name"] },
                  { model: ProductTypeDatabaseModel, attributes: ["name"] },
                ],
              },
            ],
          },
          {
            model: User,
            attributes: [
              ["firstName", "Имя"],
              ["firstName", "Фамилия"],
            ],
          },
        ],
        group: ['OrderDatabaseModel.id', 'order_products.id', 'order_products->product.id', 'order_products->product->brand.id', 'order_products->product->type.id', 'user.id']
      });
    }

    return products;
  // } catch {
  //   throw new HttpException(
  //     'Неудалось выполнить операцию. Повторить позднее!',
  //     HttpStatus.BAD_REQUEST,
  //   );
  // }
  }

  async getTypeToExcel() {
    try {
      const types = await this.typeRepository.findAll({
        attributes: [
          ['id', 'Номер'],
          ['name', 'Наименование'],
          ['createdAt', 'Дата_добавления'],
        ],
      });

      return types;
    } catch {
      throw new HttpException(
        'Неудалось выполнить операцию. Повторить позднее!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getBrandToExcel() {
    try {
      const brands = await this.brandRepository.findAll({
        attributes: [
          ['id', 'Номер'],
          ['name', 'Наименование'],
          ['createdAt', 'Дата_добавления'],
        ],
      });
      return brands;
    } catch {
      throw new HttpException(
        'Неудалось выполнить операцию. Повторить позднее!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getUsersToExcel() {
    try {
      const users = await this.userRepository.findAll({
        attributes: [
          ['firstName', 'Имя'],
          ['secondName', 'Фамилия'],
          ['dateBirthday', 'Дата_рождения'],
          ['role', 'Роль'],
          ['createdAt', 'Дата_регистрации'],
        ],
      });

      return users;
    } catch {
      throw new HttpException(
        'Неудалось выполнить операцию. Повторить позднее!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getAllFaq() {
    try {
    } catch {
      throw new HttpException(
        'Неудалось выполнить операцию. Повторить позднее!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
