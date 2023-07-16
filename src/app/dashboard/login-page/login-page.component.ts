import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TestService } from '../../services/test.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  constructor(
    private router: Router,
    private testService: TestService,
  ) {}

  ngOnInit(): void {
    this.testService.testBackendConnection().subscribe((response) => {
      console.log(response);
    });
  }

  onLoginClick(): void {
    // Here you should validate your login
    // if validation passes navigate to home
    this.router.navigate(['/home']);
  }

  onSignUpClick(): void {
    this.router.navigate(['/signup']);
  }
}
