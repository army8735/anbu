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
      return falseString() + '[' + getNumber(1) + ']';
    case 'b':
      return objectString() + '[' + getNumber(2) + ']';
    case 'c':
      return objectString() + '[' + getNumber(5) + ']';
    case 'd':
      return undefinedString() + '[' + getNumber(2) + ']';
    case 'e':
      return undefinedString() + '[' + getNumber(3) + ']';
    case 'f':
      return falseString() + '[' + getNumber(4) + ']';
    case 'i':
      return undefinedString() + '[' + getNumber(5) + ']';
    case 'j':
      return objectString() + '[' + getNumber(3) + ']';
    case 'l':
      return falseString() + '[' + getNumber(2) + ']';
  }
}
function getString(s) {
  if(s.length == 1) {
    return getChar(s);
  }
  else {
    var arr = s.split('');
    arr.forEach(function() {

    });
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
        return '(' + getPostiveNumber(2) + '<<' + getPostiveNumber(count) + ')';
      }
      else {
        return '(' + getPostiveNumber(2) + '<<' + getPostiveNumber(count - 1) + ')+' + getPostiveNumber(n - (i >> 1));
      }
    }
  }
}
function getNumber(n) {
  if(n < 0) {
    return '-(' + getNumber(-n) + ')';
  }
  else {
    var s = getPostiveNumber(n);
    return s;
  }
}
