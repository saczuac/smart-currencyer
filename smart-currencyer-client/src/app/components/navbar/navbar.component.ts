import { Component, OnInit, Input } from '@angular/core';
import { Link } from './../../classes/link';
import { LoginService }  from './../../services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input() title: String;
  links: Link[];
  selectedLink: Link;

  constructor(private loginService: LoginService) { }

  getLinks(): void {
    let authUrl;

    this.links = [
      {"name":"Currencies", "url":"/currencies"} as Link,
      {"name":"Wallets", "url":"/wallets"} as Link,
      {"name":"Transactions", "url":"/transactions"} as Link
    ];
  }

  onSelect(link: Link): void {
    this.selectedLink = link;
  }

  ngOnInit() {
    this.getLinks();
  }

}
