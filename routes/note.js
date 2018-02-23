const express = require('express')

const Note = require('../models/note')
// const Board = require('../models/board')
const Model = Note
const { log } = require('../utils')

// const { currentUser, loginRequired } = require('./main')
//缺少User.js
// const User = require('../models/user')

// 使用 express.Router 可以创建模块化的路由
// 类似我们以前实现的形式
const note = express.Router()

note.get('/', (request, response) => {
    const board_id = Number(request.query.board_id || -1)
    let ms = note.allList(board_id)

    // let users = ms.map((t) => {
    //     const id = t.user_id
    //     console.log('debug id ======',id)
    //     const m = User.get(id)
    //     console.log('debug m====',m)
    // })
    // const args = {
    //     notes: ms,
    //     // boards: boards,
    //     board_id: board_id,
    //     users: users
    // }
    // log('debug args', args)
    response.render('note/index.html', args)
})

// note.get('/detail/:id', (request, response) => {
//     const id = Number(request.params.id)
//     // const t = note.findOne('id', id)
//     // t.views += 1
//     // t.save()
//     // const args = {
//     //     note: t,
//     // }
//     const m = note.get(id)
//     const args = {
//         note: m,
//     }
//     response.render('note/detail.html', args)
// })

note.get('/new', (request, response) => {
    // const boards = Board.all()
    // const args = {
    //     boards: boards,
    // }
    response.render('note/new.html', args)
})

note.post('/add', (request, response) => {
    // 获取添加 note 的表单内容
    const form = request.body
    // 调用 create 方法保存 note

    // const u = currentUser(request)
    // form.user_id = u.id
    // const m = Model.create(form)

    // 重定向到 note 首页
    response.redirect('/note')
})

// note.get('/delete/:id', loginRequired, (request, response) => {
//     // :id 这个方式是动态路由, 意思是这个路由可以匹配一系列不同的路由
//     // 动态路由是现在流行的路由设计方案
//     // 动态路由的参数通过 request.params 获取
//     // Model.remove 的参数是一个数字, 所以这里需要转一下
//     // 注意, 这里很容易出现的 bug 是传一个字符串 '1', 结果取出来的是 null
//     // 这种类型的问题, 由调用方自己保证
//     const id = Number(request.params.id)
//     // 根据 id 删除 note, remove 方法顺便返回了 note 这个 model,
//     // 有些场景下是需要使用的
//     const t = Model.remove(id)
//     response.redirect('/todo')
// })

note.get('/edit/:id', (request, response) => {
    const id = Number(request.params.id)
    const m = Model.get(id)
    const args = {
        note: m,
    }
    response.render('todo/edit.html', args)
})

note.post('/update', (request, response) => {
    const form = request.body
    const m = Model.update(form)
    response.redirect('/todo')
})

module.exports = note
