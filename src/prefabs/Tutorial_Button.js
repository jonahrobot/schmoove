/**
 *  Tutorial Animated Button
 * 
 *  Will pulse when player can move, or stop pulsing and turn red when they can't.
 */
class Tutorial_Button extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);

        // If tutorial button is pulsing, green if so, red if false.
        this.pulse = true;
        this.tween = null;

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
        if(this.pulse == true){
            this.tween.seek(500);
        }
    }

    togglePulse(){       
        if(this.pulse == true){
            this.pulse = false;
            this.tween.pause();
            this.setTint(Phaser.Display.Color.GetColor32(255, 0, 0, 1));
        }else{
            this.pulse = true;
            this.tween.resume();
            this.setTint(Phaser.Display.Color.GetColor32(255, 255, 255, 0));
        }
    }
}