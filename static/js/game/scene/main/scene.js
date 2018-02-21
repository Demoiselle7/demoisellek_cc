class Scene extends GuaScene {
    constructor(game) {
        super(game)
        this.setup()
        this.setupInputs()

    }
    setup() {
        this.playerBullets = []
        this.enemiesBullets = []

        let game = this.game
        this.label = Gualabel.new(game,'X ' + config.score.value)
        this.label.x = 400
        this.label.y = 200
        this.numberOfEnemies = 3
        this.bg = GuaImage.new(game, 'sky')
        this.carrot = GuaImage.new(game, 'carrot')
        this.cloud = Cloud.new(game, 'cloud')
        this.player = Player.new(game)


        this.addElement(this.bg)
        this.addElement(this.cloud)
        this.player.x = 0
        this.player.y = 150
        this.addElement(this.player)
        this.carrot.x = -10
        this.carrot.y = 120
        this.addElement(this.carrot)


        // 添加敌人
        this.addEnemies()
     }
     addEnemies() {
         let arr = []
         for (let i = 0; i < this.numberOfEnemies ; i++) {
             let e = Enemy.new(this.game)
             arr.push(e)
             this.addElement(e)
         }
         this.enemies = arr
     }
     setupInputs() {
         let g = this.game
         let s = this
         g.registerAction('w', function(){
             s.player.moveUp()
         })
         g.registerAction('a', function(){
             s.player.moveLeft()
         })
         g.registerAction('s', function(){
             s.player.moveDown()
         })
         g.registerAction('d', function(){
             s.player.moveRight()
         })
         // 解决初始不碰撞问题
         s.player.fire('initColiide')
         g.registerAction('j', function(){
             s.player.fire()
         })
     }
     update() {
         super.update()
         this.cloud.y += 1
         this.cloud.x += 1
         this.addElement(this.label)

     }
}
