import { providers } from "ethers";

export type LimitOrderTransactionReceipt = {
    id: string | number | symbol;
    transactionReceipt: providers.TransactionReceipt
}