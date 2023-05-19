import Game from "./Game.js"
const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight - 1,
    scene: Game,
    physics : {
        default : 'arcade',
        arcade : {
            debug : true
        }
    }
}

export {
    config
}