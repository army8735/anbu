var gen = require('./src/gen');

var homunculus = require('homunculus');

exports.encrypt = function(code) {
  var context = homunculus.getClass('js');
  context.parse(code);
  return code;
};