import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MtlSeqListComponent } from './mtl-seq-list.component';

describe('MtlSeqListComponent', () => {
  let component: MtlSeqListComponent;
  let fixture: ComponentFixture<MtlSeqListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MtlSeqListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MtlSeqListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
