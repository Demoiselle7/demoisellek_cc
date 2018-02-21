class EnemyBullet extends GuaImage {
    constructor(game) {
        super(game, 'enemy_bullet')
        this.setup()
    }
    setup(game) {
        this.speed = config.bullet_speed.value
    }
    update(game) {
        this.x -= this.speed
        let player = this.scene.player
        if (this.collide(player)) {
            this.kill()
            player.kill()
        }
    }
    kill() {
        this.x = 900
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
