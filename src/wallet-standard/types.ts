import { IWalletAdapter } from './interfaces/IWalletAdapter';
import {
  StandardEventsListeners,
  SuiChain,
  Wallet,
  WalletAccount,
} from '@mysten/wallet-standard';

export type WalletRadarSubscriptionInput = (wallets: IWalletAdapter[]) => void;
export type WalletRadarSubscriptionOutput = () => void;

export type WalletEvent =
  | keyof StandardEventsListeners
  | 'chainChange'
  | 'featureChange'
  | 'accountChange';

export type WalletEventListeners = StandardEventsListeners & {
  chainChange: (params: ChainChangeParams) => void;
  featureChange: (params: FeatureChangeParams) => void;
  accountChange: (params: AccountChangeParams) => void;
};

type M2Chain = 'm2:devnet' | 'm2:testnet';

export interface ChainChangeParams {
  chain: M2Chain;
}

export interface AccountChangeParams {
  account: WalletAccount;
}

export interface FeatureChangeParams {
  features: Wallet['features'];
}
