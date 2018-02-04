const express = require('express')

const User = require('../models/user')
const { log } = require('../utils')
const { currentUser } = require('./main')

// 这里是把 express.Router 的实例赋值给 index
const index = express.Router()

index.get('/', (request, response) => {
    const userList = User.all()
    const u = currentUser(request)
    const args = {
        users: userList,
        user: u,
    }
    response.render('index/index.html', args)
})

index.get('/login', (request, response) => {
    response.render('index/login.html')
})

index.post('/login', (request, response) => {
    const form = request.body
    const u = User.findOne('username', form.username)
    log('debug u', u, form)
    if (u.validateAuth(form)) {
        log('debug validate form', request.session)
        // 直接指定 request.session 的 key, 然后通过这个 key 来获取设置的值
        request.session.uid = u.id
        response.redirect('/')
    }
})

index.get('/register', (request, response) => {
    response.render('index/register.html')
})

index.post('/register', (request, response) => {
    const form = request.body
    const u = User.create(form)
    response.redirect('/')
})

index.get('/logout', (request, response) => {
    // 注销登录的时候, 将 session 清空就可以了
    request.session = null
    response.redirect('/')
})

module.exports = index

