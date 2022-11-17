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

    Log(debug, msgs) {
      if (debug) {
        console.log(...msgs);
      }
    }

    // 获取日期(按偏移量)
    TimeGetDate(days = 0) {
      var now = new Date();
      now.setDate(now.getDate() + days)
      return now.toLocaleDateString("en-CA");
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

    // 过滤数据
    Unique(arr) {
      var res = [];
      var obj = {};
      for (var i = 0; i < arr.length; i++) {
        if (!obj[arr[i]] && arr[i] != "") {
          obj[arr[i]] = 1;
          res.push(arr[i]);
        }
      }
      return res;
    }

    // 工具-图片补全
    ImgSrcComplate(getimgSrc) {
      let url = document.location.href;
      if (
        getimgSrc == null ||
        getimgSrc == "" ||
        getimgSrc.indexOf("data:image") >= 0
      ) {
        return getimgSrc;
      }
      try {
        var z = new URL(url);
        // 处理 url 问题
        if (getimgSrc.indexOf("chrome") >= 0) {
          getimgSrc = getimgSrc.replace("chrome-extension:", z.protocol);
        }
        if (getimgSrc.indexOf("http") === -1) {
          if (getimgSrc.indexOf("//") === 0) {
            getimgSrc = z.protocol + getimgSrc;
          } else {
            getimgSrc = getimgSrc.replace("//", "/");
            if (getimgSrc.indexOf("/") !== 0) {
              getimgSrc = "/" + getimgSrc;
            }
            getimgSrc = z.origin + getimgSrc.replace("//", "/");
          }
        }
      } catch (error) {
        console.warn(error, url);
      }
      return getimgSrc;
    }
  }
  if (typeof noGlobal === "undefined") {
    window.utils = new utils();
  }
  return new utils();
});
