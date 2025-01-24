import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StocksModule } from './stocks/stocks.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql', // ou 'mysql'
      host: 'localhost',
      port: 3306, // ou 3306 para MySQL
      username: 'admin',
      password: 'admin',
      database: 'apresentacao',
      autoLoadEntities: true,
      synchronize: true, // Apenas para desenvolvimento
    }),
    AuthModule,
    StocksModule,
  ],
})
export class AppModule {}
