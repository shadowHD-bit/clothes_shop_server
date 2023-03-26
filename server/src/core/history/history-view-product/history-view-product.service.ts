import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { ProductDatabaseModel } from 'src/core/products/product.model';
import { AddHistoryViewProductDto } from './dto/history-view-product.dto';
import { HistoryViewProductsDataModel } from './history-view-product.model';

@Injectable()
export class HistoryViewProductService {
  constructor(
    @InjectModel(HistoryViewProductsDataModel)
    private historyRepository: typeof HistoryViewProductsDataModel,
    private jwtService: JwtService,
  ) {}

  async getHistoryUser(req: any) {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1];
      const user = this.jwtService.decode(token);

      const history = await this.historyRepository.findAll({
        where: { userId: user['id'] },
        include: [{ model: ProductDatabaseModel }],
        order: [['createdAt', 'DESC']],
      });
      return history;
    }
    throw new HttpException(
      'Неудалось выполнить операцию. Повторить позднее!',
      HttpStatus.BAD_REQUEST,
    );
  }

  async addProductInHistory(dto: AddHistoryViewProductDto) {
    //try {
      const dataHistory = await this.historyRepository.findOne({
        where: { userId: dto.userId, productId: dto.productId },
      });

      if (dataHistory) {
        await this.historyRepository.destroy({
          where: {
            userId: dataHistory.userId,
            productId: dataHistory.productId,
          },
        });
        await this.historyRepository.create({
          userId: dto.userId,
          productId: dto.productId,
        });
      } else {
        const allHistory = await this.historyRepository.findAndCountAll({
          where: { userId: dto.userId },
        });
        if (allHistory.count == 5) {
          const lastElement = await this.historyRepository.findAll({
            order: [['createdAt', 'ASC']],
            limit: 1,
          });
          await this.historyRepository.destroy({
            where: {
              userId: lastElement[0].userId,
              productId: lastElement[0].productId,
            },
          });

          await this.historyRepository.create({
            userId: dto.userId,
            productId: dto.productId,
          });
        } else {
          await this.historyRepository.create({
            userId: dto.userId,
            productId: dto.productId,
          });
        }

        return 'Товар добавлен в историю';
      }
    // } catch {
    //   throw new HttpException(
    //     'Неудалось выполнить операцию. Повторить позднее!',
    //     HttpStatus.BAD_REQUEST,
    //   );
    // }
  }
}
