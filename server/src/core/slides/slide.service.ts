import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from 'src/files/files.service';
import { CreateSlideDto } from './dto/create-slide.dto';
import { SlideDatabaseModel } from './slide.model';

@Injectable()
export class SlideService {
  constructor(
    @InjectModel(SlideDatabaseModel)
    private slideRepository: typeof SlideDatabaseModel,
    private fileService: FilesService,
  ) {}

  async createSlide(dto: CreateSlideDto, img: any) {
    try {
      const imgFileName = await this.fileService.createFile(img, 'slides');

      const slide = await this.slideRepository.create({
        ...dto,
        img: imgFileName,
      });
      return slide;
    } catch {
      throw new HttpException(
        'Неудалось выполнить операцию. Повторить позднее!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }


  async getAllSlides() {
    try {
      const slides = await this.slideRepository.findAndCountAll();
      return slides;
    } catch {
      throw new HttpException(
        'Неудалось выполнить операцию. Повторить позднее!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getOneSlide(id: number) {
    const slide = await this.slideRepository.findOne({
      where: { id: id },
    });
    if (!slide) {
      throw new HttpException('Слайд не найден!', HttpStatus.BAD_REQUEST);
    }
    return slide;
  }

  async deleteSlide(id: number) {
    const slide = await this.slideRepository.findOne({
      where: { id: id },
    });
    if (!slide) {
      throw new HttpException('Слайд не найден!', HttpStatus.BAD_REQUEST);
    }
    try {
      await this.slideRepository.destroy({
        where: { id: id },
      });
    } catch {
      throw new HttpException(
        'Неудалось выполнить операцию. Повторить позднее!',
        HttpStatus.BAD_REQUEST,
      );
    }
    return 'Слайд удален!';
  }

  async updateSlide(dto: CreateSlideDto, id: number, img: File) {
    const slide = await this.slideRepository.findOne({
      where: { id: id },
    });

    if (!slide) {
      throw new HttpException('Слайд не найден!', HttpStatus.BAD_REQUEST);
    }
    try {
      if (img != null) {
        const newImgFileName = await this.fileService.createFile(img, 'slides');
        await this.fileService.deleteFile(slide.img, 'slides');

        await this.slideRepository.update(
          { ...dto, img: newImgFileName },
          {
            where: { id: id },
          },
        );
      }

      await this.slideRepository.update(
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
    return 'Слайд обновлен!';
  }
}
