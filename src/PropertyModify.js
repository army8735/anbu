var AbstractModify = require('./AbstractModify');
var gen = require('./gen');

var PropertyModify = AbstractModify.extend(function(original, dot, propety) {
  AbstractModify.call(this, original);
  this.dot = dot;
  this.propety = propety;
}).methods({
  gen: function(code) {
    var start = this.start();
    var end = this.end();
    var repl = gen.getString(this.propety.content(), this.original);
    return code.slice(0, start) + '[' + repl + ']' + code.slice(end);
  },
  start: function() {
    return this.dot.sIndex();
  },
  end: function() {
    return this.propety.sIndex() + this.propety.content().length;
  }
});

module.exports = PropertyModify;