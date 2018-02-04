const express = require('express')

const Board = require('../models/board')
const { log } = require('../utils')

// 使用 express.Router 可以创建模块化的路由
// 类似我们以前实现的形式
const board = express.Router()


board.get('/', (request, response) => {
    const boards = Board.all()
    const args = {
        boards: boards,
    }
    response.render('board/index.html', args)
})
board.post('/add', (request, response) => {
    // 获取添加 todo 的表单内容
    const form = request.body
    // 调用 create 方法保存 todo
    const t = Board.create(form)
    // 重定向到 todo 首页
    response.redirect('/board')
})

module.exports = board

