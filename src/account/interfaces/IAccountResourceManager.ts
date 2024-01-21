import { AptosClient, Types } from 'movement-sdk';

export interface IAccountResourceManager {
  getOwnedResources(address: string): Promise<Types.MoveResource[]>;
  getAptosClient(): AptosClient;
  setAptosClient(aptosClient: AptosClient): void;
}
