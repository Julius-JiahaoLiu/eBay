import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-shipping-tag',
  templateUrl: './shipping-tag.component.html',
  styleUrls: ['./shipping-tag.component.css']
})
export class ShippingTagComponent {
  @Input() itemResults: any;
  constructor() { }
  shipCostTrans(cost: string): string {
    if (cost === '0.0') {return 'Free Shipping';}
    else {return '$' + cost;}
  }
  handlingTrans(handling: string): string {
    if (handling === '0' || handling === '1') {return handling + ' Day';}
    else {return handling + ' Days';}
  }
}
