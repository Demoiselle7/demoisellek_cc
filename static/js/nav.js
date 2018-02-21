const e = function(selector) {
    return document.querySelector(selector)
}

const addNav = function() {
    if (document.body.scrollTop > 40 || document.documentElement.scrollTop > 40) {
        e('nav').style.position = 'fixed'
        e('nav').style.top = '0'
        e('nav').style.backgroundColor = '#FFF'
        e('nav').style.zIndex = '900'

    }else {
        e('nav').style.position = 'relative'
        // e('nav').style.background = 'linear-gradient(to left bottom, hsl(154, 100%, 85%) 0%,hsl(43, 100%, 85%) 100%)'
    }
}


window.onscroll = function() {
    addNav()
}
