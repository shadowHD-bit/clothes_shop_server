import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { OrderDatabaseModel } from '../orders/model/order.model';
import { OrderProductUserDataModel } from '../orders/model/order-product.model';
import sequelize from 'sequelize';
import { User } from '../users/users.model';

@Injectable()
export class StatisticsService {
  constructor(
    @InjectModel(User) private UserRepository: typeof User,
    @InjectModel(OrderDatabaseModel)
    private orderRepository: typeof OrderDatabaseModel,
    @InjectModel(OrderProductUserDataModel)
    private orderProductRepository: typeof OrderProductUserDataModel,
  ) {}

  async getCountUserInMonth() {
    const users = await this.UserRepository.findAll({
      attributes: [
        [
          sequelize.fn("DATE_TRUNC", "month", sequelize.col("createdAt")),
          "month",
        ],
        [sequelize.fn("COUNT", "id"), "totalCount"],
      ],
      group: [sequelize.fn("date_trunc", "month", sequelize.col("createdAt"))],
      order: [sequelize.fn("date_trunc", "month", sequelize.col("createdAt"))]
    });

    return users;
  }

  async getCountOrdersInMonth() {
    const orders = await this.orderRepository.findAll({
      attributes: [
        [
          sequelize.fn("DATE_TRUNC", "month", sequelize.col("createdAt")),
          "month",
        ],
        [sequelize.fn("COUNT", "id"), "totalCount"],
      ],
      group: [sequelize.fn("date_trunc", "month", sequelize.col("createdAt"))],
      order: [sequelize.fn("date_trunc", "month", sequelize.col("createdAt"))],
    });

    return orders;
  }





}
