import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator";

export class CreateLikeDto {

  @ApiProperty({example: '1', description: 'Идентификатор пользователя'})
  readonly userId: number;

}
