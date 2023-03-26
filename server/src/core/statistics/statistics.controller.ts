import { Body, Controller, Get} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger/dist';
import { ApiTags } from '@nestjs/swagger/dist/decorators/api-use-tags.decorator';
import { StatisticsService } from './statistics.service';

@ApiTags('Статистика')
@Controller('api/statistics/')
export class StatisticsController {
  constructor(private statisticsService: StatisticsService) {}

  @ApiOperation({summary: "Статистика количества оформленных заказов в месяц"})
  @ApiResponse({status: 200})
  @Get('/count-orders-in-month')
  getOrdersInMonth() {
    return this.statisticsService.getCountOrdersInMonth();
  }

  @ApiOperation({summary: "Статистика количества регистраций в месяц"})
  @ApiResponse({status: 200})
  @Get('/count-users-in-month')
  getUsersInMonth() {
    return this.statisticsService.getCountUserInMonth();
  }

}
