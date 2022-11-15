import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReportService } from 'src/app/report-service/report.service';

@Component({
  selector: 'app-warning-dialog',
  templateUrl: './warning-dialog.component.html',
  styleUrls: ['./warning-dialog.component.css']
})
export class WarningDialogComponent implements OnInit {


  constructor(
    public dialogRef: MatDialogRef<WarningDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number,
    private reportService: ReportService
  ) { }

  ngOnInit(): void {
    console.log('dialog test')
    console.log(this.data)
  }


  deleteReportTxn(id: number): void{
    this.reportService.deleteReportTxn(Number(this.data));
    console.log('masuk di warning fc')
    console.log(Number(this.data))
  }
}
