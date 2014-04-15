## javascript encrypt&confusion

[![NPM version](https://badge.fury.io/js/anbu.png)](https://npmjs.org/package/anbu)
[![Build Status](https://travis-ci.org/army8735/anbu.svg?branch=master)](https://travis-ci.org/army8735/anbu)
[![Coverage Status](https://coveralls.io/repos/army8735/anbu/badge.png)](https://coveralls.io/r/army8735/anbu)
[![Dependency Status](https://david-dm.org/army8735/anbu.png)](https://david-dm.org/army8735/anbu)

使js代码极为难读，增加被破解的成本。
<br/>由于浏览器宿主运行环境的关系，所有js都是公开的，无法加密，唯一的办法就是混淆使其不易阅读。
<br/>结合压缩器使用会有更好的效果。
<br/>建议先压缩，因为uglify自身问题会解析错误，而closure-compiler会优化代码使其更易读。

anbu取名自火影忍者中的火之国忍者暗部组织，意指秘密行动。

## INSTALL

```js
npm install anbu
```

## API

* anbu.encrypt(code:String, original:Boolean = false):String
<br/>将js代码code混淆难度并返回，这并不会修改代码的任何逻辑
<br/>作为代价它会一定程度上增加js体积以及消耗更多的性能
<br/>original默认false会在代码前置入一段脚本，扩展原生对象，一般也是安全的，除非和代码本身的扩展冲突
<br/>original设置true时不会有上述扩展，但会减小混淆力度