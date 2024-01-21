import {
  IAptosWalletAdapter,
  ISuiWalletAdapter,
  IWalletRadar,
} from './interfaces';
import {
  WalletRadarSubscriptionInput,
  WalletRadarSubscriptionOutput,
} from './types';
import {
  getWallets,
  Wallet,
  Wallets as WalletStandardSdk,
} from '@razorlabs/wallet-standard';
import {
  isStandardAptosWalletAdapterCompatibleWallet,
  isStandardSuiWalletAdapterCompatibleWallet,
} from './utils';
import { SuiWalletAdapter } from './SuiWalletAdapter';
import { AptosWalletAdapter } from './AptosWalletAdapter';

export class WalletRadar implements IWalletRadar {
  private walletStandardSdk: WalletStandardSdk | null;
  private suiWalletAdapterMap: Map<string, ISuiWalletAdapter>;
  private aptosWalletAdapterMap: Map<string, IAptosWalletAdapter>;
  private clearOnRegisterListener: null | (() => void);
  private subscriptions = new Set<WalletRadarSubscriptionInput>();

  constructor() {
    this.walletStandardSdk = null;
    this.clearOnRegisterListener = null;
    this.suiWalletAdapterMap = new Map();
    this.aptosWalletAdapterMap = new Map();
  }

  activate(): void {
    this.walletStandardSdk = getWallets();
    const initialWalletAdapters = this.walletStandardSdk.get();
    initialWalletAdapters.forEach((adapter) => {
      this.setDetectedSuiWalletAdapters(adapter);
      this.setDetectedAptosWalletAdapters(adapter);
    });
    this.clearOnRegisterListener = this.walletStandardSdk.on(
      'register',
      (...newAdapters) => {
        newAdapters.forEach((adapter) => {
          this.setDetectedSuiWalletAdapters(adapter);
          this.setDetectedAptosWalletAdapters(adapter);
        });
        this.notifySuiSubscribers();
        this.notifyAptosSubscribers();
      }
    );
  }

  deactivate(): void {
    if (this.clearOnRegisterListener) {
      this.clearOnRegisterListener();
    }
    this.suiWalletAdapterMap.clear();
    this.aptosWalletAdapterMap.clear();
  }

  getDetectedSuiWalletAdapters(): ISuiWalletAdapter[] {
    return Array.from(this.suiWalletAdapterMap.values());
  }

  getDetectedAptosWalletAdapters(): IAptosWalletAdapter[] {
    return Array.from(this.aptosWalletAdapterMap.values());
  }

  subscribe(
    callback: WalletRadarSubscriptionInput
  ): WalletRadarSubscriptionOutput {
    this.subscriptions.add(callback);
    return () => {
      this.subscriptions.delete(callback);
    };
  }

  private notifySuiSubscribers() {
    this.subscriptions.forEach((subscription) => {
      subscription(this.getDetectedSuiWalletAdapters());
    });
  }

  private notifyAptosSubscribers() {
    this.subscriptions.forEach((subscription) => {
      subscription(this.getDetectedAptosWalletAdapters());
    });
  }

  private setDetectedSuiWalletAdapters(rawAdapter: Wallet) {
    if (!isStandardSuiWalletAdapterCompatibleWallet(rawAdapter)) return;
    if (this.suiWalletAdapterMap.has(rawAdapter.name)) return;

    this.suiWalletAdapterMap.set(
      rawAdapter.name,
      new SuiWalletAdapter(rawAdapter)
    );
  }

  private setDetectedAptosWalletAdapters(rawAdapter: Wallet) {
    if (!isStandardAptosWalletAdapterCompatibleWallet(rawAdapter)) return;
    if (this.aptosWalletAdapterMap.has(rawAdapter.name)) return;

    this.aptosWalletAdapterMap.set(
      rawAdapter.name,
      new AptosWalletAdapter(rawAdapter)
    );
  }
}
