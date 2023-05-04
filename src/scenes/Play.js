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

        this.won = false;

        // Create Clouds
        this.cloud01 = new Cloud(this, game.config.width, game.config.height * Math.random(), 'spr_cloud', 0).setOrigin(0, 0);
        this.cloud02 = new Cloud(this, game.config.width, game.config.height * Math.random(), 'spr_cloud', 0).setOrigin(0, 0);

        // Create Cat
        this.cat1 = new Cat(this, game.config.width/2+100, game.config.height/2, 'cat', 0).setOrigin(0, 0);
        this.cat1.setScale(5);
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
        this.MAX_VELOCITY = 100;    // pixels/second
        this.physics.world.gravity.y = 700;

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
        this.check = 0;
    }

    update() {

        //this.catWalk(this.cat1);
        //console.log(this.mouse01.x);
        
        // Cat checks
        if (this.mouse01.x >= 200 && this.check == 0) {
            this.cat1.flipX=true;
            this.currentPos = this.mouse01.x;
            this.clock = this.time.delayedCall(3000, () => {
                this.cat1.flipX=false;
            }, null, this);
            this.check++;
        }
        if (this.mouse01.x >= 260 && this.check == 1) {
            this.cat1.flipX=true;
            this.currentPos = this.mouse01.x;
            this.clock = this.time.delayedCall(3000, () => {
                this.cat1.flipX=false;
            }, null, this);
            this.check++;
        }
        if (this.mouse01.x >= 320 && this.check == 2) {
            this.cat1.flipX=true;
            this.currentPos = this.mouse01.x;
            this.clock = this.time.delayedCall(3000, () => {
                this.cat1.flipX=false;
            }, null, this);
            this.check++;
        }
        if (this.mouse01.x >= 390 && this.check == 3) {
            this.cat1.flipX=true;
            this.currentPos = this.mouse01.x;
            this.clock = this.time.delayedCall(3000, () => {
                this.cat1.flipX=false;
            }, null, this);
            this.check++;
        }

        // Lose check
        if (this.cat1.flipX == true && this.mouse01.x > (this.currentPos + 11)) {
            console.log("LOSE")
            this.cat1.flipX = true;
            this.won = true;
            this.cat1.anims.play('look');
        }

        // Clouds
        this.cloud01.update();
        this.cloud02.update();

        if(Phaser.Input.Keyboard.JustDown(keyK)){
            this.button.togglePulse();
        }

        if(Phaser.Input.Keyboard.JustDown(keySPACE) && this.won == false){
            this.button.tapDown();
            this.mouse01.setVelocityX(this.MAX_VELOCITY);
            this.mouse01.setDragX(400);
            
            // Check for win
            console.log("Current x: " + this.mouse01.x);
            if(this.mouse01.x >= game.config.width-150) {
                this.won = true;
                console.log("WIN");
            }
        }
    }

    catWalk(cat){
        //let walk = this.add.sprite(this.cat1.x, this.cat1.y, 'cat').setOrigin(0, 0);
        cat.anims.play('cat');
    }
}