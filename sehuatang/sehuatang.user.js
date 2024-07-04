// ==UserScript==
// @name         sehuatang
// @description  直接把帖子列表转成图片浏览,点击图片可以进入帖子.
// @version      0.0.7
// @author       bluebabes
// @namespace    www.sehuatang.net
// @include      https://www.sehuatang.net/forum-*
// @include      https://www.sehuatang.net/forum.php?mod=forumdisplay&fid=103&page=*
// @updateURL    https://raw.githubusercontent.com/bluebabes/greasyfork-userscript/main/sehuatang/sehuatang.js
// @downloadURL  https://raw.githubusercontent.com/bluebabes/greasyfork-userscript/main/sehuatang/sehuatang.js
// @require      https://code.jquery.com/jquery-3.4.1.min.js
// @require      https://raw.githubusercontent.com/bluebabes/greasyfork-userscript/main/utils/utils.js?t=20220407
// @grant        GM_xmlhttpRequest
// @license 	 GNU GPLv3
// ==/UserScript==
$(document).ready(function () {
  var host = "https://www.sehuatang.net";
  var href = document.location.href;

  // 过滤
  var filters = [
    "最新永久访问本站",
    "新安卓发布",
    "二次验证丢失",
    "高端约炮平台",
    "同样花钱",
    "想得到邀请码的进",
    "邀请码广告主题",
    "本站方法和安卓",
    "大家下载反馈",
  ];
  function isBlackTitle(title) {
    if (!title) {
      return true;
    }
    var isBlack = false;
    for (let i = 0; i < filters.length; i++) {
      const element = filters[i];
      if (title.indexOf(element) >= 0) {
        isBlack = true;
        break;
      }
    }
    return isBlack;
  }

  // 检查是否是列表
  function isUrlList() {
    var reg = /forum-[\d-]+.html/g;
    var res = href.match(reg);
    return res && res.length > 0;
  }
  function isNum(str) {
    var reg = /[\d-]+/g;
    var res = str.match(reg);
    return res && res.length > 0;
  }
  function isFirstPage(str) {
    var reg = /1-[\d-]+.html/g;
    var res = str.match(reg);
    return res && res.length > 0;
  }
  function isChinese() {
    return href.indexOf("forum-103-") > 0;
  }

  function regGetNo(str) {
    var reg = /[a-z0-9]{3,8}-[a-z0-9]{3,8}/i;
    var res = str.match(reg);
    if (res.length > 0) {
      return res[0];
    } else {
      return "";
    }
  }

  function UrlComplate(path) {
    return host + "/" + path;
  }

  function getImgStyle() {
    if (isChinese()) {
      return "width:100%;margin:1px;display:block;";
    }

    return "width:100%;margin:1px;display:block;";
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
  if (isUrlList()) {
    //other
    var shows = document.querySelectorAll(".show-text");
    shows.forEach((show) => {
      show.remove();
    });

    var table = document.querySelector("#threadlisttableid");
    var trs = table.querySelectorAll("tr");
    trs.forEach((tr) => {
      var tds = tr.querySelectorAll("td");
      tds.forEach((td) => {
        td.remove();
      });

      var ths = tr.querySelectorAll("th");
      ths.forEach((th) => {
        var as = th.querySelectorAll("a");
        for (let i = 0; i < as.length; i++) {
          const element = as[i];
          var hrefth = element.getAttribute("href");
          if (
            hrefth.indexOf("javascript") >= 0 ||
            hrefth.indexOf("typeid=") >= 0 ||
            hrefth.indexOf("announcement") >= 0 ||
            !isFirstPage(hrefth)
          ) {
            continue;
          }

          // 黑名单
          if (isBlackTitle(element.textContent)) {
            continue;
          }

          // console.log(element.textContent, "element.textContent");

          getData(UrlComplate(hrefth))
            .then((data) => {
              var doc = new DOMParser().parseFromString(data, "text/html");

              // magnet
              var magnets = [];
              var magnetObjs = doc.querySelectorAll(".blockcode li");
              magnetObjs.forEach((ele) => {
                magnets.push(ele.textContent);
              });

              // 图片
              var zooms = doc.querySelectorAll(".zoom");
              var imgs = [];
              zooms.forEach((ele) => {
                imgs.push(ele.getAttribute("file"));
              });

              // 过滤重复图片
              imgs = utils.Unique(imgs);

              // chinese 特殊处理
              if (isChinese()) {
                imgs = imgs.length > 0 ? [imgs[0]] : [];
              }

              // 插入到 th 中
              imgs.forEach((src, index) => {
                if (src && src.length > 10) {
                  const node = document.createElement("img");
                  node["src"] = src;
                  node["style"] = getImgStyle();
                  node.style.objectFit = "contain";
                  th.prepend(node);

                  // br
                  th.append(document.createElement("br"));
                }
              });
          
              magnets.forEach((mag, index) => {
                const node = document.createElement("a");
                node.href = mag;
                node.text = mag;
                th.append(node);
                th.append(document.createElement("br"));
              });
              th.append(document.createElement("br"));

              // 增加 javbus 链接
              const nodejavbus = document.createElement("a");
              nodejavbus.target="_blank"
              nodejavbus.href =
                "https://javbus.com/" + regGetNo(element.textContent);
              nodejavbus.text = regGetNo(element.textContent);
              th.append(nodejavbus);
            })
            .catch((e) => {
              console.log(e);
            });
        }
      });
    });
  }
});
