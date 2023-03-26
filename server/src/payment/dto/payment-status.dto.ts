import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';

class AmountPayment {
  value: string;
  currency: string;
}

class ObjectPayment {
  id: number;
  status: string;
  amount: AmountPayment;
  payment_method: {
    type: string;
    id: number;
    saved: boolean;
    title: string;
    card: object;
  };

  created_at: string;
  expires_at: string;
}

export class PaymentStatusDto {
  readonly event: string;
  readonly type: string;
  readonly object: ObjectPayment;
}
