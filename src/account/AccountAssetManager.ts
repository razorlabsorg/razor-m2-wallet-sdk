import { IAccountAssetManager } from './interfaces/IAccountAssetManager';
import { SuiClient } from '@mysten/sui.js/client';
import { SuiAccountCoinManager } from './SuiAccountCoinManager';
import { SUI_TYPE_ARG } from '@mysten/sui.js/utils';
import { AptosAccountCoinManager } from './AptosAccountCoinManager';
import { AptosClient } from 'movement-sdk';

export class AccountAssetManager implements IAccountAssetManager {
  private suiAddress: string;
  private aptosAddress: string;
  private suiChainRpcUrl: string;
  private aptosChainRpcUrl: string;
  private suiClient: SuiClient;
  private aptosClient: AptosClient;

  constructor(
    suiAddress: string,
    aptosAddress: string,
    options: {
      suiChainRpcUrl: string;
      aptosChainRpcUrl: string;
    }
  ) {
    this.suiAddress = suiAddress;
    this.aptosAddress = aptosAddress;
    this.suiChainRpcUrl = options.suiChainRpcUrl;
    this.aptosChainRpcUrl = options.aptosChainRpcUrl;
    this.suiClient = new SuiClient({
      url: options.suiChainRpcUrl,
    });
    this.aptosClient = new AptosClient(options.aptosChainRpcUrl);
  }

  getSuiAddress(): string {
    return this.suiAddress;
  }

  getAptosAddress(): string {
    return this.aptosAddress;
  }

  getSuiCoinBalance(coinType: string): Promise<bigint> {
    const coinManager = new SuiAccountCoinManager(this.suiClient, coinType);
    return coinManager.getBalance(this.suiAddress);
  }

  getAptosCoinBalance(coinType: string): Promise<bigint> {
    const coinManager = new AptosAccountCoinManager(this.aptosClient, coinType);
    return coinManager.getBalance(this.suiAddress);
  }

  getSuiBalance(): Promise<bigint> {
    return this.getSuiCoinBalance(SUI_TYPE_ARG);
  }

  getAptosBalance(): Promise<bigint> {
    return this.getAptosCoinBalance('0x1::aptos_coin::AptosCoin');
  }

  getAptosChainRpcUrl(): string {
    return this.aptosChainRpcUrl;
  }

  getSuiChainRpcUrl(): string {
    return this.suiChainRpcUrl;
  }

  setAptosChainRpcUrl(chainRpcUrl: string): void {
    this.aptosChainRpcUrl = chainRpcUrl;
    this.aptosClient = new AptosClient(chainRpcUrl);
  }

  setSuiChainRpcUrl(chainRpcUrl: string): void {
    this.suiChainRpcUrl = chainRpcUrl;
    this.suiClient = new SuiClient({
      url: chainRpcUrl,
    });
  }
}
