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

        this.setPulse(true);
    }

    getPulse(){
        return this.isPulsing;
    }

    setPulse(isPulsing){
        this.pulse = isPulsing;
        
        if(this.pulse == true){
            if(this.tween != null){
                this.tween.stop();
            }
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
        }else{
            if(this.tween != null){
                this.tween.stop();
            }
            this.texture = this.altTexture;
            this.tween = this.scene.tweens.add({
                targets: this,
                scaleX: 0.9,
                scaleY: 0.9,
                alpha: 1,
                ease: 'linear',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
                duration: 1500,
                repeat: -1,            // -1: infinity
                yoyo: true
            })
        }
    }
}