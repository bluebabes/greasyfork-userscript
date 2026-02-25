// ==UserScript==
// @name         pikpak助手plus
// @namespace    http://tampermonkey.net/
// @version      1.4.4
// @author       jdysya
// @description  pikpak网盘助手的增强版，搭配代理可实现直连下载，支持推送文件夹到aria2中!
// @license      MIT
// @icon         https://www.google.com/s2/favicons?sz=64&domain=mypikpak.com
// @match        https://mypikpak.com/*
// @require      https://cdn.jsdelivr.net/npm/vue@3.4.37/dist/vue.global.prod.js
// @grant        GM_xmlhttpRequest
// @grant        unsafeWindow
// @downloadURL https://update.greasyfork.org/scripts/503530/pikpak%E5%8A%A9%E6%89%8Bplus.user.js
// @updateURL https://update.greasyfork.org/scripts/503530/pikpak%E5%8A%A9%E6%89%8Bplus.meta.js
// ==/UserScript==

(t => { const a = document.createElement("style"); a.dataset.source = "vite-plugin-monkey", a.innerText = t, document.head.appendChild(a) })(' .dialog-overlay[data-v-ec37b3a3]{position:fixed;top:0;left:0;width:100%;height:100%;background-color:#0009;z-index:3000}.dialog[data-v-ec37b3a3]{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:linear-gradient(135deg,#ffffff 0%,#f8fafc 100%);z-index:10000;padding:32px;box-shadow:0 25px 50px -12px #00000040,0 0 0 1px #ffffff0d;border-radius:20px;width:90vw;max-width:800px;min-width:320px;box-sizing:border-box;-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.2);animation:dialogFadeIn-ec37b3a3 .3s cubic-bezier(.4,0,.2,1);display:flex;flex-direction:column;max-height:90vh;overflow:hidden}@keyframes dialogFadeIn-ec37b3a3{0%{opacity:0;transform:translate(-50%,-50%) scale(.95)}to{opacity:1;transform:translate(-50%,-50%) scale(1)}}@media (max-width: 768px){.dialog[data-v-ec37b3a3]{width:95vw;padding:24px;border-radius:16px}}@media (max-width: 480px){.dialog[data-v-ec37b3a3]{width:100vw;height:100vh;max-height:100vh;border-radius:0;padding:20px}}.dialog h2[data-v-ec37b3a3]{text-align:center;color:#1e293b;margin-bottom:24px;font-size:24px;font-weight:700;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}@media (max-width: 480px){.dialog h2[data-v-ec37b3a3]{font-size:20px;margin-bottom:20px}}.dialog .close[data-v-ec37b3a3]{position:absolute;right:20px;top:20px;width:40px;height:40px;display:flex;align-items:center;justify-content:center;font-size:24px;cursor:pointer;color:#64748b;background:rgba(248,250,252,.8);border-radius:50%;transition:all .3s cubic-bezier(.4,0,.2,1);border:1px solid rgba(226,232,240,.5)}.dialog .close[data-v-ec37b3a3]:hover{color:#ef4444;background:rgba(254,226,226,.8);border-color:#f871714d;transform:scale(1.05)}.toolbar[data-v-ec37b3a3]{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;padding:16px 20px;background:linear-gradient(135deg,rgba(99,102,241,.05) 0%,rgba(168,85,247,.05) 100%);border-radius:12px;border:1px solid rgba(99,102,241,.1)}@media (max-width: 640px){.toolbar[data-v-ec37b3a3]{flex-direction:column;gap:16px;align-items:stretch}}.toolbar input[type=checkbox][data-v-ec37b3a3]{margin-right:8px;transform:scale(1.3);accent-color:#6366f1}.toolbar label[data-v-ec37b3a3]{font-weight:600;color:#374151;display:flex;align-items:center;cursor:pointer;transition:color .2s ease}.toolbar label[data-v-ec37b3a3]:hover{color:#6366f1}.sort-options[data-v-ec37b3a3]{display:flex;align-items:center;gap:12px;flex-wrap:wrap}@media (max-width: 640px){.sort-options[data-v-ec37b3a3]{justify-content:center}}.sort-options label[data-v-ec37b3a3]{font-size:14px;font-weight:500;color:#6b7280}.sort-options select[data-v-ec37b3a3]{padding:8px 12px;border:2px solid #e5e7eb;background:white;color:#374151;border-radius:8px;font-size:14px;transition:all .2s ease;cursor:pointer}.sort-options select[data-v-ec37b3a3]:focus{outline:none;border-color:#6366f1;box-shadow:0 0 0 3px #6366f11a}.sort-options select[data-v-ec37b3a3]:hover{border-color:#9ca3af}.movies[data-v-ec37b3a3]{margin-top:16px;flex:1;min-height:200px;overflow-y:auto;overflow-x:hidden;border:2px solid #f1f5f9;border-radius:16px;padding:0;background:linear-gradient(135deg,#ffffff 0%,#f8fafc 100%);box-shadow:inset 0 2px 4px #0000000f}@media (max-width: 480px){.movies[data-v-ec37b3a3]{height:300px}}.movies[data-v-ec37b3a3]::-webkit-scrollbar{width:8px}.movies[data-v-ec37b3a3]::-webkit-scrollbar-track{background:#f1f5f9;border-radius:8px}.movies[data-v-ec37b3a3]::-webkit-scrollbar-thumb{background:linear-gradient(135deg,#cbd5e1 0%,#94a3b8 100%);border-radius:8px;transition:background .2s ease}.movies[data-v-ec37b3a3]::-webkit-scrollbar-thumb:hover{background:linear-gradient(135deg,#94a3b8 0%,#64748b 100%)}.movies li[data-v-ec37b3a3]{display:flex;align-items:center;padding:16px 20px;border-bottom:1px solid rgba(226,232,240,.6);font-size:14px;color:#334155;transition:all .2s ease;cursor:pointer;margin-right:-4px;overflow:hidden}.movies li[data-v-ec37b3a3]:hover{background:linear-gradient(135deg,rgba(99,102,241,.05) 0%,rgba(168,85,247,.05) 100%);transform:translate(4px);margin-right:0}.movies li[data-v-ec37b3a3]:last-child{border-bottom:none}.movies li input[type=checkbox][data-v-ec37b3a3]{margin-right:16px;transform:scale(1.2);accent-color:#6366f1}.movies li .icon[data-v-ec37b3a3]{margin-right:12px;font-size:1.5em;filter:drop-shadow(0 1px 2px rgba(0,0,0,.1))}.movies li .file-name[data-v-ec37b3a3]{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;flex-grow:1}.movies li .file-info[data-v-ec37b3a3]{margin-left:auto;color:#64748b;font-size:12px;font-weight:500;padding:4px 8px;background:rgba(248,250,252,.8);border-radius:6px;border:1px solid rgba(226,232,240,.5);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:30%}.footer[data-v-ec37b3a3]{display:flex;justify-content:space-between;align-items:center;gap:16px;padding-top:20px;border-top:1px solid rgba(226,232,240,.6);flex-shrink:0;margin-top:auto}@media (max-width: 480px){.movies[data-v-ec37b3a3]{min-height:150px}.footer[data-v-ec37b3a3]{flex-direction:column;gap:12px;padding:16px 0 0}}.btn.el-button[data-v-ec37b3a3]{padding:14px 28px;border:none;border-radius:12px;cursor:pointer;font-size:16px;font-weight:600;transition:all .3s cubic-bezier(.4,0,.2,1);position:relative;overflow:hidden}.btn.el-button--primary[data-v-ec37b3a3]{background:linear-gradient(135deg,#6366f1 0%,#8b5cf6 100%);color:#fff;box-shadow:0 4px 14px #6366f14d}.btn.el-button--secondary[data-v-ec37b3a3]{background:linear-gradient(135deg,#f8fafc 0%,#e2e8f0 100%);color:#475569;border:2px solid #cbd5e1;box-shadow:0 2px 8px #4755691a}.btn.el-button[data-v-ec37b3a3]:before{content:"";position:absolute;top:0;left:-100%;width:100%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.2),transparent);transition:left .5s}.btn.el-button--primary[data-v-ec37b3a3]:hover{background:linear-gradient(135deg,#5b21b6 0%,#7c3aed 100%);box-shadow:0 8px 25px #6366f166;transform:translateY(-2px)}.btn.el-button--secondary[data-v-ec37b3a3]:hover{background:linear-gradient(135deg,#e2e8f0 0%,#cbd5e1 100%);border-color:#94a3b8;box-shadow:0 4px 12px #47556926;transform:translateY(-2px)}.btn.el-button[data-v-ec37b3a3]:hover:before{left:100%}.btn.el-button[data-v-ec37b3a3]:active{transform:translateY(0);box-shadow:0 4px 14px #6366f14d}@media (max-width: 480px){.btn.el-button[data-v-ec37b3a3]{width:100%;padding:16px;font-size:18px}}@media (max-width: 768px){.toolbar[data-v-ec37b3a3]{flex-direction:column;gap:12px;align-items:stretch}.sort-options[data-v-ec37b3a3]{display:flex;flex-direction:column;gap:8px;width:100%}.sort-options label[for=sort-by][data-v-ec37b3a3]{margin-bottom:4px;font-size:14px}.sort-options select[data-v-ec37b3a3]{width:100%;box-sizing:border-box}}.connection-status[data-v-ec37b3a3]{display:flex;justify-content:space-between;align-items:center;padding:12px 16px;margin:16px 0;background:#f8f9fa;border-radius:8px;border:1px solid #e9ecef}.status-indicator[data-v-ec37b3a3]{display:flex;align-items:center;gap:8px}.status-dot[data-v-ec37b3a3]{width:8px;height:8px;border-radius:50%;transition:all .3s ease}.status-dot.connected[data-v-ec37b3a3]{background:#52c41a;box-shadow:0 0 0 2px #52c41a33;animation:pulse-ec37b3a3 2s infinite}.status-dot.disconnected[data-v-ec37b3a3]{background:#ff4d4f;box-shadow:0 0 0 2px #ff4d4f33}.status-dot.testing[data-v-ec37b3a3]{background:#1890ff;box-shadow:0 0 0 2px #1890ff33;animation:pulse-ec37b3a3 1s infinite}.status-dot.unknown[data-v-ec37b3a3]{background:#d9d9d9}.status-text[data-v-ec37b3a3]{font-size:14px;color:#666;font-weight:500}.test-btn[data-v-ec37b3a3]{padding:6px 12px;font-size:12px;border:1px solid #d9d9d9;border-radius:4px;background:white;color:#666;cursor:pointer;transition:all .2s ease}.test-btn[data-v-ec37b3a3]:hover:not(:disabled){border-color:#409eff;color:#409eff}.test-btn[data-v-ec37b3a3]:disabled{opacity:.6;cursor:not-allowed}@keyframes pulse-ec37b3a3{0%{transform:scale(1);opacity:1}50%{transform:scale(1.1);opacity:.7}to{transform:scale(1);opacity:1}}.connection-status[data-v-c3a3479c]{display:flex;justify-content:space-between;align-items:center;padding:16px 20px;margin-bottom:20px;background:linear-gradient(135deg,rgba(99,102,241,.05) 0%,rgba(168,85,247,.05) 100%);border-radius:12px;border:1px solid rgba(99,102,241,.1)}.status-indicator[data-v-c3a3479c]{display:flex;align-items:center;gap:12px}.status-dot[data-v-c3a3479c]{width:12px;height:12px;border-radius:50%;position:relative}.status-dot.connected[data-v-c3a3479c]{background-color:#10b981;box-shadow:0 0 0 2px #10b98133}.status-dot.connected[data-v-c3a3479c]:before{content:"";position:absolute;width:12px;height:12px;border-radius:50%;background-color:#10b981;animation:pulse-c3a3479c 2s infinite}.status-dot.disconnected[data-v-c3a3479c]{background-color:#ef4444;box-shadow:0 0 0 2px #ef444433}.status-dot.testing[data-v-c3a3479c]{background-color:#f59e0b;box-shadow:0 0 0 2px #f59e0b33;animation:pulse-c3a3479c 1s infinite}.status-dot.unknown[data-v-c3a3479c]{background-color:#6b7280;box-shadow:0 0 0 2px #6b728033}@keyframes pulse-c3a3479c{0%{transform:scale(1);opacity:1}50%{transform:scale(1.2);opacity:.7}to{transform:scale(1);opacity:1}}.status-text[data-v-c3a3479c]{font-size:14px;font-weight:500;color:#374151}.test-btn[data-v-c3a3479c]{padding:8px 16px;background:linear-gradient(135deg,#f8fafc 0%,#e2e8f0 100%);color:#475569;border:2px solid #cbd5e1;border-radius:8px;cursor:pointer;font-size:14px;font-weight:500;transition:all .2s ease}.test-btn[data-v-c3a3479c]:hover:not(:disabled){background:linear-gradient(135deg,#e2e8f0 0%,#cbd5e1 100%);border-color:#94a3b8;transform:translateY(-1px)}.test-btn[data-v-c3a3479c]:disabled{opacity:.6;cursor:not-allowed}.dialog-overlay[data-v-c3a3479c]{position:fixed;top:0;left:0;width:100%;height:100%;background-color:#0009;z-index:3001}.dialog[data-v-c3a3479c]{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:#fff;z-index:10000;padding:30px;box-shadow:0 5px 15px #0000004d;border-radius:10px;width:90%;max-width:500px;box-sizing:border-box}.dialog h2[data-v-c3a3479c]{text-align:center;color:#333;margin-bottom:20px}.dialog .close[data-v-c3a3479c]{position:absolute;right:15px;top:15px;font-size:30px;cursor:pointer;color:#999;transition:color .3s ease}.dialog .close[data-v-c3a3479c]:hover{color:#666}.config-list[data-v-c3a3479c]{margin-top:20px}.config-list li[data-v-c3a3479c]{margin-bottom:15px}.config-list li .label[data-v-c3a3479c]{font-weight:700;margin-bottom:5px;display:block;color:#555}.config-list li input[type=text][data-v-c3a3479c]{width:100%;padding:10px;border:1px solid #dcdfe6;border-radius:4px;box-sizing:border-box;font-size:14px;transition:border-color .3s ease}.config-list li input[type=text][data-v-c3a3479c]:focus{border-color:#409eff;outline:none}.footer[data-v-c3a3479c]{margin-top:20px;display:flex;justify-content:right;align-items:center;gap:12px}.btn.el-button[data-v-c3a3479c]{padding:12px 24px;border:none;border-radius:8px;cursor:pointer;font-size:14px;font-weight:500;transition:all .2s ease}.btn.el-button--primary[data-v-c3a3479c]{background:linear-gradient(135deg,#6366f1 0%,#8b5cf6 100%);color:#fff}.btn.el-button--primary[data-v-c3a3479c]:hover{background:linear-gradient(135deg,#5b21b6 0%,#7c3aed 100%);transform:translateY(-1px)}.btn.el-button--secondary[data-v-c3a3479c]{background:linear-gradient(135deg,#f8fafc 0%,#e2e8f0 100%);color:#475569;border:2px solid #cbd5e1}.btn.el-button--secondary[data-v-c3a3479c]:hover:not(:disabled){background:linear-gradient(135deg,#e2e8f0 0%,#cbd5e1 100%);border-color:#94a3b8;transform:translateY(-1px)}.btn.el-button[data-v-c3a3479c]:disabled{opacity:.6;cursor:not-allowed;transform:none}.guidance[data-v-c3a3479c]{font-size:12px;color:#909399;margin-top:5px;line-height:1.5}.form[data-v-c3a3479c]{margin-top:20px}.xz-input[data-v-c3a3479c]{border:#d9d9d9 1px solid;margin-bottom:10px;padding:5px;margin-top:5px}.aria2-tip[data-v-ef33c69b]{padding:15px 20px;position:absolute;top:30px;left:50%;transform:translate(-50%);color:#fff;border-radius:8px;box-shadow:0 4px 12px #00000026;font-size:14px;z-index:10001;min-width:300px;text-align:center;display:flex;align-items:center;gap:10px}.aria2-tip--success[data-v-ef33c69b]{background:rgba(103,194,58,.9)}.aria2-tip--error[data-v-ef33c69b]{background:rgba(245,108,108,.9)}.aria2-tip--warning[data-v-ef33c69b]{background:rgba(230,162,60,.9)}.aria2-tip--info[data-v-ef33c69b]{background:rgba(64,158,255,.9)}.aria2-tip__icon[data-v-ef33c69b]{font-size:18px;font-weight:700;flex-shrink:0}.aria2-tip__content[data-v-ef33c69b]{flex:1}.floating-window[data-v-4681666b]{position:fixed;z-index:9999;-webkit-user-select:none;user-select:none;transition:all .2s ease}.floating-window.dragging[data-v-4681666b]{transition:none}.download-button[data-v-4681666b]{display:flex;align-items:center;justify-content:center;width:50px;height:50px;padding:0;background:linear-gradient(135deg,#409eff,#66b1ff);border-radius:50%;cursor:pointer;box-shadow:0 4px 12px #409eff4d;color:#fff;transition:all .3s ease}.download-button[data-v-4681666b]:hover{transform:scale(1.05);box-shadow:0 6px 16px #409eff66}.download-button[data-v-4681666b]:active{transform:scale(.95)}@media (max-width: 768px){.main-button[data-v-4681666b]{width:45px;height:45px}.options[data-v-4681666b]{left:55px;min-width:110px}.option[data-v-4681666b]{padding:8px 12px}.option span[data-v-4681666b]{font-size:13px}} ');

(function (vue) {
  "use strict";
  function getPlatform() {
    let u = navigator.userAgent;
    let isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1;
    let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    if (isAndroid) {
      return "Android";
    } else if (isIOS) {
      return "IOS";
    } else {
      return "PC";
    }
  }
  var monkeyWindow = window;
  var GM_xmlhttpRequest = /* @__PURE__ */ (() => monkeyWindow.GM_xmlhttpRequest)();
  function post(url, data, headers, type) {
    data = JSON.stringify(data);
    return new Promise((resolve, reject) => {
      GM_xmlhttpRequest({
        method: "POST",
        url,
        headers,
        data,
        responseType: type || "json",
        onload: (res) => {
          type === "blob" ? resolve(res) : res.response ? resolve(res.response || res.responseText) : reject(res);
        },
        onerror: (err) => {
          reject(err);
        }
      });
    });
  }
  function postData(url = "", data = {}, customHeaders = {}, method = "GET") {
    ({
      method,
      // *GET, POST, PUT, DELETE, etc.
      mode: "cors",
      // no-cors, *cors, same-origin
      cache: "no-cache",
      // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin",
      // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
        ...customHeaders
      },
      redirect: "follow",
      // manual, *follow, error
      referrerPolicy: "no-referrer"
    });
    if (method === "GET") {
      return fetch(url, {
        method: "GET",
        // *GET, POST, PUT, DELETE, etc.
        mode: "cors",
        // no-cors, *cors, same-origin
        cache: "no-cache",
        // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin",
        // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
          ...customHeaders
        },
        redirect: "follow",
        // manual, *follow, error
        referrerPolicy: "no-referrer"
        // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      }).then((response) => response.json());
    } else {
      return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              resolve(JSON.parse(xhr.response));
            } else {
              reject({});
            }
          }
        };
        xhr.open(method, url);
        xhr.setRequestHeader("content-type", "application/json");
        xhr.send(JSON.stringify(data));
      });
    }
  }
  function getHeader() {
    let token = "";
    let captcha = "";
    for (let i = 0; i < 40; i++) {
      let key = window.localStorage.key(i);
      if (key === null)
        break;
      if (key && key.startsWith("credentials")) {
        let tokenData = JSON.parse(window.localStorage.getItem(key));
        token = tokenData.token_type + " " + tokenData.access_token;
        continue;
      }
      if (key && key.startsWith("captcha")) {
        let tokenData = JSON.parse(window.localStorage.getItem(key));
        captcha = tokenData.captcha_token;
      }
    }
    return {
      Authorization: token,
      "x-device-id": window.localStorage.getItem("deviceid"),
      "x-captcha-token": captcha
    };
  }
  async function getList(parent_id) {
    let url;
    if (parent_id === "recent") {
      url = `https://api-drive.mypikpak.com/drive/v1/events?thumbnail_size=SIZE_MEDIUM&limit=100`;
    } else {
      url = `https://api-drive.mypikpak.com/drive/v1/files?thumbnail_size=SIZE_MEDIUM&limit=500&parent_id=${parent_id}&with_audit=true&filters=%7B%22phase%22%3A%7B%22eq%22%3A%22PHASE_TYPE_COMPLETE%22%7D%2C%22trashed%22%3A%7B%22eq%22%3Afalse%7D%7D`;
    }
    const result = await postData(url, {}, getHeader());
    if (parent_id === "recent") {
      return {
        files: (result.events || []).map((event) => event.reference_resource).filter(Boolean)
      };
    } else {
      return result;
    }
  }
  function getDownload(id) {
    for (let i = 0; i < 40; i++) {
      let key = window.localStorage.key(i);
      if (key === null)
        break;
      if (key && key.startsWith("credentials")) {
        let tokenData = JSON.parse(window.localStorage.getItem(key));
        tokenData.token_type + " " + tokenData.access_token;
        continue;
      }
      if (key && key.startsWith("captcha")) {
        let tokenData = JSON.parse(window.localStorage.getItem(key));
        tokenData.captcha_token;
      }
    }
    let header = getHeader();
    return postData("https://api-drive.mypikpak.com/drive/v1/files/" + id + "?", {}, header);
  }
  function pushToAria(url, data) {
    console.log(url, data)
    if (["Android", "IOS"].includes(getPlatform()) && !GM_xmlhttpRequest) {
      return postData(url, data, {}, "POST");
    } else {
      return post(url, data, {}, "");
    }
  }
  for (let i = 0; i < 999; i++) {
    let key = window.localStorage.key(i);
    console.log(key);
  }
  const AriaDownloadDialog_vue_vue_type_style_index_0_scoped_ec37b3a3_lang = "";
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _withScopeId$2 = (n) => (vue.pushScopeId("data-v-ec37b3a3"), n = n(), vue.popScopeId(), n);
  const _hoisted_1$3 = { key: 0 };
  const _hoisted_2$3 = {
    style: { "width": "60%" },
    class: "dialog"
  };
  const _hoisted_3$2 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ vue.createElementVNode("h2", null, "请勾选你要下载的", -1));
  const _hoisted_4$2 = { class: "toolbar" };
  const _hoisted_5$2 = { for: "checkbox" };
  const _hoisted_6$2 = { class: "sort-options" };
  const _hoisted_7$1 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ vue.createElementVNode("label", { for: "sort-by" }, "排序方式:", -1));
  const _hoisted_8$1 = /* @__PURE__ */ vue.createStaticVNode('<option value="name" data-v-ec37b3a3>名称</option><option value="created_time" data-v-ec37b3a3>创建时间</option><option value="modified_time" data-v-ec37b3a3>修改时间</option><option value="size" data-v-ec37b3a3>大小</option><option value="file_category" data-v-ec37b3a3>文件类型</option>', 5);
  const _hoisted_13$1 = [
    _hoisted_8$1
  ];
  const _hoisted_14$1 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ vue.createElementVNode("option", { value: "asc" }, "升序", -1));
  const _hoisted_15$1 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ vue.createElementVNode("option", { value: "desc" }, "降序", -1));
  const _hoisted_16$1 = [
    _hoisted_14$1,
    _hoisted_15$1
  ];
  const _hoisted_17 = { class: "movies" };
  const _hoisted_18 = ["id", "value"];
  const _hoisted_19 = { class: "icon" };
  const _hoisted_20 = { class: "file-name" };
  const _hoisted_21 = { class: "file-info" };
  const _hoisted_22 = { class: "connection-status" };
  const _hoisted_23 = { class: "status-indicator" };
  const _hoisted_24 = { class: "status-text" };
  const _hoisted_25 = ["disabled"];
  const _sfc_main$4 = {
    __name: "AriaDownloadDialog",
    props: {
      show: Boolean
    },
    emits: ["close", "msg", "openConfig"],
    setup(__props, { emit: __emit }) {
      const props = __props;
      const emits = __emit;
      const list = vue.ref([]);
      const selected = vue.ref([]);
      const checkedAll = vue.ref(false);
      const selectedItems = vue.ref([]);
      const isForbidden = vue.ref(false);
      const sortBy = vue.ref("name");
      const sortDirection = vue.ref("asc");
      const connectionState = vue.ref("unknown");
      const isTestingConnection = vue.ref(false);
      const connectionStatus = vue.computed(() => {
        switch (connectionState.value) {
          case "connected":
            return { class: "connected", text: "Aria2连接正常" };
          case "disconnected":
            return { class: "disconnected", text: "Aria2连接失败" };
          case "testing":
            return { class: "testing", text: "正在测试连接..." };
          default:
            return { class: "unknown", text: "Aria2连接状态未知" };
        }
      });
      vue.watch(
        () => props.show,
        (val) => {
          if (val) {
            const tempList = [];
            let parent_id = window.location.href.split("/").pop();
            if (parent_id == "all")
              parent_id = "";
            emits("msg", "开始加载文件列表，请稍等", "info");
            getList(parent_id).then((res) => {
              res.files.forEach((item) => {
                tempList.push({ id: item.id, name: item.name, type: item.kind, created_time: item.created_time, modified_time: item.modified_time, size: item.size, file_category: item.file_category });
              });
              list.value = tempList;
              sortList();
            }).finally(() => {
              emits("msg", "文件列表加载完成", "success");
            });
            setTimeout(() => {
              testConnection();
            }, 500);
          }
        }
      );
      const close = () => {
        selected.value = [];
        checkedAll.value = false;
        isForbidden.value = false;
        emits("close");
      };
      const openConfig = () => {
        emits("openConfig");
      };
      const testConnection = async () => {
        if (isTestingConnection.value)
          return;
        isTestingConnection.value = true;
        connectionState.value = "testing";
        try {
          const host = window.localStorage.getItem("ariaHost") || "";
          const token = window.localStorage.getItem("ariaToken") || "";
          if (!host) {
            throw new Error("请先配置Aria2 RPC地址");
          }
          const payload = {
            jsonrpc: "2.0",
            method: "aria2.getVersion",
            id: 1,
            params: token ? [`token:${token}`] : []
          };
          const response = await pushToAria(host, payload);
          if (response && response.result) {
            connectionState.value = "connected";
          } else {
            connectionState.value = "disconnected";
            emits("msg", "Aria2连接失败，请检查配置", "error");
          }
        } catch (error) {
          connectionState.value = "disconnected";
          emits("msg", `Aria2连接测试失败: ${error.message}`, "error");
        } finally {
          isTestingConnection.value = false;
        }
      };
      vue.onMounted(() => {
        setTimeout(() => {
          testConnection();
        }, 1e3);
      });
      const onCheckAll = () => {
        if (checkedAll.value) {
          selected.value = list.value.map((item, index) => index);
        } else {
          selected.value = [];
        }
      };
      const onCheck = () => {
        checkedAll.value = selected.value.length === list.value.length;
      };
      const sortList = () => {
        list.value.sort((a, b) => {
          if (a.type === "drive#folder" && b.type !== "drive#folder") {
            return -1;
          }
          if (a.type !== "drive#folder" && b.type === "drive#folder") {
            return 1;
          }
          let aValue = a[sortBy.value];
          let bValue = b[sortBy.value];
          if (sortBy.value === "size") {
            aValue = parseInt(aValue);
            bValue = parseInt(bValue);
          } else if (sortBy.value === "created_time" || sortBy.value === "modified_time") {
            aValue = new Date(aValue).getTime();
            bValue = new Date(bValue).getTime();
          }
          let comparison = 0;
          if (aValue > bValue) {
            comparison = 1;
          } else if (aValue < bValue) {
            comparison = -1;
          }
          return sortDirection.value === "asc" ? comparison : -comparison;
        });
        updateSelectedIndices();
      };
      const formatBytes = (bytes, decimals = 2) => {
        if (bytes === 0)
          return "0 Bytes";
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
      };
      const formatFileInfo = (item) => {
        switch (sortBy.value) {
          case "size":
            return item.size ? formatBytes(parseInt(item.size)) : "N/A";
          case "created_time":
            return item.created_time ? new Date(item.created_time).toLocaleString() : "N/A";
          case "modified_time":
            return item.modified_time ? new Date(item.modified_time).toLocaleString() : "N/A";
          case "file_category":
            return item.file_category || "N/A";
          default:
            return "";
        }
      };
      const updateSelectedIndices = () => {
        const currentlySelectedIds = new Set(selected.value.map((index) => list.value[index].id));
        selected.value = [];
        list.value.forEach((item, index) => {
          if (currentlySelectedIds.has(item.id)) {
            selected.value.push(index);
          }
        });
      };
      const getAllList = async () => {
        emits("msg", "开始获取文件内容", "info");
        const initialSelectedItems = [];
        for (const index of selected.value) {
          initialSelectedItems.push(list.value[index]);
        }
        const allFiles = [];
        const foldersToProcess = [];
        initialSelectedItems.forEach((item) => {
          if (item.type === "drive#folder") {
            foldersToProcess.push({ id: item.id, name: item.name, path: item.name });
          } else {
            allFiles.push({ ...item, path: "" });
          }
        });
        let processedCount = 0;
        while (foldersToProcess.length > 0) {
          const currentFolder = foldersToProcess.shift();
          processedCount++;
          emits("msg", `正在扫描第 ${processedCount} 个文件夹: ${currentFolder.name}`, "info");
          try {
            const result = await getList(currentFolder.id);
            if (result.files) {
              for (const file of result.files) {
                if (file.kind === "drive#folder") {
                  foldersToProcess.push({ id: file.id, name: file.name, path: `${currentFolder.path}/${file.name}` });
                } else {
                  allFiles.push({ ...file, path: currentFolder.path });
                }
              }
            }
          } catch (e) {
            emits("msg", `获取文件夹 ${currentFolder.name} 内容失败`, "error");
            console.error(e);
          }
        }
        selectedItems.value = allFiles;
        emits("msg", `文件获取完毕，共${allFiles.length}个文件。`, "success");
      };
      const pushBefore = async () => {
        if (!isForbidden.value) {
          isForbidden.value = true;
          await getAllList();
          push();
        } else {
          emits("msg", "已经开始推送了", "warning");
        }
      };

      // fix 将任务按 30-50 个一组 进行切割推送。这样既保证了速度，又极其稳定。
      const push = async () => {
        const allItems = [...selectedItems.value];
        if (allItems.length === 0) return;

        // 配置获取 (保持不变...)
        const ariaHost = window.localStorage.getItem("ariaHost") || "";
        const ariaPath = window.localStorage.getItem("ariaPath") || "";
        const ariaToken = window.localStorage.getItem("ariaToken") || "";
        const ariaParams = window.localStorage.getItem("ariaParams") || "";

        // 分批处理函数：将数组按 size 切分
        const chunk = (arr, size) => Array.from({ length: Math.ceil(arr.length / size) }, (v, i) => arr.slice(i * size, i * size + size));

        const batches = chunk(allItems, 40); // 每 40 个为一组，最稳妥
        let totalSuccess = 0;

        for (let [index, batchItems] of batches.entries()) {
          try {
            emits("msg", `正在推送第 ${index + 1}/${batches.length} 批次...`, "info");

            // 1. 并发获取当前批次的下载链接
            const downloadResults = await Promise.allSettled(batchItems.map(item => getDownload(item.id)));

            // 2. 组装当前批次的 multicall
            const calls = [];
            downloadResults.forEach((result, idx) => {
              if (result.status === "fulfilled" && !result.value.error_description) {
                const res = result.value;
                const item = batchItems[idx];

                // 路径逻辑 (带文件夹层级)
                let finalOut = res.name;
                if (item.path) {
                  let relPath = item.path.startsWith("/") ? item.path.substring(1) : item.path;
                  finalOut = relPath.endsWith(res.name) ? relPath : (relPath.endsWith("/") ? relPath + res.name : relPath + "/" + res.name);
                }

                let options = { "out": finalOut };
                if (ariaPath) options.dir = ariaPath;

                // 组装参数
                let methodParams = [[res.web_content_link], options];
                if (ariaToken) methodParams.unshift(`token:${ariaToken}`);

                calls.push({ methodName: "aria2.addUri", params: methodParams });
              }
            });

            if (calls.length === 0) continue;

            // 3. 推送当前批次
            const multiCallData = {
              id: Date.now(),
              jsonrpc: "2.0",
              method: "system.multicall",
              params: [calls]
            };

            const response = await pushToAria(ariaHost, multiCallData);
            const resObj = typeof response === "string" ? JSON.parse(response) : response;

            if (resObj.result) {
              totalSuccess += resObj.result.length;
            }

            // 每批次之间稍作停顿 (500ms)，防止 RPC 瞬间过载
            await new Promise(resolve => setTimeout(resolve, 500));

          } catch (e) {
            console.error(`第 ${index + 1} 批次失败:`, e);
            emits("msg", `第 ${index + 1} 批次部分失败`, "warning");
          }
        }

        emits("msg", `全部推送结束，共成功 ${totalSuccess} 个`, "success");
        setTimeout(() => close(), 2000);
      };





      return (_ctx, _cache) => {
        return __props.show ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_1$3, [
          vue.createElementVNode("div", {
            class: "dialog-overlay",
            onClick: close
          }),
          vue.createElementVNode("div", _hoisted_2$3, [
            _hoisted_3$2,
            vue.createElementVNode("div", {
              class: "close",
              onClick: close
            }, "×"),
            vue.createElementVNode("div", _hoisted_4$2, [
              vue.createElementVNode("label", _hoisted_5$2, [
                vue.withDirectives(vue.createElementVNode("input", {
                  onChange: onCheckAll,
                  type: "checkbox",
                  id: "checkbox",
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => checkedAll.value = $event)
                }, null, 544), [
                  [vue.vModelCheckbox, checkedAll.value]
                ]),
                vue.createTextVNode(" 全选 ")
              ]),
              vue.createElementVNode("div", _hoisted_6$2, [
                _hoisted_7$1,
                vue.withDirectives(vue.createElementVNode("select", {
                  id: "sort-by",
                  "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => sortBy.value = $event),
                  onChange: sortList
                }, _hoisted_13$1, 544), [
                  [vue.vModelSelect, sortBy.value]
                ]),
                vue.withDirectives(vue.createElementVNode("select", {
                  id: "sort-direction",
                  "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => sortDirection.value = $event),
                  onChange: sortList
                }, _hoisted_16$1, 544), [
                  [vue.vModelSelect, sortDirection.value]
                ])
              ])
            ]),
            vue.createElementVNode("ul", _hoisted_17, [
              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(list.value, (item, index) => {
                return vue.openBlock(), vue.createElementBlock("li", {
                  key: item.id
                }, [
                  vue.withDirectives(vue.createElementVNode("input", {
                    onChange: onCheck,
                    type: "checkbox",
                    id: item.id,
                    value: index,
                    "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => selected.value = $event)
                  }, null, 40, _hoisted_18), [
                    [vue.vModelCheckbox, selected.value]
                  ]),
                  vue.createElementVNode("span", _hoisted_19, vue.toDisplayString(item.type === "drive#folder" ? "📁" : "📄"), 1),
                  vue.createElementVNode("span", _hoisted_20, vue.toDisplayString(item.name), 1),
                  vue.createElementVNode("span", _hoisted_21, vue.toDisplayString(formatFileInfo(item)), 1)
                ]);
              }), 128))
            ]),
            vue.createElementVNode("div", _hoisted_22, [
              vue.createElementVNode("div", _hoisted_23, [
                vue.createElementVNode("div", {
                  class: vue.normalizeClass(["status-dot", connectionStatus.value.class])
                }, null, 2),
                vue.createElementVNode("span", _hoisted_24, vue.toDisplayString(connectionStatus.value.text), 1)
              ]),
              vue.createElementVNode("button", {
                class: "test-btn",
                onClick: testConnection,
                disabled: isTestingConnection.value
              }, vue.toDisplayString(isTestingConnection.value ? "测试中..." : "测试连接"), 9, _hoisted_25)
            ]),
            vue.createElementVNode("div", { class: "footer" }, [
              vue.createElementVNode("div", {
                class: "btn el-button el-button--secondary",
                onClick: openConfig
              }, "配置aria2"),
              vue.createElementVNode("div", {
                class: "btn el-button el-button--primary",
                onClick: pushBefore
              }, "推送到aria2")
            ])
          ])
        ])) : vue.createCommentVNode("", true);
      };
    }
  };
  const AriaDownloadDialog = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-ec37b3a3"]]);
  const AriaConfigDialog_vue_vue_type_style_index_0_scoped_c3a3479c_lang = "";
  const _withScopeId$1 = (n) => (vue.pushScopeId("data-v-c3a3479c"), n = n(), vue.popScopeId(), n);
  const _hoisted_1$2 = { key: 0 };
  const _hoisted_2$2 = {
    style: { "width": "400px" },
    class: "dialog"
  };
  const _hoisted_3$1 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ vue.createElementVNode("h2", null, "请配置你的aria2", -1));
  const _hoisted_4$1 = { class: "connection-status" };
  const _hoisted_5$1 = { class: "status-indicator" };
  const _hoisted_6$1 = { class: "status-text" };
  const _hoisted_7 = ["disabled"];
  const _hoisted_8 = { class: "config-list" };
  const _hoisted_9 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ vue.createElementVNode("div", { class: "label" }, "RPC地址", -1));
  const _hoisted_10 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ vue.createElementVNode("p", { class: "guidance" }, "Aria2 RPC服务的地址，通常是 `http://127.0.0.1:6800/jsonrpc`。如果你在Docker中运行，可能需要使用宿主机的IP地址。", -1));
  const _hoisted_11 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ vue.createElementVNode("div", { class: "label" }, "RPC密钥", -1));
  const _hoisted_12 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ vue.createElementVNode("p", { class: "guidance" }, "Aria2 RPC的密钥，如果你在Aria2配置中设置了 `rpc-secret`，请在此填写。如果没有设置，请留空。", -1));
  const _hoisted_13 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ vue.createElementVNode("div", { class: "label" }, "下载路径", -1));
  const _hoisted_14 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ vue.createElementVNode("p", { class: "guidance" }, "文件在服务器上的保存路径。例如：`/downloads/` (Linux) 或 `D:\\Downloads` (Windows)\\。请确保Aria2有写入该目录的权限。", -1));
  const _hoisted_15 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ vue.createElementVNode("div", { class: "label" }, "其他参数", -1));
  const _hoisted_16 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ vue.createElementVNode("p", { class: "guidance" }, "Aria2的额外参数，以分号 `;` 分隔，例如 `user-agent=Mozilla;split=10`。这些参数会直接传递给Aria2。", -1));
  const _sfc_main$3 = {
    __name: "AriaConfigDialog",
    props: {
      show: Boolean
    },
    emits: ["close", "msg"],
    setup(__props, { emit: __emit }) {
      const emits = __emit;
      const close = () => {
        emits("close");
      };
      const form = vue.reactive({
        host: window.localStorage.getItem("ariaHost") || "",
        path: window.localStorage.getItem("ariaPath") || "",
        token: window.localStorage.getItem("ariaToken") || "",
        params: window.localStorage.getItem("ariaParams") || ""
      });
      const connectionState = vue.ref("unknown");
      const isTestingConnection = vue.ref(false);
      const connectionStatus = vue.computed(() => {
        switch (connectionState.value) {
          case "connected":
            return { class: "connected", text: "Aria2连接正常" };
          case "disconnected":
            return { class: "disconnected", text: "Aria2连接失败" };
          case "testing":
            return { class: "testing", text: "正在测试连接..." };
          default:
            return { class: "unknown", text: "连接状态未知" };
        }
      });
      const testConnection = async () => {
        if (!form.host) {
          emits("msg", "请先填写RPC地址", "warning");
          return;
        }
        isTestingConnection.value = true;
        connectionState.value = "testing";
        try {
          const rpcUrl = form.host;
          const rpcToken = form.token ? `token:${form.token}` : "";
          const payload = {
            jsonrpc: "2.0",
            method: "aria2.getVersion",
            id: 1,
            params: rpcToken ? [rpcToken] : []
          };
          const response = await pushToAria(rpcUrl, payload);
          if (response && response.result) {
            connectionState.value = "connected";
          } else {
            connectionState.value = "disconnected";
            emits("msg", "Aria2连接失败，请检查配置", "error");
          }
        } catch (error) {
          console.error("Aria2连接测试失败:", error);
          connectionState.value = "disconnected";
          emits("msg", `连接失败: ${error.message || "请检查RPC地址和密钥"}`, "error");
        } finally {
          isTestingConnection.value = false;
        }
      };
      const save = async () => {
        if (form.path && !form.path.endsWith("/") && !form.path.endsWith("\\")) {
          form.path += "/";
        }
        window.localStorage.setItem("ariaHost", form.host);
        window.localStorage.setItem("ariaPath", form.path);
        window.localStorage.setItem("ariaToken", form.token);
        window.localStorage.setItem("ariaParams", form.params);
        emits("msg", "配置保存成功！", "success");
        close();
      };
      vue.onMounted(() => {
        if (form.host) {
          testConnection();
        }
      });
      return (_ctx, _cache) => {
        return __props.show ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_1$2, [
          vue.createElementVNode("div", {
            class: "dialog-overlay",
            onClick: close
          }),
          vue.createElementVNode("div", _hoisted_2$2, [
            _hoisted_3$1,
            vue.createElementVNode("div", {
              class: "close",
              onClick: close
            }, "×"),
            vue.createElementVNode("div", _hoisted_4$1, [
              vue.createElementVNode("div", _hoisted_5$1, [
                vue.createElementVNode("div", {
                  class: vue.normalizeClass(["status-dot", connectionStatus.value.class])
                }, null, 2),
                vue.createElementVNode("span", _hoisted_6$1, vue.toDisplayString(connectionStatus.value.text), 1)
              ]),
              vue.createElementVNode("button", {
                class: "test-btn",
                onClick: testConnection,
                disabled: isTestingConnection.value
              }, vue.toDisplayString(isTestingConnection.value ? "测试中..." : "测试连接"), 9, _hoisted_7)
            ]),
            vue.createElementVNode("ul", _hoisted_8, [
              vue.createElementVNode("li", null, [
                _hoisted_9,
                vue.withDirectives(vue.createElementVNode("input", {
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => form.host = $event),
                  type: "text",
                  placeholder: "http://127.0.0.1:6800/jsonrpc"
                }, null, 512), [
                  [vue.vModelText, form.host]
                ]),
                _hoisted_10
              ]),
              vue.createElementVNode("li", null, [
                _hoisted_11,
                vue.withDirectives(vue.createElementVNode("input", {
                  "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => form.token = $event),
                  type: "text",
                  placeholder: "没有请留空"
                }, null, 512), [
                  [vue.vModelText, form.token]
                ]),
                _hoisted_12
              ]),
              vue.createElementVNode("li", null, [
                _hoisted_13,
                vue.withDirectives(vue.createElementVNode("input", {
                  "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => form.path = $event),
                  type: "text",
                  placeholder: "C:/Users/admin/Downloads/"
                }, null, 512), [
                  [vue.vModelText, form.path]
                ]),
                _hoisted_14
              ]),
              vue.createElementVNode("li", null, [
                _hoisted_15,
                vue.withDirectives(vue.createElementVNode("input", {
                  "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => form.params = $event),
                  type: "text",
                  placeholder: "user-agent=xxx;header=xxx"
                }, null, 512), [
                  [vue.vModelText, form.params]
                ]),
                _hoisted_16
              ])
            ]),
            vue.createElementVNode("div", { class: "footer" }, [
              vue.createElementVNode("div", {
                class: "btn el-button el-button--primary",
                onClick: save
              }, "保存")
            ])
          ])
        ])) : vue.createCommentVNode("", true);
      };
    }
  };
  const AriaConfigDialog = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-c3a3479c"]]);
  const Aria2Toast_vue_vue_type_style_index_0_scoped_ef33c69b_lang = "";
  const _hoisted_1$1 = { class: "aria2-tip__icon" };
  const _hoisted_2$1 = { key: 0 };
  const _hoisted_3 = { key: 1 };
  const _hoisted_4 = { key: 2 };
  const _hoisted_5 = { key: 3 };
  const _hoisted_6 = { class: "aria2-tip__content" };
  const _sfc_main$2 = {
    __name: "Aria2Toast",
    setup(__props, { expose: __expose }) {
      const show = vue.ref(false);
      const type = vue.ref("info");
      let timer = null;
      const open = (toastType = "info") => {
        if (timer) {
          clearTimeout(timer);
        }
        type.value = toastType;
        show.value = true;
        timer = setTimeout(() => {
          show.value = false;
        }, 3e3);
      };
      __expose({ open });
      return (_ctx, _cache) => {
        return show.value ? (vue.openBlock(), vue.createElementBlock("div", {
          key: 0,
          class: vue.normalizeClass(["aria2-tip", `aria2-tip--${type.value}`])
        }, [
          vue.createElementVNode("div", _hoisted_1$1, [
            type.value === "success" ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_2$1, "✓")) : type.value === "error" ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_3, "✕")) : type.value === "warning" ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_4, "⚠")) : type.value === "info" ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_5, "ℹ")) : vue.createCommentVNode("", true)
          ]),
          vue.createElementVNode("div", _hoisted_6, [
            vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
          ])
        ], 2)) : vue.createCommentVNode("", true);
      };
    }
  };
  const Aria2Toast = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-ef33c69b"]]);
  const FloatingWindow_vue_vue_type_style_index_0_scoped_4681666b_lang = "";
  const _withScopeId = (n) => (vue.pushScopeId("data-v-4681666b"), n = n(), vue.popScopeId(), n);
  const _hoisted_1 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ vue.createElementVNode("svg", {
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }, [
    /* @__PURE__ */ vue.createElementVNode("path", { d: "M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" })
  ], -1));
  const _hoisted_2 = [
    _hoisted_1
  ];
  const _sfc_main$1 = {
    __name: "FloatingWindow",
    props: {
      show: {
        type: Boolean,
        default: true
      }
    },
    emits: ["download"],
    setup(__props, { emit: __emit }) {
      const emit = __emit;
      const floatingWindow = vue.ref(null);
      const isDragging = vue.ref(false);
      const dragOffset = vue.ref({ x: 0, y: 0 });
      const position = vue.ref({ x: 0, y: 150 });
      const hasDragged = vue.ref(false);
      const startDrag = (e) => {
        isDragging.value = true;
        hasDragged.value = false;
        const rect = floatingWindow.value.getBoundingClientRect();
        dragOffset.value = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        };
        document.addEventListener("mousemove", onDrag);
        document.addEventListener("mouseup", stopDrag);
        e.preventDefault();
      };
      const onDrag = (e) => {
        if (!isDragging.value)
          return;
        hasDragged.value = true;
        const newX = e.clientX - dragOffset.value.x;
        const newY = e.clientY - dragOffset.value.y;
        const maxX = window.innerWidth - floatingWindow.value.offsetWidth;
        const maxY = window.innerHeight - floatingWindow.value.offsetHeight;
        position.value.x = Math.max(0, Math.min(newX, maxX));
        position.value.y = Math.max(0, Math.min(newY, maxY));
      };
      const stopDrag = () => {
        isDragging.value = false;
        document.removeEventListener("mousemove", onDrag);
        document.removeEventListener("mouseup", stopDrag);
      };
      const handleDownload = (e) => {
        e.stopPropagation();
        e.preventDefault();
        if (!hasDragged.value && !isDragging.value) {
          emit("download");
        }
      };
      const adjustPosition = () => {
        const maxX = window.innerWidth - 60;
        const maxY = window.innerHeight - 60;
        position.value.x = Math.max(0, Math.min(position.value.x, maxX));
        position.value.y = Math.max(0, Math.min(position.value.y, maxY));
      };
      const handleResize = () => {
        adjustPosition();
      };
      vue.onMounted(() => {
        position.value.x = window.innerWidth - 80;
        position.value.y = 150;
        adjustPosition();
        window.addEventListener("resize", handleResize);
      });
      vue.onUnmounted(() => {
        document.removeEventListener("mousemove", onDrag);
        document.removeEventListener("mouseup", stopDrag);
        window.removeEventListener("resize", handleResize);
      });
      return (_ctx, _cache) => {
        return __props.show ? (vue.openBlock(), vue.createElementBlock("div", {
          key: 0,
          ref_key: "floatingWindow",
          ref: floatingWindow,
          class: vue.normalizeClass(["floating-window", { dragging: isDragging.value }]),
          style: vue.normalizeStyle({ left: position.value.x + "px", top: position.value.y + "px" })
        }, [
          vue.createElementVNode("div", {
            class: "download-button",
            onClick: handleDownload,
            onMousedown: vue.withModifiers(startDrag, ["stop"])
          }, _hoisted_2, 32)
        ], 6)) : vue.createCommentVNode("", true);
      };
    }
  };
  const FloatingWindow = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-4681666b"]]);
  const App_vue_vue_type_style_index_0_scoped_efdfc046_lang = "";
  const _sfc_main = {
    __name: "App",
    setup(__props) {
      const downloadShow = vue.ref(false);
      const configShow = vue.ref(false);
      const tip = vue.ref("");
      const toastRef = vue.ref(null);
      const showPlugin = vue.ref(false);
      const showToast = (val, type = "info") => {
        tip.value = val;
        toastRef.value.open(type);
      };
      if (location.pathname !== "/") {
        showPlugin.value = true;
      }
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
          showPlugin.value ? (vue.openBlock(), vue.createBlock(FloatingWindow, {
            key: 0,
            onDownload: _cache[0] || (_cache[0] = ($event) => downloadShow.value = true)
          })) : vue.createCommentVNode("", true),
          vue.createVNode(AriaDownloadDialog, {
            show: downloadShow.value,
            onClose: _cache[1] || (_cache[1] = ($event) => downloadShow.value = false),
            onOpenConfig: _cache[2] || (_cache[2] = ($event) => configShow.value = true),
            onMsg: showToast
          }, null, 8, ["show"]),
          vue.createVNode(AriaConfigDialog, {
            show: configShow.value,
            onClose: _cache[3] || (_cache[3] = ($event) => configShow.value = false),
            onMsg: showToast
          }, null, 8, ["show"]),
          vue.createVNode(Aria2Toast, {
            ref_key: "toastRef",
            ref: toastRef
          }, {
            default: vue.withCtx(() => [
              vue.createTextVNode(vue.toDisplayString(tip.value), 1)
            ]),
            _: 1
          }, 512)
        ], 64);
      };
    }
  };
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-efdfc046"]]);
  document.cookie = "pp_access_to_visit=true";
  setTimeout(() => {
    vue.createApp(App).mount(
      (() => {
        let pikpakContainer = document.getElementById("app");
        const app = document.createElement("div");
        document.body.insertBefore(app, pikpakContainer);
        return app;
      })()
    );
  }, 1e3);
})(Vue);
