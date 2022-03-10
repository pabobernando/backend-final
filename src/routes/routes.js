const indexRouter = require('./routes.index');
const userRouter = require('./routes.user');
const gameRouter = require('./routes.game');

exports.routesConfig = function (app) {
  indexRouter.routesConfig(app);
  userRouter.routesConfig(app);
  gameRouter.routesConfig(app);
};
