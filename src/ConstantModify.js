var AbstractModify = require('./AbstractModify');
var gen = require('./gen');
var homunculus = require('homunculus');
var Token = homunculus.getClass('token', 'js');

var ConstantModify = AbstractModify.extend(function(original, token) {
  AbstractModify.call(this, original);
  this.token = token;
}).methods({
  gen: function() {
    var repl;
    if(this.token.type() == Token.STRING) {
      repl = gen.getAnbuString(this.token.val(), this.original);
    }
    else if(this.token.type() == Token.NUMBER) {
      repl = gen.getNumber(this.token.content(), this.original);
    }
    return repl;
  }
});

module.exports = ConstantModify;