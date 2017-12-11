import { Wallet } from './wallet'

export class Transaction {
  id: number;
  amount: number;
  fromWallet: Wallet;
  toWallet: Wallet;
}