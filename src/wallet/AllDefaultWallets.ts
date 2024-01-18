import * as presets from './preset-wallets';

export const AllDefaultWallets = [
  presets.RazorWallet,
  presets.SuiWallet,
  ...[
    presets.EthosWallet,
  ].sort((a, b) => (a.name < b.name ? -1 : 1)),
];
