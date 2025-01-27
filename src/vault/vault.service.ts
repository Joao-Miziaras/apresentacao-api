import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import * as dotenv from 'dotenv';
import * as https from 'https';

dotenv.config();

@Injectable()
export class VaultService {
  private vaultUrl = process.env.VAULT_URL;
  private roleId = process.env.VAULT_ROLE_ID;
  private secretId = process.env.VAULT_SECRET_ID;
  private token: string;

  constructor(private readonly httpService: HttpService) {
    // Configura o axios para aceitar certificado sem verificação
    this.httpService.axiosRef.defaults.httpsAgent = new https.Agent({
      rejectUnauthorized: false,
    });
  }

  async authenticate(): Promise<void> {
    const response = await firstValueFrom(
      this.httpService.post(`${this.vaultUrl}/v1/auth/approle/login`, {
        role_id: this.roleId,
        secret_id: this.secretId,
      }),
    );
    this.token = response.data.auth.client_token;
  }

  async getDatabaseCredentials(): Promise<{ username: string; password: string }> {
    if (!this.token) {
      await this.authenticate();
    }

    const response = await firstValueFrom(
      this.httpService.get(`${this.vaultUrl}/v1/database/creds/my-role`, {
        headers: { 'X-Vault-Token': this.token },
      }),
    );

    return response.data.data;
  }
}
