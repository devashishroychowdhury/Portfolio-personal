const express = require('express')
const app = express()
const port = 3000
const path = require('path')
const mysql = require('mysql')
const bodyParser = require('body-parser')


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extented: true }))
// app.use(routes)

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

app.post('/formSubmit', (req, res) => {
    const data = req.body.name;

    console.log("Name ", data.name)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

const sql = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: "",
    database: "portfolio_db"
})

sql.connect();

sql.query('Select * from users', (err, result, fields) => {
    if (err) throw err;

    console.log(result)
})
