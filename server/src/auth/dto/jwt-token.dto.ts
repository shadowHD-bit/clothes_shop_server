import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator";

export class JwtTokenDto {

  @ApiProperty({example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN0cmluZ0BzdHJpbmcucnUiLCJpZCI6NCwicm9sZSI6IkFETUlOIiwiaWF0IjoxNjc2OTEwODYxLCJleHAiOjE2NzY5OTcyNjF9.uE5SKfeNL_fzpbk4NU9oUDSkSIZFgaQ2aTfAcvY-LGk', description: 'Токен'})
  readonly token: string;

}