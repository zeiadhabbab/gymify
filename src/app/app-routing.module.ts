import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { OnlyLoggedInUsersGuard } from './@core/utils/guard.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // <== add the imports!
import { BrowserModule } from '@angular/platform-browser';

export const routes: Routes = [
  {
    path: 'pages',
    canActivate: [OnlyLoggedInUsersGuard],
    loadChildren: () => import('./pages/pages.module')
      .then(m => m.PagesModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module')
      .then(m => m.NgxAuthModule),
  },
  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  { path: '**', redirectTo: 'pages' },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config), BrowserModule,
      FormsModule,
      ReactiveFormsModule,],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
