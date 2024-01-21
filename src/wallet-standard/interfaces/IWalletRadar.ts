import { IAptosWalletAdapter, ISuiWalletAdapter } from './IWalletAdapter';
import {
  WalletRadarSubscriptionInput,
  WalletRadarSubscriptionOutput,
} from '../types';

export interface IWalletRadar {
  activate: () => void;
  deactivate: () => void;
  getDetectedSuiWalletAdapters: () => ISuiWalletAdapter[];
  getDetectedAptosWalletAdapters: () => IAptosWalletAdapter[];
  /**
   * Subscribe to detected wallet updates
   * @param callback
   */
  subscribe: (
    callback: WalletRadarSubscriptionInput
  ) => WalletRadarSubscriptionOutput;
}
