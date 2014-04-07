function wrap(s) {
  return '(' + s + ')';
}
function trueString() {
  return '!{}+[]';
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
function getChar(c) {
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
      return wrap(falseString()) + '[' + getNumber(4) + ']';
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
      return "'" + c + "'";
  }
}
function getString(s) {
  if(s.length == 1) {
    return getChar(s);
  }
  else {
    var arr = s.split('');
    var res = [];
    arr.forEach(function(c) {
      res.push(getChar(c));
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
        return wrap(getPostiveNumber(2) + '<<' + getPostiveNumber(count - 1)) + getPostiveNumber(n - (i >> 1));
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