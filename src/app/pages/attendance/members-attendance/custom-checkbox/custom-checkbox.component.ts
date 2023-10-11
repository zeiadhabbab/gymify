import { Component, Input } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
    template: `
    <nb-toggle [(ngModel)]="value" status="success"></nb-toggle>
  `,
})
export class CustomCheckboxComponent implements ViewCell {
    @Input() value: any;    // This hold the cell value
    @Input() rowData: any;  // This holds the entire row object
}