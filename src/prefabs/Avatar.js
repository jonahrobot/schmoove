// THIS OBJECT IS NOT CREATED OR USED!
class Avatar extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene,x, y, texture, frame);
        scene.add.existing(this);
    }

    update(){
        //this.x -= this.moveSpeed;
    }
}