var todoTemplate = function(todo) {
    var done = todo.done
    var task = todo.task
    var t = `
        <div class="todo-cell" data-id='${todo.todo_id}'>
            <button class='todo-done'>完成</button>
            <button class='todo-delete'>删除</button>
            <span contenteditable='true'>${todo.task}</span>
            <span>${todo.time}</span>
        </div>
    `
    return t
}

var insertTodoList = function(todoList) {
    var todoListDiv = e('.todo-list')
    // 清空现有的所有 todo
    todoListDiv.innerHTML = ''
    for (var i = 0; i < todoList.length; i++) {
        var todo = todoList[i]
        var t = todoTemplate(todo)
        appendHtml(todoListDiv, t)
    }
}

var bindTodo = function(){
    e('.todo-list').addEventListener('click',function(event) {
    var target = event.target
    var target_id = target.parentElement.dataset.id
    var todo = Todo.findTodo(target_id)
    if (target.classList.contains('todo-done')) {
        todo.done = 'done'
        log('todo 增加css样式',todo)
    }else if (target.classList.contains('todo-delete')) {
        log('delete')
        // 在页面上删除todo
        let todoDiv = target.parentElement
        todoDiv.remove()
        // 在localStorage里删除todo
        Todo.deleteTodo(target_id)
    }
})
}

// 加载所有 todo 并且显示在界面上
var showTodoList = function() {
    var todoList = Todo.loadTodos()
    insertTodoList(todoList)
}
