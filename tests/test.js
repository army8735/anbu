var anbu = require('../');
var gen = require('../src/gen');

var expect = require('expect.js');
var fs = require('fs');
var path = require('path');

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
        //()[]形式
        expect(/^\(.+\)\[.+\]$/.test(res)).to.be.ok();
        expect(eval(res)).to.eql(c);
      });
    });
    it('ABCDEFIJLRSTU should return with getNumber and toUpperCase', function() {
      'ABCDEFIJLRSTU'.split('').forEach(function(c) {
        var res = gen.getString(c, true);
        //(()[])[toUpperCase]()形式
        expect(/^\(\(.+\)\[.+\]\)\[.+Upp.+\]\(\)$/.test(res)).to.be.ok();
        expect(eval(res)).to.eql(c);
      });
    });
    it('other should return director', function() {
      'abcdefghijklmnopqrstuvwxyz_$ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach(function(c) {
        if(!inNumber[c] && !inNumber[c.toLowerCase()]) {
          var res = gen.getString(c, true);
          expect(res).to.eql("'" + c + "'");
        }
      });
    });
    it('other series should return together', function() {
      var res = gen.getString('xyz', true);
      expect(res).to.eql('\'xyz\'');
    });
  });
  describe('gen#PRECODE exec', function() {
    before(function() {
//      console.log(gen.PRECODE);
      eval(gen.PRECODE);
    });
    it('String.prototype[-1] should be a function', function() {
      expect(typeof String.prototype[-1]).to.eql('function');
    });
    it('should return a', function() {
      expect('abc'[-1](0)).to.eql('a');
    });
    it('String.prototype[-2] should be a function', function() {
      expect(typeof String.prototype[-2]).to.eql('function');
    });
    it('should return A', function() {
      expect('a'[-2]()).to.eql('A');
    });
    it('String.prototype[-3] should be a function', function() {
      expect(typeof String.prototype[-3]).to.eql('function');
    });
    it('should return a', function() {
      expect(''[-3](97)).to.eql('a');
    });
    after(function() {
      delete String.prototype[-1];
      delete String.prototype[-2];
      delete String.prototype[-3];
    });
  });
  describe('gen#getString(s:String, false)', function() {
    before(function() {
      eval(gen.PRECODE);
    });
    it('abcdefijlnorstuON should return getNumber', function() {
      'abcdefijlnorstuON'.split('').forEach(function(c) {
        var res = gen.getString(c);
        //()[]形式
        expect(/^\(.+\)\[.+\]$/.test(res)).to.be.ok();
        expect(eval(res)).to.eql(c);
      });
    });
    it('ABCDEFIJLRSTU should return with getNumber and String.prototype[-2]', function() {
      'ABCDEFIJLRSTU'.split('').forEach(function(c) {
        var res = gen.getString(c);
        //(()[])[]()形式
        expect(/^\(\(.+\)\[.+\]\)\[.+\]\(\)$/.test(res)).to.be.ok();
        expect(eval(res)).to.eql(c);
      });
    });
    it('other should return fromCharCode', function() {
      'abcdefghijklmnopqrstuvwxyz_$ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach(function(c) {
        if(!inNumber[c] && !inNumber[c.toLowerCase()]) {
          var res = gen.getString(c);
          expect(/^''\[.+\]\(.+\)/.test(res)).to.be.ok();
          expect(eval(res)).to.eql(c);
        }
      });
    });
    after(function() {
      delete String.prototype[-1];
      delete String.prototype[-2];
      delete String.prototype[-3];
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
      expect(eval(res)).to.eql(s.slice(1, -1));
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
  });
});
describe.only('jslib tests', function() {
  describe('seajs', function() {
    var s = fs.readFileSync(path.join(__dirname, './lib/sea-debug.js'), { encoding: 'utf-8' });
    it('use orginal', function() {
      var res = anbu.encrypt(s, true);
      fs.writeFileSync(path.join(__dirname, './lib/sea-debug-encrypt.js'), res, { encoding: 'utf-8' });
      expect(res).to.not.eql(s);
    });
    it('not use orginal', function() {
      var s = fs.readFileSync(path.join(__dirname, './lib/sea-debug.js'), { encoding: 'utf-8' });
      var res = anbu.encrypt(s);
      fs.writeFileSync(path.join(__dirname, './lib/sea-debug-encrypt-plus.js'), res, { encoding: 'utf-8' });
      expect(res).to.not.eql(s);
    });
    after(function() {
      delete this.seajs;
    });
  });
});