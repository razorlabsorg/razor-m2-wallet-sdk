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
} from '@razorlabs/wallet-standard';
import {
  AptosSignTransactionFeature,
  AptosSignTransactionMethod,
} from '@razorlabs/wallet-standard/dist/features/aptosSignTransaction';

export type IWalletAdapter = Partial<
  WalletWithFeatures<
    StandardConnectFeature &
      StandardEventsFeature &
      SuiSignAndExecuteTransactionBlockFeature &
      SuiSignTransactionBlockFeature &
      SuiSignPersonalMessageFeature &
      Partial<StandardDisconnectFeature>
  >
> &
  Partial<
    WalletWithFeatures<
      StandardConnectFeature &
        StandardEventsFeature &
        AptosSignAndSubmitTransactionFeature &
        AptosSignTransactionFeature &
        AptosSignMessageFeature &
        Partial<StandardDisconnectFeature>
    >
  > & {
    hasFeature: (name: string) => boolean;
    connect: StandardConnectMethod;
    disconnect: StandardDisconnectMethod;
    on: StandardEventsOnMethod;
    signAndExecuteTransactionBlock: SuiSignAndExecuteTransactionBlockMethod;
    signTransactionBlock: SuiSignTransactionBlockMethod;
    signPersonalMessage: SuiSignPersonalMessageMethod;
    signAndSubmitTransaction: AptosSignAndSubmitTransactionMethod;
    signTransaction: AptosSignTransactionMethod;
    signMessage: AptosSignMessageMethod;
  };
