var AbstractModify = require('./AbstractModify');
var gen = require('./gen');

var VarModify = AbstractModify.extend(function(original, vardecl) {
  AbstractModify.call(this, original);
  this.vardecl = vardecl;
}).methods({
  gen: function() {
    var repl = 'this[' + gen.getAnbuString(this.vardecl.leaves()[0].token().content(), this.original) + ']';
    //未赋值的需要赋值undefined
    if(this.vardecl.leaves().length == 1) {
      repl += '=[][1]';
    }
    return repl;
  }
});

module.exports = VarModify;