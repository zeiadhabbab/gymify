import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AttendanceComponent } from './attendance.component';
import { MembersAttendanceComponent } from './members-attendance/members-attendance.component';


const routes: Routes = [{
  path: '',
  component: AttendanceComponent,
  children: [
    {
      path: 'members-attendance',
      component: MembersAttendanceComponent,
    },

  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AttendanceRoutingModule {
}
