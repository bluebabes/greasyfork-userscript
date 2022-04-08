// ==UserScript==
// @name         2048帖子高亮图片预览
// @description  帖子高亮，列表页面直接预览帖子内图片
// @version      0.0.8
// @author       bluebabes
// @namespace    hjd2048.com
// @match        https://hjd2048.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @updateURL    https://raw.githubusercontent.com/bluebabes/greasyfork-userscript/main/2048/2048.js
// @downloadURL  https://raw.githubusercontent.com/bluebabes/greasyfork-userscript/main/2048/2048.js
// @require      https://code.jquery.com/jquery-3.4.1.min.js
// @require      https://raw.githubusercontent.com/bluebabes/greasyfork-userscript/main/utils/utils.js?t=20220407
// @grant        GM_xmlhttpRequest
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_openInTab
// @grant        GM_unregisterMenuCommand
// @grant        GM_registerMenuCommand
// @license 	   GNU GPLv3
// ==/UserScript==

(function () {
  "use strict";
  $("head").append($(`<style></style>`));

  // debug
  var debug = true;
  var maxImgCount = 8; // 最多显示图片数量

  // 增加菜单
  var menu_ALL = [["menu_disable", "✅ 已启用", "❌ 已禁用", []]];
  var menu_ID = [];
  for (let i = 0; i < menu_ALL.length; i++) {
    // 如果读取到的值为 null 就写入默认值
    if (GM_getValue(menu_ALL[i][0]) == null) {
      GM_setValue(menu_ALL[i][0], menu_ALL[i][3]);
    }
  }
  // 注册脚本菜单
  if (menu_ID.length != []) {
    for (let i = 0; i < menu_ID.length; i++) {
      GM_unregisterMenuCommand(menu_ID[i]);
    }
  }
  for (let i = 0; i < menu_ALL.length; i++) {
    // 循环注册脚本菜单
    menu_ALL[i][3] = GM_getValue(menu_ALL[i][0]);
    if (menu_ALL[i][0] === "menu_disable") {
      // 当前网站是否已存在禁用列表中
      if (menu_disable("check")) {
        // 已禁用
        menu_ID[i] = GM_registerMenuCommand(`${menu_ALL[i][2]}`, function () {
          menu_disable("del");
        });
        return;
      } else {
        // 开启状态
        menu_ID[i] = GM_registerMenuCommand(`${menu_ALL[i][1]}`, function () {
          menu_disable("add");
        });
      }
    }
  }
  menu_ID[menu_ID.length] = GM_registerMenuCommand(
    "💬 反馈 & 建议",
    function () {
      window.GM_openInTab(
        "https://github.com/bluebabes/greasyfork-userscript/issues",
        {
          active: true,
          insert: true,
          setParent: true,
        }
      );
    }
  );

  // 返回菜单值
  function menu_value(menuName) {
    for (let menu of menu_ALL) {
      if (menu[0] == menuName) {
        return menu[3];
      }
    }
  }

  // 启用/禁用 (当前网站)
  function menu_disable(type) {
    let href = document.location.href;
    switch (type) {
      case "check":
        if (disabled()) return true;
        return false;
        break;
      case "add":
        addDisabled();
        break;
      case "del":
        delDisabled();
        break;
    }

    function disabled() {
      // 存在返回真，不存在返回假
      let websiteList = menu_value("menu_disable"); // 读取网站列表
      if (websiteList.indexOf(href) === -1) return false; // 不存在返回假
      return true;
    }

    function addDisabled() {
      if (disabled()) return;
      let websiteList = menu_value("menu_disable"); // 读取网站列表
      websiteList.push(href); // 追加网站域名
      GM_setValue("menu_disable", websiteList); // 写入配置
      location.reload(); // 刷新网页
    }

    function delDisabled() {
      if (!disabled()) return;
      let websiteList = menu_value("menu_disable"), // 读取网站列表
        index = websiteList.indexOf(href);
      websiteList.splice(index, 1); // 删除网站域名
      GM_setValue("menu_disable", websiteList); // 写入配置
      location.reload(); // 刷新网页
    }
  }

  // 2048 判断
  var href = document.location.href;
  if (href.indexOf("/2048/") === -1) {
    return;
  }

  // 检查是否是列表
  function isUrlList() {
    var reg = /fid-[\d]+.html/g;
    var res = href.match(reg);
    return res && href.match(reg).length > 0;
  }
  // 检查是否是帖子
  function isUrlDetail() {
    return !isUrlList;
  }
  // 过滤
  function filterDetailUrl(title) {
    if (!title) {
      return true;
    }
    var isBlack = false;
    var filters = [
      "來訪者必看的內容",
      "請各位更換新的文宣",
      "外站图床推荐",
      "开放主题",
      "同城兼职少妇",
    ];
    filters.forEach((element) => {
      if (title.indexOf(element) > 0) {
        isBlack = true;
      }
    });
    return isBlack;
  }

  // 2048 列表逻辑处理
  if (isUrlList()) {
    // other
    document.querySelector(".TOP_PD") &&
    document.querySelector(".TOP_PD").remove();
    document.querySelector(".TOP_PD2") &&
    document.querySelector(".TOP_PD2").remove();

    let origin = document.location.origin;
    // 列表循环
    $(".tr3").each(function () {
      var that = $(this);
      var thatA = that.find("a").first();
      var url = origin + "/2048/" + thatA.attr("href");

      var thattd = that.find("td:eq(1)");
      if (href.indexOf("search.php") >= 0) {
        thattd = that.find("th:eq(0)");
      }

      // a的数量异常删除
      if (thattd.find("a").length > 5) {
        that.remove();
      }

      // 处理图片
      var title = thattd.find("a").first().text();
      var isBlacked = filterDetailUrl(title);
      if (isBlacked) {
        that.remove();
      }
      if (!isBlacked && !menu_disable("check")) {
        utils.Log(debug, ["处理内部帖子图片:", title, url]);
        GM_xmlhttpRequest({
          method: "GET",
          url: url,
          headers: {
            "User-agent": window.navigator.userAgent,
            Accept:
              "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            cookie: document.cookie,
            referer: href,
          },
          onload: function (result) {
            var doc = result.responseText;
            var imgs = $(doc).find(".tpc_content img"); // $(doc).find(".att_img > img");

            // utils.Log(debug, ["获取图片:", imgs.length]);

            for (let i = 0; i < imgs.length; i++) {
              // 最多图片
              if (i >= maxImgCount) {
                break;
              }
              const element = imgs[i];
              if (i == 0) {
                thattd.append("<br />");
              }
              var src = element.getAttribute("src");
              src = utils.ImgSrcComplate(src);

              thattd.append(
                "<img object-fit='contain' style='width:200px;' src='" +
                  src +
                  "' />"
              );
            }
          },
        });
      }
    });

    // 高亮回复数大于xx数的帖子
    function highlight() {
      var highlightCount = 5;
      var tr3s = document.querySelectorAll(".tr3");
      for (var i = 0; i < tr3s.length; i++) {
        var element = tr3s[i];
        var td = element.querySelectorAll("td");

        // 高亮
        if (td[3]) {
          if (td[3].textContent * 1 > highlightCount) {
            td[1].style.backgroundColor = "#baccd9";
            td[3].style.backgroundColor = "#baccd9";
          }
        }
      }
    }
  } else {
    document.querySelector("#footer") &&
    document.querySelector("#footer").remove();
  }
})();
