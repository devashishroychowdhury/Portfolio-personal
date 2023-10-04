const express = require('express')
const app = express()
const port = 3000
const path = require('path')

app.use(express.static(path.join(__dirname, 'views')))

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.get('/portfolio', (req, res) => {
    res.render('portfolio')
})

app.get('/service', (req, res) => {
    res.render('service')
})

app.get('/contact', (req, res) => {
    res.render('contact')
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})