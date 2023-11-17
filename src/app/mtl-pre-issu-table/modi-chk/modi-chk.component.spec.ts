import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModiChkComponent } from './modi-chk.component';

describe('ModiChkComponent', () => {
  let component: ModiChkComponent;
  let fixture: ComponentFixture<ModiChkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModiChkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModiChkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
