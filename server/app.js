if (process.env.NODE_ENV == 'development' || process.env.NODE_ENV == 'test'){
    require("dotenv").config()
}
const express = require("express")
const routes = require("./routes")
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const errorHandler = require('./helpers/error-handler.js')

let local = 'mongodb://localhost/e-commerce-' + process.env.NODE_ENV 

mongoose.connect(local, {useNewUrlParser: true})

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())
app.use("/", routes)
app.use(errorHandler)

const PORT = process.env.PORT|| 3000
app.listen(PORT, ()=> {
    console.log(`connected to localhost ${PORT}`)
})

module.exports = app