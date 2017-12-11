import { Component, OnInit } from '@angular/core';
import { TransactionService } from './../../services/transaction.service';
import { LoginService } from './../../services/login.service';
import { WalletService } from './../../services/wallet.service';
import { UserService } from './../../services/user.service';
import { Transaction } from './../../classes/transaction';
import { Wallet } from './../../classes/wallet';
import { User } from './../../classes/user';

import swal from 'sweetalert2';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  selectedWallet: Wallet;
  selectedUser: User;
  wallets: Wallet[];
  transactions: Transaction[];
  users: User[];

  constructor(
    private walletService: WalletService,
    private transactionService: TransactionService,
    private userService: UserService,
    private loginService: LoginService,
  ) { }

  ngOnInit() {
    this.getTransactions();
    this.getWallets();
    this.getUsers();
  }

  getTransactions(): void {
    this.transactionService.getTransactions()
        .subscribe(transactions => this.transactions = transactions);
  }

  sameUsername(username:string): boolean {
    let myUsername = this.loginService.getUsername();
    return myUsername == username
  }

  getWallets(): void {
    this.walletService.getWallets()
        .subscribe(wallets => this.wallets = wallets);
  }

  getUsers(): void {
    let myUsername = this.loginService.getUsername();
    this.userService.getUsers()
        .subscribe(users => {
          this.users = users.filter(user => user.username != myUsername)
        });
  }

  add(amount: number): void {
    if (!this.selectedWallet) { return; }
    if (!this.selectedUser) { return; }
    if (!amount) { return; }

    if (amount > this.selectedWallet.balance) {
         swal({
            title: `The wallet has not enough money`,
            type: 'error',
          });
         return;
    }

    let from_wallet = this.selectedWallet
    let toUser = this.selectedUser

    this.walletService.getWalletOfUser(toUser, from_wallet.currency)
      .subscribe(to_wallet => {

          if (!to_wallet) {
            return swal({
                  title: `Error creating transaction: ${toUser.username} has not a wallet of currency ${from_wallet.currency.name}`,
                  type: 'error',
                })
          }

          to_wallet = to_wallet[0]

          this.transactionService.addTransaction({ to_wallet, from_wallet, amount } as Transaction)
            .subscribe(transaction => {
              if (transaction) {
                $('#transactionModal').modal('hide');
                swal({
                  title: 'Transaction created',
                  type: 'success',
                })
                this.transactions.push(transaction);
              } else {
                swal({
                  title: 'Error creating transaction',
                  type: 'error',
                })
              }
            });

        })
  }
}