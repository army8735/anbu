function wrap(s) {
  return '(' + s + ')';
}
function trueString() {
  return '!\'\'+[]';
}
function falseString() {
  return '![]+[]';
}
function objectString() {
  return '""+{}';
}
function undefinedString() {
  return '[][+[]]+""';
}
function fnaString() {
  return '[].['
    + falseString()[getNumber(3)]
    + ']+""';
}
function nanString() {
  return '+{}';
}
var inNumber = Object.create(null);
'abcdefijlnorstu'.split('').forEach(function(c) {
  inNumber[c] = true;
});
function getChar(c, direct) {
  switch(c) {
    case 'a':
      return wrap(falseString()) + '[' + getNumber(1) + ']';
    case 'b':
      return wrap(objectString()) + '[' + getNumber(2) + ']';
    case 'c':
      return wrap(objectString()) + '[' + getNumber(5) + ']';
    case 'd':
      return wrap(undefinedString()) + '[' + getNumber(2) + ']';
    case 'e':
      return wrap(undefinedString()) + '[' + getNumber(3) + ']';
    case 'f':
      return wrap(falseString()) + '[' + getNumber(0) + ']';
    case 'i':
      return wrap(undefinedString()) + '[' + getNumber(5) + ']';
    case 'j':
      return wrap(objectString()) + '[' + getNumber(3) + ']';
    case 'l':
      return wrap(falseString()) + '[' + getNumber(2) + ']';
    case 'n':
      return wrap(undefinedString()) + '[' + getNumber(1) + ']';
    case 'o':
      return wrap(objectString()) + '[' + getNumber(1) + ']';
    case 'r':
      return wrap(trueString()) + '[' + getNumber(1) + ']';
    case 's':
      return wrap(falseString()) + '[' + getNumber(3) + ']';
    case 't':
      return wrap(trueString()) + '[' + getNumber(0) + ']';
    case 'u':
      return wrap(undefinedString()) + '[' + getNumber(0) + ']';
    default:
      if(direct) {
        if((c >= 'A' || c <= 'Z') && inNumber[c.toLowerCase()]) {
          return wrap(getChar(c.toLowerCase())) + '.toUpperCase()';
        }
        else {
          return c;
        }
      }
      else {
        if(c >= 'A' || c <= 'Z' && inNumber[c.toLowerCase()]) {
          return '\'\'[' + getNumber(-2) + '](' + getChar(c.toLowerCase()) + ')';
        }
        else {
          return '\'\'[' + getNumber(-3) + '](' + c.charCodeAt(0) + ')';
        }
      }
  }
}
function getString(s, direct) {
  if(s.length == 1) {
    return getChar(s, direct);
  }
  else {
    var arr = s.split('');
    var res = [];
    arr.forEach(function(c) {
      res.push(getChar(c, direct));
    });
    return res.join('+');
  }
}
function getPostiveNumber(n) {
  if(n == 0) {
    return '-[]';
  }
  else if(n == 1) {
    return '-~[]';
  }
  else if(n == 2) {
    return '-~-~[]';
  }
  else if(n == 3) {
    return getPostiveNumber(2) + getPostiveNumber(1);
  }
  else {
    var i = 2;
    var count = 0;
    while(true) {
      if(i < n) {
        i <<= 1;
        count++;
      }
      else if(i == n) {
        return wrap(getPostiveNumber(2) + '<<' + getPostiveNumber(count));
      }
      else {
        return wrap(getPostiveNumber(2) + '<<' + getPostiveNumber(count - 1)) + '+' + getPostiveNumber(n - (i >> 1));
      }
    }
  }
}
function getNumber(n) {
  if(n < 0) {
    return '-' + wrap(getNumber(-n));
  }
  else {
    var s = getPostiveNumber(n);
    return s;
  }
}

exports.getNumber = getNumber;
exports.getString = getString;
//-1为charAt，-2为toUpperCase，-3为fromCharCode
var PRECODE = 'String.prototype['
  + getNumber(-1)
  + '] = function(i) { return this['
  + getString('charAt', true)
  + '](i) }'
  + 'String.prototype['
  + getNumber(-2)
  + '] = function() { return this['
  + getString('toUpperCase', true)
  + '](this) }'
  + 'String.prototype['
  + getNumber(-3)
  + '] = function(n) { return String['
  + getString('fromCharCode', true)
  + '](n) };'
exports.PRECODE = PRECODE.replace(/\s/g, '');