const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./app/api/routes/routes')
//const jwt = require('jsonwebtoken')
const config = require('./config')
const User = require('./app/models/user')

//set up the express server
const server = express()

const port = process.env.PORT || 5000

// use body parser so we can get info from POST and/or URL parameters
server.use(bodyParser.urlencoded({ extended: false }))
server.use(bodyParser.json())
//server public files
server.use(express.static('app/public'))

routes(server)

server.get('/login', (req,res) => {
  res.sendFile(__dirname + '/app/public/login.html')
})

server.get('/signup', (req,res) => {
  res.sendFile(__dirname + '/app/public/signup.html')
})

server.listen(port)
console.log(`Listen on port ${port}`)