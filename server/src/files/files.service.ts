import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';
import { UploadImgDto } from './dto/file-img-upload.dto';

@Injectable()
export class FilesService {
  constructor() {}

  async createFile(file: any, namePackage: string): Promise<string> {
    try {
      const fileName = uuid.v4() + '.jpg';
      const filePath = path.resolve(
        __dirname,
        '..',
        '..',
        'src',
        'static',
        namePackage,
      );
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      fs.writeFileSync(path.join(filePath, fileName), file.buffer);
      return fileName;
    } catch {
      throw new HttpException(
        'Произошла ошибка записи файла!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createFileDocumentation(file: any, dto: UploadImgDto): Promise<string> {
    try {
      const fileName = uuid.v4() + '.jpg';
      const filePath = path.resolve(
        __dirname,
        '..',
        '..',
        'src',
        'static',
        dto.namePackage.toString(),
      );
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      fs.writeFileSync(path.join(filePath, fileName), file.buffer);
      return fileName;
    } catch {
      throw new HttpException(
        'Произошла ошибка записи файла!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteFile(fileName: string, namePackage: string) {
    await fs.unlink(
      path.resolve(
        __dirname,
        '..',
        '..',
        'src',
        'static',
        namePackage.toString(),
        fileName.toString(),
      ),
      (err) => {
        if (err) {
          return err;
        }
      },
    );
  }
}
