import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator";

export class UpdateUserDto {

  @ApiProperty({example: 'Иван', description: 'Имя'})
  readonly firstName: string;

  @ApiProperty({example: 'Иванович', description: 'Фамилиия'})
  readonly secondName: string;

  @ApiProperty({example: '06.06.2006', description: 'Дата рождения'})
  readonly dateBirthday:string;

  @ApiProperty({example: '+79825614235', description: 'Номер телефона'})
  readonly numberPhone: string;

}
