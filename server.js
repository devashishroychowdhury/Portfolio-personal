const express = require('express')
const app = express()
const port = 3000
const path = require('path')
const { body, validationResult } = require('express-validator');
const mysql = require('mysql')
const bodyParser = require('body-parser')

const sql = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: "",
    database: "portfolio_db"
})

sql.connect();


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

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

app.get('/formSubmit', (req, res) => {
    let firstName = req.query.name;
    let lastName = req.query.surname;
    let email = req.query.email;
    let phone = req.query.phone;
    let address = req.query.address;
})

app.post('/formSubmit',
    [
        // Validate and sanitize fields
        body('name').notEmpty().withMessage('Name cannot be empty'),
        body('surname').notEmpty().withMessage('Surname cannot be empty'),
        body('number').isMobilePhone().withMessage('Invalid phone number'),
        body('email').isEmail().withMessage('Invalid email'),
        body('address').notEmpty().withMessage('Address cannot be empty'),
    ], (req, res) => {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let formData = {
            first_name: req.body.name,
            last_name: req.body.surname,
            number: req.body.number,
            email: req.body.email,
            address: req.body.address
        };


        let sqlinsert = "INSERT INTO users VALUES ('sno', '" + req.body.name + "','" + req.body.surname + "','" + req.body.number + "','" + req.body.email + "','" + req.body.address + "')";
        sql.query(sqlinsert)
        let err;
        if (err) {
            console.error('Error while inserting data into database', err);
            res.status(500).send('Error while inserting data into database');
        } else {
            console.log('Data inserted successfully');
            res.render('submit_form')
        }
    })



app.listen(port, () => {
    console.log(`Server started successfully at port :${port}`)
})

