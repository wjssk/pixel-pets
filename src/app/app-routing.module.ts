import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './dashboard/home-page/home-page.component';
import { LoginPageComponent } from './dashboard/login-page/login-page.component';
import { WalkComponent } from './dashboard/walk/walk.component';
import { SignUpComponent } from './dashboard/sign-up/sign-up.component';
import { ChoosePetComponent } from './dashboard/choose-pet/choose-pet.component';
import { HasPetGuard, NoPetGuard } from './core/authentication/AuthGuard';

const routes: Routes = [
  { path: 'home', component: HomePageComponent, canActivate: [HasPetGuard] },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'walk', component: WalkComponent, canActivate: [HasPetGuard] },
  {
    path: 'choose-pet',
    component: ChoosePetComponent,
    canActivate: [NoPetGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
