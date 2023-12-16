import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingTagComponent } from './shipping-tag.component';

describe('ShippingTagComponent', () => {
  let component: ShippingTagComponent;
  let fixture: ComponentFixture<ShippingTagComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShippingTagComponent]
    });
    fixture = TestBed.createComponent(ShippingTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
