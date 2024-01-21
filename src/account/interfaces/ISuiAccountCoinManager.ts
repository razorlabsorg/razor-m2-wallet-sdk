import { SuiClient } from '@mysten/sui.js/client';
import { SuiCoinObject } from '../../common';

export interface ISuiAccountCoinManager {
  getOwnedCoins(address: string): Promise<SuiCoinObject[]>;
  getBalance(address: string): Promise<bigint>;
  getSuiClient(): SuiClient;
  setSuiClient(suiClient: SuiClient): void;
}
