import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-wish-list-detail',
  templateUrl: './wish-list-detail.component.html',
  styleUrls: ['./wish-list-detail.component.css']
})
export class WishListDetailComponent {
  @Input() itemDetails: any;
  @Input() itemResults: any;
  constructor() { }
  activeTab = 1;
  changeTab(tab: number) {
    this.activeTab = tab;
  }
}

