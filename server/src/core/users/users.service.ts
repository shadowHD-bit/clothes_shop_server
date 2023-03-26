import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './users.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { OrderDatabaseModel } from '../orders/model/order.model';
import { OrderProductUserDataModel } from '../orders/model/order-product.model';
import { UpdateUserDto } from './dto/update-user.dto';
import { FilesService } from '../../files/files.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private UserRepository: typeof User,
    private jwtService: JwtService,
    @InjectModel(OrderDatabaseModel)
    private orderRepository: typeof OrderDatabaseModel,
    private fileService: FilesService,
  ) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.UserRepository.create(dto);
    return user;
  }

  async getAllUsers() {
    const users = await this.UserRepository.findAndCountAll();
    return users;
  }

  async getNewUser() {
    const users = await this.UserRepository.findAll({
      order: [['createdAt', 'DESC']],
      limit: 5,
    });
    return users;
  }

  async getMoneyUser() {
    const users = await this.orderRepository.findAll({
      attributes: [],
      include: [
        {
          model: OrderProductUserDataModel,
          attributes: [
            'price',
            'countproduct',
            'id',
            [
              OrderProductUserDataModel.sequelize.literal('price * countproduct'),
              "totalPrice",
            ],
          ],
        },
        {
          model: User,
          attributes: [
            'id',
            'firstName',
            'secondName',
            'avatar',
            'isVkAccount',
            'isGoogleAccount',
          ],
        },
      ],
      group: [
        'OrderDatabaseModel.id',
        'order_products.price',
        'order_products.id',
        'user.id',
      ],
    });

    return users;
  }

  async getAdmin() {
    const users = await this.UserRepository.findAndCountAll({
      where: { role: 'ADMIN' },
    });
    return users;
  }

  async getOneUserById(id: number) {
    const user = await this.UserRepository.findOne({
      where: { id: id },
    });

    if (!user) {
      throw new HttpException('Пользователь не найден!', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async checkAuth(req: any) {
    const token = req.headers.authorization.split(' ')[1]; // Bearer asfasnfkajsfnjk
    if (!token) {
      return new HttpException('Не авторизован!', HttpStatus.UNAUTHORIZED);
    }
    const decoded = this.jwtService.verify(token);
    const payload = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
    };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  async getUserByEmail(email: string) {
    const user = await this.UserRepository.findOne({
      where: { email: email },
      include: { all: true },
    });
    return user;
  }

  async updateUserPassword(password: string, id: number) {
    const candidate = await this.UserRepository.findOne({
      where: { id: id },
    });

    if (!candidate) {
      throw new HttpException('Пользователь не найден!', HttpStatus.NOT_FOUND);
    } else {
      const hashPassword = await bcrypt.hash(password, 5);
      await this.UserRepository.update(
        {
          password: hashPassword,
        },
        {
          where: {
            id: id,
          },
        },
      );
      return 'Пароль обновлен!';
    }
  }

  async updateAvatar(id: number, avatar: any) {
    const user = await User.findOne({ where: { id: id } });
    if (user) {
      if (avatar) {
        try {
          const imgAvatarName = await this.fileService.createFile(
            avatar,
            'avatars',
          );
          await User.update(
            {
              avatar: imgAvatarName,
            },
            { where: { id: id } },
          );
          return 'Аватар обновлен!';
        } catch {
          throw new HttpException(
            'Операция не удалась! Обратитесь к администратору',
            HttpStatus.BAD_REQUEST,
          );
        }
      }
    }
  }

  async updateDataUser(dto: UpdateUserDto, id: number) {
    try {
      const user = await User.findOne({ where: { id: id } });

      if (user) {
        await User.update(
          {
            ...dto,
          },
          { where: { id: id } },
        );
        return 'Данные обновлены!';
      } else {
        throw new HttpException(
          'Пользователь не найден!',
          HttpStatus.NOT_FOUND,
        );
      }
    } catch (e) {
      throw new HttpException(
        'Операция не удалась! Обратитесь к администратору',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
