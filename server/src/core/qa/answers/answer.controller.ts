import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Put,
    UseInterceptors,
  } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
  import { ApiOperation, ApiResponse } from '@nestjs/swagger/dist';
  import { ApiTags } from '@nestjs/swagger/dist/decorators/api-use-tags.decorator';
import { AnswersDatabaseModel } from './answer.model';
import { AnswerService } from './answer.service';
import { AnswerDto } from './dto/answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
  
  @ApiTags('Ответы на вопросы')
  @Controller('api/answers')
  export class AnswerController {
    constructor(private answerService: AnswerService) {}
  
    @UseInterceptors(FileInterceptor('file'))
    @ApiOperation({ summary: 'Создание ответа' })
    @ApiResponse({ status: 200, type: AnswersDatabaseModel })
    @Post('/create')
    create(@Body() dto: AnswerDto) {
      return this.answerService.createAnswer(dto);
    }
  
    @ApiOperation({ summary: 'Получение ответа' })
    @ApiResponse({ status: 200, type: AnswersDatabaseModel })
    @Get('/get-one/:id')
    getOne(@Param('id') id: number) {
      return this.answerService.getOneAnswer(id);
    }
  
    @ApiOperation({ summary: 'Обновление ответа' })
    @ApiResponse({ status: 200, description: 'Ответ обновлен!' })
    @Put('/update/:id')
    update(
      @Body() dto: UpdateAnswerDto,
      @Param('id') id: number,
    ) {
      return this.answerService.updateAnswer(id, dto);
    }
  }
  