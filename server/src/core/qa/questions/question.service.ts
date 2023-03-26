import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcryptjs';
import { ProductDatabaseModel } from 'src/core/products/product.model';
import { User } from 'src/core/users/users.model';
import { AnswersDatabaseModel } from '../answers/answer.model';
import { CheckQuestionDto } from './dto/check-question.dto';
import { QuestionDto } from './dto/question.dto';
import { UpdateStatusQuestionDto } from './dto/update-status-question.dto';
import { QuestionDatabaseModel } from './question.model';

@Injectable()
export class QuestionService {
  constructor(
    @InjectModel(QuestionDatabaseModel)
    private questionRepository: typeof QuestionDatabaseModel,
    @InjectModel(AnswersDatabaseModel)
    private answerRepository: typeof AnswersDatabaseModel
  ) {}

  async createQuestion(dto: QuestionDto) {
    try {
      const question = await this.questionRepository.create({
          ...dto
      });
      return question;
    } catch {
      throw new HttpException(
        'Неудалось выполнить операцию. Попвторить позднее!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getQuestions(limit:number, page:number, complete:string) {

    page = page || 1;
    limit = limit || 7;
    let offset = page * limit - limit;
    let question = {};
    let info_products = [];
    if (complete == "not-completed") {
      question = await this.questionRepository.findAndCountAll({
        include: [
          {
            model: ProductDatabaseModel,
            required: true,
          },
          {
            model: AnswersDatabaseModel,
            required: false,
          },
        ],
        where: { isComplete: false },
        limit,
        offset,
      });
    } else if (complete == "completed") {
      question = await this.questionRepository.findAndCountAll({
        include: [
          {
            model: ProductDatabaseModel,
            required: true,
          },
          {
            model: AnswersDatabaseModel,
            required: false,
          },
        ],
        where: { isComplete: true },
        limit,
        offset,
      });
    } else {
      question = await this.questionRepository.findAndCountAll({
        include: [
          {
            model: ProductDatabaseModel,
            required: true,
          },
          {
            model: AnswersDatabaseModel,
            required: false,
          },
        ],
        limit,
        offset,
      });
    }

    return question;
  }

  async getQuestionOneProduct(id: number) {
    let infoQA = [];
    let QA = {};
    const questions = await this.questionRepository.findAll({
      where: {
        productId: id,
        isComplete: true,
      },
      include: [
        {
          model: User,
          required: true,
        },
      ],
    });

    for (let question of questions) {
      const answer = await this.answerRepository.findOne({
        where: { questionId: question.id },
        include: [
          {
            model: User,
            required: true,
          },
        ],
      });
      let objQA = {
        question: question,
        answer: answer,
      };
      infoQA.push(objQA);
    }

    QA = infoQA;
    return QA;
  }

  async checkQuestionOneUser(dto: CheckQuestionDto) {
    const questions = await this.questionRepository.findAll({
      where: {
        productId: dto.productId,
        isComplete: false,
        userId: dto.userId,
      },
    });
    if (questions.length !== 0) {
      return true;
    } else {
      return false;
    }
  }

  async updateStatusQuestion(id: number, dto: UpdateStatusQuestionDto) {
    const question = await this.questionRepository.findOne({
      where: { id: id },
    });

    if (!question) {
      throw new HttpException('Неудалось найти вопрос!', HttpStatus.NOT_FOUND);
    }
    try {
      await this.questionRepository.update(
        { isComplete: dto.isComplete },
        { where: { id: id } },
      );
      return 'Вопрос обновлен';
    } catch {
      throw new HttpException(
        'Неудалось выполнить операцию. Попвторить позднее!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async deleteQuestion(id: number) {
    const question = await this.questionRepository.findOne({
      where: { id: id },
    });

    if (!question) {
      throw new HttpException('Неудалось найти вопрос!', HttpStatus.NOT_FOUND);
    }

    const answer = await this.answerRepository.findOne({
      where: { questionId: id },
    });

    try {
      if (answer) {
        await this.answerRepository.destroy({
          where: { questionId: id },
        });
      }
      await this.questionRepository.destroy({
        where: { id: id },
      });

      return 'Вопрос удален!';
    } catch {
      throw new HttpException(
        'Неудалось выполнить операцию. Попвторить позднее!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
