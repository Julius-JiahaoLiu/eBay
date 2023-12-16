import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-seller-tag',
  templateUrl: './seller-tag.component.html',
  styleUrls: ['./seller-tag.component.css']
})
export class SellerTagComponent {
  @Input() Item: any;
  colorMappings:{ [key: string]: string } = {
    'YellowShooting': 'yellow',
    'TurquoiseShooting': 'turquoise',
    'PurpleShooting': 'purple',
    'RedShooting': 'red',
    'GreenShooting': 'green',
    'SilverShooting': 'silver'
  };
  constructor() { }
  ngOnInit() {
    console.log(this.Item);
  }
}
