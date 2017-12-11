import { Wallet } from './wallet'

export class Transaction {
  id: number;
  amount: number;
  from_wallet: Wallet;
  to_wallet: Wallet;
}