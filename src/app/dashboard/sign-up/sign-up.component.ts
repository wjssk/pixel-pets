import { Component } from '@angular/core';
import { register } from '../../state/auth/auth.actions';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  signupForm = {
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  };

  constructor(
    private store: Store,
    private router: Router,
  ) {}

  onSignup() {
    if (this.signupForm.password !== this.signupForm.confirmPassword) {
      alert('Passwords do not match.');
    } else {
      this.store.dispatch(
        register({
          username: this.signupForm.username,
          email: this.signupForm.email,
          password: this.signupForm.password,
        }),
      );
    }
  }
}
