(function(global) {
  'use strict';

  if (!global.require) {
    throw new Error('It seems require.js is not loaded in your global scope.');
  }

  /* Based on the code found in: https://coderwall.com/p/teiyew */
  global.require.contextualized = function newContext(fakes) {
    fakes = fakes || {};

    var fakeMap = {};
    Object.getOwnPropertyNames(fakes).forEach(function(moduleToFake) {
      var fakeName = 'fake_' + moduleToFake;
      define(fakeName, function() { return fakes[moduleToFake]; });
      fakeMap[moduleToFake] = fakeName;
    });

    var contextualizedRequire = require.config({
      context: 'context_' + Date.now() + '_' + Math.random(),
      map: {
        "*": fakeMap
      }
    });

    return contextualizedRequire;
  };

}(this));
