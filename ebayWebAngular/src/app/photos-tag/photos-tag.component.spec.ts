import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotosTagComponent } from './photos-tag.component';

describe('PhotosTagComponent', () => {
  let component: PhotosTagComponent;
  let fixture: ComponentFixture<PhotosTagComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PhotosTagComponent]
    });
    fixture = TestBed.createComponent(PhotosTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
