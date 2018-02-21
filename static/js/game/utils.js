const randomBetween = function(start, end) {
    let n = Math.random() * (end - start + 1)
    return Math.floor(n + start)

}

let es = sel => document.querySelectorAll(sel)

let bindAll = function(sel, eventName, callback) {
    let l = es(sel)
    for (let i = 0; i < l.length; i++) {
        let input = l[i]
        input.addEventListener(eventName,function(event) {
            callback(event)
        })
    }
}

// let templateControl = function(key,item) {
//     let t = `<div class="">
//         <label>
//             <input class="gua-auto-slider" type="range"
//                 max='300'
//                 value="${item.value}"
//                 data-value='config.${key}'>
//             ${item._comment}: <span class="gua-label"></span>
//         </label>
//     </div>`
//     return t
// }

// let insertControls = function() {
//     let div = e('.gua-controls')
//     let keys = Object.keys(config)
//     for (let k of keys) {
//         let item = config[k]
//         let html = templateControl(k, item)
//         div.insertAdjacentHTML('beforeend',html)
//     }
// }

let bindEvents = function() {
    bindAll('.gua-auto-slider','input',function(event) {
        let target = event.target
        let bindlet = target.dataset.value
        let v = target.value
        eval(bindlet + '.value =' + v)
        //
        let label = target.closest('label').querySelector('.gua-label')
        label.innerText = v
    })
}


class Gualabel {
    constructor(game, text) {
        this.game = game
        this.text = text
    }
    static new(game, text) {
        return new this(game, text)
    }
    draw() {
        this.game.context.fillText(this.text, 100, 190)
    }
    update() {

    }
}
