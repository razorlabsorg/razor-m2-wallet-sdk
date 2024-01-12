import { Wallet } from '@razorlabs/wallet-standard';

export function isStandardWalletAdapterCompatibleWallet(wallet: Wallet) {
  return (
    'standard:connect' in wallet.features &&
    'standard:events' in wallet.features &&
    'sui:signAndExecuteTransactionBlock' in wallet.features
  );
}
