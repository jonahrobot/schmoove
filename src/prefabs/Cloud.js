function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

// Cloud prefab
class Cloud extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);

        scene.add.existing(this);   // add to existing scene
        this.scale = 0.2;
        this.moveSpeed = 0.25;
        var test = getRandomInt(3); // 0, 1 or 2

        switch(test) {
            case 0:
              this.scale = 0.5;
              this.moveSpeed = 1;
              break;
            case 1:
                this.scale = 0.3;
                this.moveSpeed = 0.5;
              break;
            case 2:
                this.scale = 0.2;
                this.moveSpeed = 0.25;
              break;
          }
    }

    update() {
        // Move cloud to the left
        this.x -= this.moveSpeed;
        // wrap around from left edge to right edge
        if(this.x <= 0 - this.width) {
            this.reset();
            var test = getRandomInt(3); // 0, 1 or 2

            switch(test) {
                case 0:
                  this.scale = 0.5;
                  this.moveSpeed = 1;
                  break;
                case 1:
                    this.scale = 0.3;
                    this.moveSpeed = 0.5;
                  break;
                case 2:
                    this.scale = 0.2;
                    this.moveSpeed = 0.25;
                  break;
              }
        }
    }

    // position reset
    reset() {
        this.x = game.config.width;
        this.y = (game.config.height - 100) * Math.random();
    }

   
}