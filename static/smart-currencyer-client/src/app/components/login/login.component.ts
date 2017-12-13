import { Component, OnInit } from '@angular/core';
import { LoginService } from './../../services/login.service';
import swal from 'sweetalert2';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
    this.logAction();
  }

  logAction(): void {
    if (this.loginService.isAuthenticated()) {
      this.loginService.logout();
    }
  }

  login(username:string, password:string): void {
    username = username.trim();
    password = password.trim();
    if (!username) { return; }
    if (!password) { return; }
    this.loginService.login(username, password)
      .subscribe(logged => {
        if (logged == null) {
          swal({
            title: 'Login failed',
            text: 'Bad credentials',
            type: 'error',
          })
        } else {
          this.router.navigate(['/wallets']);
        }
      });
  }

}
