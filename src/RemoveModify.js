var AbstractModify = require('./AbstractModify');

var RemoveModify = AbstractModify.extend(function() {
  AbstractModify.call(this);
}).methods({
  gen: function() {
    return '';
  }
});

module.exports = RemoveModify;