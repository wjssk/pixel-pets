import Phaser from 'phaser';

export class GameScene extends Phaser.Scene {
  // Define properties for player, items, etc.
  constructor() {
    super('walk');
  }

  preload() {
    this.load.image('background', 'assets/images/mainMap.png');
    this.load.image('player', 'assets/images/ACharDown.png');
  }

  create() {
    console.log('Creating...');
    const background = this.add.image(0, 0, 'background');
    background.setOrigin(0, 0);

    const player = this.physics.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'player');
    this.cameras.main.startFollow(player);
    this.cameras.main.setZoom(2); // Play with this value to adjust the zoom level

    this.input?.keyboard?.on('keydown', function (event: KeyboardEvent) {
      switch(event.key) {
        case 'ArrowLeft':
          console.log('Left');
          player.setVelocityX(-160);
          break;
        case 'ArrowRight':
          player.setVelocityX(160);
          break;
        case 'ArrowUp':
          player.setVelocityY(-160);
          break;
        case 'ArrowDown':
          player.setVelocityY(160);
          break;
      }
    });

    this.input?.keyboard?.on('keyup', function (event: KeyboardEvent) {
      switch(event.key) {
        case 'ArrowLeft':
        case 'ArrowRight':
          player.setVelocityX(0);
          break;
        case 'ArrowUp':
        case 'ArrowDown':
          player.setVelocityY(0);
          break;
      }
    });

  }

  override update() {
    // This is called 60 times per second
    // Put your game logic here
  }
}
