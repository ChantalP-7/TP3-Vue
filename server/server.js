const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const corsOption = {
    origin: 'http://localhost:5173',
    credentials:true,
}
const db = require('./app/models')
db.connex.sync()

require('./app/routes/travel.route')(app)

app.use(cors(corsOption))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended:true }))
//test
app.get('/', (req, res) => {
    res.json({message: 'Bienvenu dans notre agence 🌼🌹🌺'})
})

const PORT =  8080
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
})