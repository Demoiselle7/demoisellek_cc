class Player extends GuaImage {
    constructor(game) {
        super(game, 'player')
        this.setup()
    }
    setup() {
        this.speed = 5
        this.cooldown = 0
    }
    update() {
        this.speed = config.player_speed.value
        if (this.cooldown > 0) {
            this.cooldown--
        }
    }
    fire(initColiide) {
        // let self = this
        let game = this.game
        if (this.cooldown == 0) {
            this.cooldown = config.fire_cooldown.value
            let x = this.x + this.w / 2
            let y = this.y
            let b = Bullet.new(game)
            b.x = x
            b.y = y
            if (initColiide) {
                b.x = 1000
            }
            this.addPlayerBullets(b)
        }
    }
    addPlayerBullets(b) {
        this.scene.playerBullets.push(b)
        this.scene.addElement(b)
    }
    kill() {
        let game = this.game
        let s = SceneEnd.new(game)
        game.replaceScene(s)
        // log('切换场景')
    }
    moveLeft() {
        if (this.x > 0) {
            this.x -= this.speed
        }
    }
    moveRight() {
        if (this.x < this.game.canvas.width - this.scene.player.w - this.speed) {
            this.x += this.speed
        }
    }
    moveUp() {
        if (this.y > 0) {
            this.y -= this.speed
        }
    }
    moveDown() {
        if (this.y < this.game.canvas.height - this.scene.player.h) {
            this.y += this.speed
        }
    }
    collide(ball){
        let aInb = function(x, x1, x2) {
            return x >= x1 && x <= x2
        }
        let a = this
        let b = ball
        if (aInb(a.x, b.x, b.x + b.w) || aInb(b.x, a.x, a.x + a.w)) {
            if (aInb(a.y, b.y, b.y + b.h) || aInb(b.y, a.y, a.y + a.h)) {
                return true
            }
        }
        return false
    }

}
