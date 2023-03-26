import { InjectModel } from '@nestjs/sequelize';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Request,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse } from '@nestjs/swagger/dist';
import { ApiTags } from '@nestjs/swagger/dist/decorators/api-use-tags.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './users.model';
import { UsersService } from './users.service';

@ApiTags('Пользователи')
@Controller('api/users')
export class UsersController {
  constructor(
    private usersService: UsersService,
  ) {}

  @ApiOperation({ summary: 'Создание пользователя' })
  @ApiResponse({ status: 200, type: User })
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }

  @ApiOperation({ summary: 'Получить всех пользователей' })
  @ApiResponse({ status: 200, type: [User] })
  @Get('/get-all/users')
  getAll() {
    return this.usersService.getAllUsers();
  }

  @ApiOperation({ summary: 'Получить всех администраторов' })
  @ApiResponse({ status: 200, type: [User] })
  @Get('/get-all/admins')
  getAdmin() {
    return this.usersService.getAdmin();
  }

  @ApiOperation({ summary: 'Получить всех лучших пользователей по покупкам' })
  @ApiResponse({ status: 200, type: [User] })
  @Get('/get-all/money-users')
  getMoneyUser() {
    return this.usersService.getMoneyUser();
  }

  @ApiOperation({ summary: 'Получить новых пользователей' })
  @ApiResponse({ status: 200, type: [User] })
  @Get('/get-all/new-users')
  getNew() {
    return this.usersService.getNewUser();
  }

  @ApiOperation({ summary: 'Получить пользователя по id' })
  @ApiResponse({ status: 200, type: User })
  @Get('/:id')
  getbyId(@Param('id') id: number) {
    return this.usersService.getOneUserById(id);
  }

  @ApiOperation({ summary: 'Проверка авторизации' })
  @ApiResponse({ status: 200, type: User })
  @Get('/check/check-auth')
  check(@Request() req: any) {
    return this.usersService.checkAuth(req);
  }

  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Обновление данных пользователя' })
  @ApiResponse({ status: 200, description: 'Данные обновлены' })
  @Put('/update/update-data/:id')
  updateData(@Param('id') id: number, @Body() dto: UpdateUserDto) {
    return this.usersService.updateDataUser(dto, id);
  }

  @ApiOperation({ summary: 'Обновление аватара пользователя' })
  @ApiResponse({ status: 200, description: 'Аватар обновлен!' })
  @UseInterceptors(FileInterceptor('avatar'))
  @Put('/update/update-avatar/:id')
  updateAvatar(@Param('id') id: number, @UploadedFile() avatar: any) {
    return this.usersService.updateAvatar(id, avatar);
  }
}
