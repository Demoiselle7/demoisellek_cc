class Bullet extends GuaImage {
    constructor(game) {
        super(game, 'bullet')
        this.setup()
    }
    setup(game) {
        this.speed = config.bullet_speed.value
    }
    update(game) {
        this.x += this.speed
        // log('子弹',this.x,this.y)
        let enemies = this.game.scene.enemies || []
        for (let e of enemies) {
            if (this.collide(e)) {
                this.kill()
                e.explode(e.x, e.y)
                e.kill()
                config.score.value += 1
                log(config.score.value)
            } else if (this.scene.player.collide(e)) {
                // log('撞上敌人')
                this.scene.player.kill()
                e.explode(e.x, e.y)
                e.kill()
            }
        }
        let playerBullets = this.scene.playerBullets || []
        let enemiesBullets = this.scene.enemiesBullets || []
        for (let pb of playerBullets) {
            for (let eb of enemiesBullets) {
                if (pb.collide(eb)) {
                    pb.kill()
                    eb.kill()
                }
            }

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
