import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse } from '@nestjs/swagger/dist';
import { ApiTags } from '@nestjs/swagger/dist/decorators/api-use-tags.decorator';
import { CheckQuestionDto } from './dto/check-question.dto';
import { QuestionDto } from './dto/question.dto';
import { UpdateStatusQuestionDto } from './dto/update-status-question.dto';
import { QuestionDatabaseModel } from './question.model';
import { QuestionService } from './question.service';

@ApiTags('Вопросы')
@Controller('api/questions')
export class QuestionController {
  constructor(private questionService: QuestionService) {}

  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Создание вопроса' })
  @ApiResponse({ status: 200, type: QuestionDatabaseModel })
  @Post('/create')
  create(@Body() dto: QuestionDto) {
    return this.questionService.createQuestion(dto);
  }

  @ApiOperation({ summary: 'Получение вопросов со статусом выполнения' })
  @ApiResponse({ status: 200, type: QuestionDatabaseModel })
  @Get('/get-all?')
  getAll(@Query('limit') limit: number, @Query('page') page: number, @Query('complete') complete: string) {
    return this.questionService.getQuestions(limit, page, complete);
  }

  @ApiOperation({ summary: 'Получение вопросов по одному товару' })
  @ApiResponse({ status: 200, type: QuestionDatabaseModel })
  @Get('/get-one-product/:productId')
  getOneProduct(@Param('productId') id: number) {
    return this.questionService.getQuestionOneProduct(id);
  }

  @ApiOperation({ summary: 'Проверка заданных вопросов пользователя' })
  @ApiResponse({ status: 200, description: 'true or false' })
  @Post('/check-question-user')
  checkQuestionOneUser(@Body() dto: CheckQuestionDto) {
    return this.questionService.checkQuestionOneUser(dto);
  }

  @ApiOperation({ summary: 'Обновление статуса вопроса' })
  @ApiResponse({ status: 200, description: 'Вопрос обновлен!' })
  @Put('/update-status/:id')
  updateStatusQuestion(
    @Body() dto: UpdateStatusQuestionDto,
    @Param('id') id: number,
  ) {
    return this.questionService.updateStatusQuestion(id, dto);
  }

  @ApiOperation({ summary: 'Удаление вопроса' })
  @ApiResponse({ status: 200, description: 'Вопрос удален!' })
  @Delete('/delete/:id')
  getAllChecked(@Param('id') id: number) {
    return this.questionService.deleteQuestion(id);
  }
}
