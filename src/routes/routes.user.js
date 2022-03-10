const userController = require('../controllers/controller.user');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({ usernameField: 'email' }, userController.localStrategy));

exports.routesConfig = function (app) {
  // get profile
  app.get('/userGames/me', userController.me);
  // post Logout
  app.post('/userGames/logout', userController.logout);
  // get all User
  app.get('/userGames', userController.showAllUser);
  // get detail user
  app.get('/userGames/:id', userController.showDetailUser);
  // add user or register
  app.post('/userGames/add', userController.addUser);
  // login user
  app.post('/userGames/login', userController.login);
  // delete user
  app.delete('/userGames/delete/:id', userController.destroyUser);
  // update user
  app.patch('/userGames/update/:id', userController.updateUSer);
};
