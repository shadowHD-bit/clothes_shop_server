import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse } from '@nestjs/swagger/dist';
import { ApiTags } from '@nestjs/swagger/dist/decorators/api-use-tags.decorator';
import { ReviewDto } from './dto/review.dto';
import { ReviewDatabaseModel } from './review.model';
import { ReviewService } from './review.service';

@ApiTags('Отзывы')
@Controller('api/reviews')
export class ReviewController {
  constructor(private reviewService: ReviewService) {}

  @ApiOperation({ summary: 'Создание отзыва' })
  @ApiResponse({ status: 200, type: ReviewDatabaseModel })
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'imgFirst', maxCount: 1 },
      { name: 'imgSecond', maxCount: 1 },
      { name: 'imgThird', maxCount: 1 },
    ]),
  )
  @Post('/create')
  createProduct(
    @Body() reviewDto: ReviewDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.reviewService.createReview(reviewDto, files);
  }

  @ApiOperation({ summary: 'Удаление отзыва' })
  @ApiResponse({ status: 200, description: 'Отзыв удален!' })
  @Delete('/delete/:id')
  delete(@Param('id') id: number) {
    return this.reviewService.deleteReview(id);
  }

  @ApiOperation({ summary: 'Получение отзывов по одному товару' })
  @ApiResponse({ status: 200, type: ReviewDatabaseModel })
  @Get('/get-one/:id')
  getOne(@Param('id') id: number) {
    return this.reviewService.getReviewOneProduct(id);
  }

  @ApiOperation({ summary: 'Получение проверенных отзывов по одному товару' })
  @ApiResponse({ status: 200, type: ReviewDatabaseModel })
  @Get('/get-one/check/:id')
  getOneChecked(@Param('id') id: number) {
    return this.reviewService.getReviewOneProductChecked(id);
  }

  @ApiOperation({ summary: 'Получение всех отзывов' })
  @ApiResponse({ status: 200, type: ReviewDatabaseModel })
  @Get('/get-all')
  getAll() {
    return this.reviewService.getAllReview();
  }

  @ApiOperation({ summary: 'Обновление статуса отзыва' })
  @ApiResponse({ status: 200, description: 'Статус обновлен!' })
  @Put('/update/status/:id')
  changeStatus(@Param('id') id: number) {
    return this.reviewService.changeStatusReview(id);
  }

  @ApiOperation({ summary: 'Получение всех не проверенных отзывов' })
  @ApiResponse({ status: 200, type: ReviewDatabaseModel })
  @Get('/get-all/non-check')
  getAllChecked() {
    return this.reviewService.getAllReviewNonChecked();
  }
}
