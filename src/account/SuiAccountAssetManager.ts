import { ISuiAccountAssetManager } from './interfaces/ISuiAccountAssetManager';
import { SuiClient } from '@mysten/sui.js/client';
import { SuiAccountCoinManager } from './SuiAccountCoinManager';
import { SUI_TYPE_ARG } from '@mysten/sui.js/utils';

export class SuiAccountAssetManager implements ISuiAccountAssetManager {
  private address: string;
  private chainRpcUrl: string;
  private suiClient: SuiClient;

  constructor(
    address: string,
    options: {
      chainRpcUrl: string;
    }
  ) {
    this.address = address;
    this.chainRpcUrl = options.chainRpcUrl;
    this.suiClient = new SuiClient({
      url: options.chainRpcUrl,
    });
  }

  getAddress(): string {
    return this.address;
  }

  getCoinBalance(coinType: string): Promise<bigint> {
    const coinManager = new SuiAccountCoinManager(this.suiClient, coinType);
    return coinManager.getBalance(this.address);
  }

  getSuiBalance(): Promise<bigint> {
    return this.getCoinBalance(SUI_TYPE_ARG);
  }

  getChainRpcUrl(): string {
    return this.chainRpcUrl;
  }

  setChainRpcUrl(chainRpcUrl: string): void {
    this.chainRpcUrl = chainRpcUrl;
    this.suiClient = new SuiClient({
      url: chainRpcUrl,
    });
  }
}
