const express = require('express')

// const User = require('../models/user')
const { log } = require('../utils')
// const { currentUser } = require('./main')

// 这里是把 express.Router 的实例赋值给 index
const demo = express.Router()

demo.get('/', (request, response) => {

    response.render('demo/index.html')
})

demo.get('/game', (request, response) => {

    response.render('demo/game.html')
})

demo.get('/music', (request, response) => {

    response.render('demo/music_player.html')
})


demo.get('/todo', (request, response) => {

    response.render('demo/todo.html')
})

module.exports = demo
