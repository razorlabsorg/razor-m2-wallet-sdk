import {
  IAptosWalletAdapter,
  ISuiWalletAdapter,
} from './interfaces/IWalletAdapter';
import {
  StandardEventsListeners,
  MovementChain,
  Wallet,
  WalletAccount,
} from '@razorlabs/wallet-standard';

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
  chainChange: (params: ChainChangeParams) => void;
  featureChange: (params: FeatureChangeParams) => void;
  accountChange: (params: AccountChangeParams) => void;
};

export interface ChainChangeParams {
  chain: MovementChain;
}

export interface AccountChangeParams {
  account: WalletAccount;
}

export interface FeatureChangeParams {
  features: Wallet['features'];
}
