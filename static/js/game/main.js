
let __main = function() {
    let images = {
        bullet: '../static/img/game/img/carrot.png',
        cloud: '../static/img/game/img/cloud.png',
        player: '../static/img/game/img/rabbit.png',
        start: '../static/img/game/img/start.png',
        sky: '../static/img/game/img/background.png',
        end: '../static/img/game/img/end.png',
        enemy0:'../static/img/game/img/target0.png',
        enemy1:'../static/img/game/img/enemy1.png',
        enemy2:'../static/img/game/img/enemy2.png',
        enemy3:'../static/img/game/img/enemy3.png',
        spark:'../static/img/game/img/star.png',
        carrot:'../static/img/game/img/get.png',
        enemy_bullet:'../static/img/game/img/enemy_bullet.png',
    }

    //从配置文件生成html控件
    // insertControls()
    //绑定事件
    bindEvents()
    let game = GuaGame.instance(30, images, function(g){
        // let s = Scene.new(g)
        let s = SceneTitle.new(g)
        g.runWithScene(s)
    })

}

__main()
