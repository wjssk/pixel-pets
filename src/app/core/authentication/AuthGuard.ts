import { Injectable } from '@angular/core';
import { AuthService } from './AuthService';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HasPetGuard {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  canActivate(): Observable<boolean> {
    return this.authService.checkAuthStatus().pipe(
      map((response) => {
        if (response.isAuthenticated && response.user.hasPet) {
          return true;
        } else {
          this.router.navigate(['/choose-pet']);
          return false;
        }
      }),
      catchError(() => {
        this.router.navigate(['/login']);
        return of(false);
      }),
    );
  }
}

@Injectable({
  providedIn: 'root',
})
export class NoPetGuard {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  canActivate(): Observable<boolean> {
    return this.authService.checkAuthStatus().pipe(
      map((response) => {
        if (response.isAuthenticated && !response.user.hasPet) {
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      }),
      catchError(() => {
        this.router.navigate(['/login']);
        return of(false);
      }),
    );
  }
}
