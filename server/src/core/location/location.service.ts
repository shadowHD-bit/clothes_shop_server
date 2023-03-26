import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { LocationDto } from './dto/location.dto';
import { LocationDatabaseModel } from './location.model';

@Injectable()
export class LocationsService {
  constructor(
    @InjectModel(LocationDatabaseModel)
    private readonly LocationsRepository: typeof LocationDatabaseModel,
  ) {}

  async createLocation(dto: LocationDto) {
    try {
      const location = await this.LocationsRepository.create({
        ...dto,
      });
      return location;
    } catch {
      throw new HttpException(
        'Неудалось выполнить операцию. Повторить позднее!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getAllLocation() {
    try {
      const locations = await this.LocationsRepository.findAndCountAll();
      return locations;
    } catch {
      throw new HttpException(
        'Неудалось выполнить операцию. Повторить позднее!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getOneLocation(id: number) {
    const location = await this.LocationsRepository.findOne({
      where: { id: id },
    });
    if (!location) {
      throw new HttpException('Локация не найдена!', HttpStatus.BAD_REQUEST);
    }
    return location;
  }

  async deleteLocation(id: number) {
    const location = await this.LocationsRepository.findOne({
      where: { id: id },
    });
    if (!location) {
      throw new HttpException('Локация не найдена!', HttpStatus.BAD_REQUEST);
    }
    try {
      await this.LocationsRepository.destroy({
        where: { id: id },
      });
    } catch {
      throw new HttpException(
        'Неудалось выполнить операцию. Повторить позднее!',
        HttpStatus.BAD_REQUEST,
      );
    }
    return 'Локация удалена!';
  }

  async updateLocation(dto: LocationDto, id: number) {
    const location = await this.LocationsRepository.findOne({
      where: { id: id },
    });
    if (!location) {
      throw new HttpException('Локация не найдена!', HttpStatus.BAD_REQUEST);
    }
    try {
      await this.LocationsRepository.update(
        { ...dto },
        {
          where: { id: id },
        },
      );
    } catch {
      throw new HttpException(
        'Неудалось выполнить операцию. Повторить позднее!',
        HttpStatus.BAD_REQUEST,
      );
    }
    return 'Локация обновлена!';
  }
}
