let e = sel => document.querySelector(sel)

let log = console.log.bind(console)

let imageFromPath = function(path) {
    let img = new Image()
    img.src = path
    return img
}

let rectIntersects = function(a, b) {
    let o = a
    if (b.y > o.y && b.y < o.y + o.image.height) {
        if (b.x > o.x && b.x < o.x + o.image.width) {
            return true
        }
    }
    return false
}
