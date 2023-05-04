/**
 *  Tutorial Animated Button
 * 
 *  Will pulse when player can move, or stop pulsing and turn red when they can't.
 */
class Tutorial_Button extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, altTexture) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);

        // If tutorial button is pulsing, green if so, red if false.
        this.pulse = true;
        this.tween = null;
        this.defaultTexture = texture;
        this.altTexture = altTexture;

        this.texture = this.defaultTexture;

        this.tween = this.scene.tweens.add({
            targets: this,
            scaleX: 0.75,
            scaleY: 0.75,
            alpha: 1,
            ease: 'Quad.easeIn',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
            duration: 500,
            repeat: -1,            // -1: infinity
            yoyo: true
        })
    }

    tapDown(){
        this.tween.seek(500);
    }

    togglePulse(){       
        if(this.pulse == true){
            this.pulse = false;
            this.tween.pause();
        }else{
            this.pulse = true;
            this.tween.resume();
        }
    }
}