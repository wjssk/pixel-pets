import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from './AuthService';

@Injectable({
  providedIn: 'root',
})
class PermissionsService {
  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): boolean {
    // If the user is not logged in, allow navigation to the requested route.
    return true;
  }
}

export const AuthGuard: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
): boolean => {
  return inject(PermissionsService).canActivate(next, state);
};
