import { AptosClient } from 'movement-sdk';
import { AptosCoinResource } from '../../common/AptosCoinResource';

export interface IAptosAccountCoinManager {
  getOwnedCoins(address: string): Promise<AptosCoinResource[]>;
  getBalance(address: string): Promise<bigint>;
  getAptosClient(): AptosClient;
  setAptosClient(suiClient: AptosClient): void;
}
