var express = require('express');
var mw = require('../../index');

module.exports = function createAppWithMiddlewares (middleware) {
  var app = express();
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(middleware);
  app.use(app.router);
  // app.use(express.errorHandler());
  app.use(errorHandler);
  app.all('/', sendBody);
  return app;
};

function errorHandler (err, req, res, next) {
  res.json(500, {
    message: err.message
  });
}
function sendBody (req, res, next) {
  res.json(req.body);
}