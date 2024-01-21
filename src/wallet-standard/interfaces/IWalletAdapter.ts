import {
  StandardConnectFeature,
  StandardConnectMethod,
  StandardDisconnectFeature,
  StandardDisconnectMethod,
  StandardEventsFeature,
  StandardEventsOnMethod,
  SuiSignAndExecuteTransactionBlockFeature,
  SuiSignAndExecuteTransactionBlockMethod,
  SuiSignTransactionBlockFeature,
  SuiSignTransactionBlockMethod,
  WalletWithFeatures,
  SuiSignPersonalMessageFeature,
  SuiSignPersonalMessageMethod,
  AptosSignAndSubmitTransactionFeature,
  AptosSignMessageFeature,
  AptosSignAndSubmitTransactionMethod,
  AptosSignMessageMethod,
  SuiSignMessageMethod,
  SuiSignMessageFeature,
} from '@razorlabs/wallet-standard';
import {
  AptosSignTransactionFeature,
  AptosSignTransactionMethod,
} from '@razorlabs/wallet-standard/dist/features/aptosSignTransaction';

export type ISuiWalletAdapter = WalletWithFeatures<
  StandardConnectFeature &
    StandardEventsFeature &
    SuiSignAndExecuteTransactionBlockFeature &
    SuiSignTransactionBlockFeature &
    SuiSignMessageFeature &
    SuiSignPersonalMessageFeature &
    Partial<StandardDisconnectFeature>
> & {
  hasFeature: (name: string) => boolean;
  connect: StandardConnectMethod;
  disconnect: StandardDisconnectMethod;
  on: StandardEventsOnMethod;
  signAndExecuteTransactionBlock: SuiSignAndExecuteTransactionBlockMethod;
  signTransactionBlock: SuiSignTransactionBlockMethod;
  signPersonalMessage: SuiSignPersonalMessageMethod;
  /**
   * @deprecated use signPersonalMessage instead
   */
  signMessage: SuiSignMessageMethod;
};

export type IAptosWalletAdapter = WalletWithFeatures<
  StandardConnectFeature &
    StandardEventsFeature &
    AptosSignAndSubmitTransactionFeature &
    AptosSignTransactionFeature &
    AptosSignMessageFeature &
    Partial<StandardDisconnectFeature>
> & {
  hasFeature: (name: string) => boolean;
  connect: StandardConnectMethod;
  disconnect: StandardDisconnectMethod;
  on: StandardEventsOnMethod;
  signAndSubmitTransaction: AptosSignAndSubmitTransactionMethod;
  signTransaction: AptosSignTransactionMethod;
  signMessage: AptosSignMessageMethod;
};
