import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger/dist';
import { ApiTags } from '@nestjs/swagger/dist/decorators/api-use-tags.decorator';
import { MessageDto } from './dto/message.dto';
import { NotificationDto } from './dto/notification.dto';
import { NotificationService } from './notification.service';

@ApiTags('Уведомления')
@Controller('api/notification')
export class NotificationController {
  constructor(private notificationService: NotificationService) {}

  @ApiOperation({ summary: 'Создать сообщение пользователю' })
  @ApiResponse({ status: 200, type: NotificationDto })
  @Post("notification-one")
  createMessage(@Body() messageDto: NotificationDto) {
    return this.notificationService.createMessageUser(messageDto);
  }

  @ApiOperation({ summary: 'Создать сообщение для всех пользователей' })
  @ApiResponse({ status: 200, type: NotificationDto })
  @Post("notification-all")
  createMessageAllUser(@Body() messageDto: MessageDto) {
    return this.notificationService.createMessageAllUsers(messageDto);
  }

  @ApiOperation({ summary: 'Получение уведомлений одного пользователя' })
  @ApiResponse({ status: 200, type: NotificationDto })
  @Get("/:id")
  getMessageByUser(@Param("id") id: number) {
    return this.notificationService.getMessageByUser(id);
  }

  @ApiOperation({ summary: 'Удаление уведомления' })
  @ApiResponse({ status: 200, description: "Уведомление удалено" })
  @Delete("/:id")
  deleteMessage(@Param("id") id: number) {
    return this.notificationService.deleteMessage(id);
  }
}
