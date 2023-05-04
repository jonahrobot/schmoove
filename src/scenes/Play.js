class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    preload() {//0-9, 10-30, 31
        this.load.spritesheet('cat', './assets/Cat32.png', {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 30});
        this.load.image('spr_button_green','./assets/spr_button_green.png');
        this.load.image('spr_ground','./assets/spr_ground.png');
        this.load.image('spr_cloud','./assets/spr_cloud.png');
        this.load.image('spr_mouse','./assets/mouse01.png');
    }

    create() {

        this.won = false;

        // Create Clouds
        this.cloud01 = new Cloud(this, game.config.width, game.config.height * Math.random() * 0.7, 'spr_cloud', 0).setOrigin(0, 0);
        this.cloud02 = new Cloud(this, game.config.width, game.config.height * Math.random() * 0.7, 'spr_cloud', 0).setOrigin(0, 0);

        // Create Cat
        this.cat01 = this.physics.add.sprite(game.config.width/2, game.config.height/2, 'cat', 0).setOrigin(0, 0);
        /*this.cat1FSM = new StateMachine('idle', {
            idle: new IdleWalk()
        }, [this, this.cat1]);*/
        this.cat01Scale = 4;
        this.cat01.setScale(this.cat01Scale);

        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('cat', { start: 0, end: 8, first: 0}),
            frameRate: 15
        });
        this.anims.create({
            key: 'alert',
            frames: this.anims.generateFrameNumbers('cat', { start: 9, end: 29, first: 9}),
            frameRate: 15
        });
        this.anims.create({
            key: 'look',
            frames: this.anims.generateFrameNumbers('cat', { start: 30, end: 30, first: 30}),
            frameRate: 15
        });


        // Create Tutorial button
        this.button = new Tutorial_Button(this,game.config.width/2,game.config.height/6,'spr_button_green',0);

        // Pair Input
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyK = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);
        keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        

        // variables and settings
        this.MAX_VELOCITY = 300;    // pixels/second
        this.physics.world.gravity.y = 1000;

        // Create Background
        this.ground = this.physics.add.sprite(game.config.width/2,game.config.height-50,'spr_ground').setScale(0.75);
        this.ground.body.allowGravity = false;
        this.ground.body.immovable = true;

        this.ground.setCollideWorldBounds(true);

        //create Mouse
        this.mouse01 = this.physics.add.sprite(game.config.width/5, game.config.height/2, 'spr_mouse').setScale(0.85);
        this.mouse01.body.allowGravity = true;
        this.mouse01.body.immovable = false;

        this.mouse01.setCollideWorldBounds(true);

        // add physics collider
        this.physics.add.collider(this.mouse01, this.ground);
        this.physics.add.collider(this.cat01, this.ground); 
        this.physics.add.collider(this.cat01, this.mouse01); 
    }

    update() {

        // Clouds
        this.cloud01.update();
        this.cloud02.update();

        if(Phaser.Input.Keyboard.JustDown(keyK)){
            this.button.togglePulse();
            this.catWalk(this.cat1);
        }

        if(Phaser.Input.Keyboard.JustDown(keySPACE) && this.won == false){
            this.button.tapDown();
            this.mouse01.setVelocityX(this.MAX_VELOCITY);
            this.mouse01.setDragX(400);

           // Check for win
           console.log("Current x: " + this.mouse01.x);
           if(this.mouse01.x >= game.config.width-150) {
               console.log("WIN");
           }

        }

        if(Phaser.Input.Keyboard.JustDown(keyQ)){
            this.catWalk(this.cat01);
        }
        if(Phaser.Input.Keyboard.JustDown(keyW)){
            this.catAlert(this.cat01);
        }
        if(Phaser.Input.Keyboard.JustDown(keyE)){
            this.catLook(this.cat01);
        }
    }

    catWalk(cat){
        cat.alpha = 0;
        let walkState = this.add.sprite(cat.x, cat.y, 'cat').setScale(this.cat01Scale).setOrigin(0, 0);
        walkState.anims.play('walk');
        walkState.on('animationcomplete', () => {    // callback after anim completes
            cat.alpha = 1;                       // make ship visible again
            walkState.destroy();                       // remove explosion sprite
          });      
    }

    catAlert(cat){
        cat.alpha = 0;
        let alertState = this.add.sprite(cat.x, cat.y, 'cat').setScale(this.cat01Scale).setOrigin(0, 0);
        
        alertState.anims.play('alert');
        alertState.on('animationcomplete', () => {    // callback after anim completes
            cat.alpha = 1;                       // make ship visible again
            alertState.destroy();                       // remove explosion sprite
          });       
    }
    catLook(cat){
        cat.alpha = 0;
        let lookState = this.add.sprite(cat.x, cat.y, 'cat').setScale(this.cat01Scale).setOrigin(0, 0);
        lookState.anims.play('look');
        lookState.on('animationcomplete', () => {    // callback after anim completes
            cat.alpha = 1;                       // make ship visible again
            lookState.destroy();                       // remove explosion sprite
          });       
    }

}