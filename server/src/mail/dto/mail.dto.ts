import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator";
import { testLetter } from "../mail-template/example-mail.dto";

export class MailDto {

  @ApiProperty({example: 'sanek0020601@gmail.com', description: 'Электронная почта пользователя'})
  readonly userMail: string;

  @ApiProperty({example: testLetter, description: 'Шаблон письма'})
  readonly letterTemplate: object;

}
