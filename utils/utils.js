(function (global, factory) {
  "use strict";
  if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = global.document
      ? factory(global, true)
      : function (w) {
          if (!w.document) {
            throw new Error("jQuery requires a window with a document");
          }
          return factory(w);
        };
  } else {
    factory(global);
  }

  // Pass this if window is not defined yet
})(typeof window !== "undefined" ? window : this, function (window, noGlobal) {
  "use strict";
  class utils {
    F() {
      return false;
    }

    Log(debug, msgs){
        if (debug) {
            console.log(...msgs);
        }
    }

    // 获取 cookies
    GetCookies() {
      var pairs = document.cookie.split(";");
      var cookies = {};
      for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i].split("=");
        cookies[(pair[0] + "").trim()] = unescape(pair.slice(1).join("="));
      }
      return cookies;
    }
  }
  if (typeof noGlobal === "undefined") {
    window.utils = new utils();
  }
  return new utils();
});
