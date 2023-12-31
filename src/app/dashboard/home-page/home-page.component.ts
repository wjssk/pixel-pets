import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppState } from '../../state/models/state';
import { Store } from '@ngrx/store';
import { logout } from '../../state/auth/auth.actions';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent {
  showSettings: boolean = false;
  showStatuses: boolean = false;
  showActivities: boolean = false;
  imageSource: string = 'assets/images/smutny.png';
  timer: any;
  coins = 0;
  lastCoinTime: Date | null = null;
  petStartTime: Date | null = null;
  petting = false;

  constructor(
    private cd: ChangeDetectorRef,
    private router: Router,
    private store: Store<AppState>,
  ) {}

  onPet(): void {
    this.petStartTime = new Date();
    this.petting = true;
    this.timer = setTimeout(() => {
      this.imageSource = 'assets/images/wesoly.jpg';
    }, 750); //
  }

  stopPet(): void {
    this.petting = false;
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.imageSource = 'assets/images/smutny.png';
    }, 500);
    if (this.petStartTime) {
      let petDuration = new Date().getTime() - this.petStartTime.getTime();
      if (petDuration > 3000 && this.timeSinceLastCoin() > 10000) {
        let coinEarned = Math.floor(Math.random() * 10) + 1;
        this.coins += coinEarned;
        this.lastCoinTime = new Date();

        this.cd.detectChanges();
      }
    }
  }

  private timeSinceLastCoin(): number {
    if (this.lastCoinTime) {
      return new Date().getTime() - this.lastCoinTime.getTime();
    } else {
      return Infinity;
    }
  }

  onWalk(): void {
    this.router.navigate(['/walk']);
  }

  onLogout() {
    this.store.dispatch(logout());
  }
}
