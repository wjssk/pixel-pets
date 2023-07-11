import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from "./app-component/app.component";
import {HomePageComponent} from './dashboard/home-page/home-page.component';
import {LoginPageComponent} from "./dashboard/login-page/login-page.component";
import {SignUpComponent} from './dashboard/sign-up/sign-up.component';
import {BasicButtonComponent} from './shared/components/basic-button/basic-button.component';
import {StatusBarComponent} from './shared/components/status-bar/status-bar.component';
import {WalkComponent} from './dashboard/walk/walk.component';

@NgModule({
  declarations: [
    LoginPageComponent,
    AppComponent,
    HomePageComponent,
    SignUpComponent,
    BasicButtonComponent,
    StatusBarComponent,
    WalkComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
