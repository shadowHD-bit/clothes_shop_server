import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator";

export class FaqDto {

  @ApiProperty({example: 'Можно ли получить товар бесплатно?', description: 'Наименование вопросу'})
  readonly title: string;
  
  @ApiProperty({example: 'Так делать нельзя!', description: 'Информация по данному вопросу'})
  readonly information: string;

}
