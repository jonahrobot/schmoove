class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    preload() {//0-9, 10-30, 31
        this.load.spritesheet('cat', './assets/Cat32.png', {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 30});
        this.load.image('spr_button','./assets/spr_button_green.png');
    }

    create() {

        // Create Cat
        this.cat1 = new Cat(this, game.config.width/2, game.config.height/2, 'cat', 0).setOrigin(0, 0);
        this.cat1.setScale(5);
        this.anims.create({
            key: 'cat',
            frames: this.anims.generateFrameNumbers('cat', { start: 0, end: 9, first: 0}),
            frameRate: 1
        });

        // Create Tutorial button
        this.button = new Tutorial_Button(this,game.config.width/2,game.config.height/6,'spr_button',0);
    }

    update() {
        this.catWalk(this.cat1);
    }

    catWalk(cat){
        //let walk = this.add.sprite(this.cat1.x, this.cat1.y, 'cat').setOrigin(0, 0);
        cat.anims.play('cat');
    }
}