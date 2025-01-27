import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StocksModule } from './stocks/stocks.module';
import { AuthModule } from './auth/auth.module';
import { VaultModule } from './vault/vault.module'; 
import { VaultService } from './vault/vault.service';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    VaultModule,

    TypeOrmModule.forRootAsync({
      imports: [VaultModule], // Importa dentro do contexto do TypeOrm
      inject: [VaultService],
      useFactory: async (vaultService: VaultService) => {
        const { username, password } = await vaultService.getDatabaseCredentials();

        return {
          type: 'mysql',
          host: process.env.DB_HOST || 'localhost',
          port: Number(process.env.DB_PORT) || 3306,
          username,
          password,
          database: process.env.DB_NAME || 'apresentacao',
          autoLoadEntities: true,
          synchronize: true,
        };
      },
    }),

    AuthModule,
    StocksModule,
  ],
})
export class AppModule {}
