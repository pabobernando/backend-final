// var express = require('express');
// var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// module.exports = router;

exports.routesConfig = (app) => {
  app.get('/', function (req, res, next) {
    res.render('index', { title: 'Game Web' });
  });
};
