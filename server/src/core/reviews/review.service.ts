import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from 'src/files/files.service';
import { ProductDatabaseModel } from '../products/product.model';
import { User } from '../users/users.model';
import { ReviewDto } from './dto/review.dto';
import { ReviewDatabaseModel } from './review.model';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(ReviewDatabaseModel)
    private reviewRepository: typeof ReviewDatabaseModel,
    private fileService: FilesService,
  ) {}

  async createReview(dto: ReviewDto, files: any) {
    try {
      if (files.imgFirst && !files.imgSecond && !files.imgThird) {
        const imgFirst = await this.fileService.createFile(
          files.imgFirst[0],
          'reviews',
        );
        const review = await this.reviewRepository.create({
          ...dto,
          imgFirst: imgFirst,
        });
        return review;
      } else if (files.imgFirst && files.imgSecond && !files.imgThird) {
        const imgFirst = await this.fileService.createFile(
          files.imgFirst[0],
          'reviews',
        );
        const imgSecond = await this.fileService.createFile(
          files.imgSecond[0],
          'reviews',
        );
        const review = await this.reviewRepository.create({
          ...dto,
          imgFirst: imgFirst,
          imgSecond: imgSecond,
        });
        return review;
      } else if (files.imgFirst && files.imgSecond && files.imgThird) {
        const imgFirst = await this.fileService.createFile(
          files.imgFirst[0],
          'reviews',
        );
        const imgSecond = await this.fileService.createFile(
          files.imgSecond[0],
          'reviews',
        );
        const imgThird = await this.fileService.createFile(
          files.imgThird[0],
          'reviews',
        );
        const review = await this.reviewRepository.create({
          ...dto,
          imgFirst: imgFirst,
          imgSecond: imgSecond,
          imgThird: imgThird,
        });
        return review;
      } else if (!files.imgFirst && !files.imgSecond && !files.imgThird) {
        const review = await this.reviewRepository.create({
          ...dto,
        });
        return review;
      } else {
        throw new HttpException(
          'Неудалось выполнить операцию. Повторить позднее!',
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch {
      throw new HttpException(
        'Неудалось выполнить операцию. Повторить позднее!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async deleteReview(id: number) {
    const review = await this.reviewRepository.findOne({
      where: { id: id },
    });

    if (!review) {
      throw new HttpException('Неудалось найти отзыв!', HttpStatus.BAD_REQUEST);
    }

    try {
      await this.reviewRepository.destroy({
        where: { id: id },
      });
      if(review.imgFirst){
        this.fileService.deleteFile(review.imgFirst, 'reviews')
      }
      if(review.imgSecond){
        this.fileService.deleteFile(review.imgSecond, 'reviews')
      }
      if(review.imgThird){
        this.fileService.deleteFile(review.imgThird, 'reviews')
      }
      return 'Отзыв удален!';
    } catch {
      throw new HttpException(
        'Неудалось выполнить операцию. Повторить позднее!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getReviewOneProduct(id: number) {
    try {
      const reviews = await this.reviewRepository.findAll({
        where: { productId: id, isChecked: true },
        include: [
          {
            model: User,
            required: true,
          },
        ],
      });

      return reviews;
    } catch {
      throw new HttpException(
        'Неудалось выполнить операцию. Повторить позднее!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getReviewOneProductChecked(id: number) {
    try {
      const reviews = await this.reviewRepository.findAll({
        where: { productId: id, isChecked: true },
        include: [
          {
            model: User,
            required: true,
          },
        ],
      });

      return reviews;
    } catch {
      throw new HttpException(
        'Неудалось выполнить операцию. Повторить позднее!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getAllReview() {
    try {
      const reviews = await this.reviewRepository.findAndCountAll({
        include: [
          {
            model: User,
            required: true,
          },
          {
            model: ProductDatabaseModel,
            required: true,
          },
        ],
      });

      return reviews;
    } catch {
      throw new HttpException(
        'Неудалось выполнить операцию. Повторить позднее!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async changeStatusReview(id: number) {
    const review = await this.reviewRepository.findOne({
      where: { id: id },
    });

    if (!review) {
      throw new HttpException(
        'Неудалось найти отзыв. Повторить позднее!',
        HttpStatus.NOT_FOUND,
      );
    }
    try {
      await this.reviewRepository.update(
        {
          isChecked: !review.isChecked,
        },
        {
          where: { id: id },
        },
      );

      return 'Статус обновлен!';
    } catch {
      throw new HttpException(
        'Неудалось выполнить операцию. Повторить позднее!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getAllReviewNonChecked() {
    try {
      const reviews = await this.reviewRepository.findAndCountAll({
        where: { isChecked: true },
        include: [
          {
            model: User,
            required: true,
          },
        ],
      });

      return reviews;
    } catch {
      throw new HttpException(
        'Неудалось выполнить операцию. Повторить позднее!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
