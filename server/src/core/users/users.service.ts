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
import { Op, Sequelize } from 'sequelize';
import sequelize from 'sequelize';
import { BannedUserModel } from './users-banned.model';
import { BannedUserDto } from './dto/banned-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private UserRepository: typeof User,
    @InjectModel(BannedUserModel)
    private UserBannedRepository: typeof BannedUserModel,
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

  async getAllUsersForAdmin(limit: number, page: number, name: string) {
    limit = limit || 9;
    page = page || 1;
    let offset = limit * page - limit;

    const users = await this.UserRepository.findAndCountAll({
      where: Sequelize.where(
        Sequelize.fn(
          'CONCAT',
          Sequelize.col('firstName'),
          ' ',
          Sequelize.col('secondName'),
        ),
        {
          [Op.like]: `%${name}%`,
        },
      ),
      include: [
        {
          model: BannedUserModel,
        },
      ],
      limit: limit,
      offset: offset,
    });
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
              OrderProductUserDataModel.sequelize.literal(
                'price * countproduct',
              ),
              'totalPrice',
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
    try{
      const user = await this.UserRepository.findOne({
        where: { email: email },
        include: { all: true },
      });
      return user;
    }
    catch(e){
      throw new HttpException(
        'Пользователь с данным адресом электронной почты не найден!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async isBannedUserByEmail(email: string) {
    const user = await this.UserBannedRepository.findOne({
      where: { email: email },
    });
    return user;
  }

  async isBannedUserById(id: number) {
    const user = await this.UserBannedRepository.findOne({
      where: { userId: id },
    });
    return user;
  }

  async bannedUser(dto: BannedUserDto, req: any) {
    const token = req.headers.authorization.split(' ')[1];
    const user = this.jwtService.verify(token);

    if (user['id'] == dto.userId) {
      throw new HttpException(
        'Операция не удалась! Вы не можете забанить самого себя!',
        HttpStatus.BAD_REQUEST,
      );
    }
    try {
      await this.UserBannedRepository.create({
        ...dto,
        adminId: user['id'],
      });
      return 'Пользователь забанен!';
    } catch (e) {
      throw new HttpException(
        'Операция не удалась! Повторите позднее...',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async unbannedUser(userId: number, email: string) {
    try {
      const userUnbanned = await this.UserBannedRepository.destroy({
        where: {
          userId: userId,
          email: email,
        },
      });
      return 'Пользователь разбанен!';
    } catch (e) {
      throw new HttpException(
        'Операция не удалась! Повторите позднее...',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async changeRoleUser(role: string, id: number, req: any) {
    const candidate = await this.UserRepository.findOne({
      where: { id: id },
    });

    const token = req.headers.authorization.split(' ')[1];
    const user = this.jwtService.verify(token);

    if (user['id'] == id) {
      throw new HttpException(
        'Операция не удалась! Вы не можете изменить роль самому себе!',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!candidate) {
      throw new HttpException('Пользователь не найден!', HttpStatus.NOT_FOUND);
    } else {
      this.UserRepository.update(
        {
          role: role,
        },
        {
          where: { id: id },
        },
      );

      return 'Роль обновлена!';
    }
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
