import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MtlPreIssuTableComponent } from './mtl-pre-issu-table.component';

describe('MtlPreIssuTableComponent', () => {
  let component: MtlPreIssuTableComponent;
  let fixture: ComponentFixture<MtlPreIssuTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MtlPreIssuTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MtlPreIssuTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
