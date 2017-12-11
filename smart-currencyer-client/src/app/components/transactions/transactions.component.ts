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

    const fromWallet = this.selectedWallet
    const toUser = this.selectedUser

    this.walletService.getWalletOfUser(toUser, fromWallet.currency)
      .subscribe(toWallet => {

          // this.transactionService.addWallet({ fromWallet, toWallet, amount } as Transaction)
          //   .subscribe(transaction => {
          //     if (transaction) {
          //       $('#transactionModal').modal('hide');
          //       swal({
          //         title: 'Transaction created',
          //         type: 'success',
          //       })
          //       this.transactions.push(transaction);
          //     } else {
          //       swal({
          //         title: 'Error creating transaction',
          //         type: 'error',
          //       })
          //     }
          //   });

        })
  }
}