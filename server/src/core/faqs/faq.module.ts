import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { FaqController } from './faq.controller';
import { FaqService } from './faq.service';
import { FaqDatabaseModel } from './faq.model';

@Module({
  controllers: [FaqController],
  providers: [FaqService],
  imports: [SequelizeModule.forFeature([FaqDatabaseModel])],
  exports: [FaqService],
})
export class FaqModule {}
