import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import { environment } from 'src/environments/environment';
import { ReportTxn } from '../report-model/report-txn.model';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { FunctionalLocation } from '../report-model/functional-location';



@Injectable({providedIn: 'root'})
export class ReportService {

    private apiServerUrl = environment.apiBaseUrl;
    constructor(private http : HttpClient) {}
 
    public getReportTxn(dateCreatedStart: string, dateCreatedEnd: string, functionalLocationId:string ): Observable < ReportTxn[] > {
        let param = new HttpParams();
        param = param.append('dateCreatedStart', dateCreatedStart) // Masih Hardcode dulu ya,  ini bagian untuk bikin filter pakai params
        param = param.append('dateCreatedEnd', dateCreatedEnd)
        param = param.append('functionalLocationId', functionalLocationId)
        //console.log(this.http.get<ReportTxn[]>(`${this.apiServerUrl}/reporttxn/reports`));
        //console.log("array to string : "+functionalLocationId.toString())
        return this.http.get<ReportTxn[]>(`${this.apiServerUrl}/reporttxn/reports`, {params: param});
    }

    public getFunctionalLocation():Observable <FunctionalLocation[]>{
        console.log(this.http.get<FunctionalLocation[]>(`${this.apiServerUrl}/reporttxn/functionallocations`));
        return this.http.get<FunctionalLocation[]>(`${this.apiServerUrl}/reporttxn/functionallocations`);
    }

    public deleteReportTxn(id: number): Observable<any> { 
        return this.http.delete(`${this.apiServerUrl}/reporttxn/reports/delete/${id}`)
    }
}
