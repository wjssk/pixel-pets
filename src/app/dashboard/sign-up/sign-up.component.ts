import { Component } from '@angular/core';
import { UserService } from '../../services/user-service.service';
import { User } from '../../shared/models/user-related';

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

  constructor(private userService: UserService) {}

  onSignup() {
    if (this.signupForm.password === this.signupForm.confirmPassword) {
      let user: User = new User(
        this.signupForm.username,
        this.signupForm.email,
        1,
        0,
        100,
      );
      this.userService.registerUser(user, this.signupForm.password).subscribe(
        (res) => {
          console.log(res); // Successfully registered user {username}
        },
        (err) => {
          console.error(err); // An error occurred
        },
      );
    } else {
      console.error('Passwords do not match!');
    }
  }
}
