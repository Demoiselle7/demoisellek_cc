/*
    我们把 todo 存在 localStorage 里面
    {
        "id": 1,
        "task": "吃瓜",
        "done": true,
    }

    界面有 4 个
    - 创建 todo
    - 显示 todo 列表（所有 todo）
    - 修改 todo
    - 显示某个 todo
*/

/*
创建 todo
1，写出界面
2，给 add button 绑定一个事件
3，获取 input 的值
4，创建一个 todo
5，保存 todo
*/
var bindEvents = function() {
    // 添加 todo 的事件
    var button = e('#id-button-add')
    bindEvent(button, 'click', function(){
        log('click add')
        var input = e('#id-input-task')
        var task = input.value
        log('task', task)
        var todo = new Todo(task)
        // saveTodo(todo)
        Todo.saveTodo(todo)
    })

    // 切换页面的 按钮
    bindAll('.gua-tab', 'click', function(event){
        log('gua tab click')
        var button = event.target
        var page = button.dataset.page
        log('page', page)
        showPage(page)
        // 改变 history.state
        pushState(page)
    })

    // 浏览器后退前进的时候要切换页面
    // 用户点击 前进 后退 按钮的时候, 会触发 window 的 popstate 事件
    // 于是可以在这里操作
    window.addEventListener("popstate", function(e) {
        var state = e.state;
        // state 就是 pushState 的第一个参数
        var pageName = state.page
        console.log('pop state', state, pageName)
        showPage(pageName)
        // pushState(pageName)
    })

    bindTodo()
}

var pushState = function(className) {
    // 切换地址栏信息
    // todo-new todo-list
    var pageName = className.split('-')[1]
    var url = 'todo#page=' + pageName
    var state = {
        page: className,
    }
    history.pushState(state, 'title', url)
    // 手动设置 title
    document.title = pageName
}

var showPage = function(className) {
    var pages = es('.gua-page')
    // log('pages', pages)
    for (var i = 0; i < pages.length; i++) {
        let page = pages[i]
        page.classList.add('gua-hide')
    }
    // 给 todo-new 删掉 gua-hide
    var selector = '.' + className
    var todonewDiv = e(selector)
    todonewDiv.classList.remove('gua-hide')
    // 如果是 todolist 界面， 需要刷新
    if (className == 'todo-list') {
        showTodoList()
    }
}

var initApp = function() {
    // 根据地址栏的参数来显示不同的页面
    var query = location.search
    var [k, v] = query.slice(1).split('=')
    // 让 page 初始化为 list
    var page = 'list'
    // 设置一个 合法的 page 参数集合
    var validPages = ['list', 'new']
    if (k == 'page') {
        if (validPages.includes(v)) {
            page = v
        }
    }
    // ["page", "list"]
    var pageName = 'todo-' + page
    showPage(pageName)
}

var __main = function() {
    bindEvents()
    initApp()
}

__main()
