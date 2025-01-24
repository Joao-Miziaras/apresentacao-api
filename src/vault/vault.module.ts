import { Module } from '@nestjs/common';
import { VaultService } from './vault.service';

@Module({
  providers: [VaultService],
  exports: [VaultService], // Exporta para outros módulos
})
export class VaultModule {}
