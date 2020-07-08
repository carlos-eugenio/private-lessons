const express = require('express')
const routes = express.Router()

const data = require("./data")

routes.get('/', function(req, res) {
    return res.redirect('/teachers')
})

routes.get('/teachers', function(req, res) {
    return res.render('teachers/index', { data })
})

routes.get('/students', function(req, res) {
    return res.send('students')
})

module.exports = routes