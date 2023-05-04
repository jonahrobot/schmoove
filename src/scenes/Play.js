class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    preload() {//0-9, 10-30, 31
        this.load.spritesheet('cat', './assets/Cat32.png', {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 30});
        this.load.image('spr_button_green','./assets/spr_button_green.png');
        this.load.image('spr_ground','./assets/spr_ground.png');
        this.load.image('spr_cloud','./assets/spr_cloud.png')
    }

    create() {

        // Create Clouds
        this.cloud01 = new Cloud(this, game.config.width, game.config.height * Math.random(), 'spr_cloud', 0).setOrigin(0, 0);
        this.cloud02 = new Cloud(this, game.config.width, game.config.height * Math.random(), 'spr_cloud', 0).setOrigin(0, 0);

        // Create Cat
        this.cat1 = new Cat(this, game.config.width/2, game.config.height/2, 'cat', 0).setOrigin(0, 0);
        this.cat1.setScale(5);
        this.anims.create({
            key: 'cat',
            frames: this.anims.generateFrameNumbers('cat', { start: 0, end: 9, first: 0}),
            frameRate: 1
        });

        // Create Tutorial button
        this.button = new Tutorial_Button(this,game.config.width/2,game.config.height/6,'spr_button_green',0);

        // Pair Input
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyK = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K)

        // Create Background
        this.add.image(game.config.width/2,game.config.height-10,'spr_ground').setScale(1.5);
    }

    update() {
        this.catWalk(this.cat1);

        // Clouds
        this.cloud01.update();
        this.cloud02.update();

        if(Phaser.Input.Keyboard.JustDown(keyK)){
            this.button.togglePulse();
        }

        if(Phaser.Input.Keyboard.JustDown(keySPACE)){
            this.button.tapDown();
        }
    }

    catWalk(cat){
        //let walk = this.add.sprite(this.cat1.x, this.cat1.y, 'cat').setOrigin(0, 0);
        cat.anims.play('cat');
    }
}