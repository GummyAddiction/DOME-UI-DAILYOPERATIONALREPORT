import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { ReportService } from './report-service/report.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule, MAT_DATE_LOCALE} from '@angular/material/core';
import {HttpClientModule} from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import {MatFormFieldModule } from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { ReportTxnComponent } from './report-txn/report-txn.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import { WarningDialogComponent } from './report-txn/warning-dialog/warning-dialog.component';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    ReportTxnComponent,
    WarningDialogComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    MatTableModule,
    FormsModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatOptionModule,
    MatSelectModule,
    MatPaginatorModule,
    MatMenuModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    NgxPaginationModule
    
  ],
  providers: [
    ReportService,
    {provide: MAT_DATE_LOCALE, useValue: 'id'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
