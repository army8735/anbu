var anbu = require('../');
var gen = require('../src/gen');

var expect = require('expect.js');
var fs = require('fs');
var path = require('path');
var childProcess = require('child_process');
var phantomjs = require('phantomjs');

var inNumber = Object.create(null);
'abcdefijlnorstuNO0123456789'.split('').forEach(function(c) {
  inNumber[c] = true;
});

describe('api tests', function() {
  describe('gen#getNumber', function() {
    it('Postive should be right', function() {
      for(var i = 0; i < 1025; i++) {
        var s = gen.getNumber(i);
        expect(eval(s)).to.eql(i);
      }
    });
    it('Negative number should be right', function() {
      for(var i = 0; i > -1025; i--) {
        var s = gen.getNumber(i);
        expect(eval(s)).to.eql(i);
      }
    });
  });
  describe('gen#getString(s:String, true)', function() {
    it('abcdefijlnorstuNO should return with getNumber', function() {
      'abcdefijlnorstuNO'.split('').forEach(function(c) {
        var res = gen.getString(c, true);
        expect(eval(res)).to.eql(c);
      });
    });
    it('ABCDEFIJLRSTU should return with getNumber and toUpperCase', function() {
      'ABCDEFIJLRSTU'.split('').forEach(function(c) {
        var res = gen.getString(c, true);
        expect(eval(res)).to.eql(c);
      });
    });
    it('other should return director', function() {
      'abcdefghijklmnopqrstuvwxyz_$ABCDEFGHIJKLMNOPQRSTUVWXYZ\\\n\u0000'.split('').forEach(function(c) {
        if(!inNumber[c] && !inNumber[c.toLowerCase()]) {
          var res = gen.getString(c, true);
          expect(res).to.eql("'" + c + "'");
        }
      });
    });
    it('other series should return together', function() {
      var res = gen.getString('xyz', true);
      expect(res).to.eql('(\'xyz\')');
    });
  });
  describe('gen#PRECODE exec', function() {
    before(function() {
      eval(gen.PRE_CODE);
    });
    it('String.prototype[00] should be String', function() {
      expect(String.prototype['00']).to.eql(String);
    });
    it('String.prototype[01] should return String.prototype', function() {
      expect(String.prototype['01']).to.eql(String.prototype);
    });
    it('String.prototype[02] should be String.charAt', function() {
      expect(String.prototype['02']).to.eql(''.charAt);
    });
    it('String.prototype[03] should be String.toUpperCase', function() {
      expect(String.prototype['03']).to.eql(''.toUpperCase);
    });
    it('String.prototype[04] should be String.fromCharCode', function() {
      expect(String.prototype['04']).to.eql(String.fromCharCode);
    });
    after(function() {
      delete String.prototype[00];
      delete String.prototype[01];
      delete String.prototype[02];
      delete String.prototype[03];
      delete String.prototype[04];
    });
  });
  describe('gen#getString(s:String, false)', function() {
    before(function() {
      eval(gen.PRE_CODE);
    });
    it('abcdefijlnorstuON should return getNumber', function() {
      'abcdefijlnorstuON'.split('').forEach(function(c) {
        var res = gen.getString(c);
        expect(eval(res)).to.eql(c);
      });
    });
    it('ABCDEFIJLRSTU should return with getNumber and String.prototype[03]', function() {
      'ABCDEFIJLRSTU'.split('').forEach(function(c) {
        var res = gen.getString(c);
        expect(eval(res)).to.eql(c);
      });
    });
    it('other should return fromCharCode', function() {
      'abcdefghijklmnopqrstuvwxyz_$ABCDEFGHIJKLMNOPQRSTUVWXYZ\\\n\u0000'.split('').forEach(function(c) {
        if(!inNumber[c] && !inNumber[c.toLowerCase()]) {
          var res = gen.getString(c);
          expect(eval(res)).to.eql(c);
        }
      });
    });
    after(function() {
      delete String.prototype[00];
      delete String.prototype[01];
      delete String.prototype[02];
      delete String.prototype[03];
      delete String.prototype[04];
    });
  });
});
describe('simple tests', function() {
  describe('use orginal', function() {
    it('encrypt number', function() {
      var s = '123';
      var res = anbu.encrypt(s, true);
      expect(res).to.not.eql(s);
      expect(eval(res)).to.eql(123);
    });
    it('encrypt string', function() {
      var s = '"This is a string."';
      var res = anbu.encrypt(s, true);
      expect(res).to.not.eql(s);
      expect(eval(res)).to.eql("This is a string.");
    });
    it('encrypt quote', function() {
      var s = '"=\'"';
      var res = anbu.encrypt(s, true);
      expect(res).to.not.eql(s);
      expect(eval(res)).to.eql("='");
    });
    it('encrypt unicode string', function() {
      var s = '"\\n"';
      var res = anbu.encrypt(s, true);
      expect(res).to.not.eql(s);
      expect(eval(res)).to.eql("\n");
    });
    it('encrypt unicode string 2', function() {
      var s = '"\\\\["';
      var res = anbu.encrypt(s, true);
      expect(res).to.not.eql(s);
      expect(eval(res)).to.eql("\\[");
    });
    it('encrypt number in string', function() {
      var s = '"1234567890"';
      var res = anbu.encrypt(s, true);
      expect(res).to.not.eql(s);
      expect(eval(res)).to.eql(s.slice(1, -1));
    });
    it('encrypt json', function() {
      var s = '{version:"2.3.0"}';
      var res = anbu.encrypt(s, true);
      expect(res).to.not.eql(s);
      expect(eval(res)).to.eql(eval(s));
    });
    it('encrypt .property', function() {
      var s = 'Object.alert = function(){return 1}';
      var res = anbu.encrypt(s, true);
      expect(res).to.not.eql(s);
      eval(res);
      expect(Object.alert()).to.eql(1);
      after(function() {
        delete Object.alert;
      });
    });
    it('encrypt global var', function() {
      var s = 'var a = 1';
      var res = anbu.encrypt(s, true);
      expect(res).to.not.eql(s);
      eval(res);
      expect(this.a).to.eql(1);
      after(function() {
        delete this.a;
      });
    });
    it('encrypt multi-global var', function() {
      var s = 'var a = 1, b, c = 2';
      var res = anbu.encrypt(s, true);
      expect(res).to.not.eql(s);
      eval(res);
      expect(this.a).to.eql(1);
      expect(this.b).to.eql(undefined);
      expect(this.c).to.eql(2);
      after(function() {
        delete this.a;
        delete this.b;
        delete this.c;
      });
    });
  });
  describe('not use orginal', function() {
    it('encrypt number', function() {
      var s = '123';
      var res = anbu.encrypt(s);
      expect(res).to.not.eql(s);
      expect(eval(res)).to.eql(123);
    });
    it('encrypt string', function() {
      var s = '"This is a string."';
      var res = anbu.encrypt(s);
      expect(res).to.not.eql(s);
      expect(eval(res)).to.eql(s.slice(1, -1));
    });
    it('encrypt unicode string', function() {
      var s = '"\\n"';
      var res = anbu.encrypt(s);
      expect(res).to.not.eql(s);
      expect(eval(res)).to.eql("\n");
    });
    it('encrypt unicode string 2', function() {
      var s = '"\\\\["';
      var res = anbu.encrypt(s);
      expect(res).to.not.eql(s);
      expect(eval(res)).to.eql("\\[");
    });
    it('encrypt .property', function() {
      var s = 'Object.alert = function(){return 1}';
      var res = anbu.encrypt(s);
      expect(res).to.not.eql(s);
      eval(res);
      expect(Object.alert()).to.eql(1);
      after(function() {
        delete Object.alert;
      });
    });
    it('encrypt global var', function() {
      var s = 'var a = 1';
      var res = anbu.encrypt(s, true);
      expect(res).to.not.eql(s);
      eval(res);
      expect(this.a).to.eql(1);
      after(function() {
        delete this.a;
      });
    });
    it('encrypt multi-global var', function() {
      var s = 'var a = 1, b, c = 2';
      var res = anbu.encrypt(s);
      expect(res).to.not.eql(s);
      eval(res);
      expect(this.a).to.eql(1);
      expect(this.b).to.eql(undefined);
      expect(this.c).to.eql(2);
      after(function() {
        delete this.a;
        delete this.b;
        delete this.c;
      });
    });
    after(function() {
      delete String.prototype[00];
      delete String.prototype[01];
      delete String.prototype[02];
      delete String.prototype[03];
      delete String.prototype[04];
    });
  });
});
describe('jslib tests', function() {
  var dist = path.join(__dirname, './dist');
  if(!fs.existsSync(dist)) {
    fs.mkdirSync(dist);
  }
  this.timeout(10000);
  describe('seajs-debug', function() {
    var s = fs.readFileSync(path.join(__dirname, './lib/sea-debug.js'), { encoding: 'utf-8' });
    it('use orginal', function() {
      var res = anbu.encrypt(s, true);
      fs.writeFileSync(path.join(__dirname, './dist/sea-debug-encrypt.js'), res, { encoding: 'utf-8' });
      expect(res).to.not.eql(s);
    });
    it('not use orginal', function() {
      var s = fs.readFileSync(path.join(__dirname, './lib/sea-debug.js'), { encoding: 'utf-8' });
      var res = anbu.encrypt(s);
      fs.writeFileSync(path.join(__dirname, './dist/sea-debug-encrypt-plus.js'), res, { encoding: 'utf-8' });
      expect(res).to.not.eql(s);
    });
  });
  describe('seajs', function() {
    var s = fs.readFileSync(path.join(__dirname, './lib/sea.js'), { encoding: 'utf-8' });
    it('use orginal', function() {
      var res = anbu.encrypt(s, true);
      fs.writeFileSync(path.join(__dirname, './dist/sea-encrypt.js'), res, { encoding: 'utf-8' });
      expect(res).to.not.eql(s);
    });
    it('not use orginal', function() {
      var s = fs.readFileSync(path.join(__dirname, './lib/sea.js'), { encoding: 'utf-8' });
      var res = anbu.encrypt(s);
      fs.writeFileSync(path.join(__dirname, './dist/sea-encrypt-plus.js'), res, { encoding: 'utf-8' });
      expect(res).to.not.eql(s);
    });
  });
  describe('jquery', function() {
    var s = fs.readFileSync(path.join(__dirname, './lib/jquery.js'), { encoding: 'utf-8' });
    it('use orginal', function(done) {
      var res = anbu.encrypt(s, true);
      fs.writeFileSync(path.join(__dirname, './dist/jquery-encrypt.js'), res, { encoding: 'utf-8' });
      expect(res).to.not.eql(s);
      var runner = childProcess.spawn('phantomjs', [path.join(__dirname, '../lib/phantom.js'), 'tests/jquery-encrypt.html']);
      runner.stdout.on('data', function(data) {
        expect(data.toString()).to.contain('function (selector, context)');
      });
      runner.stderr.on('data', function(data) {
        throw new Error(data.toString());
      });
      runner.on('close', function() {
        done();
      });
    });
    it('not use orginal', function(done) {
      var s = fs.readFileSync(path.join(__dirname, './lib/jquery.js'), { encoding: 'utf-8' });
      var res = anbu.encrypt(s);
      fs.writeFileSync(path.join(__dirname, './dist/jquery-encrypt-plus.js'), res, { encoding: 'utf-8' });
      expect(res).to.not.eql(s);
      var runner = childProcess.spawn('phantomjs', [path.join(__dirname, '../lib/phantom.js'), 'tests/jquery-encrypt-plus.html']);
      runner.stdout.on('data', function(data) {
        expect(data.toString()).to.contain('function (selector, context)');
      });
      runner.stderr.on('data', function(data) {
        throw new Error(data.toString());
      });
      runner.on('close', function() {
        done();
      });
    });
  });
  describe('jquery-min', function() {
    var s = fs.readFileSync(path.join(__dirname, './lib/jquery-min.js'), { encoding: 'utf-8' });
    it('use orginal', function(done) {
      var res = anbu.encrypt(s, true);
      fs.writeFileSync(path.join(__dirname, './dist/jquery-min-encrypt.js'), res, { encoding: 'utf-8' });
      expect(res).to.not.eql(s);
      var runner = childProcess.spawn('phantomjs', [path.join(__dirname, '../lib/phantom.js'), 'tests/jquery-min-encrypt.html']);
      runner.stdout.on('data', function(data) {
        expect(data.toString()).to.contain('function (');
      });
      runner.stderr.on('data', function(data) {
        throw new Error(data.toString());
      });
      runner.on('close', function() {
        done();
      });
    });
    it('not use orginal', function(done) {
      var s = fs.readFileSync(path.join(__dirname, './lib/jquery-min.js'), { encoding: 'utf-8' });
      var res = anbu.encrypt(s);
      fs.writeFileSync(path.join(__dirname, './dist/jquery-min-encrypt-plus.js'), res, { encoding: 'utf-8' });
      expect(res).to.not.eql(s);
      var runner = childProcess.spawn('phantomjs', [path.join(__dirname, '../lib/phantom.js'), 'tests/jquery-min-encrypt-plus.html']);
      runner.stdout.on('data', function(data) {
        expect(data.toString()).to.contain('function (');
      });
      runner.stderr.on('data', function(data) {
        throw new Error(data.toString());
      });
      runner.on('close', function() {
        done();
      });
    });
  });
});