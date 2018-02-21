// log 函数
var log = function() {
	console.log.apply(console, arguments)
}

// find 函数
// 可以查找 element 的所有子元素
var find = function(element, selector) {
    return element.querySelector(selector)
}

var appendHtml = function(element, html) {
	element.insertAdjacentHTML('beforeend', html)
}

/* append 函数 把 html 作为子元素插入到 selector 选中的所有元素的末尾 */
var append = function(selector, html) {
    var elements = document.querySelectorAll(selector)
    for (var i = 0; i < elements.length; i++) {
        var e = elements[i]
        e.insertAdjacentHTML('beforeend', html)
    }
}

var bindEvent = function(element, eventName, callback) {
	element.addEventListener(eventName, callback)
}

var bindAll = function(selector, eventName, callback) {
    var elements = document.querySelectorAll(selector)
    for(var i = 0; i < elements.length; i++) {
        var e = elements[i]
        bindEvent(e, eventName, callback)
    }
}

var toggleClass = function(element, className) {
    if (element.classList.contains(className)) {
        element.classList.remove(className)
    } else {
        element.classList.add(className)
    }
}

var removeClassAll = function(className) {
    var selector = '.' + className
    var elements = document.querySelectorAll(selector)
    for (var i = 0; i < elements.length; i++) {
        var e = elements[i]
        e.classList.remove(className)
    }
}

// find 函数可以查找 element 的子元素
var find = function(element, selector) {
    return element.querySelector(selector)
}

// find 函数可以查找 element 的所有子元素
var findAll = function(element, selector) {
    return element.querySelectorAll(selector)
}
