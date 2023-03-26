import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/core/users/users.service';
import * as bcrypt from 'bcryptjs';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/core/users/users.model';
import { InjectModel } from '@nestjs/sequelize';
import { JwtService } from '@nestjs/jwt';
import { ResetPasswordCreateDto } from './dto/reser-psw-create.dto';
import { ResetPasswordDatabaseModel } from './reset-psw.model';
import { MailService } from 'src/mail/mail.service';
import { ResetPasswordUpdateDto } from './dto/reset-psw-update.dto';
import { JwtTokenDto } from '../dto/jwt-token.dto';

@Injectable()
export class ResetPasswordService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  async resetPassword(dto: ResetPasswordUpdateDto) {
    const candidate = await ResetPasswordDatabaseModel.findOne({
      where: { token: dto.token },
    });

    if (!candidate) {
      throw new HttpException(
        'Запрос на смену пароле не получен, пожалуйста попробуйте позднее!',
        HttpStatus.NOT_FOUND,
      );
    } else {
      this.userService.updateUserPassword(dto.password, candidate.userId);
      await ResetPasswordDatabaseModel.destroy({
        where: { token: dto.token },
      });
      return 'Данные изменены!';
    }
  }

  async generateTokenLink(userId: number, userEmail: string) {
    const payload = { email: userEmail, id: userId };
    return this.jwtService.sign(payload);
  }

  async createResetPasswordLink(dto: ResetPasswordCreateDto) {
    const candidate = await this.userService.getUserByEmail(dto.email);
    if (!candidate) {
      throw new HttpException(
        'Пользователь с таким адресом электронной почты не найден!',
        HttpStatus.NOT_FOUND,
      );
    } else {
      const currentlyToken = await ResetPasswordDatabaseModel.findOne({
        where: { userId: candidate.id },
      });

      if (currentlyToken) {
        try {
          await ResetPasswordDatabaseModel.destroy({
            where: { userId: candidate.id },
          });
        } catch {
          throw new HttpException(
            'Произошла непредвиденная ошибка!',
            HttpStatus.BAD_REQUEST,
          );
        }
      }

      const token = (
        await this.generateTokenLink(candidate.id, candidate.email)
      ).toString();

      await ResetPasswordDatabaseModel.create({
        userId: candidate.id,
        token: token,
      });

      const link = `${process.env.CLIENT_URL}:${process.env.CLIENT_PORT}/reset-password/${token}`;

      try {
        await this.mailService.sendResetEmail({
          userMail: dto.email,
          link: link,
        });
      } catch {
        throw new HttpException(
          'Произошла непредвиденная ошибка. Письмо не отправленно!',
          HttpStatus.BAD_REQUEST,
        );
      }

      return 'На вашу почту отправлено письмо с ссылкой на странинцу востановления пароля!';
    }
  }

  async checkResetPasswordToken(dto: JwtTokenDto) {
    const isToken = await ResetPasswordDatabaseModel.findOne({
        where: { token: dto.token },
      });
  
      if (!isToken) {
        throw new HttpException(
          'Токен не найден!',
          HttpStatus.NOT_FOUND,
        );
      } else {
        return 'Токен найден!';
      }
  }
}
