import { Component, OnInit, Input } from '@angular/core';
import { Link } from './../../classes/link';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input() title: String;
  links: Link[];
  selectedLink: Link;

  constructor() { }

  getLinks(): void {
    this.links = [
      {"name":"Currencies", "url":"/currencies"} as Link,
      // {"name":"AnotherLink", "url":"/path"} as Link,
    ];
  }

  onSelect(link: Link): void {
    this.selectedLink = link;
  }

  ngOnInit() {
    this.getLinks();
  }

}
