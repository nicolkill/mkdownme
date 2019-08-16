const express = require('express');
const bodyParser = require('body-parser');
const async = require('async');
const { Router } = require('./router');
const logger = require('./logger');

const app = express();

function parallel(middlewares) {
  return function (req, res, next) {
    async.each(middlewares, (mw, cb) => {
      mw(req, res, cb);
    }, next);
  };
}

module.exports = function () {
  app.use((req, res, next) => {
    const now = Date.now();

    const chunks = [];
    const oldWrite = res.write;
    const oldEnd = res.end;

    res.write = function (chunk) {
      chunks.push(chunk);

      oldWrite.apply(res, arguments);
    };

    res.end = function (chunk) {
      if (chunk) {
        chunks.push(chunk);
      }

      let body = '{}';
      const contentType = res.getHeader('content-type');
      if (contentType && contentType.indexOf('application/json') >= 0 && chunks.length > 0) {
        body = Buffer.isBuffer(chunks[0]) ? Buffer.concat(chunks).toString('utf8') : chunks[0];
      }

      try {
        body = JSON.parse(body);
      } catch (error) {
        logger.error({
          body,
          error: error.message,
          stack: error.stack,
        });
        body = {};
      }

      logger.info({
        method: req.method,
        path: req.path,
        status: res.statusCode,
        duration: (Date.now() - now) / 1000,
        request: req.body,
        response: body,
      });

      oldEnd.apply(res, arguments);
    };

    next();
  });

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', process.env.ACCESS_CONTROL_ALLOW_ORIGIN);
    res.header('Access-Control-Allow-Credentials', process.env.ACCESS_CONTROL_ALLOW_CREDENTIALS);
    res.header('Access-Control-Expose-Headers', process.env.ACCESS_CONTROL_EXPOSE_HEADERS);
    res.header('Access-Control-Allow-Headers', process.env.ACCESS_CONTROL_ALLOW_HEADERS);
    next();
  });

  app.use(parallel([
    bodyParser.json({ limit: '50mb' }),
    bodyParser.urlencoded({ limit: '50mb', extended: true }),
  ]));

  const router = Router();

  router.route('*').get((req, res) => {
    res.status(404);
    res.send();
  });

  app.use('/', router);

  return app;
};
