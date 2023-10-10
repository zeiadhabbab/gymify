import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsComponent } from './settings.component';
import { GymSettingsComponent } from './gym-settings/gym-settings.component';


const routes: Routes = [{
  path: '',
  component: SettingsComponent,
  children: [
    {
      path: 'gym-settings',
      component: GymSettingsComponent,
    },

  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {
}
