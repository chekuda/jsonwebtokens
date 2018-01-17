const fs = require('fs')
const jwt = require('jsonwebtoken')
const User = require('../../models/user')
const config = require('../../../config')
const userData = require('../../../userData.json')

exports.signup = (req, res) => {
  const newUser = new User(req.body.username, req.body.password, false)

  fs.writeFile('userData.json', JSON.stringify(newUser), err => {
    if(err) res.status(401).send({success: false, msg: 'Couldnt save the user, try again'})

    token = jwt.sign({ admin: false }, config.secret, { expiresIn: '2m' })

    if(!token) {
      res.status(401).send({success: false, msg: 'Couldnt create token'})
    }

    res.json({ success: true, message: 'success', token: token, redirect: '/home.html' })
  })
}

exports.login = (req, res) => {
  let token = null

  if(req.body.username && req.body.password) {
    if(req.body.username === userData.name && req.body.password === userData.password) {
      token = jwt.sign({ admin: false }, config.secret, { expiresIn: '2m' })

      if(!token) {
        res.status(401).send({success: false, msg: 'No couldnt create token'})
      }
    }
  }
  res.json({ success: true, message: 'success', token: token, redirect: '/home.html' })
}

exports.testToken = (req, res) => {
  if(!req.headers.authentication){
    res.status(401).send({success: false, msg: 'No Authentication header'})
  }
  const token = req.headers.authentication.split('Bearer ')[1]

  jwt.verify(token, config.secret, (err, decoded) => {
    if(err) {
      res.status(401).send({success: false, msg: 'No Valid Token'})
    } else {
      console.log(decoded)
      res.json({ success: true, msg: 'TOKEN VALID' })
    }
  })
}