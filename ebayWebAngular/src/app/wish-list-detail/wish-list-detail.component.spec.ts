import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WishListDetailComponent } from './wish-list-detail.component';

describe('WishListDetailComponent', () => {
  let component: WishListDetailComponent;
  let fixture: ComponentFixture<WishListDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WishListDetailComponent]
    });
    fixture = TestBed.createComponent(WishListDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
