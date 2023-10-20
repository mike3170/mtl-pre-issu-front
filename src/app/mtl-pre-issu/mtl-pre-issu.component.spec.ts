import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MtlPreIssuComponent } from './mtl-pre-issu.component';

describe('MtlPreIssuComponent', () => {
  let component: MtlPreIssuComponent;
  let fixture: ComponentFixture<MtlPreIssuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MtlPreIssuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MtlPreIssuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
