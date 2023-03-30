// ==UserScript==
// @name         CSDN 免登陆复制代码
// @description  CSDN 免登陆复制代码（示例） https://greasyfork.org/zh-CN/scripts/455938-csdn-%E5%85%8D%E7%99%BB%E9%99%86%E5%A4%8D%E5%88%B6%E4%BB%A3%E7%A0%81/code
// @namespace    http://tampermonkey.net/
// @version      0.5
// @author       You
// @match        https://blog.csdn.net/*
// @match        https://*.blog.csdn.net/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=limbopro.com
// @run-at       document-end
// @grant        none
// @license      MIT
// ==/UserScript==
 
//document.designMode = "on"
 
function cssAdd(i) {
    var create_Element = document.createElement("style");
    create_Element.innerHTML = i;
    document.getElementsByTagName('head')[0].appendChild(create_Element)
}
var newstyle = "#content_views pre, #content_views pre code {user-select: text !important} .weixin-shadowbox.wap-shadowbox,.passport-login-container,.passport-login-mark, iframe {display: none !important}"
cssAdd(newstyle);