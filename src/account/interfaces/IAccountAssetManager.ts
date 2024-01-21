export interface IAccountAssetManager {
  getSuiBalance(): Promise<bigint>;
  getAptosBalance(): Promise<bigint>;
  getSuiCoinBalance(coinType: string): Promise<bigint>;
  getAptosCoinBalance(coinType: string): Promise<bigint>;
  getSuiAddress(): string;
  getAptosAddress(): string;
  setAptosChainRpcUrl(chainRpcUrl: string): void;
  getAptosChainRpcUrl(): string;
  setSuiChainRpcUrl(chainRpcUrl: string): void;
  getSuiChainRpcUrl(): string;
}
