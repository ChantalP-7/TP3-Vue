require("dotenv").config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

const corsOption = {
    origin: [
    "http://localhost:5173",
    "https://tp3-vue-front.onrender.com"
  ],
    credentials: true,
}

// Middlewares
app.use(cors(corsOption))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.json({message: 'Bienvenu dans notre agence de voyages 🌼🌹🌺'})
})

// Base de données
const db = require('./app/models')
db.connex.sync()

// Routes
require('./app/routes/package.route')(app)
require('./app/routes/category.route')(app)

const PORT = 8080
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
})


