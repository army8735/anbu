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
      if(original) {
        return wrap(falseString()) + '.charAt(' + getNumber(1) + ')'
      }
      return wrap(falseString()) + '['+ exports.CHAR_AT + '](' + getNumber(1) + ')';
    case 'b':
      if(original) {
        return wrap(objectString()) + '.charAt(' + getNumber(2) + ')';
      }
      return wrap(objectString()) + '['+ exports.CHAR_AT + '](' + getNumber(2) + ')';
    case 'c':
      if(original) {
        return wrap(objectString()) + '.charAt(' + getNumber(5) + ')';
      }
      return wrap(objectString()) + '['+ exports.CHAR_AT + '](' + getNumber(5) + ')';
    case 'd':
      if(original) {
        return wrap(undefinedString()) + '.charAt(' + getNumber(2) + ')';
      }
      return wrap(undefinedString()) + '['+ exports.CHAR_AT + '](' + getNumber(2) + ')';
    case 'e':
      if(original) {
        return wrap(undefinedString()) + '.charAt(' + getNumber(3) + ')';
      }
      return wrap(undefinedString()) + '['+ exports.CHAR_AT + '](' + getNumber(3) + ')';
    case 'f':
      if(original) {
        return wrap(falseString()) + '.charAt(' + getNumber(0) + ')';
      }
      return wrap(falseString()) + '['+ exports.CHAR_AT + '](' + getNumber(0) + ')';
    case 'i':
      if(original) {
        return wrap(undefinedString()) + '.charAt(' + getNumber(5) + ')';
      }
      return wrap(undefinedString()) + '['+ exports.CHAR_AT + '](' + getNumber(5) + ')';
    case 'j':
      if(original) {
        return wrap(objectString()) + '.charAt(' + getNumber(3) + ')';
      }
      return wrap(objectString()) + '['+ exports.CHAR_AT + '](' + getNumber(3) + ')';
    case 'l':
      if(original) {
        return wrap(falseString()) + '.charAt(' + getNumber(2) + ')';
      }
      return wrap(falseString()) + '['+ exports.CHAR_AT + '](' + getNumber(2) + ')';
    case 'n':
      if(original) {
        return wrap(undefinedString()) + '.charAt(' + getNumber(1) + ')';
      }
      return wrap(undefinedString()) + '['+ exports.CHAR_AT + '](' + getNumber(1) + ')';
    case 'o':
      if(original) {
        return wrap(objectString()) + '.charAt(' + getNumber(1) + ')';
      }
      return wrap(objectString()) + '['+ exports.CHAR_AT + '](' + getNumber(1) + ')';
    case 'r':
      if(original) {
        return wrap(trueString()) + '.charAt(' + getNumber(1) + ')';
      }
      return wrap(trueString()) + '['+ exports.CHAR_AT + '](' + getNumber(1) + ')';
    case 's':
      if(original) {
        return wrap(falseString()) + '.charAt(' + getNumber(3) + ')';
      }
      return wrap(falseString()) + '['+ exports.CHAR_AT + '](' + getNumber(3) + ')';
    case 't':
      if(original) {
        return wrap(trueString()) + '.charAt(' + getNumber(0) + ')';
      }
      return wrap(trueString()) + '['+ exports.CHAR_AT + '](' + getNumber(0) + ')';
    case 'u':
      if(original) {
        return wrap(undefinedString()) + '.charAt(' + getNumber(0) + ')';
      }
      return wrap(undefinedString()) + '['+ exports.CHAR_AT + '](' + getNumber(0) + ')';
    case 'N':
      if(original) {
        return wrap(nanString()) + '.charAt(' + getNumber(0) + ')';
      }
      return wrap(nanString()) + '['+ exports.CHAR_AT + '](' + getNumber(0) + ')';
    case 'O':
      if(original) {
        return wrap(objectString()) + '.charAt(' + getNumber(8) + ')';
      }
      return wrap(objectString()) + '['+ exports.CHAR_AT + '](' + getNumber(8) + ')';
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
          return wrap(getChar(c.toLowerCase(), true))
            + '['
            + getString('to', true) + '+\'Upp\'+' + getString('er', true) + '+\'C\'+' + getString('ase', true)
            + ']()';
        }
        else {
          return "'" + c + "'";
        }
      }
      else {
        if(c >= 'A' && c <= 'Z' && inNumber[c.toLowerCase()]) {
          return wrap(getChar(c.toLowerCase())) + '[' + exports.TO_UPPER_CASE + ']()';
        }
        else {
          return '\'\'[' + exports.FROM_CHAR_CODE + ']' + wrap(getNumber(c.charCodeAt(0)));
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
    var res = ['-[]', '-\'\'', '+[]', '+\'\''];
    var r = Math.floor(Math.random() * res.length);
    return res[r];
  }
  else if(n == 1) {
    var res = ['-~[]', '-~\'\''];
    var r = Math.floor(Math.random() * res.length);
    return res[r];
  }
  else if(n == 2) {
    var res = ['-~-~[]', '-~-~\'\''];
    var r = Math.floor(Math.random() * res.length);
    return res[r];
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
function getAnbuChar(c) {
  var i = 'abcdefghijklmnopqrstuvwxyz_$1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ'.indexOf(c);
  if(i == -1) {
    return "'" + c + "'";
  }
  else {
    return '\'\'[' + exports.CACHE + '][' + getNumber(i) + ']';
  }
}
function getAnbuString(s) {
  s = String(s);
  if(s.length == 1) {
    return getAnbuChar(s);
  }
  else {
    var arr = s.split('');
    var res = [];
    arr.forEach(function(c) {
      res.push(getAnbuChar(c));
    });
    return res.join('+');
  }
}

exports.getNumber = getNumber;
exports.getString = getString;
exports.getAnbuString = getAnbuString;

exports.STRING = getString('00', true);
exports.STRING_PROTOTYE = getString('01', true);
exports.CHAR_AT = getString('02', true);
exports.TO_UPPER_CASE = getString('03', true);
exports.FROM_CHAR_CODE = getString('04', true);
exports.CACHE = getString('05', true);
//String.prototype上添加方法：00为本身引用，01为原型引用，02为charAt引用，03为toUpperCase引用，04为fromCharCode引用
var PRE_CODE = '\'\'['
  + getString('constructor', true)
  +']['
  + getString('prototype', true)
  + ']['
  + exports.STRING
  + ']=String;\n'
  + '\'\'['
  + exports.STRING
  + ']['
  + getString('prototype', true)
  + ']['
  + exports.STRING_PROTOTYE
  + ']=String['
  + getString('prototype', true)
  + '];\n'
  + '\'\'['
  + exports.STRING_PROTOTYE
  +']['
  + exports.CHAR_AT
  + ']=\'\'['
  + getString('charAt', true)
  + '];\n'
  + '\'\'['
  + exports.STRING_PROTOTYE
  +']['
  + exports.TO_UPPER_CASE
  + ']=\'\'['
  + getString('toUpperCase', true)
  + '];\n'
  + '\'\'['
  + exports.STRING_PROTOTYE
  +']['
  + exports.FROM_CHAR_CODE
  + ']=String['
  + getString('fromCharCode', true)
  + '];\n';
//为26个字母添加快捷访问方式
var PRE_CODE2 = '\'\'[' + exports.STRING_PROTOTYE + '][' + exports.CACHE + ']=[';
arr = [];
'abcdefghijklmnopqrstuvwxyz_$1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach(function(c) {
  arr.push(getString(c));
});
PRE_CODE2 += arr.join(', ') + '];\n';
exports.PRE_CODE = PRE_CODE + PRE_CODE2;