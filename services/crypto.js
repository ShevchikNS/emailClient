const crypto = require('crypto');

const config = require('../config/config.json');

const encrypt = (text) => {
  const cipher = crypto.createCipher(config.crypto.algorithm, config.crypto.password);
  let crypted = cipher.update(text, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
};

const decrypt = (text) => {
  const decipher = crypto.createDecipher(config.crypto.algorithm, config.crypto.password);
  let dec = decipher.update(text, 'hex', 'utf8');
  dec += decipher.final('utf8');
  return dec;
};

module.exports = {
  encrypt,
  decrypt,
};
