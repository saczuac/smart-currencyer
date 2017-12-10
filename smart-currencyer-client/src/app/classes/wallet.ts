import { Currency } from './currency'
import { User } from './user'

export class Wallet {
  id: number;
  balance: number;
  currency: Currency;
  user: User;
}