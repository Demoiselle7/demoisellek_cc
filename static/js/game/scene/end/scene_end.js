class SceneEnd extends GuaScene {
    constructor(game) {
        super(game)

        game.registerAction('r', function(){
            let s = Scene.new(game)
            game.replaceScene(s)
        })

        this.addElement(GuaImage.new(game, 'end'))
    }
    // draw() {
    //     // draw labels
    //     this.game.context.fillText('游戏结束, 按 r 返回标题界面', 100, 290)
    // }
}
