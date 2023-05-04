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

        this.setPulse(true);
    }

    setPulse(isPulsing){
        this.pulse = isPulsing;
        
        if(this.pulse == true){
            var tween = this.scene.tweens.add({
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
    }
}