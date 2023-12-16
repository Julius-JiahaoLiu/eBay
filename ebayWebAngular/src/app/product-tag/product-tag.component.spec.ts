import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductTagComponent } from './product-tag.component';

describe('ProductTagComponent', () => {
  let component: ProductTagComponent;
  let fixture: ComponentFixture<ProductTagComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductTagComponent]
    });
    fixture = TestBed.createComponent(ProductTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
