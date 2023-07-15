import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // This is a dummy example. In a real app, you would check this data
  // from a secure source, not a local variable.
  isLoggedIn = false;
  rememberMeChecked = false;

  checkLogin() {
    // Here, you would check the actual login status. For now, return the dummy value.
    return this.isLoggedIn;
  }

  rememberMe() {
    // Here, you would check the actual "remember me" status. For now, return the dummy value.
    return this.rememberMeChecked;
  }
}
