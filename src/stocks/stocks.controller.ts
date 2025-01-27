import { Controller, Get, Post, Body } from '@nestjs/common';
import { StocksService } from './stocks.service';
import { Stock } from './stocks.entity';

@Controller('stocks')
export class StocksController {
  constructor(private readonly stocksService: StocksService) {}

  @Get()
  async getLatestStocks(): Promise<Stock[]> {
    return this.stocksService.getLatestStocks(10); // Busca os últimos 10 registros
  }

  @Post('generate')
  async generateStockData(@Body('count') count: number = 10): Promise<Stock[]> {
    return this.stocksService.generateStockData(count);
  }
}
