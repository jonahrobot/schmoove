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
        this.load.image('spr_cheese','./assets/cheese.png');
    }

    create() {

        this.STATES = {
            Playing: 0, 
            Win: 1,
            Lose: 2
        }

        this.gameState = this.STATES.Playing;

        // Create Clouds
        this.cloud01 = new Cloud(this, game.config.width, game.config.height * Math.random() * 0.7, 'spr_cloud', 0).setOrigin(0, 0);
        this.cloud02 = new Cloud(this, game.config.width, game.config.height * Math.random() * 0.7, 'spr_cloud', 0).setOrigin(0, 0);

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
        keyK = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);
        keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        

        // variables and settings
        this.MAX_VELOCITY = 100;    // pixels/second
        this.physics.world.gravity.y = 700;

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

        // Add Cheese
        this.cheese = this.add.sprite(game.config.width/2+200, game.config.height/2+126,'spr_cheese').setScale(0.5);

        // add physics collider
        this.physics.add.collider(this.mouse01, this.ground);
        this.physics.add.collider(this.cat1, this.ground);
        this.check = 0;
    }

    CatFlipCode(){
        this.cat1.flipX=true;
        this.cat1.anims.play('alert');
        this.button.togglePulse();
        this.currentPos = this.mouse01.x;
        this.clock = this.time.delayedCall(3000, () => {
            this.cat1.flipX=false;
            this.cat1.anims.play('walk');
            this.button.togglePulse();
        }, null, this);
        this.check++;
    }

    win(){
        
    }

    update() {
        //this.catWalk(this.cat1);
        //console.log(this.mouse01.x);
        
        // Cat checks
        if (this.mouse01.x >= 200 && this.check == 0) {
            this.CatFlipCode();
        }
        if (this.mouse01.x >= 260 && this.check == 1) {
            this.CatFlipCode();
        }
        if (this.mouse01.x >= 320 && this.check == 2) {
            this.CatFlipCode();
        }
        if (this.mouse01.x >= 390 && this.check == 3) {
            this.CatFlipCode();
        }

        let textConfig = { 
            fontFamily: 'Courier',
        fontSize: '28px',
        backgroundColor: '#F8FF0E',
        color: '#000000',
        align: 'right',
        padding: {
            top: 5,
            bottom: 5,
        },
        fixedWidth: 100
        }
        // Lose check
        if (this.cat1.flipX == true && this.mouse01.x > (this.currentPos + 11) &&  this.gameState == this.STATES.Playing) {
            console.log("LOSE")
            textConfig.fixedWidth = 0;
            this.add.text(game.config.width/2, game.config.height/3, 'GAME OVER', textConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/3 + 64, 'Press (R) to Restart', textConfig).setOrigin(0.5);
            // STop animation timer
            this.clock.paused = true;

            this.gameState = this.STATES.Lose;
            this.cat1.anims.play('look');
            this.cat1.flipX = false;
        }

        // Clouds
        this.cloud01.update();
        this.cloud02.update();
        if(Phaser.Input.Keyboard.JustDown(keyR)){
            this.scene.restart();
        }

        if(Phaser.Input.Keyboard.JustDown(keyK)){
            this.button.togglePulse();
        }

        if(Phaser.Input.Keyboard.JustDown(keySPACE) && this.gameState == this.STATES.Playing){
            this.button.tapDown();
            this.mouse01.setVelocityX(this.MAX_VELOCITY);
            this.mouse01.setDragX(400);

           // Check for win
           console.log("Current x: " + this.mouse01.x);
           if(this.mouse01.x >= game.config.width-150) {
               console.log("WIN");
               this.gameState = this.STATES.Win;
           }

        }

        if(Phaser.Input.Keyboard.JustDown(keyQ)){
            this.cat1.anims.play('walk');
        }
        if(Phaser.Input.Keyboard.JustDown(keyW)){
            this.cat1.anims.play('alert');
        }
        if(Phaser.Input.Keyboard.JustDown(keyE)){
            this.cat1.anims.play('look');
        }
    }      
}   
