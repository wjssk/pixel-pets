import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "./core/authentication/AuthGuard";
import {HomePageComponent} from "./dashboard/home-page/home-page.component";
import {LoginPageComponent} from "./dashboard/login-page/login-page.component";
import {WalkComponent} from "./dashboard/walk/walk.component";

const routes: Routes = [
  { path: 'login', component: LoginPageComponent, canActivate: [AuthGuard]}, // use the guard here ,canActivate: [AuthGuard]
  { path: 'home', component: HomePageComponent }, // Add this line
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'walk', component: WalkComponent },
  // other routes...
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
