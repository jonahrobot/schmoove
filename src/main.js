let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    backgroundColor: '#4488aa',
    pixelArt: true,
    autoCenter: true,
    scene: [ Play ]
  }

let game = new Phaser.Game(config);

// Reserve keyboard vars
let keySPACE;
let keyK;

// Set UI Sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;