import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgBottonComponent } from './ag-botton.component';

describe('AgBottonComponent', () => {
  let component: AgBottonComponent;
  let fixture: ComponentFixture<AgBottonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgBottonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgBottonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
