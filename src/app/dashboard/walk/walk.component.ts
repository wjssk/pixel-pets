import {
  Component,
  OnInit,
  OnDestroy,
  ElementRef,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import Phaser from 'phaser';
import { GameScene } from './scenes/game.scene';

@Component({
  selector: 'app-walk',
  templateUrl: './walk.component.html',
  styleUrls: ['./walk.component.scss'],
})
export class WalkComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('gameContainer', { static: true }) gameContainer!: ElementRef;
  phaserGame!: Phaser.Game;
  config: Phaser.Types.Core.GameConfig;

  constructor() {
    this.config = {
      type: Phaser.AUTO,
      scene: GameScene, // use the scene
      physics: {
        default: 'arcade',
        arcade: {
          debug: false,
        },
      },
      parent: 'gameContainer',
    };
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.phaserGame.destroy(true);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.config.width = this.gameContainer.nativeElement.offsetWidth;
      this.config.height = this.gameContainer.nativeElement.offsetHeight;
      this.phaserGame = new Phaser.Game(this.config);
    }, 0);
  }
}
