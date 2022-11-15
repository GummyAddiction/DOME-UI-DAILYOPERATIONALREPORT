import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportTxnComponent } from './report-txn.component';

describe('ReportTxnComponent', () => {
  let component: ReportTxnComponent;
  let fixture: ComponentFixture<ReportTxnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportTxnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportTxnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
