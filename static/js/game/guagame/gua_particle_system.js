class GuaParticle extends GuaImage {
    constructor(game) {
        super(game,'spark')
        this.setup()
    }
    setup() {
        this.life = 10
    }
    init(x, y, vx, vy) {
        this.x = x + this.w * 2
        this.y = y + this.h * 2
        this.vy = vy
        this.vx = vx
    }
    update() {
        this.life--
        this.x += this.vx
        this.y += this.vy
        let factor = 0.01
        this.vx += factor * this.vx
        this.vy += factor * this.vy
    }
}

class GuaParticleSystem {
    constructor(game) {
        this.game = game
        this.setup(game)
    }
    static new(game) {
        return new this(game)
    }
    setup() {
        this.duration = 10
        // this.x = 150
        // this.y = 200
        this.numberOfParticles = 20
        this.particles = []
    }
    update() {
        this.duration--
        // 添加 小火花
        if (this.particles.length < this.numberOfParticles) {
            let p = GuaParticle.new(this.game)
            //设置初始化坐标
            let s = 2
            let vx = randomBetween(-s, s)
            let vy = randomBetween(-s, s)
            p.init(this.x, this.y, vx, vy)
            this.particles.push(p)
        }
        // 更新所有的小火花
        for(let p of this.particles) {
            p.update()
        }
        //删除死掉的小火花
        this.particles = this.particles.filter(p => p.life > 0)
    }
    draw() {
        if (this.duration < 0) {
            // log('删掉',this.game.scene.elements)
            //Todo 删掉小火花
            //在数组中找到并且splice掉它
            //应该从scene删除
            return
        }
        for(let p of this.particles) {
            p.draw()
        }
    }
}
