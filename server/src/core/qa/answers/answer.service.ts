import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { NotificationService } from 'src/core/notification/notification.service';
import { ProductDatabaseModel } from 'src/core/products/product.model';
import { QuestionDatabaseModel } from '../questions/question.model';
import { AnswersDatabaseModel } from './answer.model';
import { AnswerDto } from './dto/answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';

@Injectable()
export class AnswerService {
  constructor(
    @InjectModel(AnswersDatabaseModel)
    private answerRepository: typeof AnswersDatabaseModel,
    @InjectModel(QuestionDatabaseModel)
    private questionRepository: typeof QuestionDatabaseModel,
    private notificationService: NotificationService,
  ) {}

  async createAnswer(dto: AnswerDto) {
    // try {
      const answer = await this.answerRepository.create({
        ...dto
      });
      const question = await this.questionRepository.findOne({
        where: { id: dto.questionId },
        include: [
          {
            model: ProductDatabaseModel,
          },
        ],
      });

      await this.notificationService.createMessageUser({
        message: `Администрация ответила на ваш вопрос по товару ${question.product.name}`,
        userId: dto.userId,
      });

      return answer;
    // } catch {
    //   throw new HttpException(
    //     'Неудалось выполнить запрос. Проверьте данные!',
    //     HttpStatus.BAD_REQUEST,
    //   );
    // }
  }

  async getOneAnswer(id: number) {
    try {
      const answer = await this.answerRepository.findOne({
        where: { id: id },
      });
      return answer;
    } catch {
      throw new HttpException(
        'Неудалось выполнить запрос. Проверьте данные!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async updateAnswer(id: number, dto: UpdateAnswerDto) {
    const answer = await this.answerRepository.findOne({
      where: { id: id },
    });

    if (!answer) {
      throw new HttpException('Ответ не найден!', HttpStatus.NOT_FOUND);
    }

    try {
      await this.answerRepository.update(
        {
          ...dto,
        },
        {
          where: { id: id },
        },
      );

      return 'Ответ изменен!';
    } catch {
      throw new HttpException(
        'Неудалось выполнить запрос. Проверьте данные!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
