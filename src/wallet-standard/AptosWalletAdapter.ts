import {
  StandardConnectOutput,
  StandardEventsListeners,
  StandardEventsNames,
  StandardConnectInput,
  StandardConnectMethod,
  StandardDisconnectMethod,
  StandardEventsOnMethod,
  Wallet,
  AptosSignAndSubmitTransactionInput,
  AptosSignAndSubmitTransactionOutput,
  AptosSignAndSubmitTransactionMethod,
  UserResponse,
  AptosSignMessageInput,
  AptosSignMessageOutput,
  AptosSignMessageMethod,
} from '@razorlabs/wallet-standard';
import { IAptosWalletAdapter } from './interfaces';
import {
  ErrorCode,
  handleConnectionError,
  WalletError,
  WalletNotImplementError,
} from '../error-handling';
import { FeatureName } from './constants';
import { has } from '../utils';
import {
  AptosSignTransactionInput,
  AptosSignTransactionMethod,
  AptosSignTransactionOutput,
} from '@razorlabs/wallet-standard/dist/features/aptosSignTransaction';

/**
 * Wrap the adapter that supports wallet-standard
 * provider universal interfaces to component usage
 */
export class AptosWalletAdapter implements IAptosWalletAdapter {
  private standardWalletAdapter: Wallet;

  constructor(standardWalletAdapter: Wallet) {
    this.standardWalletAdapter = standardWalletAdapter;
  }

  get name() {
    return this.standardWalletAdapter.name;
  }

  get icon() {
    return this.standardWalletAdapter.icon;
  }

  get version() {
    return this.standardWalletAdapter.version;
  }

  get accounts() {
    return this.standardWalletAdapter.accounts;
  }

  get chains() {
    return this.standardWalletAdapter.chains;
  }

  get features() {
    return this.standardWalletAdapter.features as any;
  }

  async connect(
    input: StandardConnectInput | undefined
  ): Promise<StandardConnectOutput> {
    const feature = this.getFeature<{ connect: StandardConnectMethod }>(
      FeatureName.STANDARD__CONNECT
    );
    try {
      return await feature.connect(input);
    } catch (e) {
      const { code, message, details } = handleConnectionError(
        e as Error,
        this.name
      );
      throw new WalletError(message, code, details);
    }
  }

  async disconnect(): Promise<void> {
    const feature = this.getFeature<{ disconnect: StandardDisconnectMethod }>(
      FeatureName.STANDARD__DISCONNECT
    );
    try {
      return await feature.disconnect();
    } catch (e) {
      throw new WalletError(
        (e as any).message,
        ErrorCode.WALLET__DISCONNECT_ERROR
      );
    }
  }

  on(
    event: StandardEventsNames,
    listener: StandardEventsListeners[StandardEventsNames]
  ): () => void {
    const feature = this.getFeature<{ on: StandardEventsOnMethod }>(
      FeatureName.STANDARD__EVENTS
    );
    try {
      return feature.on<StandardEventsNames>(event, listener);
    } catch (e) {
      throw new WalletError(
        (e as any).message,
        ErrorCode.WALLET__LISTEN_TO_EVENT_ERROR
      );
    }
  }

  async signAndSubmitTransaction(
    input: AptosSignAndSubmitTransactionInput
  ): Promise<UserResponse<AptosSignAndSubmitTransactionOutput>> {
    const feature = this.getFeature<{
      signAndSubmitTransaction: AptosSignAndSubmitTransactionMethod;
    }>(FeatureName.APTOS__SIGN_AND_SUBMIT_TRANSACTION);
    try {
      return await feature.signAndSubmitTransaction(input);
    } catch (e) {
      throw new WalletError(
        (e as any).message,
        ErrorCode.WALLET__SIGN_TX_ERROR
      );
    }
  }

  signTransaction(
    input: AptosSignTransactionInput
  ): Promise<UserResponse<AptosSignTransactionOutput>> {
    const feature = this.getFeature<{
      signTransaction: AptosSignTransactionMethod;
    }>(FeatureName.APTOS__SIGN_TRANSACTION);
    try {
      return feature.signTransaction(input);
    } catch (e) {
      throw new WalletError(
        (e as any).message,
        ErrorCode.WALLET__SIGN_TX_ERROR
      );
    }
  }

  async signMessage(
    input: AptosSignMessageInput
  ): Promise<UserResponse<AptosSignMessageOutput>> {
    const feature = this.getFeature<{ signMessage: AptosSignMessageMethod }>(
      FeatureName.APTOS__SIGN_MESSAGE
    );
    try {
      return await feature.signMessage(input);
    } catch (e) {
      throw new WalletError(
        (e as any).message,
        ErrorCode.WALLET__SIGN_MSG_ERROR
      );
    }
  }

  hasFeature(name: string): boolean {
    const { features } = this.standardWalletAdapter;
    return has(features, name);
  }

  private getFeature<T = any>(name: string): T {
    const { features } = this.standardWalletAdapter;
    if (!has(features, name)) {
      throw new WalletNotImplementError(name);
    }
    return (features as any)[name];
  }
}
