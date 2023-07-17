import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user-service.service';

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

  constructor(
    private userService: UserService,
    private router: Router,
  ) {}
  onLoginClick(): void {
    this.userService
      .loginUser(this.loginForm.username, this.loginForm.password)
      .subscribe(
        (res) => {
          console.log(res);
          // Store the token
          if (this.rememberMe) {
            localStorage.setItem('token', res.token);
          } else {
            sessionStorage.setItem('token', res.token);
          }
          this.router.navigate(['/home']);
        },
        (err) => {
          console.error(err);
        },
      );
  }

  onSignUpClick(): void {
    this.router.navigate(['/signup']);
  }
}
