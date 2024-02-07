import {
  StandardConnectFeature,
  StandardConnectMethod,
  StandardDisconnectFeature,
  StandardDisconnectMethod,
  StandardEventsFeature,
  StandardEventsOnMethod,
  WalletWithFeatures,
  AptosSignAndSubmitTransactionFeature,
  AptosSignMessageFeature,
  AptosSignAndSubmitTransactionMethod,
  AptosSignMessageMethod,
  AptosSignTransactionFeature,
  AptosSignTransactionMethod,
} from '@razorlabs/aptos-wallet-standard';
import {
  SuiSignMessageMethod,
  SuiSignMessageFeature,
  SuiSignAndExecuteTransactionBlockFeature,
  SuiSignAndExecuteTransactionBlockMethod,
  SuiSignTransactionBlockFeature,
  SuiSignTransactionBlockMethod,
  SuiSignPersonalMessageFeature,
  SuiSignPersonalMessageMethod,
} from '@razorlabs/sui-wallet-standard'

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
