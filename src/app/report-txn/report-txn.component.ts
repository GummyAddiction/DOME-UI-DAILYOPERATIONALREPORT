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
import { MatHeaderRowDef, MatTableDataSource } from '@angular/material/table';
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
import { PaginationInstance } from 'ngx-pagination';
import * as dayjs from 'dayjs';
import * as updateLocale from 'dayjs/plugin/updateLocale';
import { coerceStringArray } from '@angular/cdk/coercion';

@Component({
  selector: 'app-report-txn',
  templateUrl: './report-txn.component.html',
  styleUrls: ['./report-txn.component.css'],
})
export class ReportTxnComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('menuTrigger') menuTrigger!: MatMenuTrigger;

  startDate!: Date;
  endDate!: Date;
  title: string = 'ReportTxn';
  dataSource = new MatTableDataSource<ReportTxn>();
  reportTxns: ReportTxn[] = [];
  functionalLocationId!: string;
  allFunctionalLocationId!: string;
  functionalLocation: FunctionalLocation[] = [];

  // percobaan excel ecport
  data: any[] = [];
  columns: any[] = [];
  footerData: any[][] = [];

  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [10, 20, 50, 100];

  public lastUpdateDate:string=''


  constructor(
    private reportService: ReportService,
    public excelExportService: ExcelExportService,
    public dialog: MatDialog
  ) {}

  ngAfterViewInit(): void {
    // yg dijalanin pas awal mulai

    this.functionalLocation = [];
    this.getFunctionalLocation();
    this.functionalLocation.push();
    this.dataSource.paginator = this.paginator;

    dayjs.extend(updateLocale);
    //membuat custom days dengan dayjs
    dayjs.updateLocale('en', {
      weekdays: [
        'Minggu',
        'Senin',
        'Selasa',
        'Rabu',
        'Kamis',
        "Jum'at",
        'Sabtu',
      ],
      months: [
        'Januari',
        'Februari',
        'Maret',
        'April',
        'Mei',
        'Juni',
        'Juli',
        'Agustus',
        'September',
        'Oktober',
        'November',
        'Desember',
      ],
    });
  }

  displayReportTxn() {
    // function pas tombol submit dipencet
    let init: number = 0;
    const datepipe: DatePipe = new DatePipe('en-US');

    let formattedStart = datepipe.transform(this.startDate, 'YYYY-MM-dd');
    let formattedEnd = datepipe.transform(this.endDate, 'YYYY-MM-dd');

    this.getReportTxns(
      formattedStart + '',
      formattedEnd + '',
      this.functionalLocationId
    );
    this.functionalLocationId = '';
    this.getFunctionalLocation();

    const now = new Date();
    this.lastUpdateDate = dayjs(now).format('dddd, DD MMMM HH:mm:ss')
  }

  public getReportTxns(
    dateCreatedStart: string,
    dateCreatedEnd: string,
    functionalLocationId: string
  ): void {
    // manggil data dari service
    this.reportService
      .getReportTxn(dateCreatedStart, dateCreatedEnd, functionalLocationId)
      .subscribe({
        next: (data) => {
          this.dataSource.data = data;
          this.reportTxns = data;
        },
        error: (e) => console.error(e),
      });
  }

  public getFunctionalLocation() {
    let temp: number[] = [];
    this.reportService.getFunctionalLocation().subscribe({
      next: (data) => {
        this.functionalLocation = data;
        this.functionalLocation.forEach((element) => {
          temp.push(element.functionallocationid);
        });
        this.allFunctionalLocationId = String(temp);
        console.log('get all functional location');
        console.log(this.functionalLocation);
        console.log(this.allFunctionalLocationId);
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

  openDialog(id: number) {
    const dialogRef = this.dialog.open(WarningDialogComponent, {
      restoreFocus: false,
      width: '619px',
      height: '212px',
      data: id,
    });

    // Manually restore focus to the menu trigger since the element that
    // opens the dialog won't be in the DOM any more when the dialog closes.
    dialogRef.afterClosed().subscribe(() => {
      this.displayReportTxn();
      this.menuTrigger.focus();
    });
  }

  dateStartInput(event: Event) {
    console.log(this.startDate);
    console.log(this.functionalLocationId);
    this.getAllData();
  }
  dateEndInput(event: Event) {
    console.log(this.endDate);
    this.getAllData();
  }

  selectFunctionalLocation() {
    console.log(this.functionalLocationId);
    if (this.functionalLocationId == 'All') {
      this.functionalLocationId = this.allFunctionalLocationId;
    }
    console.log(this.functionalLocationId);
    this.getAllData();
  }

  onPageChange(event: any) {
    this.page = event;
  }

  formatDate(any: any) {
    return dayjs(any).format('dddd, DD MMMM YYYY');
  }

  getAllData() {
    console.log('coba untuk get all data');
    console.log(this.startDate);
    console.log(this.endDate);
    console.log(this.functionalLocationId);
    if (
      this.startDate != null &&
      this.endDate != null &&
      this.functionalLocationId != ''
    ) {
      this.displayReportTxn();
    }
  }

  formatTimeHHMM(time: string) {
    if (time == null) {
      time = '00:00';
    }
    if (time.length >= 6) {
      return time.substring(0, 5);
    } else {
      return '00:00';
    }
  }

  formatDateTimeHHMM(date: string) {
    return dayjs(date).format('HH:mm');
  }
}
