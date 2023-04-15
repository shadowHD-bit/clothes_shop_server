import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import {
  HttpException,
  UnauthorizedException,
} from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt/dist';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from '../core/users/dto/create-user.dto';
import { LoginUserDto } from '../core/users/dto/login-user.dto';
import { User } from '../core/users/users.model';
import { UsersService } from '../core/users/users.service';
import { BasketDataModel } from '../core/basket/models/basket.model';
import { LikeDatabaseModel } from '../core/likes/models/likes.model';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    @InjectModel(LikeDatabaseModel)
    private likeRepository: typeof LikeDatabaseModel,
    @InjectModel(BasketDataModel)
    private basketRepository: typeof BasketDataModel,
  ) {}

  async login(userDto: LoginUserDto) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }

  async registration(userDto: CreateUserDto) {
    try {
      const candidate = await this.userService.getUserByEmail(userDto.email);
      if (candidate) {
        throw new HttpException(
          'Этот адрес электронной почты уже используется!',
          HttpStatus.BAD_REQUEST,
        );
      }
      const hashPassword = await bcrypt.hash(userDto.password, 5);
      const user = await this.userService.createUser({
        ...userDto,
        password: hashPassword,
      });

      await this.basketRepository.create({ userId: user.id })
      await this.likeRepository.create({ userId: user.id })

      return this.generateToken(user);
    } catch {
      throw new HttpException(
        'Неудалось выполнить операцию. Повторить позднее!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async generateToken(user: User) {
    const payload = { id: user.id, email: user.email, role: user.role };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(userDto: LoginUserDto) {
    const isBanned = await this.userService.isBannedUserByEmail(userDto.email);
    const user = await this.userService.getUserByEmail(userDto.email);
    if (!user) {
      throw new UnauthorizedException({
        message: 'Некорректный адрес электронной почты или пароль!',
      });
    }
    const passwordEquals = await bcrypt.compare(
      userDto.password,
      user.password,
    );
    if (!passwordEquals) {
      throw new UnauthorizedException({
        message: 'Некорректный адрес электронной почты или пароль!',
      });
    }
    if (isBanned) {
      throw new UnauthorizedException({
        message: isBanned.reason,
      });
    }

    return user;
  }
}
