(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = global || self, factory(global.R = {}));
  }(this, (function (exports) { 'use strict';
  class utils {
    F() {
        return false;
      }
  }
  window.utils = new utils();
})));