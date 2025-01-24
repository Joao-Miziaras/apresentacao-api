import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class VaultService {
  private readonly vaultUrl = 'http://localhost:8200'; // URL do Vault
  private readonly roleId = '3cdb2639-da01-acd0-d811-11d2eaf60744'; // Substitua pelo role_id gerado no Vault
  private readonly secretId = '317ed312-9a29-5536-0af3-425a94a22a2e'; // Substitua pelo secret_id gerado no Vault

  async getVaultToken(): Promise<string> {
    const url = `${this.vaultUrl}/v1/auth/approle/login`;

    const response = await axios.post(url, {
      role_id: this.roleId,
      secret_id: this.secretId,
    });

    return response.data.auth.client_token;
  }

  async getDatabaseCredentials(): Promise<{ username: string; password: string }> {
    const token = await this.getVaultToken();
    const url = `${this.vaultUrl}/v1/database/creds/mysql-role`;

    const response = await axios.get(url, {
      headers: {
        'X-Vault-Token': token,
      },
    });

    return {
      username: response.data.data.username,
      password: response.data.data.password,
    };
  }
}
