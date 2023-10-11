import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule,
  NbIconModule,
  NbInputModule,
  NbRadioModule,
  NbSelectModule,
  NbUserModule,
  NbTimepickerModule,
  NbToggleModule
} from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { AttendanceRoutingModule } from './attendance-routing.module';
import { AttendanceComponent } from './attendance.component';
import { CustomServerDataSource } from './members-attendance/serve.data-source';
import { MembersAttendanceComponent } from './members-attendance/members-attendance.component';
import { CustomCheckboxComponent } from './members-attendance/custom-checkbox/custom-checkbox.component';

import { Ng2SmartTableModule } from 'ng2-smart-table';


@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ThemeModule,
    AttendanceRoutingModule,
    ThemeModule,
    NbInputModule,
    NbCardModule,
    NbButtonModule,
    NbActionsModule,
    NbUserModule,
    NbCheckboxModule,
    NbRadioModule,
    NbDatepickerModule,
    NbSelectModule,
    NbIconModule,
    NbTimepickerModule.forRoot(),
    Ng2SmartTableModule,
    NbToggleModule,
  ],
  declarations: [
    AttendanceComponent,
    MembersAttendanceComponent,
    CustomCheckboxComponent

  ],
  providers: [
    CustomServerDataSource
  ],
})
export class AttendanceModule { }
