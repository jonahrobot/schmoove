let config = {
    type: Phaser.WEBGL,
    width: 640,
    height: 480,
    backgroundColor: '#35A7FF',
    pixelArt: true,
    autoCenter: true,
    physics: {
      default: 'arcade',
      arcade: {
        debug: true,
        gravity: {
          x:0,
          y:0
        }
      }
    },
    scene: [ Play ]
  }

let game = new Phaser.Game(config);

// Reserve keyboard vars
let keySPACE;
let keyK;

// Set UI Sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;