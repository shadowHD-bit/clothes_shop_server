import { ApiProperty } from "@nestjs/swagger";

export class ResetMailDto {

    @ApiProperty({example: 'sanek0020601@gmail.com', description: 'Электронная почта пользователя'})
    readonly userMail: string;
  
    @ApiProperty({example: 'http://localhost:5000', description: 'Ссыдка на востановление пароля'})
    readonly link: string;
  
  }
  