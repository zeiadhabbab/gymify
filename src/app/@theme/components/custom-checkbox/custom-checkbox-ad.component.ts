import {Component, Input, HostListener, Output ,EventEmitter } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
    template: `
    <nb-toggle [(ngModel)]="value" [disabled]="value === true" status="success" (checkedChange)="checkedChange($event)"></nb-toggle>
  `,
})
export class CustomCheckboxComponent implements ViewCell {
    @Input() value: any;    // This hold the cell value
    @Input() rowData: any;  // This holds the entire row object
    @Output() save: EventEmitter<any> = new EventEmitter();

    checkedChange(event){
        this.save.emit(this.rowData);
    }
}