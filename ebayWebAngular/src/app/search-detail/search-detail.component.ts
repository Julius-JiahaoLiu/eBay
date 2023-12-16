import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-search-detail',
  templateUrl: './search-detail.component.html',
  styleUrls: ['./search-detail.component.css']
})
export class SearchDetailComponent {
  @Input() itemDetails: any;
  @Input() itemResults: any;
  constructor() { }
  activeTab = 1;
  changeTab(tab: number) {
    this.activeTab = tab;
  }
}
