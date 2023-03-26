import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';

export class AnswerDto {
  @ApiProperty({
    example: 'Чтобы узнать информацию перейдите в раздел "Информация"',
    description: 'Текст ответа',
  })
  readonly answerText: string;

  @ApiProperty({ example: '1', description: 'Идентификатор пользователя' })
  readonly userId: number;

  @ApiProperty({ example: '1', description: 'Идентификатор вопроса' })
  readonly questionId: number;
}
