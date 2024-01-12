import { Chain } from './types';

export enum M2ChainId {
  DEV_NET = 'movement:m2:devnet',
  TEST_NET = 'movement:m2:testnet',
  MAIN_NET = 'movement:m2:mainnet',
}

export const M2DevnetChain: Chain = {
  id: M2ChainId.DEV_NET,
  name: 'M2 Devnet',
  rpcUrl: 'https://devnet.m2.movementlabs.xyz',
};

export const UnknownChain: Chain = {
  id: 'movement:unknown:unknown',
  name: 'Unknown Network',
  rpcUrl: '',
};

export const DefaultChains = [M2DevnetChain];
