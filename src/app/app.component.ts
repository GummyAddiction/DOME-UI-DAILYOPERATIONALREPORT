import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';


interface Shift {
    value: String;
    viewValue: String;
}


@Component({selector: 'app-root', templateUrl: './app.component.html', styleUrls: ['./app.component.css']})
export class AppComponent implements OnInit {
    
    ngOnInit(): void {
       
    }
    constructor(){}
    
}
