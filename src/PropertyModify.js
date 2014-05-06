var AbstractModify = require('./AbstractModify');
var gen = require('./gen');

var PropertyModify = AbstractModify.extend(function(original, propety) {
  AbstractModify.call(this, original);
  this.propety = propety;
}).methods({
  gen: function() {
    var repl = gen.getAnbuString(this.propety.content(), this.original);
    return '[' + repl + ']';
  },
  length: function() {
    return 1;
  }
});

module.exports = PropertyModify;