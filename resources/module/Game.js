import { config } from "./config.js";
let player
export default class Game extends Phaser.Scene{
    constructor(){
        super('game')
    }
    preload(){

    }
    create(){
        player = this.physics.add.rectangle(config.width/2, config.height/2, 20, 20, 0x7cffe3);
        
    }
    update(){
        player.setVelocity(0);

        if (keys.A.isDown) {
            player.setVelocityX(-300);
        } else if (keys.D.isDown) {
            player.setVelocityX(300);
        }

        if (keys.W.isDown) {
            player.setVelocityY(-300);
        } else if (keys.S.isDown) {
            player.setVelocityY(300);
        }
    }
}