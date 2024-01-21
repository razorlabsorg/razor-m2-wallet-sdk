import { Chain } from './types';

export enum M2ChainId {
  DEV_NET = 'movement:m2:devnet',
  TEST_NET = 'movement:m2:testnet',
  MAIN_NET = 'movement:m2:mainnet',
}

export enum M1ChainId {
  DEV_NET = 'movement:m1:devnet',
  TEST_NET = 'movement:m1:testnet',
  MAIN_NET = 'movement:m1:mainnet',
}

export const M2DevnetChain: Chain = {
  id: M2ChainId.DEV_NET,
  name: 'M2 Devnet',
  rpcUrl: 'https://devnet.m2.movementlabs.xyz',
};

export const M1DevnetChain: Chain = {
  id: M1ChainId.DEV_NET,
  name: 'M1 Devnet',
  rpcUrl: 'https://seed-node1.movementlabs.xyz',
};

export const UnknownChain: Chain = {
  id: 'movement:unknown:unknown',
  name: 'Unknown Network',
  rpcUrl: '',
};

export const DefaultChains = [M2DevnetChain, M1DevnetChain];
