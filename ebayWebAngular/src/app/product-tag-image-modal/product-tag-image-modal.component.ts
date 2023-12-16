import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-product-tag-image-modal',
  templateUrl: './product-tag-image-modal.component.html',
  styleUrls: ['./product-tag-image-modal.component.css']
})
export class ProductTagImageModalComponent {
  constructor(public dialogRef: MatDialogRef<ProductTagImageModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){}

}
