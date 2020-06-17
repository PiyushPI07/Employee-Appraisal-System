import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor() { }
  shrink:boolean;
  events: string[] = [];
  opened: boolean;
  onResize(event) {
    this.shrink = (window.innerWidth <= 600) ? true : false;
    console.log(window.innerWidth)
  }
  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));
  ngOnInit(): void {
    this.shrink = (window.innerWidth <= 600) ? true : false;

  }

}
