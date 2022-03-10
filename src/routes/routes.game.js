const gameController = require('../controllers/controller.game');

exports.routesConfig = function (app) {
  // get all game
  app.get('/games', gameController.showAllGame);
  // get detail game
  app.get('/games/:id', gameController.showDetailGame);
  // add game
  app.post('/games/add', gameController.addGame);
  // delete game
  app.delete('/games/delete/:id', gameController.destroyGame);
  // udpdate game
  app.patch('/games/update/:id', gameController.updateGame);
};
