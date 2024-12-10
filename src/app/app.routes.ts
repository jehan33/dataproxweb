import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutMainComponent } from './pages/layout-main/layout-main.component';

export const routes: Routes = [
    { path: 'home', component: LayoutMainComponent },
    { path: 'user-management', component: LayoutMainComponent },
    { path: 'rules', component: LayoutMainComponent },
    { path: 'profiles', component: LayoutMainComponent },
    { path: 'data-load', component: LayoutMainComponent },
    { path: '', component: LoginComponent },
];

@NgModule({
    imports: [
      RouterModule.forRoot(routes, {
        scrollPositionRestoration: 'top',
      }),
    ],
    exports: [RouterModule],
  })
  export class AppRoutingModule { }