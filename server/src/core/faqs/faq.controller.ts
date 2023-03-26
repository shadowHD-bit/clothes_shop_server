import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    UseInterceptors,
  } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
  import { ApiOperation, ApiResponse } from '@nestjs/swagger/dist';
  import { ApiTags } from '@nestjs/swagger/dist/decorators/api-use-tags.decorator';
import { FaqDto } from './dto/faq.dto';
import { FaqDatabaseModel } from './faq.model';
import { FaqService } from './faq.service';

  @ApiTags('FAQ')
  @Controller('api/faq')
  export class FaqController {
    constructor(private faqService: FaqService) {}
  
    @UseInterceptors(FileInterceptor('file'))
    @ApiOperation({ summary: 'Создание FAQ' })
    @ApiResponse({ status: 200, type: FaqDatabaseModel })
    @Post('/create')
    createProduct(@Body() faqDto: FaqDto) {
      return this.faqService.createFaq(faqDto);
    }
  
    @ApiOperation({ summary: 'Получение FAQ' })
    @ApiResponse({ status: 200, type: FaqDatabaseModel })
    @Get('/get-one/:id')
    getOneProduct(@Param('id') id: number) {
      return this.faqService.getOneFaq(id);
    }
  
    @ApiOperation({ summary: 'Получение всех FAQ' })
    @ApiResponse({ status: 200, type: FaqDatabaseModel })
    @Get('/get-all')
    getAllProduct() {
      return this.faqService.getAllFaq();
    }
  
    @ApiOperation({ summary: 'Удаление FAQ' })
    @ApiResponse({ status: 200, description: 'FAQ удалена!' })
    @Delete('/delete/:id')
    deleteProduct(@Param('id') id: number) {
      return this.faqService.deleteFaq(id);
    }
  
    @UseInterceptors(FileInterceptor('file'))
    @ApiOperation({ summary: 'Обновление FAQ' })
    @ApiResponse({ status: 200, description: 'FAQ обновлена!' })
    @Put('/update/:id')
    updateProduct(@Param('id') id: number, @Body() dto: FaqDto) {
      return this.faqService.updateFaq(dto, id);
    }
  }
  