class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    preload() {//0-9, 10-30, 31
        this.load.spritesheet('cat', './assets/Cat32.png', {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 30});
        this.load.image('spr_button_green','./assets/spr_button_green.png');
        this.load.image('spr_ground','./assets/spr_ground.png');
        this.load.image('spr_cloud','./assets/spr_cloud.png');
        this.load.image('spr_mouse','./assets/Mouse.png');
    }

    create() {

        // Create Clouds
        this.cloud01 = new Cloud(this, game.config.width, game.config.height * Math.random(), 'spr_cloud', 0).setOrigin(0, 0);
        this.cloud02 = new Cloud(this, game.config.width, game.config.height * Math.random(), 'spr_cloud', 0).setOrigin(0, 0);

        // Create Cat
        this.cat1 = new Cat(this, game.config.width/2, game.config.height/2, 'cat', 0).setOrigin(0, 0);
        /*this.cat1FSM = new StateMachine('idle', {
            idle: new IdleWalk()
        }, [this, this.cat1]);*/

        this.cat1.setScale(3);
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('cat', { start: 0, end: 8, first: 0}),
            frameRate: 1
        });
        this.anims.create({
            key: 'alert',
            frames: this.anims.generateFrameNumbers('cat', { start: 9, end: 29, first: 10}),
            frameRate: 60
        });
        this.anims.create({
            key: 'look',
            frames: this.anims.generateFrameNumbers('cat', { start: 30, end: 30, first: 30}),
            frameRate: 1
        });


        // Create Tutorial button
        this.button = new Tutorial_Button(this,game.config.width/2,game.config.height/6,'spr_button_green',0);

        // Pair Input
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyK = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K)


        // variables and settings
        this.MAX_VELOCITY = 300;    // pixels/second
        this.physics.world.gravity.y = 1000;

        // Create Background
        this.ground = this.physics.add.sprite(game.config.width/2,game.config.height-50,'spr_ground').setScale(0.75);
        this.ground.body.allowGravity = false;
        this.ground.body.immovable = true;

        this.ground.setCollideWorldBounds(true);

        //create Mouse
        this.mouse01 = this.physics.add.sprite(game.config.width/5, game.config.height/2, 'spr_mouse').setScale(0.5);
        this.mouse01.body.allowGravity = true;
        this.mouse01.body.immovable = false;

        this.mouse01.setCollideWorldBounds(true);

        // add physics collider
        this.physics.add.collider(this.mouse01, this.ground);
    }

    update() {
        this.cat1.setScale(30);
        this.catWalk(this.cat1);
        //this.catAlert(this.cat1);
        //this.catLook(this.cat1);
        //this.cat1.setScale(5);
        //this.cat1.anims.play('look');

        // Clouds
        this.cloud01.update();
        this.cloud02.update();

        if(Phaser.Input.Keyboard.JustDown(keyK)){
            this.button.togglePulse();
        }

        if(Phaser.Input.Keyboard.JustDown(keySPACE)){
            this.button.tapDown();
            this.mouse01.setVelocityX(this.MAX_VELOCITY);
            this.mouse01.setDragX(400);
            /*this.clock = this.time.delayedCall(400, () => {
                this.mouse01.setVelocityX(0);
            }, null, this);*/

        }
    }

    catWalk(cat){
        cat.alpha = 0;
        //let walk = this.add.sprite(cat.x, cat.y, 'cat').setOrigin(0, 0);
        cat.anims.play('walk');
        /*walk.on('animationcomplete', () => {    // callback after anim completes
            cat.alpha = 1;                       // make ship visible again
            cat.destroy();                       // remove explosion sprite
          });      */ 
    }
    catAlert(cat){
        cat.alpha = 0;
        let alert = this.add.sprite(cat.x, cat.y, 'cat').setOrigin(0, 0);
        alert.anims.play('alert');
        alert.on('animationcomplete', () => {    // callback after anim completes
            cat.alpha = 1;                       // make ship visible again
            cat.destroy();                       // remove explosion sprite
          });       
    }
    catLook(cat){
        cat.alpha = 0;
        let look = this.add.sprite(cat.x, cat.y, 'cat').setOrigin(0, 0);
        look.anims.play('look');
        look.on('animationcomplete', () => {    // callback after anim completes
            cat.alpha = 1;                       // make ship visible again
            cat.destroy();                       // remove explosion sprite
          });       
    }

}