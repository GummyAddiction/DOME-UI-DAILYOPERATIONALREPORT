import {Injectable} from '@angular/core';
import {Workbook} from 'exceljs';
import * as fs from 'file-saver';
import * as dayjs from 'dayjs';
import * as updateLocale from 'dayjs/plugin/updateLocale';


const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';


@Injectable({providedIn: 'root'})
export class ExcelExportService {

    totalPlantTime:string[]=[]

    constructor() {}


    public exportAsExcelFile(reportHeading : string, reportSubHeading : string, headersArray : any[], json : any[], footerData : any, excelFileName : string, sheetName : string) {
        const header = headersArray;
        const data = json;
        this.totalPlantTime =[]


        dayjs.extend(updateLocale)
        //membuat custom days dengan dayjs
        dayjs.updateLocale('en', {
            weekdays: [
                "Minggu",
                "Senin",
                "Selasa",
                "Rabu",
                "Kamis",
                "Jum'at",
                "Sabtu"
            ]
        })

        /* Create workbook and worksheet */
        const workbook = new Workbook();
        workbook.creator = 'Snippet Coder';
        workbook.lastModifiedBy = 'SnippetCoder';
        workbook.created = new Date();
        workbook.modified = new Date();
        const worksheet = workbook.addWorksheet(sheetName);


        worksheet.addRow([]);
        worksheet.addRow([]);
        worksheet.addRow([]);
        worksheet.addRow([]);

        worksheet.mergeCells('A5:A6');
        worksheet.getCell('A5').value = "Shift";
        worksheet.mergeCells('B5:B6');
        worksheet.getCell('B5').value = "Hari";
        worksheet.mergeCells('C5:C6');
        worksheet.getCell('C5').value = "Tgl";
        worksheet.mergeCells('D5:D6');
        worksheet.getCell('D5').value = "Bulan";
        worksheet.mergeCells('E5:E6');
        worksheet.getCell('E5').value = "Jenis Pekerjaan";
        worksheet.mergeCells('F5:I5');
        worksheet.getCell('F5').value = 'Waktu (Hr:Mn)';
        worksheet.getCell('F6').value = "Informasi Masalah";
        worksheet.getCell('G6').value = "Mulai Kerja";
        worksheet.getCell('H6').value = "Selesai Kerja";
        worksheet.getCell('I6').value = "Total Kerja";
        worksheet.getCell('J5').value = 'sum total time';
        worksheet.getCell('J6').value = "Plant Stop";
        worksheet.mergeCells('K5:K6');
        worksheet.getCell('K6').value = "Fungsional Lokasi";
        worksheet.mergeCells('L5:L6');
        worksheet.getCell('L6').value = "Sub Fungsional Lokasi";
        worksheet.mergeCells('M5:M6');
        worksheet.getCell('M6').value = "Mesin / Alat";
        worksheet.mergeCells('N5:N6');
        worksheet.getCell('N6').value = "Detail Mesin / Alat";
        worksheet.mergeCells('O5:O6');
        worksheet.getCell('O6').value = "Masalah";
        worksheet.mergeCells('P5:P6');
        worksheet.getCell('P6').value = "Penyebab";
        worksheet.mergeCells('Q5:Q6');
        worksheet.getCell('Q6').value = "Bias";
        worksheet.mergeCells('R5:R6');
        worksheet.getCell('R6').value = "Tindakan";
        worksheet.mergeCells('S5:U5');
        worksheet.getCell('S5').value = 'Pelaksana';
        worksheet.getCell('S6').value = 'Pertama';
        worksheet.getCell('T6').value = 'Kedua';
        worksheet.getCell('U6').value = 'Tambahan';
        worksheet.mergeCells('V5:V6');
        worksheet.getCell('V5').value = "Kond";
        worksheet.mergeCells('W5:W6');
        worksheet.getCell('W5').value = "Alasan Bila Kondisi Belum Selesai";
        worksheet.mergeCells('X5:X6');
        worksheet.getCell('X5').value = "Catatan";

        // Get all columns from JSON
        let columnsArray: any[];
        for (const key in json) {
            if (json.hasOwnProperty(key)) {
                columnsArray = Object.keys(json[key]);
            }
        }

        // Add Data and Conditional Formatting
        data.forEach((element : any) => {



            const eachRow: any[] = [];

            // eachRow.push(element.name)
            // columnsArray.forEach((column) => {
            //     //eachRow.push(eachRow[column]);
            //     console.log(`penambahan row excel : `)
            //     console.log(element.name)
            // });

            this.totalPlantTime.push(this.formatTotalTime(element.stoppagetime))
            console.log(this.totalPlantTime)

            //console.log(dayjs(element.datecreated).format('dddd'));

            eachRow.push(element.shift);
            eachRow.push(dayjs(element.datecreated).format('dddd'));
            eachRow.push(dayjs(element.datecreated).format('DD'));
            eachRow.push(dayjs(element.datecreated).format('MMM'));
            eachRow.push(element.jobtype);
            eachRow.push(dayjs(element.timeinformed).format('HH:mm'));
            eachRow.push(dayjs(element.starttime).format('HH:mm'));
            eachRow.push(dayjs(element.finishtime).format('HH:mm'));
            eachRow.push(this.formatTimeHHMM(element.totaltime));
            eachRow.push(this.formatTimeHHMM(element.stoppagetime));
            eachRow.push(element.functionallocation);
            eachRow.push(element.subfunctionallocation);
            eachRow.push(element.machine);
            eachRow.push(element.detailmachine);
            eachRow.push(element.problem);
            eachRow.push(element.cause);
            eachRow.push(element.bias);
            eachRow.push(element.action);
            eachRow.push(element.executor1);
            eachRow.push(element.executor2);
            eachRow.push(element.executorextra);
            eachRow.push(element.condition);
            eachRow.push(element.reason);
            eachRow.push(element.note);

            //console.log(eachRow);

            if (element.isDeleted === 'Y') {
                const deletedRow = worksheet.addRow(eachRow);
                deletedRow.eachCell((cell) => {
                    cell.font = {
                        name: 'Calibri',
                        family: 4,
                        size: 11,
                        bold: false,
                        strike: true
                    };
                });
            } else {
                worksheet.addRow(eachRow);
            }
        });

        worksheet.getCell('J5').value=this.sumTime(this.totalPlantTime)



        console.log(`Total time : ${this.sumTime(this.totalPlantTime)}`)





        worksheet.addRow([]);

        /*Footer Data Row*/
        if (footerData != null) {
            footerData.forEach((element : any) => {

                const eachRow: any[] = [];
                element.forEach((val : any) => {
                    eachRow.push(val);
                });

                const footerRow = worksheet.addRow(eachRow);
                footerRow.eachCell((cell) => {
                    cell.font = {
                        bold: true
                    };
                });
            });
        }

        /*Save Excel File*/
        workbook.xlsx.writeBuffer().then((data : ArrayBuffer) => {
            const blob = new Blob([data], {type: EXCEL_TYPE});
            fs.saveAs(blob, excelFileName + EXCEL_EXTENSION);
        });
    }

    private numToAlpha(num : number) {

        let alpha = '';

        for (; num >= 0; num = parseInt((num / 26).toString(), 10) - 1) {
            alpha = String.fromCharCode(num % 26 + 0x41) + alpha;
        }

        return alpha;
    }


    sumTime(times: any[]) {
        let sumSeconds = 0;
        let hour:string
        let min:string
        let sec:string
          
        times.forEach(time => {
          let a = time.split(":");
          let seconds = +a[0] * 60 * 60 + +a[1] * 60 + +a[2];
          sumSeconds += seconds;
        });
        let h = Math.floor(sumSeconds/60/60)
        if(String(h).length <=1){
          console.log(String(h).length)
          hour ='0'+h
        }else{
          hour=''+h
        }
        let m = Math.floor((sumSeconds-(h*60*60))/60)
        if(String(m).length <=1){
          min ='0'+m
        }else{
          min=''+m
        }
        let s = Math.floor((sumSeconds-(h*60*60))-(m*60))
        if(String(m).length <=1){
          sec ='0'+s
        }else{
          sec=''+s
        }
        return (hour+':'+min)
      }


      formatTotalTime(time:string){
        if(time == null){
            time='00:00:00'
        }
        if(time.length >= 8){
            return time.substring(0,8)
        }else{
            return '00:00:00'
        }
      }

      formatTimeHHMM(time:string){
        if(time == null){
            time='00:00'
        }
        if(time.length >= 6){
            return time.substring(0,5)
        }else{
            return '00:00'
        }
      }


}
