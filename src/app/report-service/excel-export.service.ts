import {Injectable} from '@angular/core';
import {Workbook} from 'exceljs';
import * as fs from 'file-saver';
import * as dayjs from 'dayjs';
import * as updateLocale from 'dayjs/plugin/updateLocale';


const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';


@Injectable({providedIn: 'root'})
export class ExcelExportService {

    constructor() {}


    public exportAsExcelFile(reportHeading : string, reportSubHeading : string, headersArray : any[], json : any[], footerData : any, excelFileName : string, sheetName : string) {
        const header = headersArray;
        const data = json;


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
        worksheet.getCell('J5').value = "Sum Total Kerja";
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


        














        // // console.log(json)



        // /* Add Header Row */
        // worksheet.addRow([]);
        // worksheet.mergeCells('A1:' + this.numToAlpha(header.length - 1) + '1');
        // worksheet.getCell('A1').value = reportHeading;
        // worksheet.getCell('A1').alignment = {
        //     horizontal: 'center'
        // };
        // worksheet.getCell('A1').font = {
        //     size: 15,
        //     bold: true
        // };

        // if (reportSubHeading !== '') {
        //     worksheet.addRow([]);
        //     worksheet.mergeCells('A2:' + this.numToAlpha(header.length - 1) + '2');
        //     worksheet.getCell('A2').value = reportSubHeading;
        //     worksheet.getCell('A2').alignment = {
        //         horizontal: 'center'
        //     };
        //     worksheet.getCell('A2').font = {
        //         size: 12,
        //         bold: false
        //     };
        // }

        worksheet.addRow([]);

        /* Add Header Row */
        const headerRow = worksheet.addRow(header);

        // Cell Style : Fill and Border
        headerRow.eachCell((cell, index) => {
            cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: {
                    argb: 'FFFFFF00'
                },
                bgColor: {
                    argb: 'FF0000FF'
                }
            };
            cell.border = {
                top: {
                    style: 'thin'
                },
                left: {
                    style: 'thin'
                },
                bottom: {
                    style: 'thin'
                },
                right: {
                    style: 'thin'
                }
            };
            cell.font = {
                size: 12,
                bold: true
            };

            worksheet.getColumn(index).width = header[index - 1].length < 20 ? 20 : header[index - 1].length;
        });

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

            console.log(dayjs(element.datecreated).format('dddd'));

            eachRow.push(element.shift);
            eachRow.push(dayjs(element.datecreated).format('dddd'));
            eachRow.push(element.datecreated);
            eachRow.push(element.datecreated);
            eachRow.push(element.jobtype);
            eachRow.push(element.timeinformed);
            eachRow.push(element.starttime);
            eachRow.push(element.finishtime);
            eachRow.push(element.totaltime);
            eachRow.push(element.functionallocation);
            eachRow.push(element.subfunctionallocation);
            eachRow.push(element.machine);
            eachRow.push(element.detailmachine);
            eachRow.push(element.problem);
            eachRow.push(element.cause);
            eachRow.push(element.name);
            eachRow.push(element.action);
            eachRow.push(element.executor1);
            eachRow.push(element.executor2);
            eachRow.push(element.executorextra);
            eachRow.push(element.condition);
            eachRow.push(element.reason);
            eachRow.push(element.note);

            console.log(eachRow);

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


}
