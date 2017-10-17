const controllers = require('../controllers/controllers')

module.exports = app => {
  app.route('/api/signup')
    .post(controllers.signup)
  app.route('/api/login')
    .post(controllers.login)
}