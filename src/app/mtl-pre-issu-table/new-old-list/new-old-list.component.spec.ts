import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewOldListComponent } from './new-old-list.component';

describe('NewOldListComponent', () => {
  let component: NewOldListComponent;
  let fixture: ComponentFixture<NewOldListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewOldListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewOldListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
