// ==UserScript==
// @name         sehuatang
// @description  直接把帖子列表转成图片浏览,点击图片可以进入帖子.
// @version      0.0.5
// @author       bluebabes
// @namespace    www.sehuatang.net
// @include      https://www.sehuatang.net/forum-*
// @include      https://www.sehuatang.net/forum.php?mod=forumdisplay&fid=103&page=*
// @updateURL    https://raw.githubusercontent.com/bluebabes/greasyfork-userscript/main/sehuatang/sehuatang.js
// @downloadURL  https://raw.githubusercontent.com/bluebabes/greasyfork-userscript/main/sehuatang/sehuatang.js
// @require      https://code.jquery.com/jquery-3.4.1.min.js
// @grant        GM_xmlhttpRequest
// @license 	 GNU GPLv3
// ==/UserScript==
$(document).ready(function () {
  var host = "https://www.sehuatang.net";
  var href = document.location.href;
  // 检查是否是列表
  function isUrlList() {
    var reg = /forum-[\d-]+.html/g;
    var res = href.match(reg);
    return res && href.match(reg).length > 0;
  }

  function UrlComplate(path) {
    return host + "/" + path;
  }

  function getImgStyle(){
    if (href.indexOf("forum-151-1.html") > 0) {
      return "width:200px;margin:1px;"
    }

    return "width:200px;margin:1px;"
  }

  function getData(uri) {
    return new Promise((resolve, reject) => {
      GM_xmlhttpRequest({
        method: "GET",
        url: uri,
        headers: {
          "User-agent": window.navigator.userAgent,
          Accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
          cookie: document.cookie,
          referer: href,
        },
        onerror: function (e) {
          console.log(e);
          reject(e);
          return;
        },
        onload: function (result) {
          var doc = result.responseText;
          resolve(doc);
          return;
        },
      });
    });
  }

  // 主业务逻辑
  var table = document.querySelector("#threadlisttableid");
  var trs = table.querySelectorAll("tr");
  trs.forEach((tr) => {
    var ths = tr.querySelectorAll("th");
    ths.forEach((th) => {
      var as = th.querySelectorAll("a");
      for (let i = 0; i < as.length; i++) {
        const element = as[i];
        var hrefth = element.getAttribute("href");
        if (
          hrefth.indexOf("javascript") >= 0 ||
          hrefth.indexOf("typeid=") >= 0 ||
          hrefth.indexOf("announcement") >= 0
        ) {
          continue;
        }
        getData(UrlComplate(hrefth))
          .then((data) => {
            var doc = new DOMParser().parseFromString(data, "text/html");
            var zooms = doc.querySelectorAll(".zoom");
            var imgs = [];
            zooms.forEach((ele) => {
              imgs.push(ele.getAttribute("file"));
            });
            // 插入到 th 中
            imgs.forEach((src, index) => {
              if (index == 0) {
                var br = document.createElement("br");
                th.append(br);
              }
              if (src && src.length > 10) {
                const node = document.createElement("img");
                node["src"] = src;
                node["style"] = getImgStyle();
                node.style.objectFit = 'contain';
                th.append(node);
              }
            });
          })
          .catch((e) => {
            console.log(e);
          });
      }
    });
  });

  // $(".icn").each(function () {
  //   var uri = host + "/" + $(this).find("a").attr("href");

  //   var imgg = $(this).find("img");
  //   var icn_td = $(this);
  //   var href = document.location.href;

  //   GM_xmlhttpRequest({
  //     method: "GET",
  //     url: uri,
  //     headers: {
  //       "User-agent": window.navigator.userAgent,
  //       Accept:
  //         "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
  //       cookie: document.cookie,
  //       referer: href,
  //     },
  //     onerror: function (e) {
  //       console.log(e);
  //     },
  //     onload: function (result) {
  //       var doc = result.responseText;
  //       var img01 = $(doc).find(".zoom").attr("file");
  //       $(imgg).attr("src", img01);
  //       var dvi01 = $(doc).find(".blockcode");
  //       var dvi02 = $(doc).find("#thread_subject");
  //       var magnet = $(dvi01).find("li").text();
  //       $(icn_td).css("width", "100%");
  //       $(icn_td).append(
  //         "<p style='margin-top: 20px;font-size: 2em;'>" +
  //           $(dvi02).html() +
  //           "</p><br/>"
  //       );
  //       $(icn_td).append(
  //         "<p style='margin-top: 20px;font-size: 2em;'>" + magnet + "</p><br/>"
  //       );
  //     },
  //   });
  // });

  // other
  // $(".common").each(function () {
  //   $(this).remove();
  // });
  // $(".by").each(function () {
  //   $(this).remove();
  // });
  // $(".num").each(function () {
  //   $(this).remove();
  // });
});
