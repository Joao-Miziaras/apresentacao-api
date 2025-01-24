import { Controller, Get } from '@nestjs/common';
import { StocksService } from './stocks.service';
import { Stock } from './stocks.entity';

@Controller('stocks')
export class StocksController {
  constructor(private readonly stocksService: StocksService) {}

  @Get()
  async getLatestStocks(): Promise<Stock[]> {
    return this.stocksService.getLatestStocks(10); // Busca os últimos 10 registros
  }
}
