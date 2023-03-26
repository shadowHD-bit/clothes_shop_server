import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse } from '@nestjs/swagger/dist';
import { ApiTags } from '@nestjs/swagger/dist/decorators/api-use-tags.decorator';
import { CreateSlideDto } from './dto/create-slide.dto';
import { SlideDatabaseModel } from './slide.model';
import { SlideService } from './slide.service';

@ApiTags('Слайдер')
@Controller('api/slides')
export class SlideController {
  constructor(private slideService: SlideService) {}

  @ApiOperation({ summary: 'Создание слайда' })
  @ApiResponse({ status: 200, type: SlideDatabaseModel })
  @UseInterceptors(FileInterceptor('img'))
  @Post('/create')
  createProduct(@Body() slideDto: CreateSlideDto, @UploadedFile() img: any) {
    return this.slideService.createSlide(slideDto, img);
  }

  @ApiOperation({ summary: 'Получение слайда' })
  @ApiResponse({ status: 200, type: SlideDatabaseModel })
  @Get('/get-one/:id')
  getOneProduct(@Param('id') id: number) {
    return this.slideService.getOneSlide(id);
  }

  @ApiOperation({ summary: 'Получение всех слайдов' })
  @ApiResponse({ status: 200, type: SlideDatabaseModel })
  @Get('/get-all')
  getAllProduct() {
    return this.slideService.getAllSlides();
  }

  @ApiOperation({ summary: 'Удаление слайда' })
  @ApiResponse({ status: 200, description: 'Слайд удален!' })
  @Delete('/delete/:id')
  deleteProduct(@Param('id') id: number) {
    return this.slideService.deleteSlide(id);
  }

  @UseInterceptors(FileInterceptor('img'))
  @ApiOperation({ summary: 'Обновление слайда' })
  @ApiResponse({ status: 200, description: 'Слайд обновлен!' })
  @Put('/update/:id')
  updateProduct(
    @Param('id') id: number,
    @Body() dto: CreateSlideDto,
    @UploadedFile() img: any,
  ) {
    return this.slideService.updateSlide(dto, id, img);
  }
}
