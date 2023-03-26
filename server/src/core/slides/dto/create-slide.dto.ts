import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator";

export class CreateSlideDto {

  @ApiProperty({example: 'Новая коллекция', description: 'Наименование слайда'})
  readonly title: string;
  
  @ApiProperty({example: 'Перейдите в каталог чтобы увидеть новую коллекцию', description: 'Текст слайда'})
  readonly text: string;

}
