export enum FeatureName {
  STANDARD__CONNECT = 'standard:connect',
  STANDARD__DISCONNECT = 'standard:disconnect',
  STANDARD__EVENTS = 'standard:events',
  SUI__SIGN_AND_EXECUTE_TRANSACTION_BLOCK = 'sui:signAndExecuteTransactionBlock',
  SUI__SIGN_TRANSACTION_BLOCK = 'sui:signTransactionBlock',
  SUI__SIGN_PERSONAL_MESSAGE = 'sui:signPersonalMessage',
  // @deprecated use SUI__SIGN_PERSONAL_MESSAGE instead
  SUI__SIGN_MESSAGE = 'sui:signMessage',
  APTOS__SIGN_AND_SUBMIT_TRANSACTION = 'aptos:signAndSubmitTransaction',
  APTOS__SIGN_TRANSACTION = 'aptos:signTransaction',
  APTOS__SIGN_MESSAGE = 'aptos:signMessage',
}
