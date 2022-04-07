// ==UserScript==
// @name         2048帖子高亮图片预览
// @description  帖子高亮，列表页面直接预览帖子内图片
// @version      0.0.7
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
      // 启用/禁用护眼模式 (当前网站)
      if (menu_disable("check")) {
        // 当前网站是否已存在禁用列表中
        menu_ID[i] = GM_registerMenuCommand(`${menu_ALL[i][2]}`, function () {
          menu_disable("del");
        });
        return;
      } else {
        if (
          GM_getValue("menu_darkModeAuto") &&
          !window.matchMedia("(prefers-color-scheme: dark)").matches
        ) {
          menu_ID[i] = GM_registerMenuCommand(
            `❌ 当前浏览器为白天模式 (点击关闭 [护眼模式跟随浏览器])`,
            function () {
              GM_setValue("menu_darkModeAuto", false);
              location.reload();
            }
          );
          return;
        }
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
    switch (type) {
      case "check":
        if (check()) return true;
        return false;
        break;
      case "add":
        add();
        break;
      case "del":
        del();
        break;
    }

    function check() {
      // 存在返回真，不存在返回假
      let websiteList = menu_value("menu_disable"); // 读取网站列表
      if (websiteList.indexOf(location.host) === -1) return false; // 不存在返回假
      return true;
    }

    function add() {
      if (check()) return;
      let websiteList = menu_value("menu_disable"); // 读取网站列表
      websiteList.push(location.host); // 追加网站域名
      GM_setValue("menu_disable", websiteList); // 写入配置
      location.reload(); // 刷新网页
    }

    function del() {
      if (!check()) return;
      let websiteList = menu_value("menu_disable"), // 读取网站列表
        index = websiteList.indexOf(location.host);
      websiteList.splice(index, 1); // 删除网站域名
      GM_setValue("menu_disable", websiteList); // 写入配置
      location.reload(); // 刷新网页
    }
  }

  var href = document.location.href;
  if (href.indexOf("/2048/") === -1) {
    return;
  }

  // 预览内容图片
  $(".tr3").each(function () {
    var that = $(this);
    var url =
      document.location.origin + "/2048/" + $(this).find("a").attr("href");

    var thattd = that.find("td:eq(1)");
    if (href.indexOf("search.php") >= 0) {
      thattd = that.find("th:eq(0)");
    }

    var xmlOn = url.indexOf("read.php") >= 0;
    if (xmlOn) {
      utils.Log(debug, ["处理内部帖子图片:", url]);

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
          var imgs = $(doc).find(".att_img > img");

          utils.Log(debug, ["获取图片:", imgs.length]);

          for (let i = 0; i < imgs.length; i++) {
            const element = imgs[i];
            if (i == 0) {
              thattd.append("<br />");
            }
            var src = element.getAttribute("src");
            src = src.replace("http://", "https://");

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

    if (
      (td[1] && td[1].textContent.indexOf("澳门") > 0) ||
      (td[1] && td[1].textContent.indexOf("赌场") > 0) ||
      (td[1] && td[1].textContent.indexOf("浏览2048需要注意的点") > 0) ||
      (td[1] && td[1].textContent.indexOf("免费互约APP") > 0) ||
      (td[1] && td[1].textContent.indexOf("国产抖阴小视频") > 0) ||
      (td[1] && td[1].textContent.indexOf("区发贴教程详解") > 0) ||
      (td[1] && td[1].textContent.indexOf("自售区版规细则及发帖标准") > 0)
    ) {
      td[1].parentNode.remove();
    }
  }
})();
