var page = require('webpage').create();
var system = require('system');
var address = system.args[1];
var js = system.args[2];
var run = system.args[3];

page.onConsoleMessage = function(msg) {
  console.log(msg);
  phantom.exit(0);
};
page.open(address + '?' + js, function(status) {
  if (status !== 'success') {
    console.error(status, address);
  }
  else {
    var res = page.evaluate(function(v) {
      return this[v].toString();
    }, run);
    console.log(res);
    phantom.exit();
  }
});