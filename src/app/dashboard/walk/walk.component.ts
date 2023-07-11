import { Component } from '@angular/core';
import Phaser from 'phaser';
@Component({
  selector: 'app-walk',
  templateUrl: './walk.component.html',
  styleUrls: ['./walk.component.scss']
})
export class WalkComponent {
  private game!: Phaser.Game;
  private player!: Phaser.Physics.Arcade.Sprite;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private map!: Phaser.GameObjects.TileSprite;

  constructor() {
  }
  ngOnInit(): void {
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: window.innerWidth,
      height: window.innerHeight,
      parent: 'gameContainer',
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0 }
        }
      },
      scene: {
        preload: this.preload,
        create: this.create,
        update: this.update
      }
    };

    this.game = new Phaser.Game(config);
  }

  preload(): void {
    this.load.image('map', 'assets/images/laka.jpg');
    this.load.image('player', 'assets/images/postac.jpg');
  }

  create(): void {
    this.map = this.add.tileSprite(0, 0, 2000, 2000, 'map');
    this.cameras.main.setBounds(0, 0, this.map.width, this.map.height);
    this.cameras.main.centerOn(0, 0);

    this.player = this.physics.add.sprite(0, 0, 'player');
    this.cameras.main.startFollow(this.player, true);

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update(): void {
    const speed = 200;
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-speed);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(speed);
    } else {
      this.player.setVelocityX(0);
    }

    if (this.cursors.up.isDown) {
      this.player.setVelocityY(-speed);
    } else if (this.cursors.down.isDown) {
      this.player.setVelocityY(speed);
    } else {
      this.player.setVelocityY(0);
    }
  }

  ngOnDestroy(): void {
    this.game.destroy(true);
  }
}
