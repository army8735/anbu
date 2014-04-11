var AbstractModify = require('./AbstractModify');
var gen = require('./gen');
var homunculus = require('homunculus');
var Token = homunculus.getClass('token');

var ConstantModify = AbstractModify.extend(function(original, token) {
  AbstractModify.call(this, original);
  this.token = token;
}).methods({
  gen: function(code) {
    var start = this.start();
    var end = this.end();
    var repl;
    if(this.token.type() == Token.STRING) {
      repl = gen.getString(this.token.content(), true);
    }
    else if(this.token.type() == Token.NUMBER) {
      repl = gen.getNumber(this.token.content(), this.original);
    }
    return code.slice(0, start) + repl + code.slice(end);
  },
  start: function() {
    return this.token.sIndex();
  },
  end: function() {
    return this.start() + this.token.content().length;
  }
});

module.exports = ConstantModify;