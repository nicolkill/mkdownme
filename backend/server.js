const express = require('./config/express');
const mongoose = require('./config/mongoose');
const configs = require('./config/configs');

Object.defineProperty(global, '__stack', {
  get() {
    const orig = Error.prepareStackTrace;
    Error.prepareStackTrace = (_, stack) => stack;
    const err = new Error();
    Error.captureStackTrace(err, arguments.callee);
    const { stack } = err;
    Error.prepareStackTrace = orig;
    return stack;
  },
});

Object.defineProperty(global, '__line', {
  get() {
    return __stack[1].getLineNumber();
  },
});

Object.defineProperty(global, '__function', {
  get() {
    return __stack[1].getFunctionName();
  },
});

process.env.NODE_ENV = process.env.NODE_ENV || 'development';


(async () => {
  mongoose();
  const app = express();
  app.listen(configs.Environment.PORT);
  module.exports = app;
  console.log(`Server running at ${configs.Environment.PORT}`);
})();
