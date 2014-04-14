var AbstractModify = require('./AbstractModify');
var gen = require('./gen');

var hash = Object.create(null);

var PropertyModify = AbstractModify.extend(function(original, dot, propety) {
  AbstractModify.call(this, original);
  this.dot = dot;
  this.propety = propety;
  //可能会重复，如：a[0].p()
  this.confilct = !!hash[this.start()];
  hash[this.start()] = true;
}).methods({
  gen: function(code) {
    //重复情况下直接返回
    if(this.confilct) {
      return code;
    }
    var start = this.start();
    var end = this.end();
    var repl = gen.getAnbuString(this.propety.content(), this.original);
    return code.slice(0, start) + '[' + repl + ']' + code.slice(end);
  },
  start: function() {
    return this.dot.sIndex();
  },
  end: function() {
    return this.propety.sIndex() + this.propety.content().length;
  }
}).statics({
  init: function() {
    hash = Object.create(null);
  }
});

module.exports = PropertyModify;