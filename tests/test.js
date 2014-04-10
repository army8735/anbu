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
        expect(eval(gen.getString(c, true))).to.eql(c);
      });
    });
    it('other should return director', function() {
      'abcdefghijklmnopqrstuvwxyz_$ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach(function(c) {
        if(!inNumber[c]) {
          if(c >= 'A' && c <= 'Z') {
            if(!inNumber[c.toLowerCase()]) {
              expect(gen.getString(c, true)).to.eql(c);
            }
            else {
              expect(eval(gen.getString(c, true))).to.eql(c);
            }
          }
          else if(c >= 'a' && c <= 'z') {
            expect(gen.getString(c, true)).to.eql(c);
          }
          else {
            expect(gen.getString(c, true)).to.eql(c);
          }
        }
      });
    });
  });
});