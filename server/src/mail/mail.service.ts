import { Injectable } from '@nestjs/common';
import { MailDto } from './dto/mail.dto';
import { MailerService } from "@nestjs-modules/mailer";
import { testLetter } from './mail-template/example-mail.dto';
import { generateResetPasswordMailTemplate } from './mail-template/reset-psw-mail-template';
import { ResetMailDto } from './dto/reset-mail.dto';

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) {}

    async sendResetEmail(dto: ResetMailDto){
        this.mailerService
        .sendMail(generateResetPasswordMailTemplate(dto.userMail, dto.link))
    }

    //In process
    async sendEmail(dto: MailDto){
        this.mailerService
        .sendMail({
          to: 'sanek0020601@gmail.com', 
          from: 'sanek0020601@gmail.com', 
          subject: 'Testing Nest MailerModule ✔', 
          text: 'welcome', 
          html: '<b>welcome</b>',
        })
    }

    async sendTestEmail(){
        await this.mailerService.sendMail(testLetter)
    }
}
