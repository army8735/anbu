var anbu = require('../');
var gen = require('../src/gen');

var expect = require('expect.js');
var fs = require('fs');
var path = require('path');

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
  var inNumber = Object.create(null);
  'abcdefijlnorstu'.split('').forEach(function(c) {
    inNumber[c] = true;
  });
  describe('gen#getString(s:String, true)', function() {
    it('abcdefijlnorstu should return getNumber', function() {
      'abcdefijlnorstu'.split('').forEach(function(c) {
        var res = gen.getString(c, true);
        expect(res).to.not.eql("'" + c + "'");
        expect(eval(res)).to.eql(c);
      });
    });
    it('other should return director', function() {
      'abcdefghijklmnopqrstuvwxyz_$ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach(function(c) {
        if(!inNumber[c]) {
          var res = gen.getString(c, true);
          if(c >= 'A' && c <= 'Z') {
            if(!inNumber[c.toLowerCase()]) {
              expect(res).to.eql("'" + c + "'");
            }
            else {
              expect(res).to.not.eql("'" + c + "'");
              expect(eval(res)).to.eql(c);
            }
          }
          else if(c >= 'a' && c <= 'z') {
            expect(res).to.eql("'" + c + "'");
          }
          else {
            expect(res).to.eql("'" + c + "'");
          }
        }
      });
    });
  });
  describe('gen#PRECODE exec', function() {
    before(function() {
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
    it('abcdefijlnorstu should return getNumber', function() {
      'abcdefijlnorstu'.split('').forEach(function(c) {
        var res = gen.getString(c);
        expect(res).to.not.eql(c);
        expect(eval(res)).to.eql(c);
      });
    });
    it.only('other should return getNumber', function() {
      'abcdefghijklmnopqrstuvwxyz_$ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach(function(c) {
        if(!inNumber[c]) {
          var res = gen.getString(c);
            expect(res).to.not.eql(c);
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