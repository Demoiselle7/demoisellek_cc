class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)

        game.registerAction('b', function(){
            let s = Scene.new(game)
            game.replaceScene(s)

        })

        this.addElement(GuaImage.new(game, 'start'))
    }
    draw() {
        super.draw()
    }
}
