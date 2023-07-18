import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  loginForm = {
    username: '',
    password: '',
  };
  rememberMe = true;

  constructor(private router: Router) {}
  onLoginClick(): void {}

  onSignUpClick(): void {
    this.router.navigate(['/signup']);
  }
}
