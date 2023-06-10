import { getScanUrl } from "./configHelpers"

const URL = getScanUrl();

export const getHecoInfoAddressUrl = (address: string) => {
  return `${URL}/address/${address}`
}

export const getHecoInfoTransactionUrl = (transactionHash: string) => {
  return `${URL}/tx/${transactionHash}`
}

export const getHecoInfoBlockNumberUrl = (block: string | number) => {
  return `${URL}/block/${block}`
}

export const getHecoInfoBlockCountdownUrl = (block: string | number) => {
  return `${URL}/block/countdown/${block}`
}
