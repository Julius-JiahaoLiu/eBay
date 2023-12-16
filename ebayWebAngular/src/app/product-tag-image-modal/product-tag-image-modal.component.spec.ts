import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductTagImageModalComponent } from './product-tag-image-modal.component';

describe('ProductTagImageModalComponent', () => {
  let component: ProductTagImageModalComponent;
  let fixture: ComponentFixture<ProductTagImageModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductTagImageModalComponent]
    });
    fixture = TestBed.createComponent(ProductTagImageModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
