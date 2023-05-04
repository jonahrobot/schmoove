class Cat extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
    }
}

class IdleWalk extends State {
    enter(scene, cat) {
        cat1.anims.play('walk');
    }

    execute(scene, cat) {
        
    }
}