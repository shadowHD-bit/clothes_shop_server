import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { LocationsController } from './location.controller';
import { LocationsService } from './location.service';
import { LocationDatabaseModel } from './location.model';

@Module({
  imports: [SequelizeModule.forFeature([LocationDatabaseModel])],
  controllers: [LocationsController],
  providers: [LocationsService],
  exports: [LocationsService],
})
export class LocationsModule {}
