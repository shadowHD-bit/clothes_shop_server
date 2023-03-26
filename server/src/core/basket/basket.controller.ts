import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Headers,
  Param,
  Post,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse } from '@nestjs/swagger/dist';
import { ApiTags } from '@nestjs/swagger/dist/decorators/api-use-tags.decorator';
import { ProductDatabaseModel } from '../products/product.model';
import { BasketService } from './basket.service';
import { AddProductInBasketDto } from './dto/add-product.dto';
import { ChangeCountProductInBasketDto } from './dto/change-count-product-basket.dto';
import { CreateBasketDto } from './dto/create-basket-product.dto';
import { BasketDataModel } from './models/basket.model';

@ApiTags('Корзина')
@Controller('api/basket')
export class BasketController {
  constructor(private basketService: BasketService) {}

  @ApiOperation({ summary: 'Создание корзины' })
  @ApiResponse({ status: 200, type: BasketDataModel })
  @Post('/create')
  createProduct(@Body() basketDto: CreateBasketDto) {
    return this.basketService.createBasket(basketDto);
  }

  @ApiOperation({ summary: 'Получение корзины' })
  @ApiResponse({ status: 200, type: BasketDataModel })
  @Get('/get-one/:id')
  getOneProduct(@Param('id') id: number) {
    return this.basketService.getOneBasket(id);
  }

  @ApiOperation({ summary: 'Получение всех корзин' })
  @ApiResponse({ status: 200, type: BasketDataModel })
  @Get('/get-all')
  getAllProduct() {
    return this.basketService.getAllBasket();
  }

  @ApiOperation({ summary: 'Удаление корзины' })
  @ApiResponse({ status: 200, description: 'Корзина удалена!' })
  @Delete('/delete/:id')
  deleteProduct(@Param('id') id: number) {
    return this.basketService.deleteBasket(id);
  }

  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Добавление товара в корзину' })
  @ApiResponse({ status: 200, description: 'Товар добавлен!!' })
  @Post('/products/add-product')
  addProductInBasket(@Body() dto: AddProductInBasketDto, @Req() req) {
    return this.basketService.addProduct(dto, req);
  }
  
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Получение товара в корзине пользователя' })
  @ApiResponse({ status: 200, type: ProductDatabaseModel })
  @Get('/products/get-user-basket-product')
  getProductInBasket(@Req() req) {
    return this.basketService.getProductFromBasket(req);
  }

  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Изменение количества товара в корзине' })
  @ApiResponse({ status: 200, description: 'Количество изменено' })
  @Post('/products/change-count')
  changeCountProductInBasket(
    @Req() req: any,
    @Body() dto: ChangeCountProductInBasketDto,
  ) {
    return this.basketService.changeCountProductInBasket(dto, req);
  }

  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Удаление товара из корзины' })
  @ApiResponse({ status: 200, description: 'Товар удален!' })
  @Delete('/products/delete')
  deleteProductFromBasket(
    @Req() req: any,
    @Body() dto: AddProductInBasketDto,
  ) {
    return this.basketService.deleteProductFromBasket(req, dto);
  }
}
