import { Component, Input } from '@angular/core';

@Component({
  selector: 'ngx-status-card',
  styleUrls: ['./status-card.component.scss'],
  template: `
    <nb-card (click)="goToScreen()">
      <div class="icon-container">
        <div class="icon status status-{{ type }}">
          <ng-content></ng-content>
        </div>
      </div>

      <div class="details">
        <div class="title h5">{{ subText }}</div>
        <div class="strong">{{ title }}</div>
      </div>
    </nb-card>
  `,
})
export class StatusCardComponent {

  @Input() title: string;
  @Input() type: string;
  @Input() on = true;
  @Input() subText: any;

  goToScreen(){
    console.log();
  }
}
