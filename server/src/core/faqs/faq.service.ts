import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FaqDto } from './dto/faq.dto';
import { FaqDatabaseModel } from './faq.model';

@Injectable()
export class FaqService {
  constructor(
    @InjectModel(FaqDatabaseModel)
    private faqRepository: typeof FaqDatabaseModel,
  ) {}

  async createFaq(dto: FaqDto) {
    try {
      const faq = await this.faqRepository.create({
        ...dto,
      });
      return faq;
    } catch {
      throw new HttpException(
        'Неудалось выполнить операцию. Повторить позднее!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getAllFaq() {
    try {
      const faqs = await this.faqRepository.findAndCountAll();
      return faqs;
    } catch {
      throw new HttpException(
        'Неудалось выполнить операцию. Повторить позднее!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getOneFaq(id: number) {
    const faq = await this.faqRepository.findOne({
      where: { id: id },
    });
    if (!faq) {
      throw new HttpException('FAQ не найдена!', HttpStatus.BAD_REQUEST);
    }
    return faq;
  }

  async deleteFaq(id: number) {
    const faq = await this.faqRepository.findOne({
      where: { id: id },
    });
    if (!faq) {
      throw new HttpException('FAQ не найдена!', HttpStatus.BAD_REQUEST);
    }
    try {
      await this.faqRepository.destroy({
        where: { id: id },
      });
    } catch {
      throw new HttpException(
        'Неудалось выполнить операцию. Повторить позднее!',
        HttpStatus.BAD_REQUEST,
      );
    }
    return 'FAQ удалена!';
  }

  async updateFaq(dto: FaqDto, id: number) {
    const faq = await this.faqRepository.findOne({
      where: { id: id },
    });
    if (!faq) {
      throw new HttpException('FAQ не найдена!', HttpStatus.BAD_REQUEST);
    }
    try {
      await this.faqRepository.update(
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
    return 'FAQ обновлена!';
  }
}
