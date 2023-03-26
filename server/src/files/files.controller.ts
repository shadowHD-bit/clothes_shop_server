import { Body, Controller, Get, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger/dist';
import { ApiTags } from '@nestjs/swagger/dist/decorators/api-use-tags.decorator';
import { UploadImgDto } from './dto/file-img-upload.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';

@ApiTags('Файлы')
@Controller('api/files')
export class FilesController {
  constructor(private fileService: FilesService) {}

  @UseInterceptors(FileInterceptor('img'))
  @ApiOperation({summary: "Загрузка изображения"})
  @ApiResponse({status: 200, description: "test.img"})
  @Post("create-img")
  create(@Body()dtoForImgAndPackage: UploadImgDto ,@UploadedFile() img
  ) {
    return this.fileService.createFileDocumentation(img, dtoForImgAndPackage)
  }

}  


