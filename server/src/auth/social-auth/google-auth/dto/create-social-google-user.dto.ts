import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator";

export class CreateSocialGoogleAuthUserDto {

  @ApiProperty({example: '84181818', description: 'Идентификатор сервиса Google пользователя'})
  readonly idSocial: string;

  @ApiProperty({example: '1', description: 'Идентификатор пользователя'})
  readonly userId: number;

}
