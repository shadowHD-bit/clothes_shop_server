import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';

export class QuestionDto {
  @ApiProperty({
    example: 'Как купить товар?',
    description: 'Текст вопроса',
  })
  readonly questionText: string;

  @ApiProperty({ example: true, description: 'Флаг ответа на вопрос' })
  readonly isComplete: boolean;

  @ApiProperty({ example: '1', description: 'Идентификатор пользователя' })
  readonly userId: number;

  @ApiProperty({ example: '1', description: 'Идентификатор товара' })
  readonly productId: number;
}
