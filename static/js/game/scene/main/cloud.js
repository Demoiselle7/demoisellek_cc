class Cloud extends GuaImage {
    constructor(game) {
        super(game,'cloud')
        this.setup()
    }
    setup(){
        this.speed = 1
        this.x = randomBetween(0, this.game.canvas.width - this.w)
        this.y = -this.h
    }
    update() {
        this.speed = config.cloud_speed.value
        this.y += this.speed
        if (this.y > this.game.canvas.height) {
            this.setup()
        }
    }
    debug() {
        this.speed = config.cloud_speed.value
    }
}
