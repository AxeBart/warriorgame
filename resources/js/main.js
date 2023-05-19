window.onload = function() {
    const config = {
        type: Phaser.AUTO,
        width: innerWidth,
        height: innerHeight,
         
        // background : "yellow",
        pixelArt : true,
        physics: {
            default: "arcade",
            arcade : {
                debug: false
            }
        }
    }
    
    const jeux = new Phaser.Game(config);
}
