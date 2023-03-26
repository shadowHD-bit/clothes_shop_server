import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator";

export class LocationDto {

  @ApiProperty({example: 'Магазин', description: 'Наименование места'})
  readonly title: string;
  
  @ApiProperty({example: 'Очный магазин машей компании', description: 'Описание списка'})
  readonly description: string;
  
  @ApiProperty({example: 'ул. Пушкина 15', description: 'Адрес места в текстовом формате'})
  readonly textAddress: string;
  
  @ApiProperty({example: '15.18188', description: 'Координата X места'})
  readonly xCoordination: number;

  @ApiProperty({example: '64.1818', description: 'Координата Y места'})
  readonly yCoordination: number;

}
