import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Stock } from './stocks.entity';

@Injectable()
export class StocksService {
  constructor(
    @InjectRepository(Stock)
    private readonly stockRepository: Repository<Stock>,
  ) {}

  async generateStockData(count: number = 10): Promise<Stock[]> {
    const stocks: Stock[] = [];
    let initialPrice = (await this.getLatestStockPrice()) || 100; // Usa o último preço ou 100 como base inicial

    for (let i = 0; i < count; i++) {
      const variation = this.getRandomPercentage(-0.02, 0.02); // Variação entre -2% e +2%
      const price = parseFloat((initialPrice * (1 + variation)).toFixed(2));

      const stock = this.stockRepository.create({
        name: 'Fake Investment Co.',
        price,
      });

      stocks.push(stock);
      initialPrice = price;
    }

    // Salva os novos dados no banco de dados
    await this.stockRepository.save(stocks);
    return stocks;
  }

  async getLatestStocks(limit: number = 10): Promise<Stock[]> {
    return this.stockRepository.find({
      order: { createdAt: 'DESC' }, // Ordena do mais recente para o mais antigo
      take: limit, // Limita a busca aos últimos 10 registros
    });
  }
  

  private async getLatestStockPrice(): Promise<number | null> {
    const latestStock = await this.stockRepository.find({
      order: { createdAt: 'DESC' },
      take: 1, // Limita o resultado a apenas 1 registro
    });
  
    return latestStock.length > 0 ? latestStock[0].price : null;
  }
  

  private getRandomPercentage(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }
}
