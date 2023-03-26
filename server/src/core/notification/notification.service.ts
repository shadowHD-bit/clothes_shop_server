import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { MessageDto } from './dto/message.dto';
import { NotificationDto } from './dto/notification.dto';
import { NotificationDatabaseModel } from './notification.model';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(NotificationDatabaseModel)
    private notificationRepository: typeof NotificationDatabaseModel,
    private userService: UsersService,
  ) {}

  async createMessageUser(dto: NotificationDto) {
    try {
      await this.notificationRepository.create({
        message: dto.message,
        userId: dto.userId,
      });
      return 'Сообщение создано!';
    } catch {
      throw new HttpException(
        'Произошла непредвиденная ошибка! Уведомление не отправлено...',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async createMessageAllUsers(messageDto: MessageDto) {
    try {
      const users = await this.userService.getAllUsers();
      let dataMessages = [];
      users.rows.forEach((user) => {
        dataMessages.push({ message: messageDto.message, userId: user.id });
      });

      this.notificationRepository.bulkCreate(dataMessages);

      return 'Уведомления созданы!';
    } catch {
      throw new HttpException(
        'Произошла непредвиденная ошибка! Уведомления не получены...',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getMessageByUser(id: number) {
    try {
      const messages = await this.notificationRepository.findAndCountAll({
        where: { userId: id },
      });
      return messages;
    } catch {
      throw new HttpException(
        'Произошла непредвиденная ошибка! Уведомления не получены...',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async deleteMessage(id: number) {
    const isMessage = await this.notificationRepository.findOne({
      where: { id: id },
    });
    if (!isMessage) {
      throw new HttpException(
        'Данного уведомления нет в базе данных!',
        HttpStatus.NOT_FOUND,
      );
    }
    await this.notificationRepository.destroy({
      where: { id: id },
    });
    return 'Уведомление удалено!';
  }
}
