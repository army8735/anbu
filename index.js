var PropertyModify = require('./src/PropertyModify');
var ConstantModify = require('./src/ConstantModify');
var VarModify = require('./src/VarModify');

var homunculus = require('homunculus');
var JsNode = homunculus.getClass('node', 'js');
var Token = homunculus.getClass('token');

var gen = require('./src/gen');
var sort = require('./util/sort');

var modifies;
exports.encrypt = function(code, original) {
  var context = homunculus.getContext('js');
  context.parse(code);
  var ast = context.parser.ast();
  modifies = [];
  PropertyModify.init();
  recursion(ast, original);
  analyse(context, original);
  //所有的修改按照索引排序，从尾部修改起便不会冲突
  sort(modifies, function(a, b) {
    return a.start() < b.start();
  });
  modifies.forEach(function(modify, i) {
    code = modify.gen(code);
  });
  if(!original) {
    code = gen.PRE_CODE + code;
  }
  return code;
};

function recursion(node, original) {
  var isToken = node.name() == JsNode.TOKEN;
  var isVirtual = isToken && node.token().type() == Token.VIRTUAL;
  if(isToken) {
    if(!isVirtual) {
      var token = node.token();
      //改写常量
      if(token.type() == Token.STRING && token.val().length) {
        modifies.push(new ConstantModify(original, token));
      }
      else if(token.type() == Token.NUMBER && token.content().indexOf('.') == -1) {
        modifies.push(new ConstantModify(original, token));
      }
    }
  }
  else {
    if(node.name() == JsNode.PRMREXPR) {
      prmrexpr(node, original);
    }
    node.leaves().forEach(function(leaf, i) {
      recursion(leaf, original);
    });
  }
}
function prmrexpr(node, original) {
  var next = node.next();
  while(next) {
    //改写所有.属性操作
    if(next && next.name() == JsNode.TOKEN && next.token().content() == '.') {
      var dot = next.token();
      next = next.next();
      if(next && next.name() == JsNode.TOKEN && next.token().type() == Token.ID) {
        modifies.push(new PropertyModify(original, dot, next.token()));
      }
    }
    next = next.next();
  }
}
function analyse(context, original) {
  context.getVars().forEach(function(vardecl) {
    modifies.push(new VarModify(original, vardecl));
  });
}