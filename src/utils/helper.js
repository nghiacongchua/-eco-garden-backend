const fs = require('fs');
const execa = require('execa');
const logger = require('../config/logger');


const getCurrentDateString = (separator = '-') => {
  const currentDate = new Date();
  const dateValues = [currentDate.getDate(), currentDate.getMonth() + 1, currentDate.getFullYear()];
  return dateValues.join(separator);
}

const mkDir = (_path) => {
  if (!_path) {
    return true;
  }
  try {
    if (!fs.existsSync(_path)) {
      execa.commandSync(`mkdir -p ${_path}`);
    }
    return true;
  } catch (error) {
    logger.error('mkdir error:');
    logger.error(error);
    throw error;
  }
}

module.exports = {
  getCurrentDateString,
  mkDir,
}