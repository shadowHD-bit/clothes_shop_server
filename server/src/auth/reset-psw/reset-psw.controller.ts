import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtTokenDto } from '../dto/jwt-token.dto';
import { ResetPasswordCreateDto } from './dto/reser-psw-create.dto';
import { ResetPasswordUpdateDto } from './dto/reset-psw-update.dto';
import { ResetPasswordService } from './reset-psw.service';

@ApiTags("Восстановление пароля")
@Controller('api/reset-password')
export class ResetPasswordController {

    constructor(private resetPasswordService: ResetPasswordService) {}

    @ApiOperation({summary: "Проверка валидности токена смены пароля"})
    @ApiResponse({status: 200, description: "Токен найден!"})
    @UseInterceptors(FileInterceptor('file'))
    @Post("/check-token")
    checkToken(@Body() dto: JwtTokenDto) {
      return this.resetPasswordService.checkResetPasswordToken(dto)
    }

    @ApiOperation({summary: "Создание письма с ссылкой на страницу смены пароля"})
    @ApiResponse({status: 200, description: "На вашу почту отправлено письмо с ссылкой на странинцу востановления пароля!"})
    @UseInterceptors(FileInterceptor('file'))
    @Post("/get-letter")
    getLetter(@Body() resetPasswordCreateDto: ResetPasswordCreateDto) {
        return this.resetPasswordService.createResetPasswordLink(resetPasswordCreateDto)
    }

    @ApiOperation({summary: "Изменение пароля пользователя"})
    @ApiResponse({status: 200, description: "Данные изменены"})
    @UseInterceptors(FileInterceptor('file'))
    @Post("/reset")
    updatePassword(@Body() resetPasswordUpdateDto: ResetPasswordUpdateDto) {
        return this.resetPasswordService.resetPassword(resetPasswordUpdateDto)
    }

}
