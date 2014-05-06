var PropertyModify = require('./src/PropertyModify');
var ConstantModify = require('./src/ConstantModify');
var VarModify = require('./src/VarModify');

var homunculus = require('homunculus');
var JsNode = homunculus.getClass('node', 'js');
var Token = homunculus.getClass('token');

var gen = require('./src/gen');

var confilct;

exports.encrypt = function(code, original) {
  var context = homunculus.getContext('js');
  context.parse(code);
  var ast = context.parser.ast();
  var tokens = context.parser.lexer.tokens();

  //将要改写的token记录下来并防止重复
  confilct = Object.create(null);
  recursion(ast, original);
  analyse(context, original);

  //拼接tokens，替换要改写的token
  var res = '';
  for(var i = 0, len = tokens.length; i < len; i++) {
    var token = tokens[i];
    var modify = confilct[token.tid()];
    if(modify) {
      res += modify.gen();
      i += modify.length();
    }
    else {
      res += token.content();
    }
  }
  return (original ? '' : gen.PRE_CODE) + res;
};

function recursion(node, original) {
  var isToken = node.name() == JsNode.TOKEN;
  var isVirtual = isToken && node.token().type() == Token.VIRTUAL;
  if(isToken) {
    if(!isVirtual) {
      if(node.parent().name() == JsNode.PROPTASSIGN) {
        return;
      }
      var token = node.token();
      //改写常量
      if(token.type() == Token.STRING && token.val().length) {
        confilct[token.tid()] || (confilct[token.tid()] = new ConstantModify(original, token));
      }
      else if(token.type() == Token.NUMBER && token.content().indexOf('.') == -1) {
        confilct[token.tid()] || (confilct[token.tid()] = new ConstantModify(original, token));
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
        confilct[dot.tid()] || (confilct[dot.tid()] = new PropertyModify(original, next.token()));
      }
    }
    next = next.next();
  }
}
function analyse(context, original) {
  context.getVars().forEach(function(vardecl) {
    var variable = vardecl.leaves()[0].token();
    var prev = vardecl.prev();
    var includeVar = false;
    //包括var关键字需要将var一起删除
    if(prev && prev.name() == JsNode.TOKEN && prev.token().content() == 'var') {
      //
    }
    confilct[variable.tid()] || (confilct[variable.tid()] = new VarModify(original, vardecl, includeVar));
  });
}