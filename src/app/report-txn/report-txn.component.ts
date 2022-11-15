import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ReportService } from '../report-service/report.service';
import { ReportTxn } from '../report-model/report-txn.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatFormFieldControl } from '@angular/material/form-field';
import { FormGroup, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import * as FileSaver from 'file-saver';
import { ExcelExportService } from '../report-service/excel-export.service';
import {
  FunctionalLocation,
  FunctionalLocationModel,
} from '../report-model/functional-location';
import { elementAt } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { WarningDialogComponent } from './warning-dialog/warning-dialog.component';

@Component({
  selector: 'app-report-txn',
  templateUrl: './report-txn.component.html',
  styleUrls: ['./report-txn.component.css'],
})
export class ReportTxnComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('menuTrigger') menuTrigger!: MatMenuTrigger;

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  title: string = 'ReportTxn';
  dataSource = new MatTableDataSource<ReportTxn>();
  functionalLocationId: number[] = [];
  functionalLocation: FunctionalLocation[] = [];
  functionalLocationForm = new FormControl('');
  functionalLocationModel: FunctionalLocationModel[] = [];

  page: number = 0;
  size: number[] = [10, 20, 30, 40, 50];

  // this.formGroup.get('name of you control').value   -> cara ambil value dari formGroup

  // percobaan excel ecport
  data: any[] = [];
  columns: any[] = [];
  footerData: any[][] = [];
  totalSalesAmount = 0;

  constructor(
    private reportService: ReportService,
    public excelExportService: ExcelExportService,
    public dialog: MatDialog,

  ) {}

  public displayedColumns = [
    'reporttransactionid',
    'shift',
    'datecreated',
    'jobtype',
    'timeinformed',
    'starttime',
    'finishtime',
    'totaltime',
    'stoppagetime',
    'functionallocation',
    'subfunctionallocation',
    'machine',
    'detailmachine',
    'problem',
    'cause',
    'bias',
    'action',
    'executor1',
    'executor2',
    'executorextra',
    'condition',
    'reason',
    'note',
    'option',
  ];

  ngAfterViewInit(): void {
    // yg dijalanin pas awal mulai

    this.functionalLocation = [];
    this.getFunctionalLocation();
    this.functionalLocation.push();
    this.dataSource.paginator = this.paginator;
  }

  displayReportTxn() {
    // function pas tombol submit dipencet
    // alert("Test Display");
    let init: number = 0;
    const datepipe: DatePipe = new DatePipe('en-US');

    let formattedStart = datepipe.transform(
      this.range.get('start')!.value,
      'YYYY-MM-dd'
    );
    let formattedEnd = datepipe.transform(
      this.range.get('end')!.value,
      'YYYY-MM-dd'
    );

    this.functionalLocation = JSON.parse(
      JSON.stringify(this.functionalLocationForm.value)
    );
    this.functionalLocationId = this.functionalLocation.map(
      (data) => data.functionallocationid
    );
    this,
      this.functionalLocationId.forEach(function (value) {
        console.log('isi 1 1');
        console.log(value);
      });

    this.getReportTxns(
      formattedStart + '',
      formattedEnd + '',
      this.functionalLocationId
    );
    this.functionalLocationId = [];
  }

  public getReportTxns(
    dateCreatedStart: string,
    dateCreatedEnd: string,
    functionalLocationId: number[]
  ): void {
    // manggil data dari service
    this.reportService
      .getReportTxn(dateCreatedStart, dateCreatedEnd, functionalLocationId)
      .subscribe({
        next: (data) => {
          this.dataSource.data = data;
        },
        error: (e) => console.error(e),
      });
  }

  public getFunctionalLocation() {
    this.reportService.getFunctionalLocation().subscribe({
      next: (data) => {
        this.functionalLocation = data;
        console.log('isi data');
        console.log(data);
        console.log('json location value : ');
        console.log(this.functionalLocation);
      },
      error: (e) => console.error(e),
    });
  }

  // Percobaan Excel export
  exportExcel() {
    this.excelExportService.exportAsExcelFile(
      'Txn Report',
      '',
      this.columns,
      this.dataSource.data,
      this.footerData,
      'sales-report',
      'Sheet1'
    );
  }


  openDialog(id:number) {
    const dialogRef = this.dialog.open(WarningDialogComponent, {restoreFocus: false, data:id});

    // Manually restore focus to the menu trigger since the element that
    // opens the dialog won't be in the DOM any more when the dialog closes.
    dialogRef.afterClosed().subscribe(() => this.menuTrigger.focus());
  }
}
