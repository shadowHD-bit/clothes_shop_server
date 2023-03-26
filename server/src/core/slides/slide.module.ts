import { forwardRef, Module } from '@nestjs/common';
import {SequelizeModule} from '@nestjs/sequelize'
import { FilesModule } from 'src/files/files.module';
import { SlideController } from './slide.controller';
import { SlideService } from './slide.service';
import { SlideDatabaseModel } from './slide.model';

@Module({
  controllers: [SlideController],
  providers: [SlideService],
  imports: [
    SequelizeModule.forFeature([SlideDatabaseModel]), FilesModule
  ],
  exports: [SlideService]
})
export class SlideModule {}
