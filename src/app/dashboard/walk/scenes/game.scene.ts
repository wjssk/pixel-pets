import Phaser from 'phaser';

export class GameScene extends Phaser.Scene {
  // Define properties for player, items, etc.
  constructor() {
    super('walk');
  }

  preload() {
    this.load.tilemapTiledJSON('mymap', 'assets/images/mapForest.json');
    this.load.image(
      'zeo254-completed-commission',
      'assets/images/zeo254-completed-commission.png',
    );
    this.load.image('Decorations1', 'assets/images/Decorations.png');
    this.load.image('TilesetWater', 'assets/images/TilesetWater.png');
    this.load.image('player', 'assets/images/wesoly.png');
  }

  create() {
    const map = this.make.tilemap({ key: 'mymap' });
    const tileset1 = map.addTilesetImage('zeo254-completed-commission');
    const tileset2 = map.addTilesetImage('Decorations1');
    const tileset3 = map.addTilesetImage('TilesetWater');

    if (tileset1 && tileset2 && tileset3) {
      const layer1 = map.createLayer('trawa', [tileset1, tileset2, tileset3]);
      const layer2 = map.createLayer('warstwa trawy', [
        tileset1,
        tileset2,
        tileset3,
      ]);
      const layer3 = map.createLayer('Tile Layer 8', [
        tileset1,
        tileset2,
        tileset3,
      ]);
      const layer4 = map.createLayer('piach', [tileset1, tileset2, tileset3]);
      const layer5 = map.createLayer('ogrodzenie piachu', [
        tileset1,
        tileset2,
        tileset3,
      ]);
      const layer6 = map.createLayer('grzyby kwiaty itp', [
        tileset1,
        tileset2,
        tileset3,
      ]);
      const layer7 = map.createLayer('drzewa', [tileset1, tileset2, tileset3]);
      const layer8 = map.createLayer('drzewa2', [tileset1, tileset2, tileset3]);
      const layer9 = map.createLayer('drzewa 3', [
        tileset1,
        tileset2,
        tileset3,
      ]);
      const layer10 = map.createLayer('grzyby kwiaty itp 2', [
        tileset1,
        tileset2,
        tileset3,
      ]);
      const layer11 = map.createLayer('dodatkowe', [
        tileset1,
        tileset2,
        tileset3,
      ]);
    }

    const player = this.physics.add.image(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2,
      'player',
    );
    player.setScale(0.1);
    this.cameras.main.startFollow(player);
    this.cameras.main.setZoom(4); // Play with this value to adjust the zoom level

    this.input?.keyboard?.on('keydown', function (event: KeyboardEvent) {
      switch (event.key) {
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
      switch (event.key) {
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
