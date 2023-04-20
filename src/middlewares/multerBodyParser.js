const logger = require('../config/logger');

const multerBodyParser = () => {
  return function (req, res, next) {
    req.body = req.body.data ? JSON.parse(req.body.data) : {};
    return next();
  };
};

/**
 * Set the timeout for request
 * https://stackoverflow.com/questions/45910084/ajax-neterr-empty-response-after-waiting-for-response-for-2-mins-node-js-ser
 * @param timeout
 * @returns {*}
 */
const setExpressRequestTimeout = (timeout) => {
  return function (req, res, next) {
    req.setTimeout(timeout);
    next();
  };
};

module.exports = {
  multerBodyParser,
  setExpressRequestTimeout,
};
