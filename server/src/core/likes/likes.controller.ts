import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger/dist';
import { ApiTags } from '@nestjs/swagger/dist/decorators/api-use-tags.decorator';
import { ProductDatabaseModel } from '../products/product.model';
import { AddProductInLikeDto } from './dto/add-product.dto';
import { CreateLikeDto } from './dto/create-likes.dto';
import { LikeService } from './likes.service';
import { LikeDatabaseModel } from './models/likes.model';

@ApiTags('Корзина понравившихся товаров')
@Controller('api/like')
export class LikeController {
  constructor(private likeService: LikeService) {}

  @ApiOperation({ summary: 'Создание корзины понравившегося' })
  @ApiResponse({ status: 200, type: LikeDatabaseModel })
  @Post('/create')
  createProduct(@Body() likeDto: CreateLikeDto) {
    return this.likeService.createLike(likeDto);
  }

  @ApiOperation({ summary: 'Получение корзины понравившегося' })
  @ApiResponse({ status: 200, type: LikeDatabaseModel })
  @Get('/get-one/:id')
  getOneProduct(@Param('id') id: number) {
    return this.likeService.getOneLike(id);
  }

  @ApiOperation({ summary: 'Получение всех корзин понравившегося' })
  @ApiResponse({ status: 200, type: LikeDatabaseModel })
  @Get('/get-all')
  getAllProduct() {
    return this.likeService.getAllLikes();
  }

  @ApiOperation({ summary: 'Удаление корзины понравившегося' })
  @ApiResponse({ status: 200, description: 'Корзина понравившегося удалена!' })
  @Delete('/delete/:id')
  deleteProduct(@Param('id') id: number) {
    return this.likeService.deleteLikeCart(id);
  }

  @ApiOperation({ summary: 'Добавление товара в корзину понравившегося' })
  @ApiResponse({ status: 200, description: 'Товар добавлен!' })
  @Post('/products/add-product/:id')
  addProductInBasket(@Param('id') id: number, @Req() req) {
    return this.likeService.addProduct(id, req);
  }

  @ApiOperation({
    summary: 'Получение товара в корзине понравившегося пользователя',
  })
  @ApiResponse({ status: 200, type: ProductDatabaseModel })
  @Get('/products/get-user-like-product')
  getProductInBasket(@Req() req) {
    return this.likeService.getProductFromBasket(req);
  }

  @ApiOperation({ summary: 'Удаление товара из корзины понравившегося' })
  @ApiResponse({ status: 200, description: 'Товар удален!' })
  @Delete('/products/delete/:id')
  deleteProductFromBasket(@Req() req: any, @Param('id') id: number) {
    return this.likeService.deleteProductFromLike(req, id);
  }
}
