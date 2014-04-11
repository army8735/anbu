var Class = require('../util/Class');

var AbstractModify = Class(function(original) {
  this.original = original || false;
}).methods({
  gen: function(code) {
    throw new Error('#gen muse be implemented')
  },
  start: function() {
    throw new Error('#start muse be implemented')
  },
  end: function() {
    throw new Error('#end muse be implemented')
  }
});

module.exports = AbstractModify;