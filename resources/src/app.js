var config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight - 1,
    
    pixelArt : true,
    scene: {
      preload: preload,
      create: create,
      update: update
    },
   
    physics: {
      default: "arcade",
      arcade: {
        // debug: true,
      
      },
     
    }
  };

  // async function posLoad(callBack){
  //   let a = await Neutralino.filesystem.readFile("saves.json")
  //   callBack(JSON.parse(a))
  // }
  
  var keys;
  var player, enemi;
  var text;
  var item 
  
  function preload() {
    //chargement run
    this.load.image("run wr1", "./assets/warrior/knight_m_run_anim_f0.png");
    this.load.image("run wr2", "assets/warrior/knight_m_run_anim_f1.png");
    this.load.image("run wr3", "assets/warrior/knight_m_run_anim_f2.png");
    this.load.image("run wr4", "assets/warrior/knight_m_run_anim_f3.png");

    //chargement idle
    this.load.image("idle wr1", "assets/warrior/knight_m_idle_anim_f0.png");
    this.load.image("idle wr2", "assets/warrior/knight_m_idle_anim_f1.png");
    this.load.image("idle wr3", "assets/warrior/knight_m_idle_anim_f2.png");
    this.load.image("idle wr4", "assets/warrior/knight_m_idle_anim_f3.png");

    
    // MASKED ENEMY
    this.load.image("masked 1", "assets/enemy/masked_orc_run_anim_f0.png");
    this.load.image("masked 2", "assets/enemy/masked_orc_run_anim_f1.png");
    this.load.image("masked 3", "assets/enemy/masked_orc_run_anim_f2.png");
    this.load.image("masked 4", "assets/enemy/masked_orc_run_anim_f3.png");


    this.load.image("weapon", "assets/warrior/weapon_knife.png");

    // CHARGEMENT DU THEME SONOR
    this.load.audio("theme", ["assets/sound/theme_drill.ogg", "assets/sound/theme_drill.mp3"])
  }
  


  var temps, tmr = 0, life, vie = 2
  let sound
  function create() {
    sound = this.sound.add("theme")
    
    keys = this.input.keyboard.addKeys("Z,S,Q,D,esc,K,L");  
    
    player = this.physics.add.sprite(200, 150, "run wr1");
    player.setCollideWorldBounds(true);
    player.setScale(2, 2)
    
    enemi = this.physics.add.sprite(200, 300, "masked 1")
    enemi.setCollideWorldBounds(true);
    enemi.setScale(2, 2)
    
    item = this.physics.add.image(200, 200, "weapon")
    item.setCollideWorldBounds(true);
    item.setScale(2, 2)

    text = this.add.text(10, 10, "position", {
      fontFamily : "calibri"
    })


    life = this.add.text(config.width/2, 10)

    //le timer pour compter
    setInterval(() => {
      tmr++
    }, 1000)
    temps = this.add.text(config.width - 150, 10)
   

    this.anims.create({
        key : "hero idle",
        frames : [
            {key : "idle wr1"},
            {key : "idle wr2"},
            {key : "idle wr3"},
            {key : "idle wr4"}
        ],

        frameRate : 10,
        repeat : -1
    })

     this.anims.create({
        key : "hero run",
        frames : [
            {key : "run wr1"},
            {key : "run wr2"},
            {key : "run wr3"},
            {key : "run wr4"}
        ],

        frameRate : 15,
        repeat : -1
    })

    

     this.anims.create({
        key : "masked run",
        frames : [
            {key : "masked 1"},
            {key : "masked 2"},
            {key : "masked 3"},
            {key : "masked 4"}
        ],

        frameRate : 15,
        repeat : -1
    })

    
    // posLoad((a) => {
    //   player.x = a.posX
    //   player.y = a.posY
    // })
    
  sound.play({
    mute : false,
    volume : 1,
    rate : 1,
    detune : 0,
    seek : 0,
    loop : true,
    delay : 0
    
  })


  }


  let menuOpen = false, follow = false
  function ItemFollowPlayer(boolean){
    if(boolean){
      item.x = player.x + 10
      item.y = player.y + 10
    }
  }
  // var timer = 0
  // var pause = false
  let power = 200
  console.log(power.length, power)


  function update() {
  
    if((player.x - 50) == enemi.x){
      console.log("ouasi")
    }
    if((player.y + 50) == enemi.y){
      console.log("ouasi")
    }

    enemi.anims.play("masked run", true)
    text.text = "Power : "+ power
    temps.text = "Time : "+tmr
    life.text = "Life : x"+ vie
    
    player.setVelocity(0);

   

    if(enemi.y == player.y - 10){
      enemi.setVelocityX(0)
      enemi.setVelocityY(0)

      console.log("arrivé")
    }else{
      if(enemi.x < player.x){
        enemi.setVelocityX(100)
        
      }
      if(enemi.x > player.x){
        enemi.setVelocityX(-100)
        
      }
      if(enemi.y > player.y){
        enemi.setVelocityY(-100)
      }
  
      if(enemi.y < player.y){
        enemi.setVelocityY(100)
      }
  
      if(enemi.y == player.y){
        enemi.setVelocityY(0)
      }
    }
   

    if (keys.Q.isDown) {
      player.anims.play("hero run", true)
      player.setVelocityX(-200);
      player.setFlip(true, false)
      
    }
    
    if (keys.D.isDown) {
      player.anims.play("hero run", true)
      player.setFlip(false, false)
      player.setVelocityX(200);
    }
  
    if (keys.Z.isDown) {
      player.setVelocityY(-200);
      player.anims.play("hero run", true)
    }
    
    if (keys.S.isDown) {
      player.setVelocityY(200);
      player.anims.play("hero run", true)
    }
    
    
    if (keys.K.isDown) {
      if(follow == true){
        if(player.flipX){
          item.x = item.x - 50
        }else{
          item.x = item.x + 50
        }
      }

      follow = false
      
      // item.x = item.x - 100     
    }
    if((keys.L.isDown && power > 0) && (keys.D.isDown || keys.Q.isDown)){
      power--
      if(player.flipX){
        player.setVelocityX(-1000)
      }else{
        player.setVelocityX(1000)
      }
    }
    

     if(keys.Z.isUp && keys.S.isUp && keys.Q.isUp && keys.D.isUp){
        player.anims.play("hero idle", true)
        player.setVelocityX(0) 
    }
   

    if((player.x - item.x) <= 15 && (player.x - item.x) >= -15){
      if((player.y - item.y) <= 15 && (player.y - item.y) >= -15){
        if(follow == false){
          follow = true
        }
    }
  }

    ItemFollowPlayer(follow)
  }

  // Menu 
  window.addEventListener("keyup", (e) => {
    let c = document.querySelector("canvas")
    let menu = document.querySelector("div")

    if(e.key == "Escape"){
      if(menuOpen == false){
        menuOpen = true
        console.log("menu ouvert")
        c.className = "hidden"
        menu.className = ""

      }else if(menuOpen == true){
        menuOpen = false
        console.log("menu fermé")
        menu.className = "hidden"
        c.className = ""
        
      }
    }
  })


new Phaser.Game(config)
