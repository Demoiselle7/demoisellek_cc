const express = require('express')

// const User = require('../models/user')
const { log } = require('../utils')
// const { currentUser } = require('./main')

// 这里是把 express.Router 的实例赋值给 index
const demo = express.Router()

demo.get('/', (request, response) => {
    // const userList = User.all()
    // const u = currentUser(request)
    // const args = {
    //     users: userList,
    //     user: u,
    // }
    response.render('demo/index.html')
})

demo.get('/game', (request, response) => {
    // const userList = User.all()
    // const u = currentUser(request)
    // const args = {
    //     users: userList,
    //     user: u,
    // }
    response.render('demo/game.html')
})

demo.get('/music', (request, response) => {
    // const userList = User.all()
    // const u = currentUser(request)
    // const args = {
    //     users: userList,
    //     user: u,
    // }
    response.render('demo/music_player.html')
})

module.exports = demo
