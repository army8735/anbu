var gen = require('./src/gen');

var homunculus = require('homunculus');

exports.encrypt = function(code) {
  var context = homunculus.getClass('js');
  context.parse(code);
  var ast = context.parser.ast();
  return code;
};