var anbu = require('../');
var gen = require('../src/gen');

var expect = require('expect.js');
var fs = require('fs');
var path = require('path');

var inNumber = Object.create(null);
'abcdefijlnorstuNO'.split('').forEach(function(c) {
  inNumber[c] = true;
});

describe('simple tests', function() {
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
      delete String.prototype[-2];
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
          expect(/^''\[.+\]\(\d+\)/.test(res)).to.be.ok();
          expect(eval(res)).to.eql(c);
        }
      });
    });
    after(function() {
      delete String.prototype[-1];
      delete String.prototype[-2];
      delete String.prototype[-2];
    });
  });
});