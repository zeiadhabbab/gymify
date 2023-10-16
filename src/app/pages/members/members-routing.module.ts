import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MembersComponent } from './members.component';
import {AllMembersComponent} from "./all-members/all-members.component";


const routes: Routes = [{
  path: '',
  component: MembersComponent,
  children: [
	{
      path: 'all-members',
      component: AllMembersComponent,
    },

  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MembersRoutingModule {
}
