const path = require('path')

// встановлюємо express
const express = require('express')
const app = express()

// встановлюємо директорію для віддачі статичного контенту (каталог проекту)
app.use(express.static(__dirname))

// налаштовуємо роботу із шаблонізаотором
app.set('views', path.join(__dirname, '/static/views'))
app.set('view engine', 'pug')

// налаштовуємо маршрутизацію
app.get('/', function (request, response) {
  response.render('pages/index', { title: 'Home' })
})
app.get('/projectinprogress', function (request, response) {
  response.render('pages/projectinprogress', { title: 'ProjectInProgress' })
})
app.get('/customer', function (request, response) {
  response.render('pages/customer', { title: 'Customer' })
})
app.get('/projects', function (request, response) {
  response.render('pages/projects', { title: 'Projects' })
})
app.get('/performer', function (request, response) {
  response.render('pages/performer', { title: 'Performer' })
})

// запускаємо аплікацію
app.listen(process.env.PORT || 8080)