import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator";

export class UploadImgDto {

  @ApiProperty({example: 'static', description: 'Наименование директории'})
  readonly namePackage: string;

  @ApiProperty({example: 'dsdg-dfbdfbdf-dfbdfb-dfbdfb.png', description: 'Наименование изображения'})
  readonly img: string;

}
