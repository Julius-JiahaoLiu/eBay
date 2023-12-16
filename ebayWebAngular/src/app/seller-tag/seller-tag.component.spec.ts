import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerTagComponent } from './seller-tag.component';

describe('SellerTagComponent', () => {
  let component: SellerTagComponent;
  let fixture: ComponentFixture<SellerTagComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SellerTagComponent]
    });
    fixture = TestBed.createComponent(SellerTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
