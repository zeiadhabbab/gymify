import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AttendanceComponent } from './attendance.component';
import { MembersAttendanceComponent } from './members-attendance/members-attendance.component';
import { MembersAttendanceReportComponent } from "./members-attendance-report/members-attendance-report.component";


const routes: Routes = [{
  path: '',
  component: AttendanceComponent,
  children: [
    {
      path: 'members-attendance',
      component: MembersAttendanceComponent,
    },{
      path: 'members-attendance-report',
      component: MembersAttendanceReportComponent,
    },

  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AttendanceRoutingModule {
}
