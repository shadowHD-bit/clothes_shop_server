import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from 'src/files/files.service';
import { CreateBrandDto } from './dto/create-product-brand.dto';
import { UpdateBrandDto } from './dto/update-product-brand.dto';
import { ProductBrandDatabaseModel } from './product-brand.model';

@Injectable()
export class ProductBrandsService {
  constructor(
    @InjectModel(ProductBrandDatabaseModel)
    private productBrandRepository: typeof ProductBrandDatabaseModel,
    private fileService: FilesService,
  ) {}

  async createBrand(dto: CreateBrandDto, img: any) {
    try {
      const imgFileName = await this.fileService.createFile(img, 'brands');

      const brand = await this.productBrandRepository.create({
        ...dto,
        img: imgFileName,
      });
      return brand;
    } catch {
      throw new HttpException(
        'Произошла непредвиденная ошибка! Повторите позднее.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async deleteBrand(id: number) {
    try {
      const brand = await this.productBrandRepository.findOne({
        where: { id: id },
      });
      if (!brand) {
        throw new HttpException(
          'Бренд не найден! Повторите позднее.',
          HttpStatus.NOT_FOUND,
        );
      }
      await this.fileService.deleteFile(brand.img, 'brands');

      await this.productBrandRepository.destroy({
        where: { id: id },
      });

      return 'Бренд удален!';
    } catch {
      throw new HttpException(
        'Произошла непредвиденная ошибка! Повторите позднее.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getBrand(id: number) {
    const brand = await this.productBrandRepository.findOne({
      where: { id: id },
    });
    if (!brand) {
      throw new HttpException(
        'Бренд не найден! Повторите позднее.',
        HttpStatus.NOT_FOUND,
      );
    }
    return brand;
  }

  async getAllBrands() {
    try {
      const brands = await this.productBrandRepository.findAndCountAll({});
      return brands;
    } catch {
      throw new HttpException(
        'Произошла непредвиденная ошибка! Повторите позднее.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async updateBrand(dto: UpdateBrandDto, img: any, id:number) {
    const brand = await this.productBrandRepository.findOne({
      where: { id: id },
    });
    if (!brand) {
      throw new HttpException(
        'Бренд не найден! Повторите позднее.',
        HttpStatus.NOT_FOUND,
      );
    }

    try {
      if (img) {
        const newImgFileName = await this.fileService.createFile(img, 'brands');
        await this.fileService.deleteFile(brand.img, 'brands');
        const updatedBrand = await this.productBrandRepository.update(
          {
            name: dto.name,
            img: newImgFileName,
          },
          {
            where: {
              id: id,
            },
          },
        );
        return updatedBrand;
      }
      const updatedBrand = await this.productBrandRepository.update(
        {
          name: dto.name,
        },
        {
          where: {
            id: id,
          },
        },
      );
      return "Бренд обновлен!";
    } catch {
      throw new HttpException(
        'Произошла непредвиденная ошибка! Повторите позднее.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
