// crypto-polyfill.js
import crypto from 'crypto';

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

export default crypto;
