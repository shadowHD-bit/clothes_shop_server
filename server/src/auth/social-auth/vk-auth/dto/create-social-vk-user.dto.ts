import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator";

export class CreateSocialVkAuthUserDto {

  @ApiProperty({example: '84181818', description: 'Идентификатор соц.сети Vk пользователя'})
  readonly idSocial: string;

  @ApiProperty({example: '1', description: 'Идентификатор пользователя'})
  readonly userId: number;

}
