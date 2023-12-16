import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductTagImageModalComponent } from '../product-tag-image-modal/product-tag-image-modal.component';

@Component({
  selector: 'app-product-tag',
  templateUrl: './product-tag.component.html',
  styleUrls: ['./product-tag.component.css']
})
export class ProductTagComponent {
  @Input() Item: any;
  constructor(public dialog: MatDialog) {}
  openDialog(event: Event){
    event.preventDefault();
    const dialogRef = this.dialog.open(ProductTagImageModalComponent, {
      data: { imageURLs: this.Item.PictureURL }
    });
    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    // });
  }
  imageMessageTrans(): string {
    if (this.Item.PictureURL) {
      return 'View Product Images Here';
    }
    return 'No records';
  }
  returnPolicyTrans(): string {
    if (this.Item.ReturnPolicy.ReturnsAccepted && this.Item.ReturnPolicy.ReturnsWithin) { 
      return this.Item.ReturnPolicy.ReturnsAccepted + ' Within ' + this.Item.ReturnPolicy.ReturnsWithin;
    }
    return this.Item.ReturnPolicy.ReturnsAccepted;
  }
}
