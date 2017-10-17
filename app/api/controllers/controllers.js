const fs = require('fs')
const jwt = require('jsonwebtoken')
const User = require('../../models/user')
const config = require('../../../config')
const userData = require('../../../userData.json')

exports.signup = (req, res) => {
  const newUser = new User(req.body.username, req.body.password, false)

  fs.writeFile('userData.json', JSON.stringify(newUser), err => {
    res.send(
      err
      ? { success: false, message: err }
      : { success: true, message: newUser.name, redirect: '/sucess.html' }
    )
  })
}

exports.login = (req, res) => {
  let token = null

  if(req.body.username && req.body.password) {
    if(req.body.username === userData.name && req.body.password === userData.password) {
      token = jwt.sign({ admin: false }, config.secret, { expiresIn: '1m' })
    }
  }
  res.json(
    token
      ? { success: true, message: 'success', token: token, redirect: '/home.html' }
      : { success: false, message: 'error', token: token }
  )
}