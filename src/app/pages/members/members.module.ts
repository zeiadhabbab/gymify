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
import { MembersRoutingModule } from './members-routing.module';
import { CustomServerDataSource } from '../../@core/utils/serve.data-source';
import { MembersComponent } from './members.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import {AllMembersComponent} from "./all-members/all-members.component";


@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ThemeModule,
    MembersRoutingModule,
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
    MembersComponent,
    AllMembersComponent,

  ],
  providers: [
    CustomServerDataSource
  ],
})
export class MembersModule { }
