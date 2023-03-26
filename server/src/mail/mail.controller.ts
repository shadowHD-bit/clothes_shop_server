import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MailDto } from './dto/mail.dto';
import { ResetMailDto } from './dto/reset-mail.dto';
import { MailService } from './mail.service';

@ApiTags("Отправка писем")
@Controller('/api/mail')
export class MailController {

    constructor(private mailService: MailService) {}

    @ApiOperation({summary: "Отправка письма"})
    @ApiResponse({status: 200, description: "Письмо отправлено"})
    @Post("/send-mail")
    sendMail(@Body() mailDto: MailDto) {
      return this.mailService.sendEmail(mailDto)
    }

    @ApiOperation({summary: "Отправка письма восстановления пароля"})
    @ApiResponse({status: 200, description: "Письмо отправлено"})
    @Post("/send-mail-reset")
    sendResetPasswordMail(@Body() mailDto: ResetMailDto) {
      return this.mailService.sendResetEmail(mailDto)
    }

    @ApiOperation({summary: "Тестовая проверка SMTP сервиса"})
    @ApiResponse({status: 200, description: "Письмо отправлено"})
    @Post("/send-mail-test")
    test() {
      return this.mailService.sendTestEmail()
    }
}
