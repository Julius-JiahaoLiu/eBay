import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimilarTagComponent } from './similar-tag.component';

describe('SimilarTagComponent', () => {
  let component: SimilarTagComponent;
  let fixture: ComponentFixture<SimilarTagComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SimilarTagComponent]
    });
    fixture = TestBed.createComponent(SimilarTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
