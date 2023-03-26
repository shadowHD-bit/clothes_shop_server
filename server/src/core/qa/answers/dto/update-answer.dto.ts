import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';

export class UpdateAnswerDto {
  @ApiProperty({
    example: 'Чтобы узнать информацию перейдите в раздел "Информация"',
    description: 'Текст ответа',
  })
  readonly answerText: string;

}
