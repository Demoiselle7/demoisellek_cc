const express = require('express')

const Todo = require('../models/todo')
const { log } = require('../utils')

// 使用 express.Router 可以创建模块化的路由
// 类似我们以前实现的形式
const todo = express.Router()

// 这里只是缩写的路由, 实际上匹配的是路由前缀 /todo 加上当前路由 /
// 也就是说最后的结果是 /todo/
todo.get('/', (request, response) => {
    const todoList = Todo.all()
    const args = {
        todos: todoList,
    }
    response.render('todo/index.html', args)
})

// 实际上匹配的是 /todo + /add, 也就是 /todo/add
todo.post('/add', (request, response) => {
    // 获取添加 todo 的表单内容
    const form = request.body
    // 调用 create 方法保存 todo
    const t = Todo.create(form)
    // 重定向到 todo 首页
    response.redirect('/todo')
})

// 这里匹配的路由是 /todo/delete/:todoId
todo.get('/delete/:todoId', (request, response) => {
    // :todoId 这个方式是动态路由, 意思是这个路由可以匹配一系列不同的路由
    // 动态路由是现在流行的路由设计方案
    // 动态路由的参数通过 request.params 获取
    // Model.remove 的参数是一个数字, 所以这里需要转一下
    // 注意, 这里很容易出现的 bug 是传一个字符串 '1', 结果取出来的是 null
    // 这种类型的问题, 由调用方自己保证
    const todoId = Number(request.params.todoId)
    // 根据 id 删除 todo, remove 方法顺便返回了 todo 这个 model,
    // 有些场景下是需要使用的
    const t = Todo.remove(todoId)
    response.redirect('/todo')
})

todo.get('/edit/:todoId', (request, response) => {
    const id = Number(request.params.todoId)
    const t = Todo.get(id)
    const args = {
        todo: t,
    }
    response.render('todo/edit.html', args)
})

todo.post('/update', (request, response) => {
    const form = request.body
    const t = Todo.update(form)
    response.redirect('/todo')
})

todo.get('/complete/:todoId', (request, response) => {
    const id = Number(request.params.todoId)
    const t = Todo.complete(id, true)
    response.redirect('/todo')
})

module.exports = todo

