import { InjectModel } from '@nestjs/sequelize';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
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
import { BannedUserDto } from './dto/banned-user.dto';

@ApiTags('Пользователи')
@Controller('api/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Создание пользователя' })
  @ApiResponse({ status: 200, type: User })
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }

  @ApiOperation({ summary: 'Блокировка пользователя' })
  @ApiResponse({ status: 200, description: 'Пользователь забанен!' })
  @Post('/banned')
  bannedUser(@Body() dto: BannedUserDto, @Request() req: any) {
    return this.usersService.bannedUser(dto, req);
  }

  @ApiOperation({ summary: 'Разблокировка пользователя' })
  @ApiResponse({ status: 200, description: 'Пользователь разбанен!' })
  @Delete('/unbanned?')
  unbannedUser(@Query('userId') userId: number, @Query('email') email: string) {
    return this.usersService.unbannedUser(userId, email);
  }

  @ApiOperation({ summary: 'Получить всех пользователей' })
  @ApiResponse({ status: 200, type: [User] })
  @Get('/get-all/users')
  getAll() {
    return this.usersService.getAllUsers();
  }

  @ApiOperation({
    summary: 'Получить всех пользователей для админки с пагинацией',
  })
  @ApiResponse({ status: 200, type: [User] })
  @Get('/get-all/users-for-admin?')
  getAllUsersForAdmin(
    @Query('limit') limit: number,
    @Query('page') page: number,
    @Query('name') name: string,
  ) {
    return this.usersService.getAllUsersForAdmin(limit, page, name);
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

  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Изменение роли пользователя' })
  @ApiResponse({ status: 200, description: 'Роль обновлена!' })
  @Put('/update/update-role/:id?')
  updateUserRole(@Param('id') id: number, @Query('role') role: string, @Request() req: any) {
    return this.usersService.changeRoleUser(role, id, req);
  }

  @ApiOperation({ summary: 'Обновление аватара пользователя' })
  @ApiResponse({ status: 200, description: 'Аватар обновлен!' })
  @UseInterceptors(FileInterceptor('avatar'))
  @Put('/update/update-avatar/:id')
  updateAvatar(@Param('id') id: number, @UploadedFile() avatar: any) {
    return this.usersService.updateAvatar(id, avatar);
  }
}
