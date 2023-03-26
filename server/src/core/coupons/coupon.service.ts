import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcryptjs';
import { CouponDatabaseModel } from './coupon.model';
import { CouponDto } from './dto/coupon.dto';

@Injectable()
export class CouponsService {
  constructor(
    @InjectModel(CouponDatabaseModel)
    private couponRepository: typeof CouponDatabaseModel,
  ) {}

  async createCoupon(dto: CouponDto) {
    try {
      const coupon = await this.couponRepository.create({
        ...dto,
      });
      return coupon;
    } catch {
      throw new HttpException(
        'Неудалось выполнить операцию. Повторить позднее!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getAllCoupon() {
    try {
      const coupons = await this.couponRepository.findAndCountAll();
      return coupons;
    } catch {
      throw new HttpException(
        'Неудалось выполнить операцию. Повторить позднее!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getOneCoupon(code: string) {
    const coupon = await this.couponRepository.findOne({
      where: { code: code },
    });
    if (!coupon) {
      throw new HttpException('Купон не найден!', HttpStatus.BAD_REQUEST);
    }
    return coupon;
  }

  async deleteCoupon(id: number) {
    const coupon = await this.couponRepository.findOne({
      where: { id: id },
    });
    if (!coupon) {
      throw new HttpException('Купон не найден!', HttpStatus.BAD_REQUEST);
    }
    try {
      await this.couponRepository.destroy({
        where: { id: id },
      });
    } catch {
      throw new HttpException(
        'Неудалось выполнить операцию. Повторить позднее!',
        HttpStatus.BAD_REQUEST,
      );
    }
    return 'Купон удален!';
  }
}
