import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/authentication/AuthGuard';
import { HomePageComponent } from './dashboard/home-page/home-page.component';
import { LoginPageComponent } from './dashboard/login-page/login-page.component';
import { WalkComponent } from './dashboard/walk/walk.component';
import { SignUpComponent } from './dashboard/sign-up/sign-up.component';
import { ChoosePetComponent } from './dashboard/choose-pet/choose-pet.component';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'home', component: HomePageComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'signup', component: SignUpComponent },
  { path: 'walk', component: WalkComponent, canActivate: [AuthGuard] },
  {
    path: 'choose-pet',
    component: ChoosePetComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
