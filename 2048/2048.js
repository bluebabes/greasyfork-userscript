// ==UserScript==
// @name         2048帖子高亮图片预览
// @description  帖子高亮，列表页面直接预览帖子内图片
// @version      0.0.11
// @author       bluebabes
// @namespace    hjd2048.com
// @match        https://*.hjd2048.com/*
// @icon         data:image/png;base64,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
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

    var reg2 = /thread\.php/g;
    var res2 = href.match(reg2);

    return (res && res.length > 0) || (res2 && res2.length > 0);
  }
  // 检查是否是帖子
  function isUrlDetail() {
    return !isUrlList;
  }
  // 过滤
  var filters = [
    "來訪者必看的內容",
    "請各位更換新的文宣",
    "外站图床推荐",
    "开放主题",
    "威尼斯人",
    "同城兼职少妇",
    "区发贴教程详解",
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

  // 2048 列表逻辑处理
  if (isUrlList() || href.indexOf("search.php") >= 0) {
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
      var thattdTime = that.find("td:eq(2)"); // 时间

      if (href.indexOf("search.php") >= 0) {
        thattd = that.find("th:eq(0)");
        thattdTime = that.find("th:eq(1)");
      }

      var trTime = thattdTime.find("div.f10:eq(0)").text();
      
      console.log("trTime",  trTime, "->", utils.TimeGetDate(0), utils.TimeGetDate(-1), utils.TimeGetDate(-2));

      var todayDate = utils.TimeGetDate(0)
      if (trTime == todayDate ) {
          that.css("background-color","#BC5367");
      }
      if (trTime == utils.TimeGetDate(-1) ) {
          that.css("background-color","#CB7F8F");
      }
      if (trTime == utils.TimeGetDate(-2) ) {
          that.css("background-color","#EFC5C4");
      }

      // a的数量异常删除
      if (thattd.find("a").length > 5) {
        // that.remove();
      }

      // 处理图片
      var title = thattd.find("a").first().text();
      var isBlacked = isBlackTitle(title);
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

            // 查找 dataaps
            var hrefs = $(doc).find(".tpc_content a");
            for (let i = 0; i < hrefs.length; i++) {
              const element = hrefs[i];
              if (element.href.indexOf("dataaps") > 0) {
                thattd.append(`<a style="color: red;" target="_blank" href="` + element.href + `">磁力链接</a>`);
              }
            };


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
