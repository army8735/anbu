function wrap(s) {
  return '(' + s + ')';
}
function trueString() {
  var res = ['!\'\'+[]', '!\'\'+\'\''];
  var r = Math.floor(Math.random() * res.length);
  return res[r];
}
function falseString() {
  var res = ['![]+[]', '!{}+[]', '![]+\'\'', '!{}+\'\'', '!!\'\'+[]'];
  var r = Math.floor(Math.random() * res.length);
  return res[r];
}
function objectString() {
  return '\'\'+{}';
}
function undefinedString() {
  var res = ['[][+[]]+\'\'', '\'\'[+[]]+\'\''];
  var r = Math.floor(Math.random() * res.length);
  return res[r];
}
function nanString() {
  return '+{}+\'\'';
}
var inNumber = Object.create(null);
'abcdefijlnorstu0123456789'.split('').forEach(function(c) {
  inNumber[c] = true;
});
function getChar(c, original) {
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
    case 'N':
      return wrap(nanString()) + '[' + getNumber(0) + ']';
    case 'O':
      return wrap(objectString()) + '[' + getNumber(8) + ']';
    case '1':
      return wrap(getNumber(1)) + '+\'\'';
    case '2':
      return wrap(getNumber(2)) + '+\'\'';
    case '3':
      return wrap(getNumber(3)) + '+\'\'';
    case '4':
      return wrap(getNumber(4)) + '+\'\'';
    case '5':
      return wrap(getNumber(5)) + '+\'\'';
    case '6':
      return wrap(getNumber(6)) + '+\'\'';
    case '7':
      return wrap(getNumber(7)) + '+\'\'';
    case '8':
      return wrap(getNumber(8)) + '+\'\'';
    case '9':
      return wrap(getNumber(9)) + '+\'\'';
    case '0':
      return wrap(getNumber(0)) + '+\'\'';
    default:
      if(original) {
        if(c >= 'A' && c <= 'Z' && inNumber[c.toLowerCase()]) {
          return wrap(getChar(c.toLowerCase()))
            + '['
            + getString('to') + '+\'Upp\'+' + getString('er') + '+\'C\'+' + getString('ase', true)
            + ']()';
        }
        else {
          return "'" + c + "'";
        }
      }
      else {
        if(c >= 'A' && c <= 'Z' && inNumber[c.toLowerCase()]) {
          return wrap(getChar(c.toLowerCase())) + '[' + exports.TOUPPERCASE + ']()';
        }
        else {
          return '\'\'[' + exports.FROMCHARCODE + ']' + wrap(getNumber(c.charCodeAt(0)));
        }
      }
  }
}
function getString(s, original) {
  s = String(s);
  if(s.length == 1) {
    return getChar(s, original);
  }
  else {
    var arr = s.split('');
    var res = [];
    arr.forEach(function(c) {
      res.push(getChar(c, original));
    });
    for(var i = 0; i < res.length; i++) {
      var count = 0;
      var cache = [];
      while(true) {
        var now = res[i+count];
        count++;
        if(/^'.'$/.test(now)) {
          cache.push(now);
        }
        else {
          break;
        }
      }
      if(cache.length > 1) {
        res.splice(i, cache.length, cache.join('').replace(/''/g, ''));
        i += count;
      }
    }
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
    var s = wrap(getPostiveNumber(n));
    return s;
  }
}

exports.getNumber = getNumber;
exports.getString = getString;
exports.STRINGPROTOTYE = getString('00', true)
exports.CHARAT = getString('01', true);
exports.TOUPPERCASE = getString('02', true);
exports.FROMCHARCODE = getString('03', true);
//String.prototype上添加方法：00为本身引用，01为charAt引用，02为toUpperCase引用，03为fromCharCode引用
var PRECODE = '\'\'['
  + getString('constructor', true)
  +']['
  + getString('prototype', true)
  + ']['
  + exports.STRINGPROTOTYE
  + ']=\'\'['
  + getString('constructor', true)
  +']['
  + getString('prototype', true)
  + '];\n\'\'['
  + exports.STRINGPROTOTYE
  +']['
  + exports.CHARAT
  + ']=\'\'['
  + getString('charAt', true)
  + '];\n'
  + '\'\'['
  + exports.STRINGPROTOTYE
  +']['
  + exports.TOUPPERCASE
  + ']=\'\'['
  + getString('toUpperCase', true)
  + '];\n'
  + '\'\'['
  + exports.STRINGPROTOTYE
  +']['
  + exports.FROMCHARCODE
  + ']=\'\'['
  + getString('constructor', true)
  + ']['
  + getString('fromCharCode', true)
  + '];\n'
exports.PRECODE = PRECODE;