import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';

export class UpdateStatusQuestionDto {
  @ApiProperty({ example: true, description: 'Статус вопроса' })
  readonly isComplete: boolean;
}
