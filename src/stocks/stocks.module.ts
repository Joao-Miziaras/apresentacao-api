import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StocksService } from './stocks.service';
import { StocksController } from './stocks.controller';
import { Stock } from './stocks.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Stock])], // Adicione a entidade Stock aqui
  controllers: [StocksController],
  providers: [StocksService],
})
export class StocksModule {}
