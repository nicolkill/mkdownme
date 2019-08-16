const express = require('express');
const logger = require('./logger');

const {
  BadRequestError,
  AuthorizationError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
  UnprocessableEntityError,
  InternalServerError,
} = require('./errors');

const handleError = (err, res) => {
  switch (err.constructor) {
    case BadRequestError:
      res.status(400);
      res.json(err.toJSON());
      break;
    case AuthorizationError:
      res.status(401);
      res.json(err.toJSON());
      break;
    case ForbiddenError:
      res.status(403);
      res.json(err.toJSON());
      break;
    case NotFoundError:
      res.status(404);
      res.json(err.toJSON());
      break;
    case ConflictError:
      res.status(409);
      res.json(err.toJSON());
      break;
    case UnprocessableEntityError:
      res.status(422);
      res.json(err.toJSON());
      break;
    default:
      logger.error({
        function: __function,
        line: __line,
        file: __filename,
        error: err.message,
        stack: err.stack,
      });
      res.status(500);
      res.json((new InternalServerError()).toJSON());
      break;
  }
};

const wrapRequest = (req) => {
  req.body = req.body || {};
  req.query = req.query || {};
  req.params = req.params || {};
  return req;
};

const wrapResponse = (res) => {
  res.success = (body = null, status = 200) => {
    res.status(status);
    if (body) {
      res.json(body);
    } else {
      res.end();
    }
  };

  res.created = (body = null) => {
    res.success(body, 201);
  };

  res.accepted = (body = null) => {
    res.success(body, 202);
  };

  res.noContent = (body = null) => {
    res.success(body, 204);
  };

  return res;
};

const asyncHandlers = handlers => async (req, res) => {
  req = wrapRequest(req);
  res = wrapResponse(res);
  try {
    for (let i = 0; i < handlers.length; i += 1) {
      await handlers[i](req, res);
    }
  } catch (err) {
    handleError(err, res);
  }
};

const Router = () => {
  const router = express.Router();
  ['get', 'post', 'put', 'patch', 'delete'].forEach((name) => {
    const method = router[name];
    router[name] = function (path, ...handlers) {
      method.call(router, path, asyncHandlers(handlers));
    };
  });
  return router;
};


module.exports = { Router };
