import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';

export class AddHistoryViewProductDto {
  @ApiProperty({ example: '1', description: 'Идентификатор товара' })
  readonly productId: number;

  @ApiProperty({ example: '1', description: 'Идентификатор пользователя' })
  readonly userId: number;
}
