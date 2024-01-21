import { IAptosAccountAssetManager } from "./interfaces/IAptosAccountAssetManager";
import { AptosAccountCoinManager } from "./AptosAccountCoinManager";
import { AptosClient } from "movement-sdk";

export class AptosAccountAssetManager implements IAptosAccountAssetManager {
  private address: string;
  private chainRpcUrl: string;
  private aptosClient: AptosClient;

  constructor(
    address: string,
    options: {
      chainRpcUrl: string;
    }
  ) {
    this.address = address;
    this.chainRpcUrl = options.chainRpcUrl;
    this.aptosClient = new AptosClient(options.chainRpcUrl);
  }

  getAddress(): string {
    return this.address;
  }

  getCoinBalance(coinType: string): Promise<bigint> {
    const coinManager = new AptosAccountCoinManager(this.aptosClient, coinType);
    return coinManager.getBalance(this.address);
  }

  getAptosBalance(): Promise<bigint> {
    return this.getCoinBalance('0x1::aptos_coin::AptosCoin');
  }

  getChainRpcUrl(): string {
    return this.chainRpcUrl;
  }

  setChainRpcUrl(chainRpcUrl: string): void {
    this.chainRpcUrl = chainRpcUrl;
    this.aptosClient = new AptosClient(chainRpcUrl);
  }
}
