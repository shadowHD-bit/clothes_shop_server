import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator";

export class CouponDto {

  @ApiProperty({example: 'dsvHsdv4', description: 'Промо-код'})
  readonly code: string;
  
  @ApiProperty({example: '15', description: 'Численное количество скидки'})
  readonly discount: number;

}
