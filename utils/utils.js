(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = global || self, factory(global.R = {}));
  }(this, (function (exports) { 'use strict';

  var F = function F() {
    return false;
  };

  exports.F = F;
})));