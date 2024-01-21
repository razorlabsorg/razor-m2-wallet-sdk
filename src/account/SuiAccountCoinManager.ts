import { ISuiAccountCoinManager } from './interfaces';
import { SuiCoinObject } from '../common';
import { SuiClient, PaginatedCoins } from '@mysten/sui.js/client';
import { AccountObjectManager } from './AccountObjectManager';

export class SuiAccountCoinManager
  extends AccountObjectManager
  implements ISuiAccountCoinManager
{
  private coinType: string;

  constructor(suiClient: SuiClient, coinType: string) {
    super(suiClient);
    this.coinType = coinType;
  }

  /**
   * Get the coin object of one specific token type
   */
  async getOwnedCoins(address: string): Promise<SuiCoinObject[]> {
    let hasNextPage = true;
    let nextCursor = null;
    let coins: SuiCoinObject[] = [];
    while (hasNextPage) {
      const paginatedCoins: PaginatedCoins = await this.client.getCoins({
        owner: address,
        coinType: this.coinType,
        cursor: nextCursor,
      });
      paginatedCoins.data.forEach((coin) => {
        coins.push(
          new SuiCoinObject(
            coin.coinObjectId,
            coin.coinType,
            BigInt(coin.balance)
          )
        );
      });
      hasNextPage = paginatedCoins.hasNextPage;
      nextCursor = paginatedCoins.nextCursor;
    }
    return coins;
  }

  async getBalance(address: string): Promise<bigint> {
    const res = await this.client.getBalance({
      owner: address,
      coinType: this.coinType,
    });
    return BigInt(res.totalBalance);
  }
}
