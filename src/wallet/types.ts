import type {
  IAptosWalletAdapter,
  ISuiWalletAdapter,
} from '../wallet-standard';

export interface IWallet {
  name: string;
  label: string;
  adapter: ISuiWalletAdapter | IAptosWalletAdapter | undefined;
  installed: boolean | undefined;
  iconUrl: string;
  downloadUrl: {
    browserExtension?: string; // chrome default
  };
}

export type IDefaultWallet = Omit<
  IWallet,
  keyof {
    adapter: any;
    installed: any;
  }
>;
