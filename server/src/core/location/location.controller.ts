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
import { LocationDto } from './dto/location.dto';
import { LocationDatabaseModel } from './location.model';
import { LocationsService } from './location.service';

@ApiTags('Локации')
@Controller('api/locations')
export class LocationsController {
  constructor(private locationsService: LocationsService) {}

  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Создание локации' })
  @ApiResponse({ status: 200, type: LocationDatabaseModel })
  @Post('/create')
  createProduct(@Body() locationDto: LocationDto) {
    return this.locationsService.createLocation(locationDto);
  }

  @ApiOperation({ summary: 'Получение локации' })
  @ApiResponse({ status: 200, type: LocationDatabaseModel })
  @Get('/get-one/:id')
  getOneProduct(@Param('id') id: number) {
    return this.locationsService.getOneLocation(id);
  }

  @ApiOperation({ summary: 'Получение всех локаций' })
  @ApiResponse({ status: 200, type: LocationDatabaseModel })
  @Get('/get-all')
  getAllProduct() {
    return this.locationsService.getAllLocation();
  }

  @ApiOperation({ summary: 'Удаление локации' })
  @ApiResponse({ status: 200, description: 'Локация удалена!' })
  @Delete('/delete/:id')
  deleteProduct(@Param('id') id: number) {
    return this.locationsService.deleteLocation(id);
  }

  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Обновление локации' })
  @ApiResponse({ status: 200, description: 'Локация обновлена!' })
  @Put('/update/:id')
  updateProduct(@Param('id') id: number, @Body() dto: LocationDto) {
    return this.locationsService.updateLocation(dto, id);
  }
}
