import * as presets from './preset-wallets';

export const AllDefaultSuiWallets = [
  presets.RazorWallet,
  presets.SuiWallet,
  ...[presets.EthosWallet].sort((a, b) => (a.name < b.name ? -1 : 1)),
];

export const AllDefaultAptosWallets = [
  presets.RazorWallet,
  presets.MartianWallet,
  ...[presets.PetraWallet].sort((a, b) => (a.name < b.name ? -1 : 1)),
];
