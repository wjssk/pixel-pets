import { Component } from '@angular/core';
import { User } from '../../shared/models/user-related';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/models/state';
import { logout } from '../../state/auth/auth.actions';

@Component({
  selector: 'app-choose-pet',
  templateUrl: './choose-pet.component.html',
  styleUrls: ['./choose-pet.component.scss'],
})
export class ChoosePetComponent {
  constructor(private store: Store<AppState>) {}
  onConfirm(): void {}

  onLogout() {
    this.store.dispatch(logout());
  }
}
