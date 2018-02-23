// var todoNew = function(task) {
//     var t = {
//         task: task,
//         done: false,
//     }
//     return t
// }
// // 保存一个 todoList
// var saveTodos = function(todoList) {
//     localStorage.todos = JSON.stringify(todoList)
// }
// // 保存 todo
// var saveTodo = function(todo) {
//     var todoList = loadTodos()
//     todoList.push(todo)
//     saveTodos(todoList)
// }
// // 返回存储的所有 todo
// var loadTodos = function() {
//     var todoStr = localStorage.todos
//     // 第一次读取的时候，结果是 undefined
//     // 所以需要设置为空数组 '[]'
//     // 否则 JSON.parse 就报错了
//     if (todoStr == undefined) {
//         todoStr = '[]'
//     }
//     var todoList = JSON.parse(todoStr)
//     return todoList
// }

class Todo {
    constructor(task) {
        this.task = task
        this.time = this.currentTime()
        this.done = false
        this.todo_id= null
        this.setTodoId()
    }

    setTodoId() {
        var todoStr = localStorage.todos
        if (todoStr == undefined) {
            this.todo_id= 0

        }else {
            var todoList = JSON.parse(todoStr)
            var lastTodo =  todoList[todoList.length - 1].todo_id
            this.todo_id = lastTodo + 1
        }
    }

    currentTime() {
         var d = new Date()
         var month = d.getMonth() + 1
         var date = d.getDate()
         var hours = d.getHours()
         var minutes = d.getMinutes()
         var seconds = d.getSeconds()
         var timeString = `${month}/${date} ${hours}:${minutes}:${seconds}`
         return timeString
     }
// ----------------------------------------
   static saveTodos(todoList) {
       localStorage.todos = JSON.stringify(todoList)
   }

   // 保存 todo
   static saveTodo(todo) {
       var todoList = this.loadTodos()
       todoList.push(todo)
       this.saveTodos(todoList)
   }
   // 返回存储的所有 todo
   static loadTodos () {
       var todoStr = localStorage.todos
       // 第一次读取的时候，结果是 undefined
       // 所以需要设置为空数组 '[]'
       // 否则 JSON.parse 就报错了
       if (todoStr == undefined) {
           todoStr = '[]'
       }
       var todoList = JSON.parse(todoStr)
       return todoList
   }

   static findTodo(todo_id) {
       let todoStr = localStorage.todos
       let todoList = JSON.parse(todoStr)
       return todoList[todo_id]
   }

   static deleteTodo(todo_id) {
       let todoStr = localStorage.todos
       let todoList = JSON.parse(todoStr)
       for (let i = 0; i < todoList.length; i++) {
           let id = todoList[i].todo_id
           if (Number(todo_id) === id) {
               todoList.splice(i,1)
           }
       }
       this.saveTodos(todoList)
   }

}
