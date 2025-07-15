// crypto-loader.mjs
import crypto from 'crypto';
import { URL } from 'url';
import { readFileSync } from 'fs';

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

// Make crypto global
globalThis.crypto = crypto;

// Custom loader hook
export function resolve(specifier, context, nextResolve) {
  return nextResolve(specifier, context);
}

export function load(url, context, nextLoad) {
  return nextLoad(url, context);
}
