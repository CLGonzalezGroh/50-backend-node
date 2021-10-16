const boom = require('@hapi/boom');

function checkApiKeys(req, res, next) {
  const apiKey = req.headers['api'];
  if (apiKey === '123') {
    next();
  } else {
    next(boom.unauthorized());
  }
}

module.exports = checkApiKeys;
