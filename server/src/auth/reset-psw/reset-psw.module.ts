import { MailerModule } from '@nestjs-modules/mailer';
import { User } from './../../core/users/users.model';
import { MailModule } from './../../mail/mail.module';
import { UsersModule } from './../../core/users/users.module';
import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { ResetPasswordController } from './reset-psw.controller';
import { ResetPasswordDatabaseModel } from './reset-psw.model';
import { ResetPasswordService } from './reset-psw.service';

@Module({
  controllers: [ResetPasswordController],
  providers: [ResetPasswordService],
  imports: [
    SequelizeModule.forFeature([User, ResetPasswordDatabaseModel]),
    forwardRef(() => UsersModule),
    forwardRef(() => MailModule),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY_RESET_LINK || 'SECRET_KEY',
      signOptions: {
        expiresIn: '15m',
      },
    }),
  ],
  exports: [ResetPasswordService],
})
export class ResetPasswordModule {}
