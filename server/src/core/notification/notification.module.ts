import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { User } from 'src/core/users/users.model';
import { UsersModule } from 'src/core/users/users.module';
import { NotificationController } from './notification.controller';
import { NotificationDatabaseModel } from './notification.model';
import { NotificationService } from './notification.service';


@Module({
  controllers: [NotificationController],
  providers: [NotificationService],
  imports: [
    SequelizeModule.forFeature([User, NotificationDatabaseModel]), forwardRef(() => AuthModule), forwardRef(() => UsersModule)
  ],
  exports: [NotificationService]
})
export class NotificationModule {}
