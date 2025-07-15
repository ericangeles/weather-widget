// crypto-polyfill.js
const crypto = require('crypto');

// Polyfill for crypto.getRandomValues
if (!crypto.getRandomValues) {
  crypto.getRandomValues = function(array) {
    return crypto.randomFillSync(array);
  };
}

// Polyfill for crypto.hash if needed
if (!crypto.hash) {
  crypto.hash = function(algorithm, data) {
    return crypto.createHash(algorithm).update(data).digest();
  };
}

module.exports = crypto;
