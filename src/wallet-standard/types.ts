import {
  IAptosWalletAdapter,
  ISuiWalletAdapter,
} from './interfaces/IWalletAdapter';
import {
  StandardEventsListeners,
  M1Chain,
  Wallet,
  WalletAccount,
} from '@razorlabs/aptos-wallet-standard';

import { M2Chain } from '@razorlabs/sui-wallet-standard'

export type WalletRadarSubscriptionInput = (
  wallets: ISuiWalletAdapter[] | IAptosWalletAdapter[]
) => void;
export type WalletRadarSubscriptionOutput = () => void;

export type WalletEvent =
  | keyof StandardEventsListeners
  | 'chainChange'
  | 'featureChange'
  | 'accountChange';

export type WalletEventListeners = StandardEventsListeners & {
  chainChange: (params: M1ChainChangeParams | M2ChainChangeParams) => void;
  featureChange: (params: FeatureChangeParams) => void;
  accountChange: (params: AccountChangeParams) => void;
};

export interface M1ChainChangeParams {
  chain: M1Chain;
}

export interface M2ChainChangeParams {
  chain: M2Chain;
}

export interface AccountChangeParams {
  account: WalletAccount;
}

export interface FeatureChangeParams {
  features: Wallet['features'];
}
