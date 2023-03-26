import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { ProductParamsDatabaseModel } from '../products/product-params/product-params.model';
import { ProductDatabaseModel } from '../products/product.model';
import { AddProductInLikeDto } from './dto/add-product.dto';
import { CreateLikeDto } from './dto/create-likes.dto';
import { LikeProductUserDataModel } from './models/like-products.model';
import { LikeDatabaseModel } from './models/likes.model';

@Injectable()
export class LikeService {
  constructor(
    @InjectModel(LikeDatabaseModel)
    private likeRepository: typeof LikeDatabaseModel,
    @InjectModel(LikeProductUserDataModel)
    private likeProductRepository: typeof LikeProductUserDataModel,
    @InjectModel(ProductDatabaseModel)
    private productRepository: typeof ProductDatabaseModel,
    private jwtService: JwtService,
  ) {}

  async createLike(dto: CreateLikeDto) {
    try {
      const like = await this.likeRepository.create({
        ...dto,
      });
      return like;
    } catch {
      throw new HttpException(
        'Неудалось выполнить операцию. Повторить позднее!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getAllLikes() {
    try {
      const likes = await this.likeRepository.findAndCountAll();
      return likes;
    } catch {
      throw new HttpException(
        'Неудалось выполнить операцию. Повторить позднее!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getOneLike(id: number) {
    const like = await this.likeRepository.findOne({
      where: { id: id },
    });
    if (!like) {
      throw new HttpException(
        'Корзина понравившихся не найдена!',
        HttpStatus.BAD_REQUEST,
      );
    }
    return like;
  }

  async deleteLikeCart(id: number) {
    const like = await this.likeRepository.findOne({
      where: { id: id },
    });
    if (!like) {
      throw new HttpException(
        'Корзина понравившегося не найдена!',
        HttpStatus.BAD_REQUEST,
      );
    }
    try {
      await this.likeProductRepository.destroy({
        where: { likeId: like.id },
      });
      await this.likeRepository.destroy({
        where: { id: id },
      });
    } catch {
      throw new HttpException(
        'Неудалось выполнить операцию. Повторить позднее!',
        HttpStatus.BAD_REQUEST,
      );
    }
    return 'Корзина понравившегося удалена!';
  }

  async addProduct(id: number, req: any) {
   try {
      const token = req.headers.authorization.split(' ')[1];
      const user = this.jwtService.decode(token);

      const like = await this.likeRepository.findOne({
        where: { userId: user['id'] },
      });

      await this.likeProductRepository.create({
        productId: id,
        likeId: like['id'],
      });

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
      const user = this.jwtService.decode(token);

      const like = await this.likeRepository.findOne({
        where: { userId: user['id'] },
      });
      const likeProduct = await this.likeProductRepository.findAll({
        where: { likeId: like['id'] },
      });

      const likeArr = [];

      for (let i = 0; i < likeProduct.length; i++) {
        let products = await this.productRepository.findOne({
          where: {
            id: likeProduct[i].productId,
          },
          include: {
            model: ProductParamsDatabaseModel,
            as: 'params',
            where: {
              productId: likeProduct[i].productId,
              [Op.or]: [
                {
                  productId: {
                    [Op.not]: null,
                  },
                },
              ],
            },
            required: false,
          },
        });

        likeArr.push(products.dataValues);
      }

      return likeArr;
    } catch {
      throw new HttpException(
        'Неудалось выполнить операцию. Повторить позднее!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async deleteProductFromLike(req: any, id: number) {
    const token = req.headers.authorization.split(' ')[1];
    const user = this.jwtService.decode(token);

    const like = await this.likeRepository.findOne({
      where: { userId: user['id'] },
    });

    try {
      await this.likeProductRepository.destroy({
        where: {
          productId: id,
          likeId: like.id,
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
