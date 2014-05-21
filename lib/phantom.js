var page = require('webpage').create();
var system = require('system');
var address = system.args[1];

page.onConsoleMessage = function(msg) {
  console.log(msg);
  phantom.exit(0);
};
page.open(address, function(status) {
  if (status !== 'success') {
    console.error(status, address);
  }
});