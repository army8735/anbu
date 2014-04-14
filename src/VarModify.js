var AbstractModify = require('./AbstractModify');
var gen = require('./gen');

var VarModify = AbstractModify.extend(function(original, vardecl) {
  AbstractModify.call(this, original);
  this.vardecl = vardecl;
}).methods({
    gen: function(code) {
      var start = this.start();
      var end = this.end();
      var repl = 'this[' + gen.getAnbuString(this.vardecl.leaves()[0].token().content(), this.original) + ']';
      return code.slice(0, start) + repl + code.slice(end);
    },
    start: function() {
      return this.vardecl.prev().token().sIndex();
    },
    end: function() {
      var name = this.vardecl.leaves()[0].token();
      return name.sIndex() + name.content().length;
    }
  });

module.exports = VarModify;