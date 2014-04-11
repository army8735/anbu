## anbu

[![NPM version](https://badge.fury.io/js/anbu.png)](https://npmjs.org/package/anbu)
[![Build Status](https://travis-ci.org/army8735/anbu.svg?branch=master)](https://travis-ci.org/army8735/anbu)
[![Coverage Status](https://coveralls.io/repos/army8735/anbu/badge.png)](https://coveralls.io/r/army8735/anbu)
[![Dependency Status](https://david-dm.org/army8735/anbu.png)](https://david-dm.org/army8735/anbu)

使js代码极为难读，增加被破解的成本。由于浏览器宿主运行环境的关系，所有js都是公开的，无法加密，唯一的办法就是混淆使其不易阅读。

## INSTALL

```js
npm install anbu
```

## API

* anbu.encrypt(code:String, original:Boolean = false):String
<br/>将js代码code混淆难度并返回，这并不会修改代码的任何逻辑
<br/>original设置为true时会加大混淆力度，但会在代码前置入一段脚本，扩展String对象，一般也是安全的，除非和代码本身扩展的String对象冲突