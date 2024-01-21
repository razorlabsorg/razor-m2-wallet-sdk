import { Wallet } from '@razorlabs/wallet-standard';

export function isStandardSuiWalletAdapterCompatibleWallet(wallet: Wallet) {
  return (
    'standard:connect' in wallet.features &&
    'standard:events' in wallet.features &&
    'sui:signAndExecuteTransactionBlock' in wallet.features
  );
}

export function isStandardAptosWalletAdapterCompatibleWallet(wallet: Wallet) {
  return (
    'standard:connect' in wallet.features &&
    'standard:events' in wallet.features &&
    'aptos:signAndSubmitTransaction' in wallet.features
  );
}
