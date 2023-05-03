class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    preload() {//0-9, 10-30, 31
        this.load.spritesheet('cat', './assets/Cat32.png', {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 30});

    }

    create() {
        this.cat1 = new Cat(this, game.config.width/2, game.config.height/2, 'cat', 0).setOrigin(0, 0);
        this.sprite.setScale(5);
        this.anims.create({
            key: 'cat',
            frames: this.animsgenerateFrameNumbers('cat', { start: 0, end: 9, first: 0}),
            frameRate: 1
        });

    }

    update() {
        this.catWalk(this.cat1);
    }

    catWalk(cat){
        let walk = this.add.sprite(this.cat1.x, this.cat1.y, 'cat').setOrigin(0, 0);
        walk.anims.play('cat');
    }
}