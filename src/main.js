import Phaser from 'phaser';
import { BootScene, MenuScene, LevelScene, GameScene, ShopScene, RecordsScene } from './scenes.js';

const config = {
  type: Phaser.AUTO,
  parent: 'app',
  width: 430,
  height: 932,
  backgroundColor: '#17120e',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  render: {
    antialias: true,
    pixelArt: false,
    roundPixels: false
  },
  scene: [BootScene, MenuScene, LevelScene, GameScene, ShopScene, RecordsScene]
};

new Phaser.Game(config);
