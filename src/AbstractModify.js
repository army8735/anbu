var Class = require('../util/Class');

var AbstractModify = Class(function(original) {
  this.original = original || false;
}).methods({
  gen: function(code) {
    throw new Error('#gen muse be implemented')
  },
  length: function() {
    return 0;
  }
});

module.exports = AbstractModify;