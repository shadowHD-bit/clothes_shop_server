import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator";

export class CreateBasketDto {

  @ApiProperty({example: '1', description: 'Идентификатор пользователя'})
  readonly userId: number;

}
