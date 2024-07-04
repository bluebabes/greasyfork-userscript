// ==UserScript==
// @name               Twitter Web Exporter
// @namespace          https://github.com/prinsss
// @version            1.1.0
// @author             prin <hi@prin.studio>
// @description        Export tweets, bookmarks, lists and much more to JSON/CSV/HTML from Twitter(X) web app.
// @description:zh-CN  从 Twitter(X) 网页版导出推文、书签、列表等各种数据，支持导出 JSON/CSV/HTML。
// @description:zh-TW  從 Twitter(X) 網頁版匯出推文、書籤、列表等各種資料，支援匯出 JSON/CSV/HTML。
// @description:ja     Twitter(X) ブラウザ版からツイート、ブックマーク、リストなどを取得し JSON/CSV/HTML に出力します。
// @license            MIT
// @icon               data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABmklEQVR4Ae3XA4wcARSA4dq2bUQ1g9pRbVtBzai2otpug9pxUttn2753/3m9Ozq/5NsdvvfGM6VKoshE8/ORFbAMbxCGWHzDHjS2sXxPlM0eKYclGoq3w1eIHVGYikaYg6e4ZppgAgQrVBSvDw+IEylIhSAATUyTHIYgFdsUNnAGosAfDMccLMtOchli4g7quFC8FhIhCsRD8Bk1sxMdgVjwxRyUdtDABIgKH9DQNNEkiB1fMB9VbDSwEKLQJ1S1TFQRXhAHYnADy9ETdTEeotAze7tzNJIhCiRBFLpnq/hmzMR65UkVO2WrgaOQPLLW3u6XPDLAVgOl8R5isEhUtHcSdkEoxEBXnN3ZuuMbxCDDnTVQF52xBcEQHX1BaWcNtDLwMpzg6tNtN0RnD5U8XsviGkQnYWih9CWjNBbDHaJBMsZqec8rjV54B1EoFXO0Fh+DrxCFEjBTTdFy6IvNGu4Hf9FXSdGheAUvjZdgLPajqtp3+jl4jVSIAgHYjRZ6fWC0wSpcwScEQZCMUPzEfezEYJQrVRKFOdIAZGq1QBG8EiYAAAAASUVORK5CYII=
// @homepage           https://github.com/prinsss/twitter-web-exporter
// @homepageURL        https://github.com/prinsss/twitter-web-exporter
// @supportURL         https://github.com/prinsss/twitter-web-exporter/issues
// @downloadURL        https://github.com/prinsss/twitter-web-exporter/releases/latest/download/twitter-web-exporter.user.js
// @updateURL          https://github.com/prinsss/twitter-web-exporter/releases/latest/download/twitter-web-exporter.user.js
// @match              *://twitter.com/*
// @match              *://x.com/*
// @require            https://cdn.jsdelivr.net/npm/dayjs@1.11.10/dayjs.min.js
// @require            https://cdn.jsdelivr.net/npm/i18next@23.11.1/i18next.min.js
// @require            https://cdn.jsdelivr.net/npm/preact@10.19.3/dist/preact.min.js
// @require            https://cdn.jsdelivr.net/npm/preact@10.19.3/hooks/dist/hooks.umd.js
// @require            https://cdn.jsdelivr.net/npm/@preact/signals-core@1.5.1/dist/signals-core.min.js
// @require            https://cdn.jsdelivr.net/npm/@preact/signals@1.2.2/dist/signals.min.js
// @require            https://cdn.jsdelivr.net/npm/@tanstack/table-core@8.11.2/build/umd/index.production.js
// @grant              GM_addStyle
// @grant              unsafeWindow
// @run-at             document-start
// ==/UserScript==

(t=>{if(typeof GM_addStyle=="function"){GM_addStyle(t);return}const o=document.createElement("style");o.textContent=t,document.head.append(o)})(` #twe-root *,#twe-root :before,#twe-root :after{box-sizing:border-box;border-width:0;border-style:solid;border-color:#e5e7eb}#twe-root :before,#twe-root :after{--tw-content: ""}#twe-root,#twe-root :host{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;-o-tab-size:4;tab-size:4;font-family:ui-sans-serif,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji";font-feature-settings:normal;font-variation-settings:normal;-webkit-tap-highlight-color:transparent}#twe-root body{margin:0;line-height:inherit}#twe-root hr{height:0;color:inherit;border-top-width:1px}#twe-root abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}#twe-root h1,#twe-root h2,#twe-root h3,#twe-root h4,#twe-root h5,#twe-root h6{font-size:inherit;font-weight:inherit}#twe-root a{color:inherit;text-decoration:inherit}#twe-root b,#twe-root strong{font-weight:bolder}#twe-root code,#twe-root kbd,#twe-root samp,#twe-root pre{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;font-feature-settings:normal;font-variation-settings:normal;font-size:1em}#twe-root small{font-size:80%}#twe-root sub,#twe-root sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}#twe-root sub{bottom:-.25em}#twe-root sup{top:-.5em}#twe-root table{text-indent:0;border-color:inherit;border-collapse:collapse}#twe-root button,#twe-root input,#twe-root optgroup,#twe-root select,#twe-root textarea{font-family:inherit;font-feature-settings:inherit;font-variation-settings:inherit;font-size:100%;font-weight:inherit;line-height:inherit;color:inherit;margin:0;padding:0}#twe-root button,#twe-root select{text-transform:none}#twe-root button,#twe-root [type=button],#twe-root [type=reset],#twe-root [type=submit]{-webkit-appearance:button;background-color:transparent;background-image:none}#twe-root :-moz-focusring{outline:auto}#twe-root :-moz-ui-invalid{box-shadow:none}#twe-root progress{vertical-align:baseline}#twe-root ::-webkit-inner-spin-button,#twe-root ::-webkit-outer-spin-button{height:auto}#twe-root [type=search]{-webkit-appearance:textfield;outline-offset:-2px}#twe-root ::-webkit-search-decoration{-webkit-appearance:none}#twe-root ::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}#twe-root summary{display:list-item}#twe-root blockquote,#twe-root dl,#twe-root dd,#twe-root h1,#twe-root h2,#twe-root h3,#twe-root h4,#twe-root h5,#twe-root h6,#twe-root hr,#twe-root figure,#twe-root p,#twe-root pre{margin:0}#twe-root fieldset{margin:0;padding:0}#twe-root legend{padding:0}#twe-root ol,#twe-root ul,#twe-root menu{list-style:none;margin:0;padding:0}#twe-root dialog{padding:0}#twe-root textarea{resize:vertical}#twe-root input::-moz-placeholder,#twe-root textarea::-moz-placeholder{opacity:1;color:#9ca3af}#twe-root input::placeholder,#twe-root textarea::placeholder{opacity:1;color:#9ca3af}#twe-root button,#twe-root [role=button]{cursor:pointer}#twe-root :disabled{cursor:default}#twe-root img,#twe-root svg,#twe-root video,#twe-root canvas,#twe-root audio,#twe-root iframe,#twe-root embed,#twe-root object{display:block;vertical-align:middle}#twe-root img,#twe-root video{max-width:100%;height:auto}#twe-root [hidden]{display:none}#twe-root,#twe-root [data-theme]{background-color:var(--fallback-b1,oklch(var(--b1)/1));color:var(--fallback-bc,oklch(var(--bc)/1))}@supports not (color: oklch(0 0 0)){#twe-root{color-scheme:light;--fallback-p: #491eff;--fallback-pc: #d4dbff;--fallback-s: #ff41c7;--fallback-sc: #fff9fc;--fallback-a: #00cfbd;--fallback-ac: #00100d;--fallback-n: #2b3440;--fallback-nc: #d7dde4;--fallback-b1: #ffffff;--fallback-b2: #e5e6e6;--fallback-b3: #e5e6e6;--fallback-bc: #1f2937;--fallback-in: #00b3f0;--fallback-inc: #000000;--fallback-su: #00ca92;--fallback-suc: #000000;--fallback-wa: #ffc22d;--fallback-wac: #000000;--fallback-er: #ff6f70;--fallback-erc: #000000}@media (prefers-color-scheme: dark){#twe-root{color-scheme:dark;--fallback-p: #7582ff;--fallback-pc: #050617;--fallback-s: #ff71cf;--fallback-sc: #190211;--fallback-a: #00c7b5;--fallback-ac: #000e0c;--fallback-n: #2a323c;--fallback-nc: #a6adbb;--fallback-b1: #1d232a;--fallback-b2: #191e24;--fallback-b3: #15191e;--fallback-bc: #a6adbb;--fallback-in: #00b3f0;--fallback-inc: #000000;--fallback-su: #00ca92;--fallback-suc: #000000;--fallback-wa: #ffc22d;--fallback-wac: #000000;--fallback-er: #ff6f70;--fallback-erc: #000000}}}#twe-root{-webkit-tap-highlight-color:transparent}#twe-root{color-scheme:light;--in: .7206 .191 231.6;--su: 64.8% .15 160;--wa: .8471 .199 83.87;--er: .7176 .221 22.18;--pc: .152344 .017892 200.026556;--sc: .15787 .020249 356.29965;--ac: .158762 .029206 78.618794;--nc: .847148 .013247 313.189598;--inc: 0 0 0;--suc: 0 0 0;--wac: 0 0 0;--erc: 0 0 0;--rounded-box: 16px;--rounded-badge: 30.4px;--animation-btn: .25s;--animation-input: .2s;--btn-focus-scale: .95;--border-btn: 1px;--p: .76172 .089459 200.026556;--s: .789351 .101246 356.29965;--a: .793811 .146032 78.618794;--n: .235742 .066235 313.189598;--b1: .977882 .00418 56.375637;--b2: .939822 .007638 61.449292;--b3: .915861 .006811 53.440502;--bc: .235742 .066235 313.189598;--rounded-btn: 30.4px;--tab-border: 2px;--tab-radius: 11.2px}@media (prefers-color-scheme: dark){#twe-root{color-scheme:dark;--b2: .268053 .020556 277.508664;--b3: .247877 .019009 277.508664;--pc: .150922 .036614 346.812432;--sc: .148405 .029709 301.883095;--ac: .166785 .024826 66.558491;--nc: .878891 .006515 275.524078;--inc: .176526 .018676 212.846491;--suc: .174199 .043903 148.024881;--wac: .191068 .026849 112.757109;--erc: .136441 .041266 24.430965;--rounded-box: 16px;--rounded-btn: 8px;--rounded-badge: 30.4px;--animation-btn: .25s;--animation-input: .2s;--btn-focus-scale: .95;--border-btn: 1px;--tab-border: 1px;--tab-radius: 8px;--p: .754611 .18307 346.812432;--s: .742023 .148546 301.883095;--a: .833927 .124132 66.558491;--n: .394456 .032576 275.524078;--b1: .288229 .022103 277.508664;--bc: .977477 .007913 106.545019;--in: .88263 .09338 212.846491;--su: .870995 .219516 148.024881;--wa: .955338 .134246 112.757109;--er: .682204 .206328 24.430965}}#twe-root [data-theme=cupcake]{color-scheme:light;--in: .7206 .191 231.6;--su: 64.8% .15 160;--wa: .8471 .199 83.87;--er: .7176 .221 22.18;--pc: .152344 .017892 200.026556;--sc: .15787 .020249 356.29965;--ac: .158762 .029206 78.618794;--nc: .847148 .013247 313.189598;--inc: 0 0 0;--suc: 0 0 0;--wac: 0 0 0;--erc: 0 0 0;--rounded-box: 16px;--rounded-badge: 30.4px;--animation-btn: .25s;--animation-input: .2s;--btn-focus-scale: .95;--border-btn: 1px;--p: .76172 .089459 200.026556;--s: .789351 .101246 356.29965;--a: .793811 .146032 78.618794;--n: .235742 .066235 313.189598;--b1: .977882 .00418 56.375637;--b2: .939822 .007638 61.449292;--b3: .915861 .006811 53.440502;--bc: .235742 .066235 313.189598;--rounded-btn: 30.4px;--tab-border: 2px;--tab-radius: 11.2px}#twe-root [data-theme=dark]{color-scheme:dark;--in: .7206 .191 231.6;--su: 64.8% .15 160;--wa: .8471 .199 83.87;--er: .7176 .221 22.18;--pc: .13138 .0392 275.75;--sc: .1496 .052 342.55;--ac: .14902 .0334 183.61;--inc: 0 0 0;--suc: 0 0 0;--wac: 0 0 0;--erc: 0 0 0;--rounded-box: 16px;--rounded-btn: 8px;--rounded-badge: 30.4px;--animation-btn: .25s;--animation-input: .2s;--btn-focus-scale: .95;--border-btn: 1px;--tab-border: 1px;--tab-radius: 8px;--p: .6569 .196 275.75;--s: .748 .26 342.55;--a: .7451 .167 183.61;--n: .313815 .021108 254.139175;--nc: .746477 .0216 264.435964;--b1: .253267 .015896 252.417568;--b2: .232607 .013807 253.100675;--b3: .211484 .01165 254.087939;--bc: .746477 .0216 264.435964}#twe-root [data-theme=emerald]{color-scheme:light;--b2: .93 0 0;--b3: .86 0 0;--in: .7206 .191 231.6;--su: 64.8% .15 160;--wa: .8471 .199 83.87;--er: .7176 .221 22.18;--inc: 0 0 0;--suc: 0 0 0;--wac: 0 0 0;--erc: 0 0 0;--rounded-box: 16px;--rounded-btn: 8px;--rounded-badge: 30.4px;--border-btn: 1px;--tab-border: 1px;--tab-radius: 8px;--p: .766626 .135433 153.450024;--pc: .333872 .040618 162.240129;--s: .613028 .202368 261.294233;--sc: 1 0 0;--a: .727725 .149783 33.200363;--ac: 0 0 0;--n: .355192 .032071 262.988584;--nc: .984625 .001706 247.838921;--b1: 1 0 0;--bc: .355192 .032071 262.988584;--animation-btn: 0;--animation-input: 0;--btn-focus-scale: 1}#twe-root [data-theme=cyberpunk]{color-scheme:light;--b2: .878943 .16647 104.32;--b3: .812786 .15394 104.32;--in: .7206 .191 231.6;--su: 64.8% .15 160;--wa: .8471 .199 83.87;--er: .7176 .221 22.18;--bc: .18902 .0358 104.32;--pc: .14844 .0418 6.35;--sc: .16666 .0368 204.72;--ac: .14372 .04352 310.43;--inc: 0 0 0;--suc: 0 0 0;--wac: 0 0 0;--erc: 0 0 0;--animation-btn: .25s;--animation-input: .2s;--btn-focus-scale: .95;--border-btn: 1px;--tab-border: 1px;font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;--p: .7422 .209 6.35;--s: .8333 .184 204.72;--a: .7186 .2176 310.43;--n: .2304 .065 269.31;--nc: .9451 .179 104.32;--b1: .9451 .179 104.32;--rounded-box: 0;--rounded-btn: 0;--rounded-badge: 0;--tab-radius: 0}#twe-root [data-theme=valentine]{color-scheme:light;--b2: .880567 .024834 337.06289;--b3: .814288 .022964 337.06289;--pc: .137239 .030755 15.066527;--sc: .143942 .029258 293.189609;--ac: .142537 .014961 197.828857;--inc: .90923 .043042 262.880917;--suc: .12541 .033982 149.213788;--wac: .133168 .031484 58.31834;--erc: .14614 .0414 27.33;--rounded-box: 16px;--rounded-badge: 30.4px;--animation-btn: .25s;--animation-input: .2s;--btn-focus-scale: .95;--border-btn: 1px;--tab-border: 1px;--p: .686197 .153774 15.066527;--s: .71971 .14629 293.189609;--a: .712685 .074804 197.828857;--n: .546053 .143342 358.004839;--nc: .902701 .037202 336.955191;--b1: .946846 .026703 337.06289;--bc: .373085 .081131 4.606426;--in: .54615 .215208 262.880917;--su: .627052 .169912 149.213788;--wa: .66584 .157422 58.31834;--er: .7307 .207 27.33;--rounded-btn: 30.4px;--tab-radius: 11.2px}#twe-root [data-theme=lofi]{color-scheme:light;--inc: .15908 .0206 205.9;--suc: .18026 .0306 164.14;--wac: .17674 .027 79.94;--erc: .15732 .03 28.47;--border-btn: 1px;--tab-border: 1px;--p: .159066 0 0;--pc: 1 0 0;--s: .21455 .001566 17.278957;--sc: 1 0 0;--a: .268618 0 0;--ac: 1 0 0;--n: 0 0 0;--nc: 1 0 0;--b1: 1 0 0;--b2: .961151 0 0;--b3: .92268 .001082 17.17934;--bc: 0 0 0;--in: .7954 .103 205.9;--su: .9013 .153 164.14;--wa: .8837 .135 79.94;--er: .7866 .15 28.47;--rounded-box: 4px;--rounded-btn: 2px;--rounded-badge: 2px;--tab-radius: 2px;--animation-btn: 0;--animation-input: 0;--btn-focus-scale: 1}#twe-root [data-theme=dracula]{color-scheme:dark;--b2: .268053 .020556 277.508664;--b3: .247877 .019009 277.508664;--pc: .150922 .036614 346.812432;--sc: .148405 .029709 301.883095;--ac: .166785 .024826 66.558491;--nc: .878891 .006515 275.524078;--inc: .176526 .018676 212.846491;--suc: .174199 .043903 148.024881;--wac: .191068 .026849 112.757109;--erc: .136441 .041266 24.430965;--rounded-box: 16px;--rounded-btn: 8px;--rounded-badge: 30.4px;--animation-btn: .25s;--animation-input: .2s;--btn-focus-scale: .95;--border-btn: 1px;--tab-border: 1px;--tab-radius: 8px;--p: .754611 .18307 346.812432;--s: .742023 .148546 301.883095;--a: .833927 .124132 66.558491;--n: .394456 .032576 275.524078;--b1: .288229 .022103 277.508664;--bc: .977477 .007913 106.545019;--in: .88263 .09338 212.846491;--su: .870995 .219516 148.024881;--wa: .955338 .134246 112.757109;--er: .682204 .206328 24.430965}#twe-root [data-theme=cmyk]{color-scheme:light;--b2: .93 0 0;--b3: .86 0 0;--bc: .2 0 0;--pc: .143544 .02666 239.443325;--sc: .128953 .040552 359.339283;--ac: .188458 .037948 105.306968;--nc: .843557 0 0;--inc: .136952 .0189 217.284104;--suc: .893898 .032505 321.406278;--wac: .142473 .031969 52.023412;--erc: .124027 .041677 28.717543;--rounded-box: 16px;--rounded-btn: 8px;--rounded-badge: 30.4px;--animation-btn: .25s;--animation-input: .2s;--btn-focus-scale: .95;--border-btn: 1px;--tab-border: 1px;--tab-radius: 8px;--p: .717722 .133298 239.443325;--s: .644766 .202758 359.339283;--a: .942289 .189741 105.306968;--n: .217787 0 0;--b1: 1 0 0;--in: .684759 .094499 217.284104;--su: .46949 .162524 321.406278;--wa: .712364 .159843 52.023412;--er: .620133 .208385 28.717543}#twe-root [data-theme=business]{color-scheme:dark;--b2: .226487 0 0;--b3: .20944 0 0;--bc: .848707 0 0;--pc: .883407 .019811 251.473931;--sc: .128185 .005481 229.389418;--ac: .134542 .033545 35.791525;--nc: .854882 .00265 253.041249;--inc: .125233 .028702 240.033697;--suc: .140454 .018919 156.59611;--wac: .154965 .023141 81.519177;--erc: .903221 .029356 29.674507;--animation-btn: .25s;--animation-input: .2s;--btn-focus-scale: .95;--border-btn: 1px;--tab-border: 1px;--tab-radius: 8px;--p: .417036 .099057 251.473931;--s: .640924 .027405 229.389418;--a: .67271 .167726 35.791525;--n: .27441 .01325 253.041249;--b1: .243535 0 0;--in: .626163 .143511 240.033697;--su: .702268 .094594 156.59611;--wa: .774824 .115704 81.519177;--er: .516105 .14678 29.674507;--rounded-box: 4px;--rounded-btn: 2px;--rounded-badge: 2px}#twe-root [data-theme=winter]{color-scheme:light;--pc: .91372 .051 257.57;--sc: .885103 .03222 282.339433;--ac: .11988 .038303 335.171434;--nc: .839233 .012704 257.651965;--inc: .176255 .017178 214.515264;--suc: .160988 .015404 197.823719;--wac: .178345 .009167 71.47031;--erc: .146185 .022037 20.076293;--rounded-box: 16px;--rounded-btn: 8px;--rounded-badge: 30.4px;--animation-btn: .25s;--animation-input: .2s;--btn-focus-scale: .95;--border-btn: 1px;--tab-border: 1px;--tab-radius: 8px;--p: .5686 .255 257.57;--s: .425516 .161098 282.339433;--a: .599398 .191515 335.171434;--n: .196166 .063518 257.651965;--b1: 1 0 0;--b2: .974663 .011947 259.822565;--b3: .932686 .016223 262.751375;--bc: .418869 .053885 255.824911;--in: .881275 .085888 214.515264;--su: .804941 .077019 197.823719;--wa: .891725 .045833 71.47031;--er: .730926 .110185 20.076293}#twe-root *,#twe-root :before,#twe-root :after{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }#twe-root ::backdrop{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }#twe-root .alert{display:grid;width:100%;grid-auto-flow:row;align-content:flex-start;align-items:center;justify-items:center;gap:16px;text-align:center;border-radius:var(--rounded-box, 16px);border-width:1px;--tw-border-opacity: 1;border-color:var(--fallback-b2,oklch(var(--b2)/var(--tw-border-opacity)));padding:16px;--tw-text-opacity: 1;color:var(--fallback-bc,oklch(var(--bc)/var(--tw-text-opacity)));--alert-bg: var(--fallback-b2,oklch(var(--b2)/1));--alert-bg-mix: var(--fallback-b1,oklch(var(--b1)/1));background-color:var(--alert-bg)}@media (min-width: 640px){#twe-root .alert{grid-auto-flow:column;grid-template-columns:auto minmax(auto,1fr);justify-items:start;text-align:start}}#twe-root .avatar.placeholder>div{display:flex;align-items:center;justify-content:center}@media (hover:hover){#twe-root .label a:hover{--tw-text-opacity: 1;color:var(--fallback-bc,oklch(var(--bc)/var(--tw-text-opacity)))}#twe-root .menu li>*:not(ul):not(.menu-title):not(details):active,#twe-root .menu li>*:not(ul):not(.menu-title):not(details).active,#twe-root .menu li>details>summary:active{--tw-bg-opacity: 1;background-color:var(--fallback-n,oklch(var(--n)/var(--tw-bg-opacity)));--tw-text-opacity: 1;color:var(--fallback-nc,oklch(var(--nc)/var(--tw-text-opacity)))}#twe-root .table tr.hover:hover,#twe-root .table tr.hover:nth-child(2n):hover{--tw-bg-opacity: 1;background-color:var(--fallback-b2,oklch(var(--b2)/var(--tw-bg-opacity)))}#twe-root .\\!table tr.hover:hover,#twe-root .\\!table tr.hover:nth-child(2n):hover{--tw-bg-opacity: 1 !important;background-color:var(--fallback-b2,oklch(var(--b2)/var(--tw-bg-opacity)))!important}#twe-root .table-zebra tr.hover:hover,#twe-root .table-zebra tr.hover:nth-child(2n):hover{--tw-bg-opacity: 1;background-color:var(--fallback-b3,oklch(var(--b3)/var(--tw-bg-opacity)))}}#twe-root .btn{display:inline-flex;height:48px;min-height:48px;flex-shrink:0;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;user-select:none;flex-wrap:wrap;align-items:center;justify-content:center;border-radius:var(--rounded-btn, 8px);border-color:transparent;border-color:oklch(var(--btn-color, var(--b2)) / var(--tw-border-opacity));padding-left:16px;padding-right:16px;text-align:center;font-size:14px;line-height:1em;gap:8px;font-weight:600;text-decoration-line:none;transition-duration:.2s;transition-timing-function:cubic-bezier(0,0,.2,1);border-width:var(--border-btn, 1px);animation:button-pop var(--animation-btn, .25s) ease-out;transition-property:color,background-color,border-color,opacity,box-shadow,transform;--tw-text-opacity: 1;color:var(--fallback-bc,oklch(var(--bc)/var(--tw-text-opacity)));--tw-shadow: 0 1px 2px 0 rgb(0 0 0 / .05);--tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow);outline-color:var(--fallback-bc,oklch(var(--bc)/1));background-color:oklch(var(--btn-color, var(--b2)) / var(--tw-bg-opacity));--tw-bg-opacity: 1;--tw-border-opacity: 1}#twe-root .btn-disabled,#twe-root .btn[disabled],#twe-root .btn:disabled{pointer-events:none}#twe-root :where(.btn:is(input[type=checkbox])),#twe-root :where(.btn:is(input[type=radio])){width:auto;-webkit-appearance:none;-moz-appearance:none;appearance:none}#twe-root .btn:is(input[type=checkbox]):after,#twe-root .btn:is(input[type=radio]):after{--tw-content: attr(aria-label);content:var(--tw-content)}#twe-root .card{position:relative;display:flex;flex-direction:column;border-radius:var(--rounded-box, 16px)}#twe-root .card:focus{outline:2px solid transparent;outline-offset:2px}#twe-root .card figure{display:flex;align-items:center;justify-content:center}#twe-root .card.image-full{display:grid}#twe-root .card.image-full:before{position:relative;content:"";z-index:10;border-radius:var(--rounded-box, 16px);--tw-bg-opacity: 1;background-color:var(--fallback-n,oklch(var(--n)/var(--tw-bg-opacity)));opacity:.75}#twe-root .card.image-full:before,#twe-root .card.image-full>*{grid-column-start:1;grid-row-start:1}#twe-root .card.image-full>figure img{height:100%;-o-object-fit:cover;object-fit:cover}#twe-root .card.image-full>.card-body{position:relative;z-index:20;--tw-text-opacity: 1;color:var(--fallback-nc,oklch(var(--nc)/var(--tw-text-opacity)))}#twe-root .checkbox{flex-shrink:0;--chkbg: var(--fallback-bc,oklch(var(--bc)/1));--chkfg: var(--fallback-b1,oklch(var(--b1)/1));height:24px;width:24px;cursor:pointer;-webkit-appearance:none;-moz-appearance:none;appearance:none;border-radius:var(--rounded-btn, 8px);border-width:1px;border-color:var(--fallback-bc,oklch(var(--bc)/var(--tw-border-opacity)));--tw-border-opacity: .2}#twe-root .divider{display:flex;flex-direction:row;align-items:center;align-self:stretch;margin-top:16px;margin-bottom:16px;height:16px;white-space:nowrap}#twe-root .divider:before,#twe-root .divider:after{height:2px;width:100%;flex-grow:1;--tw-content: "";content:var(--tw-content);background-color:var(--fallback-bc,oklch(var(--bc)/.1))}@media (hover: hover){#twe-root .btm-nav>*.disabled:hover,#twe-root .btm-nav>*[disabled]:hover{pointer-events:none;--tw-border-opacity: 0;background-color:var(--fallback-n,oklch(var(--n)/var(--tw-bg-opacity)));--tw-bg-opacity: .1;color:var(--fallback-bc,oklch(var(--bc)/var(--tw-text-opacity)));--tw-text-opacity: .2}#twe-root .btn:hover{--tw-border-opacity: 1;border-color:var(--fallback-b3,oklch(var(--b3)/var(--tw-border-opacity)));--tw-bg-opacity: 1;background-color:var(--fallback-b3,oklch(var(--b3)/var(--tw-bg-opacity)))}@supports (color: color-mix(in oklab,black,black)){#twe-root .btn:hover{background-color:color-mix(in oklab,oklch(var(--btn-color, var(--b2)) / var(--tw-bg-opacity, 1)) 90%,black);border-color:color-mix(in oklab,oklch(var(--btn-color, var(--b2)) / var(--tw-border-opacity, 1)) 90%,black)}}@supports not (color: oklch(0 0 0)){#twe-root .btn:hover{background-color:var(--btn-color, var(--fallback-b2));border-color:var(--btn-color, var(--fallback-b2))}}#twe-root .btn.glass:hover{--glass-opacity: 25%;--glass-border-opacity: 15%}#twe-root .btn-ghost:hover{border-color:transparent}@supports (color: oklch(0 0 0)){#twe-root .btn-ghost:hover{background-color:var(--fallback-bc,oklch(var(--bc)/.2))}}#twe-root .btn-outline.btn-primary:hover{--tw-text-opacity: 1;color:var(--fallback-pc,oklch(var(--pc)/var(--tw-text-opacity)))}@supports (color: color-mix(in oklab,black,black)){#twe-root .btn-outline.btn-primary:hover{background-color:color-mix(in oklab,var(--fallback-p,oklch(var(--p)/1)) 90%,black);border-color:color-mix(in oklab,var(--fallback-p,oklch(var(--p)/1)) 90%,black)}}#twe-root .btn-outline.btn-secondary:hover{--tw-text-opacity: 1;color:var(--fallback-sc,oklch(var(--sc)/var(--tw-text-opacity)))}@supports (color: color-mix(in oklab,black,black)){#twe-root .btn-outline.btn-secondary:hover{background-color:color-mix(in oklab,var(--fallback-s,oklch(var(--s)/1)) 90%,black);border-color:color-mix(in oklab,var(--fallback-s,oklch(var(--s)/1)) 90%,black)}}#twe-root .btn-disabled:hover,#twe-root .btn[disabled]:hover,#twe-root .btn:disabled:hover{--tw-border-opacity: 0;background-color:var(--fallback-n,oklch(var(--n)/var(--tw-bg-opacity)));--tw-bg-opacity: .2;color:var(--fallback-bc,oklch(var(--bc)/var(--tw-text-opacity)));--tw-text-opacity: .2}@supports (color: color-mix(in oklab,black,black)){#twe-root .btn:is(input[type=checkbox]:checked):hover,#twe-root .btn:is(input[type=radio]:checked):hover{background-color:color-mix(in oklab,var(--fallback-p,oklch(var(--p)/1)) 90%,black);border-color:color-mix(in oklab,var(--fallback-p,oklch(var(--p)/1)) 90%,black)}}}#twe-root .footer{display:grid;width:100%;grid-auto-flow:row;place-items:start;-moz-column-gap:16px;column-gap:16px;row-gap:40px;font-size:14px;line-height:20px}#twe-root .footer>*{display:grid;place-items:start;gap:8px}@media (min-width: 48rem){#twe-root .footer{grid-auto-flow:column}#twe-root .footer-center{grid-auto-flow:row dense}}#twe-root .label{display:flex;-webkit-user-select:none;-moz-user-select:none;user-select:none;align-items:center;justify-content:space-between;padding:8px 4px}#twe-root .input{flex-shrink:1;-webkit-appearance:none;-moz-appearance:none;appearance:none;height:48px;padding-left:16px;padding-right:16px;font-size:16px;line-height:2;line-height:24px;border-radius:var(--rounded-btn, 8px);border-width:1px;border-color:transparent;--tw-bg-opacity: 1;background-color:var(--fallback-b1,oklch(var(--b1)/var(--tw-bg-opacity)))}#twe-root .join{display:inline-flex;align-items:stretch;border-radius:var(--rounded-btn, 8px)}#twe-root .join :where(.join-item){border-start-end-radius:0;border-end-end-radius:0;border-end-start-radius:0;border-start-start-radius:0}#twe-root .join .join-item:not(:first-child):not(:last-child),#twe-root .join *:not(:first-child):not(:last-child) .join-item{border-start-end-radius:0;border-end-end-radius:0;border-end-start-radius:0;border-start-start-radius:0}#twe-root .join .join-item:first-child:not(:last-child),#twe-root .join *:first-child:not(:last-child) .join-item{border-start-end-radius:0;border-end-end-radius:0}#twe-root .join .dropdown .join-item:first-child:not(:last-child),#twe-root .join *:first-child:not(:last-child) .dropdown .join-item{border-start-end-radius:inherit;border-end-end-radius:inherit}#twe-root .join :where(.join-item:first-child:not(:last-child)),#twe-root .join :where(*:first-child:not(:last-child) .join-item){border-end-start-radius:inherit;border-start-start-radius:inherit}#twe-root .join .join-item:last-child:not(:first-child),#twe-root .join *:last-child:not(:first-child) .join-item{border-end-start-radius:0;border-start-start-radius:0}#twe-root .join :where(.join-item:last-child:not(:first-child)),#twe-root .join :where(*:last-child:not(:first-child) .join-item){border-start-end-radius:inherit;border-end-end-radius:inherit}@supports not selector(:has(*)){#twe-root :where(.join *){border-radius:inherit}}@supports selector(:has(*)){#twe-root :where(.join *:has(.join-item)){border-radius:inherit}}#twe-root .link{cursor:pointer;text-decoration-line:underline}#twe-root .menu li.disabled{cursor:not-allowed;-webkit-user-select:none;-moz-user-select:none;user-select:none;color:var(--fallback-bc,oklch(var(--bc)/.3))}#twe-root .modal{pointer-events:none;position:fixed;top:0;right:0;bottom:0;left:0;margin:0;display:grid;height:100%;max-height:none;width:100%;max-width:none;justify-items:center;padding:0;opacity:0;overscroll-behavior:contain;z-index:999;background-color:transparent;color:inherit;transition-duration:.2s;transition-timing-function:cubic-bezier(0,0,.2,1);transition-property:transform,opacity,visibility;overflow-y:hidden}#twe-root :where(.modal){align-items:center}#twe-root .modal-box{max-height:calc(100vh - 5em);grid-column-start:1;grid-row-start:1;width:91.666667%;max-width:512px;--tw-scale-x: .9;--tw-scale-y: .9;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));border-bottom-right-radius:var(--rounded-box, 16px);border-bottom-left-radius:var(--rounded-box, 16px);border-top-left-radius:var(--rounded-box, 16px);border-top-right-radius:var(--rounded-box, 16px);--tw-bg-opacity: 1;background-color:var(--fallback-b1,oklch(var(--b1)/var(--tw-bg-opacity)));padding:24px;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,-webkit-backdrop-filter;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter,-webkit-backdrop-filter;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-timing-function:cubic-bezier(0,0,.2,1);transition-duration:.2s;box-shadow:#00000040 0 25px 50px -12px;overflow-y:auto;overscroll-behavior:contain}#twe-root .modal-open,#twe-root .modal:target,#twe-root .modal-toggle:checked+.modal,#twe-root .modal[open]{pointer-events:auto;visibility:visible;opacity:1}#twe-root:has(:is(.modal-open,.modal:target,.modal-toggle:checked+.modal,.modal[open])){overflow:hidden}#twe-root .progress{position:relative;width:100%;-webkit-appearance:none;-moz-appearance:none;appearance:none;overflow:hidden;height:8px;border-radius:var(--rounded-box, 16px);background-color:var(--fallback-bc,oklch(var(--bc)/.2))}#twe-root .select{display:inline-flex;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;user-select:none;-webkit-appearance:none;-moz-appearance:none;appearance:none;height:48px;min-height:48px;padding-left:16px;padding-right:40px;font-size:14px;line-height:20px;line-height:2;border-radius:var(--rounded-btn, 8px);border-width:1px;border-color:transparent;--tw-bg-opacity: 1;background-color:var(--fallback-b1,oklch(var(--b1)/var(--tw-bg-opacity)));background-image:linear-gradient(45deg,transparent 50%,currentColor 50%),linear-gradient(135deg,currentColor 50%,transparent 50%);background-position:calc(100% - 20px) calc(1px + 50%),calc(100% - 16.1px) calc(1px + 50%);background-size:4px 4px,4px 4px;background-repeat:no-repeat}#twe-root .select[multiple]{height:auto}#twe-root .\\!table{position:relative!important;width:100%!important;border-radius:var(--rounded-box, 16px)!important;text-align:left!important;font-size:14px!important;line-height:20px!important}#twe-root .table{position:relative;width:100%;border-radius:var(--rounded-box, 16px);text-align:left;font-size:14px;line-height:20px}#twe-root .\\!table :where(.table-pin-rows thead tr){position:sticky!important;top:0!important;z-index:1!important;--tw-bg-opacity: 1 !important;background-color:var(--fallback-b1,oklch(var(--b1)/var(--tw-bg-opacity)))!important}#twe-root .table :where(.table-pin-rows thead tr){position:sticky;top:0;z-index:1;--tw-bg-opacity: 1;background-color:var(--fallback-b1,oklch(var(--b1)/var(--tw-bg-opacity)))}#twe-root .\\!table :where(.table-pin-rows tfoot tr){position:sticky!important;bottom:0!important;z-index:1!important;--tw-bg-opacity: 1 !important;background-color:var(--fallback-b1,oklch(var(--b1)/var(--tw-bg-opacity)))!important}#twe-root .table :where(.table-pin-rows tfoot tr){position:sticky;bottom:0;z-index:1;--tw-bg-opacity: 1;background-color:var(--fallback-b1,oklch(var(--b1)/var(--tw-bg-opacity)))}#twe-root .\\!table :where(.table-pin-cols tr th){position:sticky!important;left:0!important;right:0!important;--tw-bg-opacity: 1 !important;background-color:var(--fallback-b1,oklch(var(--b1)/var(--tw-bg-opacity)))!important}#twe-root .table :where(.table-pin-cols tr th){position:sticky;left:0;right:0;--tw-bg-opacity: 1;background-color:var(--fallback-b1,oklch(var(--b1)/var(--tw-bg-opacity)))}#twe-root .table-zebra tbody tr:nth-child(2n) :where(.table-pin-cols tr th){--tw-bg-opacity: 1;background-color:var(--fallback-b2,oklch(var(--b2)/var(--tw-bg-opacity)))}#twe-root .timeline{position:relative;display:flex}#twe-root :where(.timeline>li){position:relative;display:grid;flex-shrink:0;align-items:center;grid-template-rows:var(--timeline-row-start, minmax(0, 1fr)) auto var( --timeline-row-end, minmax(0, 1fr) );grid-template-columns:var(--timeline-col-start, minmax(0, 1fr)) auto var( --timeline-col-end, minmax(0, 1fr) )}#twe-root .timeline>li>hr{width:100%;border-width:0px}#twe-root :where(.timeline>li>hr):first-child{grid-column-start:1;grid-row-start:2}#twe-root :where(.timeline>li>hr):last-child{grid-column-start:3;grid-column-end:none;grid-row-start:2;grid-row-end:auto}#twe-root .toggle{flex-shrink:0;--tglbg: var(--fallback-b1,oklch(var(--b1)/1));--handleoffset: 24px;--handleoffsetcalculator: calc(var(--handleoffset) * -1);--togglehandleborder: 0 0;height:24px;width:48px;cursor:pointer;-webkit-appearance:none;-moz-appearance:none;appearance:none;border-radius:var(--rounded-badge, 30.4px);border-width:1px;border-color:currentColor;background-color:currentColor;color:var(--fallback-bc,oklch(var(--bc)/.5));transition:background,box-shadow var(--animation-input, .2s) ease-out;box-shadow:var(--handleoffsetcalculator) 0 0 2px var(--tglbg) inset,0 0 0 2px var(--tglbg) inset,var(--togglehandleborder)}#twe-root .alert-error{border-color:var(--fallback-er,oklch(var(--er)/.2));--tw-text-opacity: 1;color:var(--fallback-erc,oklch(var(--erc)/var(--tw-text-opacity)));--alert-bg: var(--fallback-er,oklch(var(--er)/1));--alert-bg-mix: var(--fallback-b1,oklch(var(--b1)/1))}#twe-root .btm-nav>*:where(.active){border-top-width:2px;--tw-bg-opacity: 1;background-color:var(--fallback-b1,oklch(var(--b1)/var(--tw-bg-opacity)))}#twe-root .btm-nav>*.disabled,#twe-root .btm-nav>*[disabled]{pointer-events:none;--tw-border-opacity: 0;background-color:var(--fallback-n,oklch(var(--n)/var(--tw-bg-opacity)));--tw-bg-opacity: .1;color:var(--fallback-bc,oklch(var(--bc)/var(--tw-text-opacity)));--tw-text-opacity: .2}#twe-root .btm-nav>* .label{font-size:16px;line-height:24px}#twe-root .btn:active:hover,#twe-root .btn:active:focus{animation:button-pop 0s ease-out;transform:scale(var(--btn-focus-scale, .97))}@supports not (color: oklch(0 0 0)){#twe-root .btn{background-color:var(--btn-color, var(--fallback-b2));border-color:var(--btn-color, var(--fallback-b2))}#twe-root .btn-primary{--btn-color: var(--fallback-p)}#twe-root .btn-secondary{--btn-color: var(--fallback-s)}#twe-root .btn-neutral{--btn-color: var(--fallback-n)}}@supports (color: color-mix(in oklab,black,black)){#twe-root .btn-outline.btn-primary.btn-active{background-color:color-mix(in oklab,var(--fallback-p,oklch(var(--p)/1)) 90%,black);border-color:color-mix(in oklab,var(--fallback-p,oklch(var(--p)/1)) 90%,black)}#twe-root .btn-outline.btn-secondary.btn-active{background-color:color-mix(in oklab,var(--fallback-s,oklch(var(--s)/1)) 90%,black);border-color:color-mix(in oklab,var(--fallback-s,oklch(var(--s)/1)) 90%,black)}}#twe-root .btn:focus-visible{outline-style:solid;outline-width:2px;outline-offset:2px}#twe-root .btn-primary{--tw-text-opacity: 1;color:var(--fallback-pc,oklch(var(--pc)/var(--tw-text-opacity)));outline-color:var(--fallback-p,oklch(var(--p)/1))}@supports (color: oklch(0 0 0)){#twe-root .btn-primary{--btn-color: var(--p)}#twe-root .btn-secondary{--btn-color: var(--s)}#twe-root .btn-neutral{--btn-color: var(--n)}}#twe-root .btn-secondary{--tw-text-opacity: 1;color:var(--fallback-sc,oklch(var(--sc)/var(--tw-text-opacity)));outline-color:var(--fallback-s,oklch(var(--s)/1))}#twe-root .btn-neutral{--tw-text-opacity: 1;color:var(--fallback-nc,oklch(var(--nc)/var(--tw-text-opacity)));outline-color:var(--fallback-n,oklch(var(--n)/1))}#twe-root .btn.glass{--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow);outline-color:currentColor}#twe-root .btn.glass.btn-active{--glass-opacity: 25%;--glass-border-opacity: 15%}#twe-root .btn-ghost{border-width:1px;border-color:transparent;background-color:transparent;color:currentColor;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow);outline-color:currentColor}#twe-root .btn-ghost.btn-active{border-color:transparent;background-color:var(--fallback-bc,oklch(var(--bc)/.2))}#twe-root .btn-outline.btn-primary{--tw-text-opacity: 1;color:var(--fallback-p,oklch(var(--p)/var(--tw-text-opacity)))}#twe-root .btn-outline.btn-primary.btn-active{--tw-text-opacity: 1;color:var(--fallback-pc,oklch(var(--pc)/var(--tw-text-opacity)))}#twe-root .btn-outline.btn-secondary{--tw-text-opacity: 1;color:var(--fallback-s,oklch(var(--s)/var(--tw-text-opacity)))}#twe-root .btn-outline.btn-secondary.btn-active{--tw-text-opacity: 1;color:var(--fallback-sc,oklch(var(--sc)/var(--tw-text-opacity)))}#twe-root .btn.btn-disabled,#twe-root .btn[disabled],#twe-root .btn:disabled{--tw-border-opacity: 0;background-color:var(--fallback-n,oklch(var(--n)/var(--tw-bg-opacity)));--tw-bg-opacity: .2;color:var(--fallback-bc,oklch(var(--bc)/var(--tw-text-opacity)));--tw-text-opacity: .2}#twe-root .btn:is(input[type=checkbox]:checked),#twe-root .btn:is(input[type=radio]:checked){--tw-border-opacity: 1;border-color:var(--fallback-p,oklch(var(--p)/var(--tw-border-opacity)));--tw-bg-opacity: 1;background-color:var(--fallback-p,oklch(var(--p)/var(--tw-bg-opacity)));--tw-text-opacity: 1;color:var(--fallback-pc,oklch(var(--pc)/var(--tw-text-opacity)))}#twe-root .btn:is(input[type=checkbox]:checked):focus-visible,#twe-root .btn:is(input[type=radio]:checked):focus-visible{outline-color:var(--fallback-p,oklch(var(--p)/1))}@keyframes button-pop{0%{transform:scale(var(--btn-focus-scale, .98))}40%{transform:scale(1.02)}to{transform:scale(1)}}#twe-root .card :where(figure:first-child){overflow:hidden;border-start-start-radius:inherit;border-start-end-radius:inherit;border-end-start-radius:unset;border-end-end-radius:unset}#twe-root .card :where(figure:last-child){overflow:hidden;border-start-start-radius:unset;border-start-end-radius:unset;border-end-start-radius:inherit;border-end-end-radius:inherit}#twe-root .card:focus-visible{outline:2px solid currentColor;outline-offset:2px}#twe-root .card.bordered{border-width:1px;--tw-border-opacity: 1;border-color:var(--fallback-b2,oklch(var(--b2)/var(--tw-border-opacity)))}#twe-root .card.compact .card-body{padding:16px;font-size:14px;line-height:20px}#twe-root .card.image-full :where(figure){overflow:hidden;border-radius:inherit}#twe-root .checkbox:focus{box-shadow:none}#twe-root .checkbox:focus-visible{outline-style:solid;outline-width:2px;outline-offset:2px;outline-color:var(--fallback-bc,oklch(var(--bc)/1))}#twe-root .checkbox:checked,#twe-root .checkbox[checked=true],#twe-root .checkbox[aria-checked=true]{background-repeat:no-repeat;animation:checkmark var(--animation-input, .2s) ease-out;background-color:var(--chkbg);background-image:linear-gradient(-45deg,transparent 65%,var(--chkbg) 65.99%),linear-gradient(45deg,transparent 75%,var(--chkbg) 75.99%),linear-gradient(-45deg,var(--chkbg) 40%,transparent 40.99%),linear-gradient(45deg,var(--chkbg) 30%,var(--chkfg) 30.99%,var(--chkfg) 40%,transparent 40.99%),linear-gradient(-45deg,var(--chkfg) 50%,var(--chkbg) 50.99%)}#twe-root .checkbox:indeterminate{--tw-bg-opacity: 1;background-color:var(--fallback-bc,oklch(var(--bc)/var(--tw-bg-opacity)));background-repeat:no-repeat;animation:checkmark var(--animation-input, .2s) ease-out;background-image:linear-gradient(90deg,transparent 80%,var(--chkbg) 80%),linear-gradient(-90deg,transparent 80%,var(--chkbg) 80%),linear-gradient(0deg,var(--chkbg) 43%,var(--chkfg) 43%,var(--chkfg) 57%,var(--chkbg) 57%)}#twe-root .checkbox:disabled{cursor:not-allowed;border-color:transparent;--tw-bg-opacity: 1;background-color:var(--fallback-bc,oklch(var(--bc)/var(--tw-bg-opacity)));opacity:.2}@keyframes checkmark{0%{background-position-y:5px}50%{background-position-y:-2px}to{background-position-y:0}}#twe-root .divider:not(:empty){gap:16px}#twe-root .label-text{font-size:14px;line-height:20px;--tw-text-opacity: 1;color:var(--fallback-bc,oklch(var(--bc)/var(--tw-text-opacity)))}#twe-root .input input:focus{outline:2px solid transparent;outline-offset:2px}#twe-root .input[list]::-webkit-calendar-picker-indicator{line-height:1em}#twe-root .input-bordered{border-color:var(--fallback-bc,oklch(var(--bc)/.2))}#twe-root .input:focus,#twe-root .input:focus-within{box-shadow:none;border-color:var(--fallback-bc,oklch(var(--bc)/.2));outline-style:solid;outline-width:2px;outline-offset:2px;outline-color:var(--fallback-bc,oklch(var(--bc)/.2))}#twe-root .input-disabled,#twe-root .input:disabled,#twe-root .input[disabled]{cursor:not-allowed;--tw-border-opacity: 1;border-color:var(--fallback-b2,oklch(var(--b2)/var(--tw-border-opacity)));--tw-bg-opacity: 1;background-color:var(--fallback-b2,oklch(var(--b2)/var(--tw-bg-opacity)));color:var(--fallback-bc,oklch(var(--bc)/.4))}#twe-root .input-disabled::-moz-placeholder,#twe-root .input:disabled::-moz-placeholder,#twe-root .input[disabled]::-moz-placeholder{color:var(--fallback-bc,oklch(var(--bc)/var(--tw-placeholder-opacity)));--tw-placeholder-opacity: .2}#twe-root .input-disabled::placeholder,#twe-root .input:disabled::placeholder,#twe-root .input[disabled]::placeholder{color:var(--fallback-bc,oklch(var(--bc)/var(--tw-placeholder-opacity)));--tw-placeholder-opacity: .2}#twe-root .input::-webkit-date-and-time-value{text-align:inherit}#twe-root .join>:where(*:not(:first-child)){margin-top:0;margin-bottom:0;margin-inline-start:-1px}#twe-root .join-item:focus{isolation:isolate}#twe-root .link:focus{outline:2px solid transparent;outline-offset:2px}#twe-root .link:focus-visible{outline:2px solid currentColor;outline-offset:2px}#twe-root .loading{pointer-events:none;display:inline-block;aspect-ratio:1 / 1;width:24px;background-color:currentColor;-webkit-mask-size:100%;mask-size:100%;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-position:center;mask-position:center;-webkit-mask-image:url("data:image/svg+xml,%3Csvg width='24' height='24' stroke='%23000' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cstyle%3E.spinner_V8m1%7Btransform-origin:center;animation:spinner_zKoa 2s linear infinite%7D.spinner_V8m1 circle%7Bstroke-linecap:round;animation:spinner_YpZS 1.5s ease-out infinite%7D%40keyframes spinner_zKoa%7B100%25%7Btransform:rotate(360deg)%7D%7D%40keyframes spinner_YpZS%7B0%25%7Bstroke-dasharray:0 150;stroke-dashoffset:0%7D47.5%25%7Bstroke-dasharray:42 150;stroke-dashoffset:-16%7D95%25%2C100%25%7Bstroke-dasharray:42 150;stroke-dashoffset:-59%7D%7D%3C%2Fstyle%3E%3Cg class='spinner_V8m1'%3E%3Ccircle cx='12' cy='12' r='9.5' fill='none' stroke-width='3'%3E%3C%2Fcircle%3E%3C%2Fg%3E%3C%2Fsvg%3E");mask-image:url("data:image/svg+xml,%3Csvg width='24' height='24' stroke='%23000' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cstyle%3E.spinner_V8m1%7Btransform-origin:center;animation:spinner_zKoa 2s linear infinite%7D.spinner_V8m1 circle%7Bstroke-linecap:round;animation:spinner_YpZS 1.5s ease-out infinite%7D%40keyframes spinner_zKoa%7B100%25%7Btransform:rotate(360deg)%7D%7D%40keyframes spinner_YpZS%7B0%25%7Bstroke-dasharray:0 150;stroke-dashoffset:0%7D47.5%25%7Bstroke-dasharray:42 150;stroke-dashoffset:-16%7D95%25%2C100%25%7Bstroke-dasharray:42 150;stroke-dashoffset:-59%7D%7D%3C%2Fstyle%3E%3Cg class='spinner_V8m1'%3E%3Ccircle cx='12' cy='12' r='9.5' fill='none' stroke-width='3'%3E%3C%2Fcircle%3E%3C%2Fg%3E%3C%2Fsvg%3E")}#twe-root .loading-spinner{-webkit-mask-image:url("data:image/svg+xml,%3Csvg width='24' height='24' stroke='%23000' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cstyle%3E.spinner_V8m1%7Btransform-origin:center;animation:spinner_zKoa 2s linear infinite%7D.spinner_V8m1 circle%7Bstroke-linecap:round;animation:spinner_YpZS 1.5s ease-out infinite%7D%40keyframes spinner_zKoa%7B100%25%7Btransform:rotate(360deg)%7D%7D%40keyframes spinner_YpZS%7B0%25%7Bstroke-dasharray:0 150;stroke-dashoffset:0%7D47.5%25%7Bstroke-dasharray:42 150;stroke-dashoffset:-16%7D95%25%2C100%25%7Bstroke-dasharray:42 150;stroke-dashoffset:-59%7D%7D%3C%2Fstyle%3E%3Cg class='spinner_V8m1'%3E%3Ccircle cx='12' cy='12' r='9.5' fill='none' stroke-width='3'%3E%3C%2Fcircle%3E%3C%2Fg%3E%3C%2Fsvg%3E");mask-image:url("data:image/svg+xml,%3Csvg width='24' height='24' stroke='%23000' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cstyle%3E.spinner_V8m1%7Btransform-origin:center;animation:spinner_zKoa 2s linear infinite%7D.spinner_V8m1 circle%7Bstroke-linecap:round;animation:spinner_YpZS 1.5s ease-out infinite%7D%40keyframes spinner_zKoa%7B100%25%7Btransform:rotate(360deg)%7D%7D%40keyframes spinner_YpZS%7B0%25%7Bstroke-dasharray:0 150;stroke-dashoffset:0%7D47.5%25%7Bstroke-dasharray:42 150;stroke-dashoffset:-16%7D95%25%2C100%25%7Bstroke-dasharray:42 150;stroke-dashoffset:-59%7D%7D%3C%2Fstyle%3E%3Cg class='spinner_V8m1'%3E%3Ccircle cx='12' cy='12' r='9.5' fill='none' stroke-width='3'%3E%3C%2Fcircle%3E%3C%2Fg%3E%3C%2Fsvg%3E")}#twe-root .menu li>*:not(ul):not(.menu-title):not(details):active,#twe-root .menu li>*:not(ul):not(.menu-title):not(details).active,#twe-root .menu li>details>summary:active{--tw-bg-opacity: 1;background-color:var(--fallback-n,oklch(var(--n)/var(--tw-bg-opacity)));--tw-text-opacity: 1;color:var(--fallback-nc,oklch(var(--nc)/var(--tw-text-opacity)))}#twe-root .mockup-phone .display{overflow:hidden;border-radius:40px;margin-top:-25px}#twe-root .mockup-browser .mockup-browser-toolbar .input{position:relative;margin-left:auto;margin-right:auto;display:block;height:28px;width:384px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;--tw-bg-opacity: 1;background-color:var(--fallback-b2,oklch(var(--b2)/var(--tw-bg-opacity)));padding-left:32px;direction:ltr}#twe-root .mockup-browser .mockup-browser-toolbar .input:before{content:"";position:absolute;left:8px;top:50%;aspect-ratio:1 / 1;height:12px;--tw-translate-y: -50%;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));border-radius:9999px;border-width:2px;border-color:currentColor;opacity:.6}#twe-root .mockup-browser .mockup-browser-toolbar .input:after{content:"";position:absolute;left:20px;top:50%;height:8px;--tw-translate-y: 25%;--tw-rotate: -45deg;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));border-radius:9999px;border-width:1px;border-color:currentColor;opacity:.6}#twe-root .modal:not(dialog:not(.modal-open)),#twe-root .modal::backdrop{background-color:#0006;animation:modal-pop .2s ease-out}#twe-root .modal-backdrop{z-index:-1;grid-column-start:1;grid-row-start:1;display:grid;align-self:stretch;justify-self:stretch;color:transparent}#twe-root .modal-open .modal-box,#twe-root .modal-toggle:checked+.modal .modal-box,#twe-root .modal:target .modal-box,#twe-root .modal[open] .modal-box{--tw-translate-y: 0px;--tw-scale-x: 1;--tw-scale-y: 1;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}@keyframes modal-pop{0%{opacity:0}}#twe-root .progress::-moz-progress-bar{border-radius:var(--rounded-box, 16px);--tw-bg-opacity: 1;background-color:var(--fallback-bc,oklch(var(--bc)/var(--tw-bg-opacity)))}#twe-root .progress-primary::-moz-progress-bar{border-radius:var(--rounded-box, 16px);--tw-bg-opacity: 1;background-color:var(--fallback-p,oklch(var(--p)/var(--tw-bg-opacity)))}#twe-root .progress-secondary::-moz-progress-bar{border-radius:var(--rounded-box, 16px);--tw-bg-opacity: 1;background-color:var(--fallback-s,oklch(var(--s)/var(--tw-bg-opacity)))}#twe-root .progress:indeterminate{--progress-color: var(--fallback-bc,oklch(var(--bc)/1));background-image:repeating-linear-gradient(90deg,var(--progress-color) -1%,var(--progress-color) 10%,transparent 10%,transparent 90%);background-size:200%;background-position-x:15%;animation:progress-loading 5s ease-in-out infinite}#twe-root .progress-primary:indeterminate{--progress-color: var(--fallback-p,oklch(var(--p)/1))}#twe-root .progress-secondary:indeterminate{--progress-color: var(--fallback-s,oklch(var(--s)/1))}#twe-root .progress::-webkit-progress-bar{border-radius:var(--rounded-box, 16px);background-color:transparent}#twe-root .progress::-webkit-progress-value{border-radius:var(--rounded-box, 16px);--tw-bg-opacity: 1;background-color:var(--fallback-bc,oklch(var(--bc)/var(--tw-bg-opacity)))}#twe-root .progress-primary::-webkit-progress-value{--tw-bg-opacity: 1;background-color:var(--fallback-p,oklch(var(--p)/var(--tw-bg-opacity)))}#twe-root .progress-secondary::-webkit-progress-value{--tw-bg-opacity: 1;background-color:var(--fallback-s,oklch(var(--s)/var(--tw-bg-opacity)))}#twe-root .progress:indeterminate::-moz-progress-bar{background-color:transparent;background-image:repeating-linear-gradient(90deg,var(--progress-color) -1%,var(--progress-color) 10%,transparent 10%,transparent 90%);background-size:200%;background-position-x:15%;animation:progress-loading 5s ease-in-out infinite}@keyframes progress-loading{50%{background-position-x:-115%}}@keyframes radiomark{0%{box-shadow:0 0 0 12px var(--fallback-b1,oklch(var(--b1)/1)) inset,0 0 0 12px var(--fallback-b1,oklch(var(--b1)/1)) inset}50%{box-shadow:0 0 0 3px var(--fallback-b1,oklch(var(--b1)/1)) inset,0 0 0 3px var(--fallback-b1,oklch(var(--b1)/1)) inset}to{box-shadow:0 0 0 4px var(--fallback-b1,oklch(var(--b1)/1)) inset,0 0 0 4px var(--fallback-b1,oklch(var(--b1)/1)) inset}}@keyframes rating-pop{0%{transform:translateY(-.125em)}40%{transform:translateY(-.125em)}to{transform:translateY(0)}}#twe-root .select-bordered{border-color:var(--fallback-bc,oklch(var(--bc)/.2))}#twe-root .select:focus{box-shadow:none;border-color:var(--fallback-bc,oklch(var(--bc)/.2));outline-style:solid;outline-width:2px;outline-offset:2px;outline-color:var(--fallback-bc,oklch(var(--bc)/.2))}#twe-root .select-disabled,#twe-root .select:disabled,#twe-root .select[disabled]{cursor:not-allowed;--tw-border-opacity: 1;border-color:var(--fallback-b2,oklch(var(--b2)/var(--tw-border-opacity)));--tw-bg-opacity: 1;background-color:var(--fallback-b2,oklch(var(--b2)/var(--tw-bg-opacity)));--tw-text-opacity: .2}#twe-root .select-disabled::-moz-placeholder,#twe-root .select:disabled::-moz-placeholder,#twe-root .select[disabled]::-moz-placeholder{color:var(--fallback-bc,oklch(var(--bc)/var(--tw-placeholder-opacity)));--tw-placeholder-opacity: .2}#twe-root .select-disabled::placeholder,#twe-root .select:disabled::placeholder,#twe-root .select[disabled]::placeholder{color:var(--fallback-bc,oklch(var(--bc)/var(--tw-placeholder-opacity)));--tw-placeholder-opacity: .2}#twe-root .select-multiple,#twe-root .select[multiple],#twe-root .select[size].select:not([size="1"]){background-image:none;padding-right:16px}#twe-root [dir=rtl] .select{background-position:calc(0% + 12px) calc(1px + 50%),calc(0% + 16px) calc(1px + 50%)}@keyframes skeleton{0%{background-position:150%}to{background-position:-50%}}#twe-root :is([dir=rtl] .\\!table){text-align:right!important}#twe-root :is([dir=rtl] .table){text-align:right}#twe-root .\\!table :where(th,td){padding:12px 16px!important;vertical-align:middle!important}#twe-root .table :where(th,td){padding:12px 16px;vertical-align:middle}#twe-root .table tr.active,#twe-root .table tr.active:nth-child(2n),#twe-root .table-zebra tbody tr:nth-child(2n){--tw-bg-opacity: 1;background-color:var(--fallback-b2,oklch(var(--b2)/var(--tw-bg-opacity)))}#twe-root .\\!table tr.active,#twe-root .\\!table tr.active:nth-child(2n){--tw-bg-opacity: 1 !important;background-color:var(--fallback-b2,oklch(var(--b2)/var(--tw-bg-opacity)))!important}#twe-root .table-zebra tr.active,#twe-root .table-zebra tr.active:nth-child(2n),#twe-root .table-zebra-zebra tbody tr:nth-child(2n){--tw-bg-opacity: 1;background-color:var(--fallback-b3,oklch(var(--b3)/var(--tw-bg-opacity)))}#twe-root .table :where(thead,tbody) :where(tr:not(:last-child)),#twe-root .table :where(thead,tbody) :where(tr:first-child:last-child){border-bottom-width:1px;--tw-border-opacity: 1;border-bottom-color:var(--fallback-b2,oklch(var(--b2)/var(--tw-border-opacity)))}#twe-root .\\!table :where(thead,tbody) :where(tr:not(:last-child)),#twe-root .\\!table :where(thead,tbody) :where(tr:first-child:last-child){border-bottom-width:1px!important;--tw-border-opacity: 1 !important;border-bottom-color:var(--fallback-b2,oklch(var(--b2)/var(--tw-border-opacity)))!important}#twe-root .\\!table :where(thead,tfoot){white-space:nowrap!important;font-size:12px!important;line-height:16px!important;font-weight:700!important;color:var(--fallback-bc,oklch(var(--bc)/.6))!important}#twe-root .table :where(thead,tfoot){white-space:nowrap;font-size:12px;line-height:16px;font-weight:700;color:var(--fallback-bc,oklch(var(--bc)/.6))}#twe-root .timeline hr{height:4px}#twe-root :where(.timeline hr){--tw-bg-opacity: 1;background-color:var(--fallback-b3,oklch(var(--b3)/var(--tw-bg-opacity)))}#twe-root :where(.timeline:has(.timeline-middle) hr):first-child{border-start-end-radius:var(--rounded-badge, 30.4px);border-end-end-radius:var(--rounded-badge, 30.4px);border-start-start-radius:0px;border-end-start-radius:0px}#twe-root :where(.timeline:has(.timeline-middle) hr):last-child{border-start-start-radius:var(--rounded-badge, 30.4px);border-end-start-radius:var(--rounded-badge, 30.4px);border-start-end-radius:0px;border-end-end-radius:0px}#twe-root :where(.timeline:not(:has(.timeline-middle)) :first-child hr:last-child){border-start-start-radius:var(--rounded-badge, 30.4px);border-end-start-radius:var(--rounded-badge, 30.4px);border-start-end-radius:0px;border-end-end-radius:0px}#twe-root :where(.timeline:not(:has(.timeline-middle)) :last-child hr:first-child){border-start-end-radius:var(--rounded-badge, 30.4px);border-end-end-radius:var(--rounded-badge, 30.4px);border-start-start-radius:0px;border-end-start-radius:0px}@keyframes toast-pop{0%{transform:scale(.9);opacity:0}to{transform:scale(1);opacity:1}}#twe-root [dir=rtl] .toggle{--handleoffsetcalculator: calc(var(--handleoffset) * 1)}#twe-root .toggle:focus-visible{outline-style:solid;outline-width:2px;outline-offset:2px;outline-color:var(--fallback-bc,oklch(var(--bc)/.2))}#twe-root .toggle:hover{background-color:currentColor}#twe-root .toggle:checked,#twe-root .toggle[checked=true],#twe-root .toggle[aria-checked=true]{background-image:none;--handleoffsetcalculator: var(--handleoffset);--tw-text-opacity: 1;color:var(--fallback-bc,oklch(var(--bc)/var(--tw-text-opacity)))}#twe-root [dir=rtl] .toggle:checked,#twe-root [dir=rtl] .toggle[checked=true],#twe-root [dir=rtl] .toggle[aria-checked=true]{--handleoffsetcalculator: calc(var(--handleoffset) * -1)}#twe-root .toggle:indeterminate{--tw-text-opacity: 1;color:var(--fallback-bc,oklch(var(--bc)/var(--tw-text-opacity)));box-shadow:calc(var(--handleoffset) / 2) 0 0 2px var(--tglbg) inset,calc(var(--handleoffset) / -2) 0 0 2px var(--tglbg) inset,0 0 0 2px var(--tglbg) inset}#twe-root [dir=rtl] .toggle:indeterminate{box-shadow:calc(var(--handleoffset) / 2) 0 0 2px var(--tglbg) inset,calc(var(--handleoffset) / -2) 0 0 2px var(--tglbg) inset,0 0 0 2px var(--tglbg) inset}#twe-root .toggle-primary:focus-visible{outline-color:var(--fallback-p,oklch(var(--p)/1))}#twe-root .toggle-primary:checked,#twe-root .toggle-primary[checked=true],#twe-root .toggle-primary[aria-checked=true]{border-color:var(--fallback-p,oklch(var(--p)/var(--tw-border-opacity)));--tw-border-opacity: .1;--tw-bg-opacity: 1;background-color:var(--fallback-p,oklch(var(--p)/var(--tw-bg-opacity)));--tw-text-opacity: 1;color:var(--fallback-pc,oklch(var(--pc)/var(--tw-text-opacity)))}#twe-root .toggle-secondary:focus-visible{outline-color:var(--fallback-s,oklch(var(--s)/1))}#twe-root .toggle-secondary:checked,#twe-root .toggle-secondary[checked=true],#twe-root .toggle-secondary[aria-checked=true]{border-color:var(--fallback-s,oklch(var(--s)/var(--tw-border-opacity)));--tw-border-opacity: .1;--tw-bg-opacity: 1;background-color:var(--fallback-s,oklch(var(--s)/var(--tw-bg-opacity)));--tw-text-opacity: 1;color:var(--fallback-sc,oklch(var(--sc)/var(--tw-text-opacity)))}#twe-root .toggle:disabled{cursor:not-allowed;--tw-border-opacity: 1;border-color:var(--fallback-bc,oklch(var(--bc)/var(--tw-border-opacity)));background-color:transparent;opacity:.3;--togglehandleborder: 0 0 0 3px var(--fallback-bc,oklch(var(--bc)/1)) inset, var(--handleoffsetcalculator) 0 0 3px var(--fallback-bc,oklch(var(--bc)/1)) inset}#twe-root .btm-nav-xs>*:where(.active){border-top-width:1px}#twe-root .btm-nav-sm>*:where(.active){border-top-width:2px}#twe-root .btm-nav-md>*:where(.active){border-top-width:2px}#twe-root .btm-nav-lg>*:where(.active){border-top-width:4px}#twe-root .btn-xs{height:24px;min-height:24px;padding-left:8px;padding-right:8px;font-size:12px}#twe-root .btn-sm{height:32px;min-height:32px;padding-left:12px;padding-right:12px;font-size:14px}#twe-root .btn-square:where(.btn-xs){height:24px;width:24px;padding:0}#twe-root .btn-square:where(.btn-sm){height:32px;width:32px;padding:0}#twe-root .btn-circle:where(.btn-xs){height:24px;width:24px;border-radius:9999px;padding:0}#twe-root .btn-circle:where(.btn-sm){height:32px;width:32px;border-radius:9999px;padding:0}#twe-root [type=checkbox].checkbox-sm{height:20px;width:20px}#twe-root .input-xs{height:24px;padding-left:8px;padding-right:8px;font-size:12px;line-height:16px;line-height:1.625}#twe-root .input-sm{height:32px;padding-left:12px;padding-right:12px;font-size:14px;line-height:32px}#twe-root .join.join-vertical{flex-direction:column}#twe-root .join.join-vertical .join-item:first-child:not(:last-child),#twe-root .join.join-vertical *:first-child:not(:last-child) .join-item{border-end-start-radius:0;border-end-end-radius:0;border-start-start-radius:inherit;border-start-end-radius:inherit}#twe-root .join.join-vertical .join-item:last-child:not(:first-child),#twe-root .join.join-vertical *:last-child:not(:first-child) .join-item{border-start-start-radius:0;border-start-end-radius:0;border-end-start-radius:inherit;border-end-end-radius:inherit}#twe-root .join.join-horizontal{flex-direction:row}#twe-root .join.join-horizontal .join-item:first-child:not(:last-child),#twe-root .join.join-horizontal *:first-child:not(:last-child) .join-item{border-end-end-radius:0;border-start-end-radius:0;border-end-start-radius:inherit;border-start-start-radius:inherit}#twe-root .join.join-horizontal .join-item:last-child:not(:first-child),#twe-root .join.join-horizontal *:last-child:not(:first-child) .join-item{border-end-start-radius:0;border-start-start-radius:0;border-end-end-radius:inherit;border-start-end-radius:inherit}#twe-root .select-sm{height:32px;min-height:32px;padding-left:12px;padding-right:32px;font-size:14px;line-height:32px}#twe-root [dir=rtl] .select-sm{padding-left:32px;padding-right:12px}#twe-root .select-xs{height:24px;min-height:24px;padding-left:8px;padding-right:32px;font-size:12px;line-height:16px;line-height:1.625}#twe-root [dir=rtl] .select-xs{padding-left:32px;padding-right:8px}#twe-root .tooltip{position:relative;display:inline-block;--tooltip-offset: calc(100% + 1px + var(--tooltip-tail, 0px))}#twe-root .tooltip:before{position:absolute;pointer-events:none;z-index:1;content:var(--tw-content);--tw-content: attr(data-tip)}#twe-root .tooltip:before,#twe-root .tooltip-top:before{transform:translate(-50%);top:auto;left:50%;right:auto;bottom:var(--tooltip-offset)}#twe-root .tooltip-bottom:before{transform:translate(-50%);top:var(--tooltip-offset);left:50%;right:auto;bottom:auto}#twe-root .card-compact .card-body{padding:16px;font-size:14px;line-height:20px}#twe-root .card-compact .card-title{margin-bottom:4px}#twe-root .join.join-vertical>:where(*:not(:first-child)){margin-left:0;margin-right:0;margin-top:-1px}#twe-root .join.join-horizontal>:where(*:not(:first-child)){margin-top:0;margin-bottom:0;margin-inline-start:-1px}#twe-root .modal-top :where(.modal-box){width:100%;max-width:none;--tw-translate-y: -40px;--tw-scale-x: 1;--tw-scale-y: 1;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));border-bottom-right-radius:var(--rounded-box, 16px);border-bottom-left-radius:var(--rounded-box, 16px);border-top-left-radius:0;border-top-right-radius:0}#twe-root .modal-middle :where(.modal-box){width:91.666667%;max-width:512px;--tw-translate-y: 0px;--tw-scale-x: .9;--tw-scale-y: .9;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));border-top-left-radius:var(--rounded-box, 16px);border-top-right-radius:var(--rounded-box, 16px);border-bottom-right-radius:var(--rounded-box, 16px);border-bottom-left-radius:var(--rounded-box, 16px)}#twe-root .modal-bottom :where(.modal-box){width:100%;max-width:none;--tw-translate-y: 40px;--tw-scale-x: 1;--tw-scale-y: 1;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));border-top-left-radius:var(--rounded-box, 16px);border-top-right-radius:var(--rounded-box, 16px);border-bottom-right-radius:0;border-bottom-left-radius:0}#twe-root .table-xs :not(thead):not(tfoot) tr{font-size:12px;line-height:16px}#twe-root .table-xs :where(th,td){padding:4px 8px}#twe-root .tooltip{position:relative;display:inline-block;text-align:center;--tooltip-tail: 3px;--tooltip-color: var(--fallback-n,oklch(var(--n)/1));--tooltip-text-color: var(--fallback-nc,oklch(var(--nc)/1));--tooltip-tail-offset: calc(100% + 1px - var(--tooltip-tail))}#twe-root .tooltip:before,#twe-root .tooltip:after{opacity:0;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,-webkit-backdrop-filter;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter,-webkit-backdrop-filter;transition-delay:.1s;transition-duration:.2s;transition-timing-function:cubic-bezier(.4,0,.2,1)}#twe-root .tooltip:after{position:absolute;content:"";border-style:solid;border-width:var(--tooltip-tail, 0);width:0;height:0;display:block}#twe-root .tooltip:before{max-width:320px;border-radius:4px;padding:4px 8px;font-size:14px;line-height:20px;background-color:var(--tooltip-color);color:var(--tooltip-text-color);width:-moz-max-content;width:max-content}#twe-root .tooltip.tooltip-open:before{opacity:1;transition-delay:75ms}#twe-root .tooltip.tooltip-open:after{opacity:1;transition-delay:75ms}#twe-root .tooltip:hover:before{opacity:1;transition-delay:75ms}#twe-root .tooltip:hover:after{opacity:1;transition-delay:75ms}#twe-root .tooltip:has(:focus-visible):after,#twe-root .tooltip:has(:focus-visible):before{opacity:1;transition-delay:75ms}#twe-root .tooltip:not([data-tip]):hover:before,#twe-root .tooltip:not([data-tip]):hover:after{visibility:hidden;opacity:0}#twe-root .tooltip:after,#twe-root .tooltip-top:after{transform:translate(-50%);border-color:var(--tooltip-color) transparent transparent transparent;top:auto;left:50%;right:auto;bottom:var(--tooltip-tail-offset)}#twe-root .tooltip-bottom:after{transform:translate(-50%);border-color:transparent transparent var(--tooltip-color) transparent;top:var(--tooltip-tail-offset);left:50%;right:auto;bottom:auto}#twe-root .static{position:static}#twe-root .fixed{position:fixed}#twe-root .absolute{position:absolute}#twe-root .relative{position:relative}#twe-root .bottom-0{bottom:0}#twe-root .bottom-0\\.5{bottom:2px}#twe-root .left-0{left:0}#twe-root .left-0\\.5{left:2px}#twe-root .left-8{left:32px}#twe-root .left-\\[-20px\\]{left:-20px}#twe-root .right-3{right:12px}#twe-root .top-3{top:12px}#twe-root .top-8{top:32px}#twe-root .top-\\[60\\%\\]{top:60%}#twe-root .m-0{margin:0}#twe-root .my-3{margin-top:12px;margin-bottom:12px}#twe-root .my-\\[2px\\]{margin-top:2px;margin-bottom:2px}#twe-root .mb-0{margin-bottom:0}#twe-root .mb-1{margin-bottom:4px}#twe-root .mb-2{margin-bottom:8px}#twe-root .ml-0{margin-left:0}#twe-root .ml-0\\.5{margin-left:2px}#twe-root .ml-1{margin-left:4px}#twe-root .ml-4{margin-left:16px}#twe-root .mr-2{margin-right:8px}#twe-root .mr-3{margin-right:12px}#twe-root .mt-0{margin-top:0}#twe-root .mt-2{margin-top:8px}#twe-root .mt-3{margin-top:12px}#twe-root .mt-6{margin-top:24px}#twe-root .block{display:block}#twe-root .inline{display:inline}#twe-root .flex{display:flex}#twe-root .inline-flex{display:inline-flex}#twe-root .\\!table{display:table!important}#twe-root .table{display:table}#twe-root .contents{display:contents}#twe-root .h-12{height:48px}#twe-root .h-2{height:8px}#twe-root .h-28{height:112px}#twe-root .h-4{height:16px}#twe-root .h-52{height:208px}#twe-root .h-6{height:24px}#twe-root .h-8{height:32px}#twe-root .h-9{height:36px}#twe-root .h-full{height:100%}#twe-root .max-h-48{max-height:192px}#twe-root .max-h-\\[400px\\]{max-height:400px}#twe-root .max-h-\\[500px\\]{max-height:500px}#twe-root .w-1\\/2{width:50%}#twe-root .w-12{width:48px}#twe-root .w-20{width:80px}#twe-root .w-24{width:96px}#twe-root .w-32{width:128px}#twe-root .w-36{width:144px}#twe-root .w-4{width:16px}#twe-root .w-48{width:192px}#twe-root .w-52{width:208px}#twe-root .w-60{width:240px}#twe-root .w-80{width:320px}#twe-root .w-9{width:36px}#twe-root .w-auto{width:auto}#twe-root .w-full{width:100%}#twe-root .w-max{width:-moz-max-content;width:max-content}#twe-root .max-w-4xl{max-width:896px}#twe-root .max-w-full{max-width:100%}#twe-root .max-w-lg{max-width:512px}#twe-root .max-w-sm{max-width:384px}#twe-root .max-w-xl{max-width:576px}#twe-root .max-w-xs{max-width:320px}#twe-root .flex-shrink-0,#twe-root .shrink-0{flex-shrink:0}#twe-root .flex-grow,#twe-root .grow{flex-grow:1}#twe-root .origin-\\[bottom_center\\]{transform-origin:bottom center}#twe-root .translate-x-0{--tw-translate-x: 0px;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}#twe-root .translate-x-\\[-500px\\]{--tw-translate-x: -500px;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}#twe-root .transform-none{transform:none}@keyframes ping{75%,to{transform:scale(2);opacity:0}}#twe-root .animate-ping{animation:ping 1s cubic-bezier(0,0,.2,1) infinite}#twe-root .cursor-pointer{cursor:pointer}#twe-root .select-none{-webkit-user-select:none;-moz-user-select:none;user-select:none}#twe-root .resize{resize:both}#twe-root .flex-row{flex-direction:row}#twe-root .flex-col{flex-direction:column}#twe-root .items-start{align-items:flex-start}#twe-root .items-center{align-items:center}#twe-root .justify-start{justify-content:flex-start}#twe-root .justify-end{justify-content:flex-end}#twe-root .justify-center{justify-content:center}#twe-root .justify-between{justify-content:space-between}#twe-root .gap-2{gap:8px}#twe-root .space-x-1>:not([hidden])~:not([hidden]){--tw-space-x-reverse: 0;margin-right:calc(4px * var(--tw-space-x-reverse));margin-left:calc(4px * calc(1 - var(--tw-space-x-reverse)))}#twe-root .space-x-2>:not([hidden])~:not([hidden]){--tw-space-x-reverse: 0;margin-right:calc(8px * var(--tw-space-x-reverse));margin-left:calc(8px * calc(1 - var(--tw-space-x-reverse)))}#twe-root .overflow-hidden{overflow:hidden}#twe-root .overflow-scroll{overflow:scroll}#twe-root .overflow-x-scroll{overflow-x:scroll}#twe-root .overflow-y-scroll{overflow-y:scroll}#twe-root .overscroll-none{overscroll-behavior:none}#twe-root .truncate{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}#twe-root .whitespace-nowrap{white-space:nowrap}#twe-root .whitespace-pre{white-space:pre}#twe-root .whitespace-pre-wrap{white-space:pre-wrap}#twe-root .break-all{word-break:break-all}#twe-root .rounded{border-radius:4px}#twe-root .rounded-box{border-radius:var(--rounded-box, 16px)}#twe-root .rounded-full{border-radius:9999px}#twe-root .rounded-md{border-radius:6px}#twe-root .border{border-width:1px}#twe-root .border-solid{border-style:solid}#twe-root .border-neutral-content{--tw-border-opacity: 1;border-color:var(--fallback-nc,oklch(var(--nc)/var(--tw-border-opacity)))}#twe-root .border-opacity-50{--tw-border-opacity: .5}#twe-root .bg-base-100{--tw-bg-opacity: 1;background-color:var(--fallback-b1,oklch(var(--b1)/var(--tw-bg-opacity)))}#twe-root .bg-base-200{--tw-bg-opacity: 1;background-color:var(--fallback-b2,oklch(var(--b2)/var(--tw-bg-opacity)))}#twe-root .bg-base-300{--tw-bg-opacity: 1;background-color:var(--fallback-b3,oklch(var(--b3)/var(--tw-bg-opacity)))}#twe-root .bg-black{--tw-bg-opacity: 1;background-color:rgb(0 0 0 / var(--tw-bg-opacity))}#twe-root .bg-primary{--tw-bg-opacity: 1;background-color:var(--fallback-p,oklch(var(--p)/var(--tw-bg-opacity)))}#twe-root .bg-secondary{--tw-bg-opacity: 1;background-color:var(--fallback-s,oklch(var(--s)/var(--tw-bg-opacity)))}#twe-root .bg-transparent{background-color:transparent}#twe-root .bg-opacity-30{--tw-bg-opacity: .3}#twe-root .fill-base-content{fill:var(--fallback-bc,oklch(var(--bc)/1))}#twe-root .object-contain{-o-object-fit:contain;object-fit:contain}#twe-root .object-cover{-o-object-fit:cover;object-fit:cover}#twe-root .p-0{padding:0}#twe-root .p-2{padding:8px}#twe-root .p-3{padding:12px}#twe-root .px-0{padding-left:0;padding-right:0}#twe-root .px-0\\.5{padding-left:2px;padding-right:2px}#twe-root .px-1{padding-left:4px;padding-right:4px}#twe-root .px-2{padding-left:8px;padding-right:8px}#twe-root .px-4{padding-left:16px;padding-right:16px}#twe-root .py-2{padding-top:8px;padding-bottom:8px}#twe-root .py-2\\.5{padding-top:10px;padding-bottom:10px}#twe-root .py-3{padding-top:12px;padding-bottom:12px}#twe-root .text-center{text-align:center}#twe-root .align-top{vertical-align:top}#twe-root .align-middle{vertical-align:middle}#twe-root .font-mono{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace}#twe-root .text-base{font-size:16px;line-height:24px}#twe-root .text-sm{font-size:14px;line-height:20px}#twe-root .text-xl{font-size:20px;line-height:28px}#twe-root .text-xs{font-size:12px;line-height:16px}#twe-root .font-bold{font-weight:700}#twe-root .font-medium{font-weight:500}#twe-root .font-semibold{font-weight:600}#twe-root .leading-4{line-height:16px}#twe-root .leading-5{line-height:20px}#twe-root .leading-6{line-height:24px}#twe-root .leading-8{line-height:32px}#twe-root .leading-\\[48px\\]{line-height:48px}#twe-root .leading-loose{line-height:2}#twe-root .leading-none{line-height:1}#twe-root .leading-normal{line-height:1.5}#twe-root .text-base-content{--tw-text-opacity: 1;color:var(--fallback-bc,oklch(var(--bc)/var(--tw-text-opacity)))}#twe-root .text-error{--tw-text-opacity: 1;color:var(--fallback-er,oklch(var(--er)/var(--tw-text-opacity)))}#twe-root .text-success{--tw-text-opacity: 1;color:var(--fallback-su,oklch(var(--su)/var(--tw-text-opacity)))}#twe-root .text-warning{--tw-text-opacity: 1;color:var(--fallback-wa,oklch(var(--wa)/var(--tw-text-opacity)))}#twe-root .text-white{--tw-text-opacity: 1;color:rgb(255 255 255 / var(--tw-text-opacity))}#twe-root .text-opacity-50{--tw-text-opacity: .5}#twe-root .text-opacity-60{--tw-text-opacity: .6}#twe-root .text-opacity-70{--tw-text-opacity: .7}#twe-root .opacity-50{opacity:.5}#twe-root .opacity-75{opacity:.75}#twe-root .shadow-xl{--tw-shadow: 0 20px 25px -5px rgb(0 0 0 / .1), 0 8px 10px -6px rgb(0 0 0 / .1);--tw-shadow-colored: 0 20px 25px -5px var(--tw-shadow-color), 0 8px 10px -6px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}#twe-root .filter{filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}#twe-root .transition-all{transition-property:all;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}#twe-root .transition-colors{transition-property:color,background-color,border-color,text-decoration-color,fill,stroke;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}#twe-root .transition-transform{transition-property:transform;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}#twe-root .duration-200{transition-duration:.2s}#twe-root .duration-500{transition-duration:.5s}#twe-root .rounded-box-half{border-radius:calc(var(--rounded-box) / 2)}#twe-root .table-border-bc :where(thead,tbody) :where(tr:not(:last-child)),#twe-root .table-border-bc :where(thead,tbody) :where(tr:first-child:last-child){--tw-border-opacity: 20%;border-bottom-width:1px;border-bottom-color:var(--fallback-bc, oklch(var(--bc) / var(--tw-border-opacity)))}#twe-root .table-padding-sm :where(th,td){padding:8px 12px}#twe-root .no-scrollbar::-webkit-scrollbar{display:none}#twe-root .no-scrollbar{-ms-overflow-style:none;scrollbar-width:none}#twe-root .before\\:max-w-40:before{content:var(--tw-content);max-width:160px}#twe-root .before\\:max-w-max:before{content:var(--tw-content);max-width:-moz-max-content;max-width:max-content}#twe-root .before\\:whitespace-pre-line:before{content:var(--tw-content);white-space:pre-line}#twe-root .hover\\:bg-base-200:hover{--tw-bg-opacity: 1;background-color:var(--fallback-b2,oklch(var(--b2)/var(--tw-bg-opacity)))}#twe-root .group:hover .group-hover\\:translate-x-\\[5px\\]{--tw-translate-x: 5px;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}#twe-root .group:hover .group-hover\\:rotate-\\[20deg\\]{--tw-rotate: 20deg;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}#twe-root .group:hover .group-hover\\:opacity-90{opacity:.9}@media (min-width: 640px){#twe-root .sm\\:max-w-screen-sm{max-width:640px}}@media (min-width: 768px){#twe-root .md\\:max-w-screen-md{max-width:768px}#twe-root .md\\:max-w-screen-sm{max-width:640px}}#twe-root .\\[\\&\\>path\\]\\:stroke-0>path{stroke-width:0} `);

(function (preact, hooks, i18next, signals, dayjs, tableCore) {
  'use strict';

  var __defProp = Object.defineProperty;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __publicField = (obj, key, value) => {
    __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
  };
  var defaultAttributes = {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": 2,
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  };
  var __defProp2 = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp2 = (obj, key, value) => key in obj ? __defProp2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp2(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp2(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __objRest = (source, exclude) => {
    var target = {};
    for (var prop in source)
      if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
        target[prop] = source[prop];
    if (source != null && __getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(source)) {
        if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
          target[prop] = source[prop];
      }
    return target;
  };
  var createPreactComponent = (iconName, iconNamePascal, iconNode) => {
    const Component2 = (_a) => {
      var _b = _a, { color = "currentColor", size = 24, stroke = 2, children } = _b, rest = __objRest(_b, ["color", "size", "stroke", "children"]);
      return preact.h(
        "svg",
        __spreadValues(__spreadProps(__spreadValues({}, defaultAttributes), {
          width: size,
          height: size,
          stroke: color,
          "stroke-width": stroke,
          class: `tabler-icon tabler-icon-${iconName}`
        }), rest),
        [...iconNode.map(([tag, attrs]) => preact.h(tag, attrs)), ...preact.toChildArray(children)]
      );
    };
    Component2.displayName = `${iconNamePascal}`;
    return Component2;
  };
  var IconArrowUpRight = createPreactComponent("arrow-up-right", "IconArrowUpRight", [
    ["path", { d: "M17 7l-10 10", key: "svg-0" }],
    ["path", { d: "M8 7l9 0l0 9", key: "svg-1" }]
  ]);
  var IconBrandGithubFilled = createPreactComponent(
    "brand-github-filled",
    "IconBrandGithubFilled",
    [
      [
        "path",
        {
          d: "M5.315 2.1c.791 -.113 1.9 .145 3.333 .966l.272 .161l.16 .1l.397 -.083a13.3 13.3 0 0 1 4.59 -.08l.456 .08l.396 .083l.161 -.1c1.385 -.84 2.487 -1.17 3.322 -1.148l.164 .008l.147 .017l.076 .014l.05 .011l.144 .047a1 1 0 0 1 .53 .514a5.2 5.2 0 0 1 .397 2.91l-.047 .267l-.046 .196l.123 .163c.574 .795 .93 1.728 1.03 2.707l.023 .295l.007 .272c0 3.855 -1.659 5.883 -4.644 6.68l-.245 .061l-.132 .029l.014 .161l.008 .157l.004 .365l-.002 .213l-.003 3.834a1 1 0 0 1 -.883 .993l-.117 .007h-6a1 1 0 0 1 -.993 -.883l-.007 -.117v-.734c-1.818 .26 -3.03 -.424 -4.11 -1.878l-.535 -.766c-.28 -.396 -.455 -.579 -.589 -.644l-.048 -.019a1 1 0 0 1 .564 -1.918c.642 .188 1.074 .568 1.57 1.239l.538 .769c.76 1.079 1.36 1.459 2.609 1.191l.001 -.678l-.018 -.168a5.03 5.03 0 0 1 -.021 -.824l.017 -.185l.019 -.12l-.108 -.024c-2.976 -.71 -4.703 -2.573 -4.875 -6.139l-.01 -.31l-.004 -.292a5.6 5.6 0 0 1 .908 -3.051l.152 -.222l.122 -.163l-.045 -.196a5.2 5.2 0 0 1 .145 -2.642l.1 -.282l.106 -.253a1 1 0 0 1 .529 -.514l.144 -.047l.154 -.03z",
          fill: "currentColor",
          key: "svg-0",
          strokeWidth: "0"
        }
      ]
    ]
  );
  var IconChevronLeftPipe = createPreactComponent(
    "chevron-left-pipe",
    "IconChevronLeftPipe",
    [
      ["path", { d: "M7 6v12", key: "svg-0" }],
      ["path", { d: "M18 6l-6 6l6 6", key: "svg-1" }]
    ]
  );
  var IconChevronLeft = createPreactComponent("chevron-left", "IconChevronLeft", [
    ["path", { d: "M15 6l-6 6l6 6", key: "svg-0" }]
  ]);
  var IconChevronRightPipe = createPreactComponent(
    "chevron-right-pipe",
    "IconChevronRightPipe",
    [
      ["path", { d: "M6 6l6 6l-6 6", key: "svg-0" }],
      ["path", { d: "M17 5v13", key: "svg-1" }]
    ]
  );
  var IconChevronRight = createPreactComponent("chevron-right", "IconChevronRight", [
    ["path", { d: "M9 6l6 6l-6 6", key: "svg-0" }]
  ]);
  var IconCircleCheck = createPreactComponent("circle-check", "IconCircleCheck", [
    ["path", { d: "M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0", key: "svg-0" }],
    ["path", { d: "M9 12l2 2l4 -4", key: "svg-1" }]
  ]);
  var IconCircleDashed = createPreactComponent("circle-dashed", "IconCircleDashed", [
    ["path", { d: "M8.56 3.69a9 9 0 0 0 -2.92 1.95", key: "svg-0" }],
    ["path", { d: "M3.69 8.56a9 9 0 0 0 -.69 3.44", key: "svg-1" }],
    ["path", { d: "M3.69 15.44a9 9 0 0 0 1.95 2.92", key: "svg-2" }],
    ["path", { d: "M8.56 20.31a9 9 0 0 0 3.44 .69", key: "svg-3" }],
    ["path", { d: "M15.44 20.31a9 9 0 0 0 2.92 -1.95", key: "svg-4" }],
    ["path", { d: "M20.31 15.44a9 9 0 0 0 .69 -3.44", key: "svg-5" }],
    ["path", { d: "M20.31 8.56a9 9 0 0 0 -1.95 -2.92", key: "svg-6" }],
    ["path", { d: "M15.44 3.69a9 9 0 0 0 -3.44 -.69", key: "svg-7" }]
  ]);
  var IconExclamationCircle = createPreactComponent(
    "exclamation-circle",
    "IconExclamationCircle",
    [
      ["path", { d: "M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0", key: "svg-0" }],
      ["path", { d: "M12 9v4", key: "svg-1" }],
      ["path", { d: "M12 16v.01", key: "svg-2" }]
    ]
  );
  var IconHelp = createPreactComponent("help", "IconHelp", [
    ["path", { d: "M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0", key: "svg-0" }],
    ["path", { d: "M12 17l0 .01", key: "svg-1" }],
    [
      "path",
      { d: "M12 13.5a1.5 1.5 0 0 1 1 -1.5a2.6 2.6 0 1 0 -3 -4", key: "svg-2" }
    ]
  ]);
  var IconInfoCircle = createPreactComponent("info-circle", "IconInfoCircle", [
    ["path", { d: "M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0", key: "svg-0" }],
    ["path", { d: "M12 9h.01", key: "svg-1" }],
    ["path", { d: "M11 12h1v4h1", key: "svg-2" }]
  ]);
  var IconLink = createPreactComponent("link", "IconLink", [
    ["path", { d: "M9 15l6 -6", key: "svg-0" }],
    [
      "path",
      { d: "M11 6l.463 -.536a5 5 0 0 1 7.071 7.072l-.534 .464", key: "svg-1" }
    ],
    [
      "path",
      {
        d: "M13 18l-.397 .534a5.068 5.068 0 0 1 -7.127 0a4.972 4.972 0 0 1 0 -7.071l.524 -.463",
        key: "svg-2"
      }
    ]
  ]);
  var IconSearch = createPreactComponent("search", "IconSearch", [
    ["path", { d: "M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0", key: "svg-0" }],
    ["path", { d: "M21 21l-6 -6", key: "svg-1" }]
  ]);
  var IconSettings = createPreactComponent("settings", "IconSettings", [
    [
      "path",
      {
        d: "M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z",
        key: "svg-0"
      }
    ],
    ["path", { d: "M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0", key: "svg-1" }]
  ]);
  var IconSortAscending = createPreactComponent("sort-ascending", "IconSortAscending", [
    ["path", { d: "M4 6l7 0", key: "svg-0" }],
    ["path", { d: "M4 12l7 0", key: "svg-1" }],
    ["path", { d: "M4 18l9 0", key: "svg-2" }],
    ["path", { d: "M15 9l3 -3l3 3", key: "svg-3" }],
    ["path", { d: "M18 6l0 12", key: "svg-4" }]
  ]);
  var IconSortDescending = createPreactComponent("sort-descending", "IconSortDescending", [
    ["path", { d: "M4 6l9 0", key: "svg-0" }],
    ["path", { d: "M4 12l7 0", key: "svg-1" }],
    ["path", { d: "M4 18l7 0", key: "svg-2" }],
    ["path", { d: "M15 15l3 3l3 -3", key: "svg-3" }],
    ["path", { d: "M18 6l0 12", key: "svg-4" }]
  ]);
  var IconX = createPreactComponent("x", "IconX", [
    ["path", { d: "M18 6l-12 12", key: "svg-0" }],
    ["path", { d: "M6 6l12 12", key: "svg-1" }]
  ]);
  const en = { "common": { "Refresh or clear to start new captures.": "Refresh or clear to start new captures.", "Settings": "Settings", "General": "General", "Theme": "Theme", "Language": "Language", "Debug": "Debug", "Date Time Format": "Date Time Format", "Click for more information. This will take effect on both previewer and exported files.": "Click for more information. This will take effect on both previewer and exported files.", "Module": "Module", "Modules": "Modules", "About": "About", "Version": "Version", "Search...": "Search...", "Something went wrong.": "Something went wrong.", "Error:": "Error:", "Captured:": "Captured:", "Rows per page:": "Rows per page:", "A - B of N items": "{{from}} - {{to}} of {{total}} items", "No data available.": "No data available.", "Clear": "Clear", "Export Media": "Export Media", "Export Data": "Export Data", "JSON View": "JSON View", "Media View": "Media View", "Bookmarks": "Bookmarks", "Followers": "Followers", "Following": "Following", "HomeTimeline": "HomeTimeline", "Likes": "Likes", "ListMembers": "ListMembers", "ListSubscribers": "ListSubscribers", "ListTimeline": "ListTimeline", "RuntimeLogs": "RuntimeLogs", "SearchTimeline": "SearchTimeline", "TweetDetail": "TweetDetail", "UserMedia": "UserMedia", "UserTweets": "UserTweets" }, "exporter": { "ID": "ID", "Date": "Date", "Content": "Content", "Show Full Text": "Show Full Text", "Media": "Media", "Screen Name": "Screen Name", "Profile Name": "Profile Name", "Profile Image": "Profile Image", "Replying To": "Replying To", "RT Source": "RT Source", "Quote Source": "Quote Source", "Favorites": "Favorites", "Retweets": "Retweets", "Bookmarks": "Bookmarks", "Quotes": "Quotes", "Replies": "Replies", "Views": "Views", "Favorited": "Favorited", "Retweeted": "Retweeted", "Bookmarked": "Bookmarked", "URL": "URL", "Actions": "Actions", "Details": "Details", "Description": "Description", "Profile Banner": "Profile Banner", "Followers": "Followers", "Statuses": "Statuses", "Favourites": "Favourites", "Listed": "Listed", "Verified Type": "Verified Type", "Blue Verified": "Blue Verified", "Following": "Following", "Follows You": "Follows You", "Created At": "Created At", "Data": "Data", "Export captured data as JSON/HTML/CSV file. This may take a while depending on the amount of data. The exported file does not include media files such as images and videos but only the URLs.": "Export captured data as JSON/HTML/CSV file. This may take a while depending on the amount of data. The exported file does not include media files such as images and videos but only the URLs.", "Data length:": "Data length:", "Include all metadata:": "Include all metadata:", "Export as:": "Export as:", "No data selected.": "No data selected.", "Cancel": "Cancel", "Start Export": "Start Export", "Download and save media files from captured data. This may take a while depending on the amount of data. Media that will be downloaded includes: profile images, profile banners (for users), images, videos (for tweets).": "Download and save media files from captured data. This may take a while depending on the amount of data. Media that will be downloaded includes: profile images, profile banners (for users), images, videos (for tweets).", "For more than 100 media or large files, it is recommended to copy the URLs and download them with an external download manager such as aria2.": "For more than 100 media or large files, it is recommended to copy the URLs and download them with an external download manager such as aria2.", "Filename template:": "Filename template:", "Rate limit (ms):": "Rate limit (ms):", "Include retweets:": "Include retweets:", "File Name": "File Name", "Download URL": "Download URL", "No media selected.": "No media selected.", "Copied!": "Copied!", "Copy URLs": "Copy URLs", "The tweet ID": "The tweet ID", "The username of tweet author": "The username of tweet author", "The profile name of tweet author": "The profile name of tweet author", "The media index in tweet (start from 0)": "The media index in tweet (start from 0)", "The order of media in tweet (1/2/3/4)": "The order of media in tweet (1/2/3/4)", "The post date in YYYYMMDD format": "The post date in YYYYMMDD format", "The post time in HHmmss format": "The post time in HHmmss format", "The media type (photo/video/animated_gif)": "The media type (photo/video/animated_gif)", "The file extension of media (jpg/png/mp4)": "The file extension of media (jpg/png/mp4)", "Failed to export media. Open DevTools for more details.": "Failed to export media. Open DevTools for more details.", "Failed to copy media URLs. Open DevTools for more details.": "Failed to copy media URLs. Open DevTools for more details." } };
  const zh_Hans = { "common": { "Refresh or clear to start new captures.": "刷新页面或清除数据以开始新的捕获。", "Settings": "设置", "General": "通用", "Theme": "主题", "Language": "语言", "Debug": "调试开关", "Date Time Format": "日期时间格式", "Click for more information. This will take effect on both previewer and exported files.": "点击查看详细信息。此选项会影响预览和导出的文件。", "Module": "模块", "Modules": "模块列表", "About": "关于", "Version": "版本", "Search...": "搜索...", "Something went wrong.": "出错了。", "Error:": "错误:", "Captured:": "已捕获:", "Rows per page:": "每页显示行数:", "A - B of N items": "第 {{from}} - {{to}} 项，共 {{total}} 项", "No data available.": "没有数据。", "Clear": "清除", "Export Media": "导出媒体文件", "Export Data": "导出数据", "JSON View": "JSON 数据预览", "Media View": "媒体预览", "Bookmarks": "书签", "Followers": "关注者", "Following": "正在关注", "HomeTimeline": "主页时间线", "Likes": "喜欢", "ListMembers": "列表成员", "ListSubscribers": "列表关注者", "ListTimeline": "列表时间线", "RuntimeLogs": "运行时日志", "SearchTimeline": "搜索结果", "TweetDetail": "推文详情", "UserMedia": "用户媒体", "UserTweets": "用户推文" }, "exporter": { "ID": "ID", "Date": "日期", "Content": "内容", "Show Full Text": "显示全文", "Media": "媒体", "Screen Name": "用户名", "Profile Name": "用户昵称", "Profile Image": "用户头像", "Replying To": "回复推文", "RT Source": "转推来源", "Quote Source": "引用来源", "Favorites": "喜欢数量", "Retweets": "转推数量", "Bookmarks": "书签数量", "Quotes": "引用数量", "Replies": "回复数量", "Views": "查看次数", "Favorited": "已喜欢", "Retweeted": "已转推", "Bookmarked": "已加书签", "URL": "URL", "Actions": "操作", "Details": "查看详情", "Description": "简介", "Profile Banner": "个人资料头图", "Followers": "关注者数量", "Statuses": "推文数量", "Favourites": "喜欢数量", "Listed": "被加入列表数", "Verified Type": "认证类型", "Blue Verified": "蓝标认证", "Following": "正在关注", "Follows You": "关注你", "Created At": "创建时间", "Data": "数据", "Export captured data as JSON/HTML/CSV file. This may take a while depending on the amount of data. The exported file does not include media files such as images and videos but only the URLs.": "将捕获的数据导出为 JSON/HTML/CSV 文件。这可能需要一些时间，具体取决于数据量。导出的文件不包括图片和视频等媒体文件，只包括它们的 URL。", "Data length:": "数据长度:", "Include all metadata:": "包括所有元数据:", "Export as:": "导出为:", "No data selected.": "未选择数据。", "Cancel": "取消", "Start Export": "开始导出", "Download and save media files from captured data. This may take a while depending on the amount of data. Media that will be downloaded includes: profile images, profile banners (for users), images, videos (for tweets).": "从捕获的数据中下载并保存媒体文件。这可能需要一些时间，具体取决于数据量。将下载的媒体包括：用户的个人资料图片、个人资料头图、图片、推文中的视频。", "For more than 100 media or large files, it is recommended to copy the URLs and download them with an external download manager such as aria2.": "对于超过 100 个媒体或大文件，建议复制 URL 并使用外部下载管理器（如 aria2）下载。", "Filename template:": "文件名模板:", "Rate limit (ms):": "速率限制（毫秒）:", "Include retweets:": "包括转推:", "File Name": "文件名", "Download URL": "下载地址", "No media selected.": "未选择媒体。", "Copied!": "已复制！", "Copy URLs": "复制 URL", "The tweet ID": "推文 ID", "The username of tweet author": "推文作者的用户名", "The profile name of tweet author": "推文作者的用户昵称", "The media index in tweet (start from 0)": "推文中的媒体索引（从 0 开始）", "The order of media in tweet (1/2/3/4)": "推文中的媒体顺序（1/2/3/4）", "The post date in YYYYMMDD format": "发布日期（YYYYMMDD 格式）", "The post time in HHmmss format": "发布时间（HHmmss 格式）", "The media type (photo/video/animated_gif)": "媒体类型（photo/video/animated_gif）", "The file extension of media (jpg/png/mp4)": "媒体文件扩展名（jpg/png/mp4）", "Failed to export media. Open DevTools for more details.": "导出媒体失败。打开 DevTools 以获取更多详细信息。", "Failed to copy media URLs. Open DevTools for more details.": "复制媒体 URL 失败。打开 DevTools 以获取更多详细信息。" } };
  const resources = {
    "en": en,
    "zh-Hans": zh_Hans
  };
  const logLinesSignal = signals.signal([]);
  class Logger {
    constructor() {
      __publicField(this, "index", 0);
      __publicField(this, "buffer", []);
      __publicField(this, "bufferTimer", null);
    }
    info(line, ...args) {
      console.info("[twitter-web-exporter]", line, ...args);
      this.writeBuffer({
        type: "info",
        line,
        index: this.index++
      });
    }
    warn(line, ...args) {
      console.warn("[twitter-web-exporter]", line, ...args);
      this.writeBuffer({
        type: "warn",
        line,
        index: this.index++
      });
    }
    error(line, ...args) {
      console.error("[twitter-web-exporter]", line, ...args);
      this.writeBuffer({
        type: "error",
        line,
        index: this.index++
      });
    }
    errorWithBanner(msg, err, ...args) {
      this.error(`${msg} (Message: ${(err == null ? void 0 : err.message) ?? "none"})
  This may be a problem caused by Twitter updates.
  Please file an issue on GitHub:
  https://github.com/prinsss/twitter-web-exporter/issues`, ...args);
    }
    debug(...args) {
      console.debug("[twitter-web-exporter]", ...args);
    }
    /**
     * Buffer log lines to reduce the number of signal and DOM updates.
     */
    writeBuffer(log) {
      this.buffer.push(log);
      if (this.bufferTimer) {
        clearTimeout(this.bufferTimer);
      }
      this.bufferTimer = window.setTimeout(() => {
        this.bufferTimer = null;
        this.flushBuffer();
      }, 0);
    }
    /**
     * Flush buffered log lines and update the UI.
     */
    flushBuffer() {
      logLinesSignal.value = [...logLinesSignal.value, ...this.buffer];
      this.buffer = [];
    }
  }
  const logger = new Logger();
  function safeJSONParse(text) {
    try {
      return JSON.parse(text);
    } catch (e) {
      logger.error(e.message);
      return null;
    }
  }
  function useSignal(value) {
    return hooks.useMemo(() => signals.signal(value), []);
  }
  function useSignalState(value) {
    const signal2 = useSignal(value);
    const updateSignal = (newValue) => {
      signal2.value = newValue;
    };
    return [signal2.value, updateSignal, signal2];
  }
  function useToggle(defaultValue = false) {
    const signal2 = useSignal(defaultValue);
    const toggle = () => {
      signal2.value = !signal2.value;
    };
    return [signal2.value, toggle, signal2];
  }
  function cx(...classNames) {
    return classNames.filter(Boolean).join(" ");
  }
  function isEqual(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  }
  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  function xssFilter(str) {
    return str.replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  function strEntitiesToHTML(str, urls) {
    let temp = str;
    if (!(urls == null ? void 0 : urls.length)) {
      return temp;
    }
    for (const {
      url,
      display_url,
      expanded_url
    } of urls) {
      temp = temp.replaceAll(url, `<a class="link" target="_blank" href="${xssFilter(expanded_url)}">${xssFilter(display_url)}</a>`);
    }
    return temp;
  }
  function parseTwitterDateTime(str) {
    const trimmed = str.replace(/^\w+ (.*)$/, "$1");
    return dayjs(trimmed, "MMM DD HH:mm:ss ZZ YYYY", "en");
  }
  function formatDateTime(date, format) {
    if (typeof date === "number" || typeof date === "string") {
      date = dayjs(date);
    }
    return date.format(format);
  }
  function formatVideoDuration(durationInMs) {
    if (typeof durationInMs !== "number" || Number.isNaN(durationInMs)) {
      return "N/A";
    }
    const durationInSeconds = Math.floor(durationInMs / 1e3);
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = durationInSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }
  const name = "twitter-web-exporter";
  const description = "Export tweets, bookmarks, lists and much more from Twitter(X) web app.";
  const version = "1.1.0";
  const author = "prin <hi@prin.studio>";
  const license = "MIT";
  const homepage = "https://github.com/prinsss/twitter-web-exporter";
  const bugs = "https://github.com/prinsss/twitter-web-exporter/issues";
  const type = "module";
  const scripts = {
    dev: "vite",
    build: "tsc && vite build",
    prepare: "husky install",
    lint: "eslint --ignore-pattern dist --ext .ts,.tsx .",
    commitlint: "commitlint --edit",
    changelog: "git-cliff -o CHANGELOG.md",
    preview: "vite preview"
  };
  const dependencies = {
    "@preact/signals": "1.2.2",
    "@preact/signals-core": "1.5.1",
    "@tabler/icons-preact": "2.44.0",
    "@tanstack/table-core": "8.11.2",
    dayjs: "1.11.10",
    "file-saver": "2.0.5",
    i18next: "23.11.1",
    preact: "10.19.3"
  };
  const devDependencies = {
    "@commitlint/cli": "^18.4.4",
    "@commitlint/config-conventional": "^18.4.4",
    "@preact/preset-vite": "^2.7.0",
    "@types/file-saver": "^2.0.7",
    "@types/node": "^20",
    "@typescript-eslint/eslint-plugin": "^6.17.0",
    "@typescript-eslint/parser": "^6.17.0",
    autoprefixer: "^10.4.16",
    daisyui: "^4.4.24",
    eslint: "^8.56.0",
    "eslint-config-prettier": "^9.1.0",
    "eslint-plugin-prettier": "^5.1.2",
    "git-cliff": "^1.4.0",
    husky: "^8.0.3",
    "postcss-prefix-selector": "^1.16.0",
    "postcss-rem-to-pixel-next": "^5.0.3",
    tailwindcss: "^3.4.0",
    typescript: "^5.3.3",
    vite: "^5.0.10",
    "vite-plugin-i18next-loader": "^2.0.12",
    "vite-plugin-monkey": "^3.5.1"
  };
  const packageJson = {
    name,
    description,
    version,
    author,
    license,
    homepage,
    bugs,
    "private": true,
    type,
    scripts,
    dependencies,
    devDependencies
  };
  const DEFAULT_APP_OPTIONS = {
    theme: "system",
    debug: false,
    showControlPanel: true,
    disabledExtensions: ["HomeTimelineModule", "ListTimelineModule", "ListSubscribersModule", "ListMembersModule"],
    dateTimeFormat: "YYYY-MM-DD HH:mm:ss Z",
    language: "",
    version: packageJson.version
  };
  const THEMES = ["system", "cupcake", "dark", "emerald", "cyberpunk", "valentine", "lofi", "dracula", "cmyk", "business", "winter"];
  const LOCAL_STORAGE_KEY = packageJson.name;
  class AppOptionsManager {
    constructor() {
      __publicField(this, "appOptions", {
        ...DEFAULT_APP_OPTIONS
      });
      __publicField(this, "previous", {
        ...DEFAULT_APP_OPTIONS
      });
      /**
       * Signal for subscribing to option changes.
       */
      __publicField(this, "signal", new signals.Signal(0));
      this.loadAppOptions();
    }
    get(key, defaultValue) {
      return this.appOptions[key] ?? defaultValue;
    }
    set(key, value) {
      this.appOptions[key] = value;
      this.saveAppOptions();
    }
    /**
     * Read app options from local storage.
     */
    loadAppOptions() {
      this.appOptions = {
        ...this.appOptions,
        ...safeJSONParse(localStorage.getItem(LOCAL_STORAGE_KEY) || "{}")
      };
      const oldVersion = this.appOptions.version ?? "";
      const newVersion = DEFAULT_APP_OPTIONS.version;
      if (newVersion.startsWith("1.1") && oldVersion.startsWith("1.0")) {
        this.appOptions.disabledExtensions = [...this.appOptions.disabledExtensions ?? [], "HomeTimelineModule", "ListTimelineModule"];
        logger.info(`App options migrated from v${oldVersion} to v${newVersion}`);
        setTimeout(() => this.saveAppOptions(), 0);
      }
      this.previous = {
        ...this.appOptions
      };
      logger.info("App options loaded", this.appOptions);
      this.signal.value++;
    }
    /**
     * Write app options to local storage.
     */
    saveAppOptions() {
      const oldValue = this.previous;
      const newValue = {
        ...this.appOptions,
        version: packageJson.version
      };
      if (isEqual(oldValue, newValue)) {
        return;
      }
      this.appOptions = newValue;
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(this.appOptions));
      this.previous = {
        ...this.appOptions
      };
      logger.debug("App options saved", this.appOptions);
      this.signal.value++;
    }
  }
  const appOptionsManager = new AppOptionsManager();
  const LANGUAGES_CONFIG = {
    en: {
      name: "English",
      nameEn: "English",
      test: (code) => /^en/.test(code)
    },
    "zh-Hans": {
      name: "简体中文",
      nameEn: "Simplified Chinese",
      test: (code) => /^zh/.test(code)
    }
  };
  function detectBrowserLanguage() {
    const language = window.navigator.language || "en";
    for (const [langTag, langConf] of Object.entries(LANGUAGES_CONFIG)) {
      if (langConf.test(language)) {
        return langTag;
      }
    }
    return language;
  }
  const languageDetector = {
    type: "languageDetector",
    detect: function() {
      return appOptionsManager.get("language") || detectBrowserLanguage();
    }
  };
  function initI18n() {
    if (i18next.isInitialized) {
      return i18next;
    }
    i18next.on("languageChanged", (lng) => {
      if (!appOptionsManager.get("language")) {
        appOptionsManager.set("language", lng);
      }
    });
    i18next.use(languageDetector).init({
      initImmediate: true,
      defaultNS: "common",
      fallbackLng: "en",
      nsSeparator: "::",
      debug: appOptionsManager.get("debug"),
      resources
    });
    return i18next;
  }
  var f = 0;
  function u(e, t, n, o, i, u2) {
    var a, c, p = {};
    for (c in t)
      "ref" == c ? a = t[c] : p[c] = t[c];
    var l = { type: e, props: p, key: n, ref: a, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, constructor: void 0, __v: --f, __i: -1, __u: 0, __source: i, __self: u2 };
    if ("function" == typeof e && (a = e.defaultProps))
      for (c in a)
        void 0 === p[c] && (p[c] = a[c]);
    return preact.options.vnode && preact.options.vnode(l), l;
  }
  function useTranslation(ns) {
    const i18n = initI18n();
    const [t, setT] = hooks.useState(() => i18n.getFixedT(null, ns ?? null));
    const isMountedRef = hooks.useRef(true);
    const previousNamespaceRef = hooks.useRef(ns);
    hooks.useEffect(() => {
      isMountedRef.current = true;
      if (previousNamespaceRef.current !== ns) {
        previousNamespaceRef.current = ns;
        setT(() => i18n.getFixedT(null, ns ?? null));
      }
      function boundReset() {
        if (isMountedRef.current) {
          setT(() => i18n.getFixedT(null, ns ?? null));
        }
      }
      i18n.on("languageChanged", boundReset);
      return () => {
        isMountedRef.current = false;
        i18n.off("languageChanged", boundReset);
      };
    }, [ns]);
    return {
      t,
      i18n
    };
  }
  function Trans({
    i18nKey,
    ns = "exporter"
  }) {
    const {
      t
    } = useTranslation(ns);
    return u("span", {
      children: t(i18nKey)
    });
  }
  class ErrorBoundary extends preact.Component {
    constructor() {
      super(...arguments);
      __publicField(this, "state", {
        error: null
      });
    }
    static getDerivedStateFromError(err) {
      return {
        error: err.message
      };
    }
    componentDidCatch(err) {
      logger.error(err.message, err);
      this.setState({
        error: err.message
      });
    }
    render() {
      if (this.state.error) {
        return u("div", {
          class: "alert alert-error p-2",
          children: [u(IconExclamationCircle, {}), u("div", {
            children: [u("h3", {
              class: "font-bold leading-normal",
              children: u(Trans, {
                ns: "common",
                i18nKey: "Something went wrong."
              })
            }), u("p", {
              class: "text-xs",
              children: [u(Trans, {
                ns: "common",
                i18nKey: "Error:"
              }), " ", this.state.error]
            })]
          })]
        });
      }
      return this.props.children;
    }
  }
  function ExtensionPanel({
    title,
    description: description2,
    children,
    onClick,
    active,
    indicatorColor = "bg-secondary"
  }) {
    return u("section", {
      class: "module-panel",
      children: [u("div", {
        class: "h-12 flex items-center justify-start",
        children: [u("div", {
          class: "relative flex h-4 w-4 mr-3 shrink-0",
          children: [active && u("span", {
            class: cx("animate-ping absolute inline-flex h-full w-full rounded-full opacity-75", indicatorColor)
          }), u("span", {
            class: cx("relative inline-flex rounded-full h-4 w-4", indicatorColor)
          })]
        }), u("div", {
          class: "flex flex-col flex-grow",
          children: [u("p", {
            class: "text-base m-0 font-medium leading-none",
            children: title
          }), u("p", {
            class: "text-sm text-base-content leading-5 text-opacity-70 m-0",
            children: description2
          })]
        }), u("button", {
          class: "btn btn-sm p-0 w-9 h-9",
          onClick,
          children: u(IconArrowUpRight, {})
        })]
      }), children]
    });
  }
  function Modal({
    show,
    onClose,
    title,
    children,
    class: className = "max-w-4xl md:max-w-screen-md sm:max-w-screen-sm"
  }) {
    if (!show) {
      return u("dialog", {
        class: "modal"
      });
    }
    return u("dialog", {
      class: "modal modal-open",
      open: true,
      children: [u("div", {
        class: cx("modal-box p-3 flex flex-col", className),
        children: [u("header", {
          class: "flex items-center h-9 mb-2",
          children: [u("div", {
            onClick: onClose,
            class: "w-9 h-9 mr-2 cursor-pointer flex justify-center items-center transition-colors duration-200 rounded-full hover:bg-base-200",
            children: u(IconX, {})
          }), u("h2", {
            class: "leading-none text-xl m-0 font-semibold",
            children: title
          })]
        }), u(ErrorBoundary, {
          children
        })]
      }), u("form", {
        method: "dialog",
        class: "modal-backdrop",
        children: u("div", {
          onClick: onClose
        })
      })]
    });
  }
  function SearchArea({
    defaultValue,
    onChange
  }) {
    const {
      t
    } = useTranslation();
    const inputRef = hooks.useRef(null);
    return u("div", {
      class: "join justify-end my-[2px] w-full max-w-xs absolute top-3 right-3",
      children: [u("input", {
        ref: inputRef,
        type: "text",
        class: "input input-bordered input-sm join-item",
        placeholder: t("Search..."),
        defaultValue,
        onKeyDown: (e) => {
          var _a;
          if (e.key === "Enter") {
            onChange(((_a = inputRef.current) == null ? void 0 : _a.value) ?? "");
          }
        }
      }), u("button", {
        class: "btn btn-sm join-item",
        onClick: () => {
          var _a;
          return onChange(((_a = inputRef.current) == null ? void 0 : _a.value) ?? "");
        },
        children: u(IconSearch, {
          size: 20
        })
      })]
    });
  }
  /**
   * @license
   * Credit: https://icooon-mono.com/12776-%e7%8c%ab%e3%81%ae%e7%84%a1%e6%96%99%e3%82%a2%e3%82%a4%e3%82%b3%e3%83%b32/
   */
  const CatIcon = () => u("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 512 512",
    class: "w-full h-full select-none",
    children: u("g", {
      children: u("path", {
        d: "M461.814,197.514c-2.999-11.335-14.624-18.093-25.958-15.094c-1.866,0.553-13.477,3.649-26.042,14.341 c-6.234,5.349-12.633,12.751-17.361,22.454c-4.748,9.69-7.685,21.577-7.657,35.033c0.013,16.345,4.133,34.895,13.442,56.257 c6.282,14.403,9.144,29.697,9.144,44.846c0.062,25.627-8.438,50.756-21.121,68.283c-6.296,8.777-13.546,15.606-20.816,20.022 c-2.986,1.81-5.943,3.131-8.888,4.181l0.989-5.854c-0.055-17.03-4.05-34.84-13.021-50.528 c-28.356-49.643-66.223-134.741-66.223-134.741l-1.527-4.879c29.47-7.796,58.579-23.408,73.148-54.985 c38.931-84.344-41.08-142.73-41.08-142.73s-25.958-56.222-38.924-54.06c-12.978,2.164-41.094,38.931-41.094,38.931h-23.788h-23.788 c0,0-28.108-36.767-41.08-38.931c-12.979-2.163-38.924,54.06-38.924,54.06s-80.018,58.386-41.087,142.73 c13.822,29.953,40.741,45.572,68.634,53.748l-2.951,9.662c0,0-31.908,81.552-60.279,131.195C37.198,441.092,58.478,512,97.477,512 c29.47,0,79.14,0,101.692,0c7.292,0,11.763,0,11.763,0c22.544,0,72.222,0,101.691,0c12.654,0,23.38-7.547,31.204-19.324 c15.826-0.013,30.81-4.872,43.707-12.758c19.455-11.915,34.708-30.32,45.434-51.896c10.685-21.618,16.856-46.636,16.878-72.672 c0-20.484-3.885-41.619-12.682-61.813c-7.561-17.34-9.918-30.216-9.904-39.29c0.028-7.526,1.5-12.544,3.359-16.414 c1.417-2.889,3.124-5.17,4.983-7.091c2.771-2.868,5.964-4.879,8.349-6.054c1.182-0.595,2.135-0.968,2.674-1.162l0.449-0.152 l-0.007-0.028C458.179,220.189,464.779,208.724,461.814,197.514z"
      })
    })
  });
  var _unsafeWindow = /* @__PURE__ */ (() => typeof unsafeWindow != "undefined" ? unsafeWindow : void 0)();
  const globalObject = _unsafeWindow ?? window ?? globalThis;
  const xhrOpen = globalObject.XMLHttpRequest.prototype.open;
  class ExtensionManager {
    constructor() {
      __publicField(this, "extensions", /* @__PURE__ */ new Map());
      __publicField(this, "disabledExtensions", /* @__PURE__ */ new Set());
      __publicField(this, "debugEnabled", false);
      /**
       * Signal for subscribing to extension changes.
       */
      __publicField(this, "signal", new signals.Signal(1));
      this.installHttpHooks();
      this.disabledExtensions = new Set(appOptionsManager.get("disabledExtensions", []));
      if (appOptionsManager.get("debug")) {
        this.debugEnabled = true;
        logger.info("Debug mode enabled");
      }
    }
    /**
     * Register and instantiate a new extension.
     *
     * @param ctor Extension constructor.
     */
    add(ctor) {
      try {
        logger.debug(`Register new extension: ${ctor.name}`);
        const instance = new ctor(this);
        this.extensions.set(instance.name, instance);
      } catch (err) {
        logger.error(`Failed to register extension: ${ctor.name}`, err);
      }
    }
    /**
     * Set up all enabled extensions.
     */
    start() {
      for (const ext of this.extensions.values()) {
        if (this.disabledExtensions.has(ext.name)) {
          this.disable(ext.name);
        } else {
          this.enable(ext.name);
        }
      }
    }
    enable(name2) {
      try {
        this.disabledExtensions.delete(name2);
        appOptionsManager.set("disabledExtensions", [...this.disabledExtensions]);
        const ext = this.extensions.get(name2);
        ext.enabled = true;
        ext.setup();
        logger.debug(`Enabled extension: ${name2}`);
        this.signal.value++;
      } catch (err) {
        logger.error(`Failed to enable extension: ${name2}`, err);
      }
    }
    disable(name2) {
      try {
        this.disabledExtensions.add(name2);
        appOptionsManager.set("disabledExtensions", [...this.disabledExtensions]);
        const ext = this.extensions.get(name2);
        ext.enabled = false;
        ext.dispose();
        logger.debug(`Disabled extension: ${name2}`);
        this.signal.value++;
      } catch (err) {
        logger.error(`Failed to disable extension: ${name2}`, err);
      }
    }
    getExtensions() {
      return [...this.extensions.values()];
    }
    /**
     * Here we hooks the browser's XHR method to intercept Twitter's Web API calls.
     * This need to be done before any XHR request is made.
     */
    installHttpHooks() {
      const manager = this;
      globalObject.XMLHttpRequest.prototype.open = function(method, url) {
        if (manager.debugEnabled) {
          logger.debug(`XHR initialized`, {
            method,
            url
          });
        }
        const interceptors = manager.getExtensions().filter((ext) => ext.enabled).map((ext) => ext.intercept()).filter((int) => typeof int === "function");
        this.addEventListener("load", () => {
          if (manager.debugEnabled) {
            logger.debug(`XHR finished`, {
              method,
              url,
              interceptors
            });
          }
          interceptors.forEach((func) => {
            func({
              method,
              url
            }, this);
          });
        });
        xhrOpen.apply(this, arguments);
      };
      logger.info("Hooked into XMLHttpRequest");
      setTimeout(() => {
        if (!("webpackChunk_twitter_responsive_web" in globalObject)) {
          logger.error('Error: Wrong execution context detected.\n  This script needs to be injected into "page" context rather than "content" context.\n  The XMLHttpRequest hook will not work properly.\n  See: https://github.com/prinsss/twitter-web-exporter/issues/19');
        }
      }, 1e3);
    }
  }
  class Extension {
    constructor(manager) {
      __publicField(this, "name", "");
      __publicField(this, "enabled", true);
      __publicField(this, "manager");
      this.manager = manager;
    }
    /**
     * Optionally run side effects when enabled.
     */
    setup() {
    }
    /**
     * Optionally clear side effects when disabled.
     */
    dispose() {
    }
    /**
     * Intercept HTTP responses.
     */
    intercept() {
      return null;
    }
    /**
     * Render extension UI.
     */
    render() {
      return null;
    }
  }
  const extensionManager = new ExtensionManager();
  function Settings() {
    const {
      t,
      i18n
    } = useTranslation();
    const currentTheme = useSignal(appOptionsManager.get("theme"));
    const [showSettings, toggleSettings] = useToggle(false);
    const styles = {
      subtitle: "mb-2 text-base-content ml-4 opacity-50 font-semibold text-xs",
      block: "text-sm mb-2 w-full flex px-4 py-2 text-base-content bg-base-200 rounded-box justify-between",
      item: "label cursor-pointer flex justify-between h-8 items-center p-0"
    };
    return u(preact.Fragment, {
      children: [u("div", {
        onClick: toggleSettings,
        class: "w-9 h-9 mr-2 cursor-pointer flex justify-center items-center transition-colors duration-200 rounded-full hover:bg-base-200",
        children: u(IconSettings, {})
      }), u(Modal, {
        title: "Settings",
        show: showSettings,
        onClose: toggleSettings,
        class: "max-w-lg",
        children: [u("p", {
          class: styles.subtitle,
          children: t("General")
        }), u("div", {
          class: cx(styles.block, "flex-col"),
          children: [u("label", {
            class: styles.item,
            children: [u("span", {
              class: "label-text",
              children: t("Theme")
            }), u("select", {
              class: "select select-xs",
              onChange: (e) => {
                var _a;
                currentTheme.value = ((_a = e.target) == null ? void 0 : _a.value) ?? DEFAULT_APP_OPTIONS.theme;
                appOptionsManager.set("theme", currentTheme.value);
              },
              children: THEMES.map((theme) => u("option", {
                value: theme,
                selected: currentTheme.value === theme,
                children: capitalizeFirstLetter(theme)
              }, theme))
            })]
          }), u("label", {
            class: styles.item,
            children: [u("span", {
              class: "label-text",
              children: t("Language")
            }), u("select", {
              class: "select select-xs",
              onChange: (e) => {
                var _a;
                const language = ((_a = e.target) == null ? void 0 : _a.value) ?? detectBrowserLanguage();
                i18n.changeLanguage(language);
                appOptionsManager.set("language", language);
              },
              children: Object.entries(LANGUAGES_CONFIG).map(([langTag, langConf]) => u("option", {
                value: langTag,
                selected: appOptionsManager.get("language") === langTag,
                children: [langConf.nameEn, " - ", langConf.name]
              }, langTag))
            })]
          }), u("label", {
            class: styles.item,
            children: [u("span", {
              class: "label-text",
              children: t("Debug")
            }), u("input", {
              type: "checkbox",
              class: "toggle toggle-primary",
              checked: appOptionsManager.get("debug"),
              onChange: (e) => {
                var _a;
                appOptionsManager.set("debug", (_a = e.target) == null ? void 0 : _a.checked);
              }
            })]
          }), u("label", {
            class: styles.item,
            children: [u("div", {
              class: "flex items-center",
              children: [u("span", {
                class: "label-text",
                children: t("Date Time Format")
              }), u("a", {
                href: "https://day.js.org/docs/en/display/format",
                target: "_blank",
                rel: "noopener noreferrer",
                class: "tooltip tooltip-bottom ml-0.5 before:max-w-40",
                "data-tip": t("Click for more information. This will take effect on both previewer and exported files."),
                children: u(IconHelp, {
                  size: 20
                })
              })]
            }), u("input", {
              type: "text",
              class: "input input-bordered input-xs w-48",
              value: appOptionsManager.get("dateTimeFormat"),
              onChange: (e) => {
                var _a;
                appOptionsManager.set("dateTimeFormat", (_a = e.target) == null ? void 0 : _a.value);
              }
            })]
          })]
        }), u("p", {
          class: styles.subtitle,
          children: t("Modules")
        }), u("div", {
          class: cx(styles.block, "flex-col"),
          children: extensionManager.getExtensions().map((extension) => u("label", {
            class: styles.item,
            children: [u("span", {
              children: [t(extension.name.replace("Module", "")), " ", t("Module")]
            }), u("input", {
              type: "checkbox",
              class: "toggle toggle-secondary",
              checked: extension.enabled,
              onChange: () => {
                extension.enabled ? extensionManager.disable(extension.name) : extensionManager.enable(extension.name);
              }
            })]
          }, extension.name))
        }), u("p", {
          class: styles.subtitle,
          children: t("About")
        }), u("div", {
          class: styles.block,
          children: [u("span", {
            class: "label-text",
            children: [t("Version"), " ", packageJson.version]
          }), u("a", {
            class: "btn btn-xs btn-ghost",
            target: "_blank",
            href: packageJson.homepage,
            children: [u(IconBrandGithubFilled, {
              class: "[&>path]:stroke-0"
            }), "GitHub"]
          })]
        })]
      })]
    });
  }
  function App() {
    const {
      t
    } = useTranslation();
    const extensions = useSignal([]);
    const currentTheme = useSignal(appOptionsManager.get("theme"));
    const showControlPanel = useSignal(appOptionsManager.get("showControlPanel"));
    const toggleControlPanel = () => {
      showControlPanel.value = !showControlPanel.value;
      appOptionsManager.set("showControlPanel", showControlPanel.value);
    };
    hooks.useEffect(() => {
      extensionManager.signal.subscribe(() => {
        extensions.value = extensionManager.getExtensions();
      });
      appOptionsManager.signal.subscribe(() => {
        currentTheme.value = appOptionsManager.get("theme");
      });
      logger.debug("App useEffect executed");
    }, []);
    return u(preact.Fragment, {
      children: [u("div", {
        onClick: toggleControlPanel,
        "data-theme": currentTheme.value,
        class: "group w-12 h-12 fixed top-[60%] left-[-20px] cursor-pointer bg-transparent fill-base-content",
        children: u("div", {
          class: "w-full h-full origin origin-[bottom_center] transition-all duration-200 group-hover:translate-x-[5px] group-hover:rotate-[20deg] opacity-50 group-hover:opacity-90",
          children: u(CatIcon, {})
        })
      }), u("section", {
        "data-theme": currentTheme.value,
        class: cx("card card-compact bg-base-100 fixed border shadow-xl w-80 leading-loose text-base-content px-4 py-3 rounded-box border-solid border-neutral-content border-opacity-50 left-8 top-8 transition-transform duration-500", showControlPanel.value ? "translate-x-0 transform-none" : "translate-x-[-500px]"),
        children: [u("header", {
          class: "flex items-center h-9",
          children: [u("h2", {
            class: "font-semibold leading-none text-xl m-0 flex-grow",
            children: "Web Exporter (α)"
          }), u(ErrorBoundary, {
            children: u(Settings, {})
          }), u("div", {
            onClick: toggleControlPanel,
            class: "w-9 h-9 cursor-pointer flex justify-center items-center transition-colors duration-200 rounded-full hover:bg-base-200",
            children: u(IconX, {})
          })]
        }), u("p", {
          class: "text-sm text-base-content text-opacity-70 mb-1 leading-none",
          children: t("Refresh or clear to start new captures.")
        }), u("div", {
          class: "divider mt-0 mb-0"
        }), u("main", {
          children: extensions.value.map((ext) => {
            const Component2 = ext.render();
            if (ext.enabled && Component2) {
              return u(ErrorBoundary, {
                children: u(Component2, {}, ext.name)
              });
            }
            return null;
          })
        })]
      })]
    });
  }
  const EXPORT_FORMAT = {
    JSON: "JSON",
    HTML: "HTML",
    CSV: "CSV"
  };
  function csvEscapeStr(str) {
    return `"${str.replace(/"/g, '""').replace(/\n/g, "\\n").replace(/\r/g, "\\r")}"`;
  }
  function saveFile(filename, content, prependBOM = false) {
    const link = document.createElement("a");
    const blob = new Blob(prependBOM ? [new Uint8Array([239, 187, 191]), content] : [content], {
      type: "text/plain;charset=utf-8"
    });
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  }
  async function exportData(data, format, filename) {
    try {
      let content = "";
      let prependBOM = false;
      logger.info(`Exporting to ${format} file: ${filename}`);
      switch (format) {
        case EXPORT_FORMAT.JSON:
          content = await jsonExporter(data);
          break;
        case EXPORT_FORMAT.HTML:
          content = await htmlExporter(data);
          break;
        case EXPORT_FORMAT.CSV:
          prependBOM = true;
          content = await csvExporter(data);
          break;
      }
      saveFile(filename, content, prependBOM);
    } catch (err) {
      logger.errorWithBanner("Failed to export file", err);
    }
  }
  async function jsonExporter(data) {
    return JSON.stringify(data, void 0, "  ");
  }
  async function htmlExporter(data) {
    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");
    const headers = Object.keys(data[0] ?? {});
    const headerRow = document.createElement("tr");
    for (const header of headers) {
      const th = document.createElement("th");
      th.textContent = header;
      headerRow.appendChild(th);
    }
    thead.appendChild(headerRow);
    table.appendChild(thead);
    table.className = "table table-striped";
    for (const row of data) {
      const tr = document.createElement("tr");
      for (const header of headers) {
        const td = document.createElement("td");
        const value = row[header];
        if (header === "profile_image_url" || header === "profile_banner_url") {
          const img = document.createElement("img");
          img.src = value;
          img.width = 50;
          td.innerHTML = "";
          td.appendChild(img);
        } else if (header === "media") {
          if ((value == null ? void 0 : value.length) > 0) {
            for (const media of value) {
              const img = document.createElement("img");
              img.src = media.thumbnail;
              img.width = 50;
              const link = document.createElement("a");
              link.href = media.original;
              link.target = "_blank";
              link.style.marginRight = "0.5em";
              link.appendChild(img);
              td.appendChild(link);
            }
          }
        } else if (header === "full_text" || header === "description") {
          const p = document.createElement("p");
          p.innerHTML = value;
          p.style.whiteSpace = "pre-wrap";
          p.style.maxWidth = "640px";
          td.appendChild(p);
        } else if (header === "metadata") {
          const details = document.createElement("details");
          const summary = document.createElement("summary");
          summary.textContent = "Expand";
          details.appendChild(summary);
          const pre = document.createElement("pre");
          pre.textContent = JSON.stringify(value, void 0, "  ");
          details.appendChild(pre);
          td.appendChild(details);
        } else if (header === "url") {
          const link = document.createElement("a");
          link.href = value;
          link.target = "_blank";
          link.textContent = value;
          td.appendChild(link);
        } else {
          td.textContent = typeof value === "string" ? value : JSON.stringify(row[header]);
        }
        tr.appendChild(td);
      }
      tbody.appendChild(tr);
    }
    table.appendChild(tbody);
    return `
    <html>
      <head>
        <meta charset="utf-8">
        <title>Exported Data ${(/* @__PURE__ */ new Date()).toISOString()}</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css">
      </head>
      <body>
        ${table.outerHTML}
      </body>
    </html>
  `;
  }
  async function csvExporter(data) {
    const headers = Object.keys(data[0] ?? {});
    let content = headers.join(",") + "\n";
    for (const row of data) {
      const values = headers.map((header) => {
        const value = row[header];
        if (typeof value === "string") {
          return csvEscapeStr(value);
        }
        if (typeof value === "object") {
          return csvEscapeStr(JSON.stringify(value));
        }
        return value;
      });
      content += values.join(",");
      content += "\n";
    }
    return content;
  }
  function ExportDataModal({
    title,
    table,
    show,
    onClose
  }) {
    const {
      t
    } = useTranslation("exporter");
    const [selectedFormat, setSelectedFormat] = useSignalState(EXPORT_FORMAT.JSON);
    const [loading, setLoading] = useSignalState(false);
    const [includeMetadata, toggleIncludeMetadata] = useToggle(false);
    const [currentProgress, setCurrentProgress] = useSignalState(0);
    const [totalProgress, setTotalProgress] = useSignalState(0);
    const selectedRows = table.getSelectedRowModel().rows;
    const onExport = async () => {
      setLoading(true);
      setTotalProgress(selectedRows.length);
      const allRecords = [];
      for (const row of selectedRows) {
        const allCells = row.getAllCells();
        const record = {};
        for (const cell of allCells) {
          const value = cell.getValue();
          const meta = cell.column.columnDef.meta;
          if ((meta == null ? void 0 : meta.exportable) === false) {
            continue;
          }
          let exportValue = (meta == null ? void 0 : meta.exportValue) ? meta.exportValue(row) : value;
          if (exportValue === void 0) {
            exportValue = null;
          }
          record[(meta == null ? void 0 : meta.exportKey) || cell.column.id] = exportValue;
        }
        if (includeMetadata) {
          record.metadata = row.original;
        }
        allRecords.push(record);
        setCurrentProgress(allRecords.length);
      }
      await exportData(allRecords, selectedFormat, `twitter-${title}-${Date.now()}.${selectedFormat.toLowerCase()}`);
      setLoading(false);
    };
    return u(Modal, {
      class: "max-w-sm md:max-w-screen-sm sm:max-w-screen-sm",
      title: `${t(title, title, {
      ns: "common"
    })} ${t("Data")}`,
      show,
      onClose,
      children: [u("div", {
        class: "px-4 text-base",
        children: [u("p", {
          class: "text-base-content text-opacity-60 mb-2 leading-5 text-sm",
          children: t("Export captured data as JSON/HTML/CSV file. This may take a while depending on the amount of data. The exported file does not include media files such as images and videos but only the URLs.")
        }), u("div", {
          class: "flex items-center",
          children: [u("p", {
            class: "mr-2 leading-8",
            children: t("Data length:")
          }), u("span", {
            class: "font-mono leading-6 h-6 bg-base-200 px-2 rounded-md",
            children: selectedRows.length
          })]
        }), u("div", {
          class: "flex items-center",
          children: [u("p", {
            class: "mr-2 leading-8",
            children: t("Include all metadata:")
          }), u("input", {
            type: "checkbox",
            class: "checkbox checkbox-sm",
            checked: includeMetadata,
            onChange: toggleIncludeMetadata
          })]
        }), u("div", {
          class: "flex",
          children: [u("p", {
            class: "mr-2 leading-8",
            children: t("Export as:")
          }), u("select", {
            class: "select select-bordered select-sm w-32",
            onChange: (e) => {
              setSelectedFormat(e.target.value);
            },
            children: Object.values(EXPORT_FORMAT).map((type2) => u("option", {
              selected: type2 === selectedFormat,
              children: type2
            }, type2))
          })]
        }), selectedRows.length > 0 ? null : u("div", {
          class: "flex items-center justify-center h-28 w-full",
          children: u("p", {
            class: "text-base-content text-opacity-50",
            children: t("No data selected.")
          })
        }), u("div", {
          class: "flex flex-col mt-6",
          children: [u("progress", {
            class: "progress progress-primary w-full",
            value: currentProgress / (totalProgress || 1) * 100,
            max: "100"
          }), u("span", {
            class: "text-sm leading-none mt-2 text-base-content text-opacity-60",
            children: `${currentProgress}/${selectedRows.length}`
          })]
        })]
      }), u("div", {
        class: "flex space-x-2",
        children: [u("span", {
          class: "flex-grow"
        }), u("button", {
          class: "btn",
          onClick: onClose,
          children: t("Cancel")
        }), u("button", {
          class: cx("btn btn-primary", loading && "btn-disabled"),
          onClick: onExport,
          children: [loading && u("span", {
            class: "loading loading-spinner"
          }), t("Start Export")]
        })]
      })]
    });
  }
  var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
  var FileSaver_min = { exports: {} };
  (function(module, exports) {
    (function(a, b) {
      b();
    })(commonjsGlobal, function() {
      function b(a2, b2) {
        return "undefined" == typeof b2 ? b2 = { autoBom: false } : "object" != typeof b2 && (console.warn("Deprecated: Expected third argument to be a object"), b2 = { autoBom: !b2 }), b2.autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(a2.type) ? new Blob(["\uFEFF", a2], { type: a2.type }) : a2;
      }
      function c(a2, b2, c2) {
        var d2 = new XMLHttpRequest();
        d2.open("GET", a2), d2.responseType = "blob", d2.onload = function() {
          g(d2.response, b2, c2);
        }, d2.onerror = function() {
          console.error("could not download file");
        }, d2.send();
      }
      function d(a2) {
        var b2 = new XMLHttpRequest();
        b2.open("HEAD", a2, false);
        try {
          b2.send();
        } catch (a3) {
        }
        return 200 <= b2.status && 299 >= b2.status;
      }
      function e(a2) {
        try {
          a2.dispatchEvent(new MouseEvent("click"));
        } catch (c2) {
          var b2 = document.createEvent("MouseEvents");
          b2.initMouseEvent("click", true, true, window, 0, 0, 0, 80, 20, false, false, false, false, 0, null), a2.dispatchEvent(b2);
        }
      }
      var f2 = "object" == typeof window && window.window === window ? window : "object" == typeof self && self.self === self ? self : "object" == typeof commonjsGlobal && commonjsGlobal.global === commonjsGlobal ? commonjsGlobal : void 0, a = f2.navigator && /Macintosh/.test(navigator.userAgent) && /AppleWebKit/.test(navigator.userAgent) && !/Safari/.test(navigator.userAgent), g = f2.saveAs || ("object" != typeof window || window !== f2 ? function() {
      } : "download" in HTMLAnchorElement.prototype && !a ? function(b2, g2, h2) {
        var i = f2.URL || f2.webkitURL, j = document.createElement("a");
        g2 = g2 || b2.name || "download", j.download = g2, j.rel = "noopener", "string" == typeof b2 ? (j.href = b2, j.origin === location.origin ? e(j) : d(j.href) ? c(b2, g2, h2) : e(j, j.target = "_blank")) : (j.href = i.createObjectURL(b2), setTimeout(function() {
          i.revokeObjectURL(j.href);
        }, 4e4), setTimeout(function() {
          e(j);
        }, 0));
      } : "msSaveOrOpenBlob" in navigator ? function(f3, g2, h2) {
        if (g2 = g2 || f3.name || "download", "string" != typeof f3)
          navigator.msSaveOrOpenBlob(b(f3, h2), g2);
        else if (d(f3))
          c(f3, g2, h2);
        else {
          var i = document.createElement("a");
          i.href = f3, i.target = "_blank", setTimeout(function() {
            e(i);
          });
        }
      } : function(b2, d2, e2, g2) {
        if (g2 = g2 || open("", "_blank"), g2 && (g2.document.title = g2.document.body.innerText = "downloading..."), "string" == typeof b2)
          return c(b2, d2, e2);
        var h2 = "application/octet-stream" === b2.type, i = /constructor/i.test(f2.HTMLElement) || f2.safari, j = /CriOS\/[\d]+/.test(navigator.userAgent);
        if ((j || h2 && i || a) && "undefined" != typeof FileReader) {
          var k = new FileReader();
          k.onloadend = function() {
            var a2 = k.result;
            a2 = j ? a2 : a2.replace(/^data:[^;]*;/, "data:attachment/file;"), g2 ? g2.location.href = a2 : location = a2, g2 = null;
          }, k.readAsDataURL(b2);
        } else {
          var l = f2.URL || f2.webkitURL, m = l.createObjectURL(b2);
          g2 ? g2.location = m : location.href = m, g2 = null, setTimeout(function() {
            l.revokeObjectURL(m);
          }, 4e4);
        }
      });
      f2.saveAs = g.saveAs = g, module.exports = g;
    });
  })(FileSaver_min);
  var FileSaver_minExports = FileSaver_min.exports;
  /**
   * This file zip-stream.ts is copied from StreamSaver.js.
   *
   * @see https://github.com/jimmywarting/StreamSaver.js/blob/master/examples/zip-stream.js
   * @license MIT
   */
  class Crc32 {
    constructor() {
      this.crc = -1;
    }
    append(data) {
      var crc = this.crc | 0;
      var table = this.table;
      for (var offset = 0, len = data.length | 0; offset < len; offset++) {
        crc = crc >>> 8 ^ table[(crc ^ data[offset]) & 255];
      }
      this.crc = crc;
    }
    get() {
      return ~this.crc;
    }
  }
  Crc32.prototype.table = (() => {
    var i;
    var j;
    var t;
    var table = [];
    for (i = 0; i < 256; i++) {
      t = i;
      for (j = 0; j < 8; j++) {
        t = t & 1 ? t >>> 1 ^ 3988292384 : t >>> 1;
      }
      table[i] = t;
    }
    return table;
  })();
  const getDataHelper = (byteLength) => {
    var uint8 = new Uint8Array(byteLength);
    return {
      array: uint8,
      view: new DataView(uint8.buffer)
    };
  };
  const pump = (zipObj) => zipObj.reader.read().then((chunk) => {
    if (chunk.done)
      return zipObj.writeFooter();
    const outputData = chunk.value;
    zipObj.crc.append(outputData);
    zipObj.uncompressedLength += outputData.length;
    zipObj.compressedLength += outputData.length;
    zipObj.ctrl.enqueue(outputData);
  });
  function createWriter(underlyingSource) {
    const files = /* @__PURE__ */ Object.create(null);
    const filenames = [];
    const encoder = new TextEncoder();
    let offset = 0;
    let activeZipIndex = 0;
    let ctrl;
    let activeZipObject, closed;
    function next() {
      activeZipIndex++;
      activeZipObject = files[filenames[activeZipIndex]];
      if (activeZipObject)
        processNextChunk();
      else if (closed)
        closeZip();
    }
    var zipWriter = {
      enqueue(fileLike) {
        if (closed)
          throw new TypeError("Cannot enqueue a chunk into a readable stream that is closed or has been requested to be closed");
        let name2 = fileLike.name.trim();
        const date = new Date(typeof fileLike.lastModified === "undefined" ? Date.now() : fileLike.lastModified);
        if (fileLike.directory && !name2.endsWith("/"))
          name2 += "/";
        if (files[name2])
          throw new Error("File already exists.");
        const nameBuf = encoder.encode(name2);
        filenames.push(name2);
        const zipObject = files[name2] = {
          level: 0,
          ctrl,
          directory: !!fileLike.directory,
          nameBuf,
          comment: encoder.encode(fileLike.comment || ""),
          compressedLength: 0,
          uncompressedLength: 0,
          writeHeader() {
            var header = getDataHelper(26);
            var data = getDataHelper(30 + nameBuf.length);
            zipObject.offset = offset;
            zipObject.header = header;
            if (zipObject.level !== 0 && !zipObject.directory) {
              header.view.setUint16(4, 2048);
            }
            header.view.setUint32(0, 335546376);
            header.view.setUint16(6, (date.getHours() << 6 | date.getMinutes()) << 5 | date.getSeconds() / 2, true);
            header.view.setUint16(8, (date.getFullYear() - 1980 << 4 | date.getMonth() + 1) << 5 | date.getDate(), true);
            header.view.setUint16(22, nameBuf.length, true);
            data.view.setUint32(0, 1347093252);
            data.array.set(header.array, 4);
            data.array.set(nameBuf, 30);
            offset += data.array.length;
            ctrl.enqueue(data.array);
          },
          writeFooter() {
            var footer = getDataHelper(16);
            footer.view.setUint32(0, 1347094280);
            if (zipObject.crc) {
              zipObject.header.view.setUint32(10, zipObject.crc.get(), true);
              zipObject.header.view.setUint32(14, zipObject.compressedLength, true);
              zipObject.header.view.setUint32(18, zipObject.uncompressedLength, true);
              footer.view.setUint32(4, zipObject.crc.get(), true);
              footer.view.setUint32(8, zipObject.compressedLength, true);
              footer.view.setUint32(12, zipObject.uncompressedLength, true);
            }
            ctrl.enqueue(footer.array);
            offset += zipObject.compressedLength + 16;
            next();
          },
          fileLike
        };
        if (!activeZipObject) {
          activeZipObject = zipObject;
          processNextChunk();
        }
      },
      close() {
        if (closed)
          throw new TypeError("Cannot close a readable stream that has already been requested to be closed");
        if (!activeZipObject)
          closeZip();
        closed = true;
      }
    };
    function closeZip() {
      var length = 0;
      var index = 0;
      var indexFilename, file;
      for (indexFilename = 0; indexFilename < filenames.length; indexFilename++) {
        file = files[filenames[indexFilename]];
        length += 46 + file.nameBuf.length + file.comment.length;
      }
      const data = getDataHelper(length + 22);
      for (indexFilename = 0; indexFilename < filenames.length; indexFilename++) {
        file = files[filenames[indexFilename]];
        data.view.setUint32(index, 1347092738);
        data.view.setUint16(index + 4, 5120);
        data.array.set(file.header.array, index + 6);
        data.view.setUint16(index + 32, file.comment.length, true);
        if (file.directory) {
          data.view.setUint8(index + 38, 16);
        }
        data.view.setUint32(index + 42, file.offset, true);
        data.array.set(file.nameBuf, index + 46);
        data.array.set(file.comment, index + 46 + file.nameBuf.length);
        index += 46 + file.nameBuf.length + file.comment.length;
      }
      data.view.setUint32(index, 1347093766);
      data.view.setUint16(index + 8, filenames.length, true);
      data.view.setUint16(index + 10, filenames.length, true);
      data.view.setUint32(index + 12, length, true);
      data.view.setUint32(index + 16, offset, true);
      ctrl.enqueue(data.array);
      ctrl.close();
    }
    function processNextChunk() {
      if (!activeZipObject)
        return;
      if (activeZipObject.directory)
        return activeZipObject.writeFooter(activeZipObject.writeHeader());
      if (activeZipObject.reader)
        return pump(activeZipObject);
      if (activeZipObject.fileLike.stream) {
        activeZipObject.crc = new Crc32();
        activeZipObject.reader = activeZipObject.fileLike.stream().getReader();
        activeZipObject.writeHeader();
      } else
        next();
    }
    return new ReadableStream({
      start: (c) => {
        ctrl = c;
        underlyingSource.start && Promise.resolve(underlyingSource.start(zipWriter));
      },
      pull() {
        return processNextChunk() || underlyingSource.pull && Promise.resolve(underlyingSource.pull(zipWriter));
      }
    });
  }
  async function zipStreamDownload(zipFilename, files, onProgress, rateLimit = 1e3) {
    let current = 0;
    const total = files.length;
    const fileIterator = files.values();
    const readableZipStream = createWriter({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      async pull(ctrl) {
        const fileInfo = fileIterator.next();
        if (fileInfo.done) {
          ctrl.close();
        } else {
          const {
            filename,
            url
          } = fileInfo.value;
          const start = Date.now();
          logger.debug(`Start downloading ${filename} from ${url}`);
          return fetch(url).then((res) => {
            ctrl.enqueue({
              name: filename,
              stream: () => res.body
            });
            onProgress == null ? void 0 : onProgress(++current, total, fileInfo.value);
            logger.debug(`Finished downloading ${filename} in ${Date.now() - start}ms`);
          }).then(() => {
            return new Promise((resolve) => setTimeout(resolve, rateLimit));
          });
        }
      }
    });
    const chunks = [];
    const writableOutputStream = new WritableStream({
      write(chunk) {
        chunks.push(chunk);
      },
      close() {
        logger.info("Zip stream closed.");
      }
    });
    logger.info(`Exporting to ZIP file: ${zipFilename}`);
    await readableZipStream.pipeTo(writableOutputStream);
    const arrayBuffer = await new Blob(chunks).arrayBuffer();
    const blob = new Blob([arrayBuffer]);
    FileSaver_minExports.saveAs(blob, zipFilename);
  }
  function extractDataFromResponse(response, extractInstructionsFromJson, extractDataFromTimelineEntry) {
    const json = JSON.parse(response.responseText);
    const instructions = extractInstructionsFromJson(json);
    const timelineAddEntriesInstruction = instructions.find((i) => i.type === "TimelineAddEntries");
    const newData = [];
    for (const entry of timelineAddEntriesInstruction.entries) {
      if (isTimelineEntryItem(entry)) {
        const data = extractDataFromTimelineEntry(entry);
        if (data) {
          newData.push(data);
        }
      }
    }
    return newData;
  }
  function extractTimelineTweet(itemContent) {
    const tweetUnion = itemContent.tweet_results.result;
    if (!tweetUnion) {
      logger.warn("TimelineTweet is empty. This could happen when the tweet's visibility is limited by Twitter.", itemContent);
      return null;
    }
    return extractTweetUnion(tweetUnion);
  }
  function isTimelineEntryItem(entry) {
    return entry.content.entryType === "TimelineTimelineItem";
  }
  function isTimelineEntryTweet(entry) {
    return isTimelineEntryItem(entry) && entry.entryId.startsWith("tweet-") && entry.content.itemContent.__typename === "TimelineTweet";
  }
  function isTimelineEntryUser(entry) {
    return isTimelineEntryItem(entry) && entry.entryId.startsWith("user-") && entry.content.itemContent.__typename === "TimelineUser";
  }
  function isTimelineEntryModule(entry) {
    return entry.content.entryType === "TimelineTimelineModule";
  }
  function isTimelineEntryConversationThread(entry) {
    return isTimelineEntryModule(entry) && entry.entryId.startsWith("conversationthread-") && Array.isArray(entry.content.items);
  }
  function isTimelineEntryProfileConversation(entry) {
    return isTimelineEntryModule(entry) && entry.entryId.startsWith("profile-conversation-") && Array.isArray(entry.content.items);
  }
  function isTimelineEntryProfileGrid(entry) {
    return isTimelineEntryModule(entry) && entry.entryId.startsWith("profile-grid-") && Array.isArray(entry.content.items);
  }
  function isTimelineEntrySearchGrid(entry) {
    return isTimelineEntryModule(entry) && entry.entryId.startsWith("search-grid-") && Array.isArray(entry.content.items);
  }
  function isTimelineEntryListSearch(entry) {
    return isTimelineEntryModule(entry) && entry.entryId.startsWith("list-search-") && Array.isArray(entry.content.items);
  }
  function extractTweetUnion(tweet) {
    var _a, _b;
    try {
      if (tweet.__typename === "Tweet") {
        return tweet;
      }
      if (tweet.__typename === "TweetWithVisibilityResults") {
        return tweet.tweet;
      }
      if (tweet.__typename === "TweetTombstone") {
        logger.warn(`TweetTombstone received (Reason: ${(_b = (_a = tweet.tombstone) == null ? void 0 : _a.text) == null ? void 0 : _b.text})`, tweet);
        return null;
      }
      if (tweet.__typename === "TweetUnavailable") {
        logger.warn("TweetUnavailable received (Reason: unknown)", tweet);
        return null;
      }
      logger.debug(tweet);
      logger.errorWithBanner("Unknown tweet type received");
    } catch (err) {
      logger.debug(tweet);
      logger.errorWithBanner("Failed to extract tweet", err);
    }
    return null;
  }
  function extractRetweetedTweet(tweet) {
    var _a;
    if ((_a = tweet.legacy.retweeted_status_result) == null ? void 0 : _a.result) {
      return extractTweetUnion(tweet.legacy.retweeted_status_result.result);
    }
    return null;
  }
  function extractQuotedTweet(tweet) {
    var _a;
    if ((_a = tweet.quoted_status_result) == null ? void 0 : _a.result) {
      return extractTweetUnion(tweet.quoted_status_result.result);
    }
    return null;
  }
  function extractTweetUserScreenName(tweet) {
    return tweet.core.user_results.result.legacy.screen_name;
  }
  function extractTweetMedia(tweet) {
    var _a;
    const realTweet = extractRetweetedTweet(tweet) ?? tweet;
    if ((_a = realTweet.legacy.extended_entities) == null ? void 0 : _a.media) {
      return realTweet.legacy.extended_entities.media;
    }
    return realTweet.legacy.entities.media ?? [];
  }
  function extractTweetFullText(tweet) {
    var _a;
    return ((_a = tweet.note_tweet) == null ? void 0 : _a.note_tweet_results.result.text) ?? tweet.legacy.full_text;
  }
  function getMediaIndex(tweet, media) {
    const key = media.media_key;
    return extractTweetMedia(tweet).findIndex((value) => value.media_key === key);
  }
  function getMediaOriginalUrl(media) {
    var _a;
    if (media.type === "video" || media.type === "animated_gif") {
      const variants = ((_a = media.video_info) == null ? void 0 : _a.variants) ?? [];
      let maxBitrateVariant = variants[0];
      for (const variant of variants) {
        if (variant.bitrate && variant.bitrate > ((maxBitrateVariant == null ? void 0 : maxBitrateVariant.bitrate) ?? 0)) {
          maxBitrateVariant = variant;
        }
      }
      return (maxBitrateVariant == null ? void 0 : maxBitrateVariant.url) ?? media.media_url_https;
    }
    return formatTwitterImage(media.media_url_https, "orig");
  }
  function formatTwitterImage(imgUrl, name2 = "medium") {
    const regex = /^(https?:\/\/pbs\.twimg\.com\/media\/.+)\.(\w+)$/;
    const match = imgUrl.match(regex);
    if (!match) {
      return `${imgUrl}?name=${name2}`;
    }
    const [, url, ext] = match;
    return `${url}?format=${ext}&name=${name2}`;
  }
  function getProfileImageOriginalUrl(url) {
    return url.replace(/_normal\.(jpe?g|png|gif)$/, ".$1");
  }
  function getFileExtensionFromUrl(url) {
    const regex = /format=(\w+)|\.(\w+)$|\.(\w+)\?.+$/;
    const match = regex.exec(url);
    return (match == null ? void 0 : match[1]) ?? (match == null ? void 0 : match[2]) ?? (match == null ? void 0 : match[3]) ?? "jpg";
  }
  function getTweetURL(tweet) {
    return `https://twitter.com/${extractTweetUserScreenName(tweet)}/status/${tweet.legacy.id_str}`;
  }
  function getUserURL(user) {
    return `https://twitter.com/${user.legacy.screen_name}`;
  }
  function getInReplyToTweetURL(tweet) {
    return `https://twitter.com/${tweet.legacy.in_reply_to_screen_name}/status/${tweet.legacy.in_reply_to_status_id_str}`;
  }
  const patterns = {
    id: {
      description: "The tweet ID",
      extractor: (tweet) => tweet.rest_id
    },
    screen_name: {
      description: "The username of tweet author",
      extractor: (tweet) => tweet.core.user_results.result.legacy.screen_name
    },
    name: {
      description: "The profile name of tweet author",
      extractor: (tweet) => tweet.core.user_results.result.legacy.name
    },
    index: {
      description: "The media index in tweet (start from 0)",
      extractor: (tweet, media) => String(getMediaIndex(tweet, media))
    },
    num: {
      description: "The order of media in tweet (1/2/3/4)",
      extractor: (tweet, media) => String(getMediaIndex(tweet, media) + 1)
    },
    date: {
      description: "The post date in YYYYMMDD format",
      extractor: (tweet) => parseTwitterDateTime(tweet.legacy.created_at).format("YYYYMMDD")
    },
    time: {
      description: "The post time in HHmmss format",
      extractor: (tweet) => parseTwitterDateTime(tweet.legacy.created_at).format("HHmmss")
    },
    type: {
      description: "The media type (photo/video/animated_gif)",
      extractor: (tweet, media) => media.type
    },
    ext: {
      description: "The file extension of media (jpg/png/mp4)",
      extractor: (tweet, media) => getFileExtensionFromUrl(getMediaOriginalUrl(media))
    }
  };
  const DEFAULT_FILENAME_PATTERN = "{screen_name}_{id}_{type}_{num}_{date}.{ext}";
  function extractMedia(data, includeRetweets, filenamePattern) {
    const gallery = /* @__PURE__ */ new Map();
    for (const item of data) {
      if (item.__typename === "Tweet") {
        if (!includeRetweets && item.legacy.retweeted_status_result) {
          continue;
        }
        const tweetMedia = extractTweetMedia(item).map((media) => {
          let filename = filenamePattern;
          for (const [key, value] of Object.entries(patterns)) {
            filename = filename.replace(`{${key}}`, value.extractor(item, media));
          }
          return {
            filename,
            url: getMediaOriginalUrl(media)
          };
        });
        for (const media of tweetMedia) {
          gallery.set(media.filename, media);
        }
      }
      if (item.__typename === "User") {
        if (item.legacy.profile_image_url_https) {
          const ext = getFileExtensionFromUrl(item.legacy.profile_image_url_https);
          const filename = `${item.legacy.screen_name}_profile_image.${ext}`;
          gallery.set(filename, {
            filename,
            url: getProfileImageOriginalUrl(item.legacy.profile_image_url_https)
          });
        }
        if (item.legacy.profile_banner_url) {
          const ext = getFileExtensionFromUrl(item.legacy.profile_banner_url);
          const filename = `${item.legacy.screen_name}_profile_banner.${ext}`;
          gallery.set(filename, {
            filename,
            url: item.legacy.profile_banner_url
          });
        }
      }
    }
    return Array.from(gallery.values());
  }
  function ExportMediaModal({
    title,
    table,
    isTweet,
    show,
    onClose
  }) {
    const {
      t
    } = useTranslation("exporter");
    const [loading, setLoading] = useSignalState(false);
    const [copied, setCopied] = useSignalState(false);
    const [rateLimit, setRateLimit] = useSignalState(1e3);
    const [filenamePattern, setFilenamePattern] = useSignalState(DEFAULT_FILENAME_PATTERN);
    const [includeRetweets, toggleIncludeRetweets] = useToggle(true);
    const [currentProgress, setCurrentProgress] = useSignalState(0);
    const [totalProgress, setTotalProgress] = useSignalState(0);
    const taskStatusSignal = useSignal({});
    const mediaList = extractMedia(table.getSelectedRowModel().rows.map((row) => row.original), includeRetweets, filenamePattern);
    const onProgress = (current, total, value) => {
      setCurrentProgress(current);
      setTotalProgress(total);
      if (value == null ? void 0 : value.filename) {
        const updated = {
          ...taskStatusSignal.value,
          [value.filename]: 100
        };
        taskStatusSignal.value = updated;
      }
    };
    const onExport = async () => {
      try {
        setLoading(true);
        await zipStreamDownload(`twitter-${title}-${Date.now()}-media.zip`, mediaList, onProgress);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        logger.error(t("Failed to export media. Open DevTools for more details."), err);
      }
    };
    const onCopy = () => {
      const text = mediaList.map((media) => `${media.url}
  out=${media.filename}`).join("\n");
      try {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2e3);
      } catch (err) {
        logger.error(t("Failed to copy media URLs. Open DevTools for more details."), err);
      }
    };
    return u(Modal, {
      class: "max-w-sm md:max-w-screen-sm sm:max-w-screen-sm",
      title: `${t(title, title, {
      ns: "common"
    })} ${t("Media")}`,
      show,
      onClose,
      children: [u("div", {
        class: "px-4 text-base overflow-y-scroll overscroll-none",
        children: [u("p", {
          class: "text-base-content text-opacity-60 leading-5 text-sm",
          children: t("Download and save media files from captured data. This may take a while depending on the amount of data. Media that will be downloaded includes: profile images, profile banners (for users), images, videos (for tweets).")
        }), u("div", {
          role: "alert",
          class: "alert text-sm py-2 mt-2 mb-2",
          children: [u(IconInfoCircle, {
            size: 24
          }), u("span", {
            children: t("For more than 100 media or large files, it is recommended to copy the URLs and download them with an external download manager such as aria2.")
          })]
        }), isTweet && u("div", {
          class: "flex items-center h-9",
          children: [u("p", {
            class: "mr-2 leading-8",
            children: t("Filename template:")
          }), u("div", {
            class: "flex-grow tooltip tooltip-bottom before:whitespace-pre-line before:max-w-max",
            "data-tip": Object.entries(patterns).map(([key, value]) => `{${key}} - ${t(value.description)}`).reduce((acc, cur) => acc + cur + "\n", ""),
            children: u("input", {
              type: "text",
              class: "input input-bordered input-sm w-full",
              value: filenamePattern,
              onChange: (e) => {
                var _a;
                setFilenamePattern((_a = e == null ? void 0 : e.target) == null ? void 0 : _a.value);
              }
            })
          })]
        }), u("div", {
          class: "flex h-9 justify-between",
          children: [u("div", {
            class: "flex items-center h-9 w-1/2",
            children: [u("p", {
              class: "mr-2 leading-8",
              children: t("Rate limit (ms):")
            }), u("input", {
              type: "number",
              class: "input input-bordered input-sm w-32",
              value: rateLimit,
              onChange: (e) => {
                var _a;
                const value = parseInt((_a = e == null ? void 0 : e.target) == null ? void 0 : _a.value);
                setRateLimit(value || 0);
              }
            })]
          }), u("div", {
            class: "flex items-center h-9 w-1/2",
            children: [u("p", {
              class: "mr-2 leading-8",
              children: t("Include retweets:")
            }), u("input", {
              type: "checkbox",
              class: "checkbox checkbox-sm",
              checked: includeRetweets,
              onChange: toggleIncludeRetweets
            })]
          })]
        }), u("div", {
          class: "my-3 overflow-x-scroll",
          children: [u("table", {
            class: "table table-xs table-zebra",
            children: [u("thead", {
              children: u("tr", {
                children: [u("th", {}), u("th", {
                  children: "#"
                }), u("th", {
                  children: t("File Name")
                }), u("th", {
                  children: t("Download URL")
                })]
              })
            }), u("tbody", {
              children: mediaList.map((media, index) => u("tr", {
                children: [u("td", {
                  children: taskStatusSignal.value[media.filename] ? u(IconCircleCheck, {
                    class: "text-success",
                    size: 14
                  }) : u(IconCircleDashed, {
                    size: 14
                  })
                }), u("th", {
                  children: index + 1
                }), u("td", {
                  children: media.filename
                }), u("td", {
                  children: u("a", {
                    class: "link whitespace-nowrap",
                    href: media.url,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    children: media.url
                  })
                })]
              }))
            })]
          }), mediaList.length > 0 ? null : u("div", {
            class: "flex items-center justify-center h-28 w-full",
            children: u("p", {
              class: "text-base-content text-opacity-50",
              children: t("No media selected.")
            })
          })]
        }), u("div", {
          class: "flex flex-col mt-6",
          children: [u("progress", {
            class: "progress progress-secondary w-full",
            value: currentProgress / (totalProgress || 1) * 100,
            max: "100"
          }), u("span", {
            class: "text-sm h-2 leading-none mt-2 text-base-content text-opacity-60",
            children: `${currentProgress}/${mediaList.length}`
          })]
        })]
      }), u("div", {
        class: "flex space-x-2 mt-2",
        children: [u("span", {
          class: "flex-grow"
        }), u("button", {
          class: "btn",
          onClick: onClose,
          children: t("Cancel")
        }), u("button", {
          class: "btn",
          onClick: onCopy,
          children: copied ? t("Copied!") : t("Copy URLs")
        }), u("button", {
          class: cx("btn btn-secondary", loading && "btn-disabled"),
          onClick: onExport,
          children: [loading && u("span", {
            class: "loading loading-spinner"
          }), t("Start Export")]
        })]
      })]
    });
  }
  function flexRender(Comp, props) {
    return !Comp ? null : isComponent(Comp) ? u(Comp, {
      ...props
    }) : Comp;
  }
  function isComponent(component) {
    return typeof component === "function";
  }
  /**
   * @license MIT
   * https://github.com/TanStack/table/blob/main/packages/react-table/src/index.tsx
   */
  function useReactTable(options2) {
    const resolvedOptions = {
      state: {},
      // Dummy state
      onStateChange: () => {
      },
      // noop
      renderFallbackValue: null,
      ...options2
    };
    const [tableRef] = hooks.useState(() => ({
      current: tableCore.createTable(resolvedOptions)
    }));
    const [state, setState] = hooks.useState(() => tableRef.current.initialState);
    tableRef.current.setOptions((prev) => ({
      ...prev,
      ...options2,
      state: {
        ...state,
        ...options2.state
      },
      // Similarly, we'll maintain both our internal state and any user-provided
      // state.
      onStateChange: (updater) => {
        var _a;
        setState(updater);
        (_a = options2.onStateChange) == null ? void 0 : _a.call(options2, updater);
      }
    }));
    return tableRef.current;
  }
  const columnHelper$1 = tableCore.createColumnHelper();
  const rtSourceAccessor = (row) => {
    const source = extractRetweetedTweet(row);
    return source ? extractTweetUserScreenName(source) : null;
  };
  const quoteSourceAccessor = (row) => {
    const source = extractQuotedTweet(row);
    return source ? extractTweetUserScreenName(source) : null;
  };
  const columns$1 = [columnHelper$1.display({
    id: "select",
    meta: {
      exportable: false
    },
    header: ({
      table
    }) => u("input", {
      type: "checkbox",
      class: "checkbox checkbox-sm align-middle",
      checked: table.getIsAllRowsSelected(),
      indeterminate: table.getIsSomeRowsSelected(),
      onChange: table.getToggleAllRowsSelectedHandler()
    }),
    cell: ({
      row
    }) => u("input", {
      type: "checkbox",
      class: "checkbox checkbox-sm",
      checked: row.getIsSelected(),
      disabled: !row.getCanSelect(),
      indeterminate: row.getIsSomeSelected(),
      onChange: row.getToggleSelectedHandler()
    })
  }), columnHelper$1.accessor("rest_id", {
    meta: {
      exportKey: "id",
      exportHeader: "ID"
    },
    header: () => u(Trans, {
      i18nKey: "ID"
    }),
    cell: (info) => u("p", {
      class: "w-20 break-all font-mono text-xs",
      children: info.getValue()
    })
  }), columnHelper$1.accessor((row) => +parseTwitterDateTime(row.legacy.created_at), {
    id: "created_at",
    meta: {
      exportKey: "created_at",
      exportHeader: "Date",
      exportValue: (row) => formatDateTime(parseTwitterDateTime(row.original.legacy.created_at), appOptionsManager.get("dateTimeFormat"))
    },
    header: () => u(Trans, {
      i18nKey: "Date"
    }),
    cell: (info) => u("p", {
      class: "w-24",
      children: u("a", {
        class: "link",
        target: "_blank",
        href: getTweetURL(info.row.original),
        children: formatDateTime(info.getValue(), appOptionsManager.get("dateTimeFormat"))
      })
    })
  }), columnHelper$1.accessor("legacy.full_text", {
    meta: {
      exportKey: "full_text",
      exportHeader: "Content",
      exportValue: (row) => extractTweetFullText(row.original)
    },
    header: () => u(Trans, {
      i18nKey: "Content"
    }),
    cell: (info) => u("div", {
      children: [u("p", {
        class: "w-60 whitespace-pre-wrap",
        dangerouslySetInnerHTML: {
          __html: strEntitiesToHTML(info.row.original.legacy.full_text, [...info.row.original.legacy.entities.urls, ...info.row.original.legacy.entities.media ?? []])
        }
      }), info.row.original.note_tweet && u("button", {
        class: "link",
        onClick: () => {
          var _a;
          return (_a = info.table.options.meta) == null ? void 0 : _a.setRawDataPreview(extractTweetFullText(info.row.original));
        },
        children: [">>", " Show Full Text"]
      })]
    })
  }), columnHelper$1.accessor((row) => extractTweetMedia(row).length, {
    id: "media",
    meta: {
      exportKey: "media",
      exportHeader: "Media",
      exportValue: (row) => extractTweetMedia(row.original).map((media) => ({
        type: media.type,
        url: media.url,
        thumbnail: formatTwitterImage(media.media_url_https, "thumb"),
        original: getMediaOriginalUrl(media)
      }))
    },
    header: () => u(Trans, {
      i18nKey: "Media"
    }),
    cell: (info) => u("div", {
      class: "flex flex-row items-start space-x-1 w-max",
      children: [extractTweetMedia(info.row.original).map((media) => {
        var _a;
        return u("div", {
          class: "flex-shrink-0 block cursor-pointer relative w-12 h-12 rounded bg-base-300 overflow-hidden",
          onClick: () => {
            var _a2;
            return (_a2 = info.table.options.meta) == null ? void 0 : _a2.setMediaPreview(getMediaOriginalUrl(media));
          },
          children: [u("img", {
            class: "w-full h-full object-cover",
            src: formatTwitterImage(media.media_url_https, "thumb")
          }), media.type !== "photo" && u("div", {
            class: "absolute bottom-0.5 left-0.5 h-4 w-max px-0.5 text-xs text-white bg-black bg-opacity-30 leading-4 text-center rounded",
            children: media.type === "video" ? formatVideoDuration((_a = media.video_info) == null ? void 0 : _a.duration_millis) : "GIF"
          })]
        }, media.media_key);
      }), extractTweetMedia(info.row.original).length ? null : "N/A"]
    })
  }), columnHelper$1.accessor("core.user_results.result.legacy.screen_name", {
    meta: {
      exportKey: "screen_name",
      exportHeader: "Screen Name"
    },
    header: () => u(Trans, {
      i18nKey: "Screen Name"
    }),
    cell: (info) => u("p", {
      class: "whitespace-pre",
      children: u("a", {
        class: "link",
        target: "_blank",
        href: getUserURL(info.row.original.core.user_results.result),
        children: ["@", info.getValue()]
      })
    })
  }), columnHelper$1.accessor("core.user_results.result.legacy.name", {
    meta: {
      exportKey: "name",
      exportHeader: "Profile Name"
    },
    header: () => u(Trans, {
      i18nKey: "Profile Name"
    }),
    cell: (info) => u("p", {
      class: "w-32",
      children: info.getValue()
    })
  }), columnHelper$1.accessor("core.user_results.result.legacy.profile_image_url_https", {
    meta: {
      exportKey: "profile_image_url",
      exportHeader: "Profile Image"
    },
    header: () => u(Trans, {
      i18nKey: "Profile Image"
    }),
    cell: (info) => u("div", {
      class: "cursor-pointer",
      onClick: () => {
        var _a;
        return (_a = info.table.options.meta) == null ? void 0 : _a.setMediaPreview(getProfileImageOriginalUrl(info.getValue()));
      },
      children: u("img", {
        class: "w-12 h-12 rounded",
        src: info.getValue()
      })
    })
  }), columnHelper$1.accessor("legacy.in_reply_to_screen_name", {
    meta: {
      exportKey: "in_reply_to",
      exportHeader: "Replying To",
      exportValue: (row) => row.original.legacy.in_reply_to_status_id_str
    },
    header: () => u(Trans, {
      i18nKey: "Replying To"
    }),
    cell: (info) => u("p", {
      class: "whitespace-pre",
      children: info.row.original.legacy.in_reply_to_status_id_str ? u("a", {
        class: "link",
        target: "_blank",
        href: getInReplyToTweetURL(info.row.original),
        children: ["@", info.getValue()]
      }) : "N/A"
    })
  }), columnHelper$1.accessor(rtSourceAccessor, {
    id: "rt_source",
    meta: {
      exportKey: "retweeted_status",
      exportHeader: "RT Source",
      exportValue: (row) => {
        var _a;
        return (_a = extractRetweetedTweet(row.original)) == null ? void 0 : _a.rest_id;
      }
    },
    header: () => u(Trans, {
      i18nKey: "RT Source"
    }),
    cell: (info) => {
      const source = extractRetweetedTweet(info.row.original);
      return u("p", {
        class: "whitespace-pre",
        children: source ? u("a", {
          class: "link",
          target: "_blank",
          href: getTweetURL(source),
          children: ["@", info.getValue()]
        }) : "N/A"
      });
    }
  }), columnHelper$1.accessor(quoteSourceAccessor, {
    id: "quote_source",
    meta: {
      exportKey: "quoted_status",
      exportHeader: "Quote Source",
      exportValue: (row) => {
        var _a;
        return (_a = extractQuotedTweet(row.original)) == null ? void 0 : _a.rest_id;
      }
    },
    header: () => u(Trans, {
      i18nKey: "Quote Source"
    }),
    cell: (info) => {
      const source = extractQuotedTweet(info.row.original);
      return u("p", {
        class: "whitespace-pre",
        children: source ? u("a", {
          class: "link",
          target: "_blank",
          href: getTweetURL(source),
          children: ["@", info.getValue()]
        }) : "N/A"
      });
    }
  }), columnHelper$1.accessor("legacy.favorite_count", {
    meta: {
      exportKey: "favorite_count",
      exportHeader: "Favorites"
    },
    header: () => u(Trans, {
      i18nKey: "Favorites"
    }),
    cell: (info) => u("p", {
      children: info.getValue()
    })
  }), columnHelper$1.accessor("legacy.retweet_count", {
    meta: {
      exportKey: "retweet_count",
      exportHeader: "Retweets"
    },
    header: () => u(Trans, {
      i18nKey: "Retweets"
    }),
    cell: (info) => u("p", {
      children: info.getValue()
    })
  }), columnHelper$1.accessor("legacy.bookmark_count", {
    meta: {
      exportKey: "bookmark_count",
      exportHeader: "Bookmarks"
    },
    header: () => u(Trans, {
      i18nKey: "Bookmarks"
    }),
    cell: (info) => u("p", {
      children: info.getValue()
    })
  }), columnHelper$1.accessor("legacy.quote_count", {
    meta: {
      exportKey: "quote_count",
      exportHeader: "Quotes"
    },
    header: () => u(Trans, {
      i18nKey: "Quotes"
    }),
    cell: (info) => u("p", {
      children: info.getValue()
    })
  }), columnHelper$1.accessor("legacy.reply_count", {
    meta: {
      exportKey: "reply_count",
      exportHeader: "Replies"
    },
    header: () => u(Trans, {
      i18nKey: "Replies"
    }),
    cell: (info) => u("p", {
      children: info.getValue()
    })
  }), columnHelper$1.accessor("views.count", {
    meta: {
      exportKey: "views_count",
      exportHeader: "Views",
      exportValue: (row) => typeof row.original.views.count === "undefined" ? null : +row.original.views.count
    },
    header: () => u(Trans, {
      i18nKey: "Views"
    }),
    cell: (info) => u("p", {
      children: info.getValue() ?? "N/A"
    })
  }), columnHelper$1.accessor("legacy.favorited", {
    meta: {
      exportKey: "favorited",
      exportHeader: "Favorited"
    },
    header: () => u(Trans, {
      i18nKey: "Favorited"
    }),
    cell: (info) => u("p", {
      children: info.getValue() ? "YES" : "NO"
    })
  }), columnHelper$1.accessor("legacy.retweeted", {
    meta: {
      exportKey: "retweeted",
      exportHeader: "Retweeted"
    },
    header: () => u(Trans, {
      i18nKey: "Retweeted"
    }),
    cell: (info) => u("p", {
      children: info.getValue() ? "YES" : "NO"
    })
  }), columnHelper$1.accessor("legacy.bookmarked", {
    meta: {
      exportKey: "bookmarked",
      exportHeader: "Bookmarked"
    },
    header: () => u(Trans, {
      i18nKey: "Bookmarked"
    }),
    cell: (info) => u("p", {
      children: info.getValue() ? "YES" : "NO"
    })
  }), columnHelper$1.display({
    id: "url",
    meta: {
      exportKey: "url",
      exportHeader: "URL",
      exportValue: (row) => getTweetURL(row.original)
    },
    header: () => u(Trans, {
      i18nKey: "URL"
    }),
    cell: (info) => u("a", {
      href: getTweetURL(info.row.original),
      target: "_blank",
      children: u(IconLink, {})
    })
  }), columnHelper$1.display({
    id: "actions",
    meta: {
      exportable: false
    },
    header: () => u(Trans, {
      i18nKey: "Actions"
    }),
    cell: (info) => u("div", {
      class: "flex flex-row items-start space-x-1",
      children: u("button", {
        onClick: () => {
          var _a;
          return (_a = info.table.options.meta) == null ? void 0 : _a.setRawDataPreview(info.row.original);
        },
        class: "btn btn-xs btn-neutral whitespace-nowrap",
        children: u(Trans, {
          i18nKey: "Details"
        })
      })
    })
  })];
  const columnHelper = tableCore.createColumnHelper();
  const columns = [columnHelper.display({
    id: "select",
    meta: {
      exportable: false
    },
    header: ({
      table
    }) => u("input", {
      type: "checkbox",
      class: "checkbox checkbox-sm align-middle",
      checked: table.getIsAllRowsSelected(),
      indeterminate: table.getIsSomeRowsSelected(),
      onChange: table.getToggleAllRowsSelectedHandler()
    }),
    cell: ({
      row
    }) => u("input", {
      type: "checkbox",
      class: "checkbox checkbox-sm",
      checked: row.getIsSelected(),
      disabled: !row.getCanSelect(),
      indeterminate: row.getIsSomeSelected(),
      onChange: row.getToggleSelectedHandler()
    })
  }), columnHelper.accessor("rest_id", {
    meta: {
      exportKey: "id",
      exportHeader: "ID"
    },
    header: () => u(Trans, {
      i18nKey: "ID"
    }),
    cell: (info) => u("p", {
      class: "w-20 break-all font-mono text-xs",
      children: info.getValue()
    })
  }), columnHelper.accessor("legacy.screen_name", {
    meta: {
      exportKey: "screen_name",
      exportHeader: "Screen Name"
    },
    header: () => u(Trans, {
      i18nKey: "Screen Name"
    }),
    cell: (info) => u("p", {
      class: "whitespace-pre",
      children: u("a", {
        class: "link",
        target: "_blank",
        href: getUserURL(info.row.original),
        children: ["@", info.getValue()]
      })
    })
  }), columnHelper.accessor("legacy.name", {
    meta: {
      exportKey: "name",
      exportHeader: "Profile Name"
    },
    header: () => u(Trans, {
      i18nKey: "Profile Name"
    }),
    cell: (info) => u("p", {
      class: "w-32",
      children: info.getValue()
    })
  }), columnHelper.accessor("legacy.description", {
    meta: {
      exportKey: "description",
      exportHeader: "Description"
    },
    header: () => u(Trans, {
      i18nKey: "Description"
    }),
    cell: (info) => u("p", {
      class: "w-52",
      dangerouslySetInnerHTML: {
        __html: strEntitiesToHTML(info.row.original.legacy.description, info.row.original.legacy.entities.description.urls)
      }
    })
  }), columnHelper.accessor("legacy.profile_image_url_https", {
    meta: {
      exportKey: "profile_image_url",
      exportHeader: "Profile Image"
    },
    header: () => u(Trans, {
      i18nKey: "Profile Image"
    }),
    cell: (info) => u("div", {
      class: "cursor-pointer",
      onClick: () => {
        var _a;
        return (_a = info.table.options.meta) == null ? void 0 : _a.setMediaPreview(getProfileImageOriginalUrl(info.getValue()));
      },
      children: u("img", {
        class: "w-12 h-12 rounded",
        src: info.getValue()
      })
    })
  }), columnHelper.accessor("legacy.profile_banner_url", {
    meta: {
      exportKey: "profile_banner_url",
      exportHeader: "Profile Banner"
    },
    header: () => u(Trans, {
      i18nKey: "Profile Banner"
    }),
    cell: (info) => u("div", {
      class: "cursor-pointer w-36 h-12",
      onClick: () => {
        var _a;
        return (_a = info.table.options.meta) == null ? void 0 : _a.setMediaPreview(info.getValue() ?? "");
      },
      children: info.getValue() ? u("img", {
        class: "w-auto h-12 rounded",
        src: `${info.getValue()}/600x200`
      }) : u("span", {
        class: "leading-[48px]",
        children: "N/A"
      })
    })
  }), columnHelper.accessor("legacy.followers_count", {
    meta: {
      exportKey: "followers_count",
      exportHeader: "Followers"
    },
    header: () => u(Trans, {
      i18nKey: "Followers"
    }),
    cell: (info) => u("p", {
      children: info.getValue()
    })
  }), columnHelper.accessor("legacy.statuses_count", {
    meta: {
      exportKey: "statuses_count",
      exportHeader: "Statuses"
    },
    header: () => u(Trans, {
      i18nKey: "Statuses"
    }),
    cell: (info) => u("p", {
      children: info.getValue()
    })
  }), columnHelper.accessor("legacy.favourites_count", {
    meta: {
      exportKey: "favourites_count",
      exportHeader: "Favourites"
    },
    header: () => u(Trans, {
      i18nKey: "Favourites"
    }),
    cell: (info) => u("p", {
      children: info.getValue()
    })
  }), columnHelper.accessor("legacy.listed_count", {
    meta: {
      exportKey: "listed_count",
      exportHeader: "Listed"
    },
    header: () => u(Trans, {
      i18nKey: "Listed"
    }),
    cell: (info) => u("p", {
      children: info.getValue()
    })
  }), columnHelper.accessor("legacy.verified_type", {
    meta: {
      exportKey: "verified_type",
      exportHeader: "Verified Type"
    },
    header: () => u(Trans, {
      i18nKey: "Verified Type"
    }),
    cell: (info) => u("p", {
      children: info.getValue() ?? "N/A"
    })
  }), columnHelper.accessor("is_blue_verified", {
    meta: {
      exportKey: "is_blue_verified",
      exportHeader: "Blue Verified"
    },
    header: () => u(Trans, {
      i18nKey: "Blue Verified"
    }),
    cell: (info) => u("p", {
      children: info.getValue() ? "YES" : "NO"
    })
  }), columnHelper.accessor("legacy.following", {
    meta: {
      exportKey: "following",
      exportHeader: "Following"
    },
    header: () => u(Trans, {
      i18nKey: "Following"
    }),
    cell: (info) => u("p", {
      children: info.getValue() ? "YES" : "NO"
    })
  }), columnHelper.accessor("legacy.followed_by", {
    meta: {
      exportKey: "followed_by",
      exportHeader: "Follows You"
    },
    header: () => u(Trans, {
      i18nKey: "Follows You"
    }),
    cell: (info) => u("p", {
      children: info.getValue() ? "YES" : "NO"
    })
  }), columnHelper.accessor((row) => +parseTwitterDateTime(row.legacy.created_at), {
    id: "created_at",
    meta: {
      exportKey: "created_at",
      exportHeader: "Created At",
      exportValue: (row) => formatDateTime(parseTwitterDateTime(row.original.legacy.created_at), appOptionsManager.get("dateTimeFormat"))
    },
    header: () => u(Trans, {
      i18nKey: "Created At"
    }),
    cell: (info) => u("p", {
      class: "w-24",
      children: formatDateTime(info.getValue(), appOptionsManager.get("dateTimeFormat"))
    })
  }), columnHelper.display({
    id: "url",
    meta: {
      exportKey: "url",
      exportHeader: "URL",
      exportValue: (row) => getUserURL(row.original)
    },
    header: () => u(Trans, {
      i18nKey: "URL"
    }),
    cell: (info) => u("a", {
      href: getUserURL(info.row.original),
      target: "_blank",
      children: u(IconLink, {})
    })
  })];
  const Pagination = ({
    table
  }) => {
    const {
      t
    } = useTranslation();
    const state = table.getState().pagination;
    return u("div", {
      className: "mt-3 flex items-center gap-2",
      children: [u("span", {
        children: t("Rows per page:")
      }), u("select", {
        value: state.pageSize,
        onChange: (e) => {
          table.setPageSize(Number(e.target.value));
        },
        className: "select select-sm select-bordered",
        children: [10, 20, 50, 100].map((pageSize) => u("option", {
          value: pageSize,
          children: pageSize
        }, pageSize))
      }), u("span", {
        class: "flex-grow"
      }), u("span", {
        children: t("A - B of N items", {
          from: state.pageSize * state.pageIndex + 1,
          to: Math.min(state.pageSize * (state.pageIndex + 1), table.getFilteredRowModel().rows.length),
          total: table.getFilteredRowModel().rows.length
        })
      }), u("input", {
        defaultValue: (state.pageIndex + 1).toString(),
        type: "number",
        onInput: (e) => {
          const value = e.target.value;
          table.setPageIndex(value ? Number(value) - 1 : 0);
        },
        className: "input input-bordered w-20 input-sm text-center"
      }), u("div", {
        class: "join",
        children: [u("button", {
          className: "join-item btn btn-sm",
          onClick: () => table.setPageIndex(0),
          disabled: !table.getCanPreviousPage(),
          children: u(IconChevronLeftPipe, {
            size: 20
          })
        }), u("button", {
          className: "join-item btn btn-sm",
          onClick: () => table.previousPage(),
          disabled: !table.getCanPreviousPage(),
          children: u(IconChevronLeft, {
            size: 20
          })
        }), u("button", {
          className: "join-item btn btn-sm",
          onClick: () => table.nextPage(),
          disabled: !table.getCanNextPage(),
          children: u(IconChevronRight, {
            size: 20
          })
        }), u("button", {
          className: "join-item btn btn-sm",
          onClick: () => table.setPageIndex(table.getPageCount() - 1),
          disabled: !table.getCanNextPage(),
          children: u(IconChevronRightPipe, {
            size: 20
          })
        })]
      })]
    });
  };
  function TableView({
    title,
    recordsSignal,
    isTweet
  }) {
    const {
      t
    } = useTranslation();
    const data = recordsSignal.value;
    const [showExportDataModal, toggleShowExportDataModal] = useToggle();
    const [showExportMediaModal, toggleShowExportMediaModal] = useToggle();
    const [mediaPreview, setMediaPreview] = useSignalState("");
    const [rawDataPreview, setRawDataPreview] = useSignalState(null);
    const table = useReactTable({
      data,
      columns: isTweet ? columns$1 : columns,
      getCoreRowModel: tableCore.getCoreRowModel(),
      getFilteredRowModel: tableCore.getFilteredRowModel(),
      getSortedRowModel: tableCore.getSortedRowModel(),
      getPaginationRowModel: tableCore.getPaginationRowModel(),
      meta: {
        mediaPreview,
        setMediaPreview: (url) => setMediaPreview(url),
        rawDataPreview,
        setRawDataPreview: (data2) => setRawDataPreview(data2)
      }
    });
    hooks.useEffect(() => {
      if (!table.getIsSomeRowsSelected()) {
        table.toggleAllRowsSelected(true);
      }
    }, [table]);
    return u(preact.Fragment, {
      children: [u(SearchArea, {
        defaultValue: table.getState().globalFilter,
        onChange: table.setGlobalFilter
      }), u("main", {
        class: "max-w-full grow overflow-scroll bg-base-200 overscroll-none",
        children: [u("table", {
          class: "table table-pin-rows table-border-bc table-padding-sm",
          children: [u("thead", {
            children: table.getHeaderGroups().map((headerGroup) => u("tr", {
              children: headerGroup.headers.map((header) => u("th", {
                className: header.column.getCanSort() ? "cursor-pointer select-none" : "",
                onClick: header.column.getToggleSortingHandler(),
                children: [flexRender(header.column.columnDef.header, header.getContext()), header.column.getIsSorted() === "asc" && u(IconSortAscending, {
                  size: 15,
                  class: "inline align-top ml-1"
                }), header.column.getIsSorted() === "desc" && u(IconSortDescending, {
                  size: 15,
                  class: "inline align-top ml-1"
                })]
              }, header.id))
            }, headerGroup.id))
          }), u("tbody", {
            children: table.getRowModel().rows.map((row) => u("tr", {
              children: row.getVisibleCells().map((cell) => u("td", {
                children: flexRender(cell.column.columnDef.cell, cell.getContext())
              }, cell.id))
            }, row.id))
          })]
        }), table.getRowModel().rows.length > 0 ? null : u("div", {
          class: "flex items-center justify-center h-52 w-full",
          children: u("p", {
            class: "text-base-content text-opacity-50",
            children: t("No data available.")
          })
        })]
      }), u(Pagination, {
        table
      }), u("div", {
        class: "flex mt-3 space-x-2",
        children: [u("button", {
          class: "btn btn-neutral btn-ghost",
          onClick: () => {
            recordsSignal.value = [];
          },
          children: t("Clear")
        }), u("span", {
          class: "flex-grow"
        }), u("button", {
          class: "btn btn-secondary",
          onClick: toggleShowExportMediaModal,
          children: t("Export Media")
        }), u("button", {
          class: "btn btn-primary",
          onClick: toggleShowExportDataModal,
          children: t("Export Data")
        })]
      }), u(ExportDataModal, {
        title,
        table,
        show: showExportDataModal,
        onClose: toggleShowExportDataModal
      }), u(ExportMediaModal, {
        title,
        table,
        isTweet,
        show: showExportMediaModal,
        onClose: toggleShowExportMediaModal
      }), u(Modal, {
        title: t("JSON View"),
        class: "max-w-xl",
        show: !!rawDataPreview,
        onClose: () => setRawDataPreview(null),
        children: u("main", {
          class: "max-w-full max-h-[500px] overflow-scroll overscroll-none",
          children: typeof rawDataPreview === "string" ? u("p", {
            class: "whitespace-pre-wrap",
            children: rawDataPreview
          }) : u("pre", {
            class: "text-xs leading-none",
            children: JSON.stringify(rawDataPreview, null, 2)
          })
        })
      }), u(Modal, {
        title: t("Media View"),
        class: "max-w-xl",
        show: !!mediaPreview,
        onClose: () => setMediaPreview(""),
        children: u("main", {
          class: "max-w-full",
          children: mediaPreview.includes(".mp4") ? u("video", {
            controls: true,
            class: "w-full max-h-[400px] object-contain",
            src: mediaPreview
          }) : u("img", {
            class: "w-full max-h-[400px] object-contain",
            src: mediaPreview
          })
        })
      })]
    });
  }
  function ModuleUI({
    title,
    recordsSignal,
    isTweet
  }) {
    const {
      t
    } = useTranslation();
    const [showModal, toggleShowModal] = useToggle();
    const translatedTitle = t(title);
    return u(ExtensionPanel, {
      title: translatedTitle,
      description: `${t("Captured:")} ${recordsSignal.value.length}`,
      active: recordsSignal.value.length > 0,
      onClick: toggleShowModal,
      indicatorColor: isTweet ? "bg-primary" : "bg-secondary",
      children: u(Modal, {
        title: translatedTitle,
        show: showModal,
        onClose: toggleShowModal,
        children: u(TableView, {
          title: translatedTitle,
          show: showModal,
          recordsSignal,
          isTweet
        })
      })
    });
  }
  const bookmarksSignal = signals.signal([]);
  const BookmarksInterceptor = (req, res) => {
    if (!/\/graphql\/.+\/Bookmarks/.test(req.url)) {
      return;
    }
    try {
      const newData = extractDataFromResponse(res, (json) => json.data.bookmark_timeline_v2.timeline.instructions, (entry) => extractTimelineTweet(entry.content.itemContent));
      bookmarksSignal.value = [...bookmarksSignal.value, ...newData];
      logger.info(`Bookmarks: ${newData.length} items received`);
    } catch (err) {
      logger.debug(req.method, req.url, res.status, res.responseText);
      logger.errorWithBanner("Bookmarks: Failed to parse API response", err);
    }
  };
  function BookmarksPanel() {
    return u(ModuleUI, {
      title: "Bookmarks",
      recordsSignal: bookmarksSignal,
      isTweet: true
    });
  }
  class BookmarksModule extends Extension {
    constructor() {
      super(...arguments);
      __publicField(this, "name", "BookmarksModule");
    }
    intercept() {
      return BookmarksInterceptor;
    }
    render() {
      return BookmarksPanel;
    }
  }
  const followersSignal = signals.signal([]);
  const FollowersInterceptor = (req, res) => {
    if (!/\/graphql\/.+\/(BlueVerified)*Followers/.test(req.url)) {
      return;
    }
    try {
      const newData = extractDataFromResponse(res, (json) => json.data.user.result.timeline.timeline.instructions, (entry) => entry.content.itemContent.user_results.result);
      followersSignal.value = [...followersSignal.value, ...newData];
      logger.info(`Followers: ${newData.length} items received`);
    } catch (err) {
      logger.debug(req.method, req.url, res.status, res.responseText);
      logger.errorWithBanner("Followers: Failed to parse API response", err);
    }
  };
  function FollowersPanel() {
    return u(ModuleUI, {
      title: "Followers",
      recordsSignal: followersSignal
    });
  }
  class FollowersModule extends Extension {
    constructor() {
      super(...arguments);
      __publicField(this, "name", "FollowersModule");
    }
    intercept() {
      return FollowersInterceptor;
    }
    render() {
      return FollowersPanel;
    }
  }
  const followingSignal = signals.signal([]);
  const FollowingInterceptor = (req, res) => {
    if (!/\/graphql\/.+\/Following/.test(req.url)) {
      return;
    }
    try {
      const newData = extractDataFromResponse(res, (json) => json.data.user.result.timeline.timeline.instructions, (entry) => entry.content.itemContent.user_results.result);
      followingSignal.value = [...followingSignal.value, ...newData];
      logger.info(`Following: ${newData.length} items received`);
    } catch (err) {
      logger.debug(req.method, req.url, res.status, res.responseText);
      logger.errorWithBanner("Following: Failed to parse API response", err);
    }
  };
  function FollowingPanel() {
    return u(ModuleUI, {
      title: "Following",
      recordsSignal: followingSignal
    });
  }
  class FollowingModule extends Extension {
    constructor() {
      super(...arguments);
      __publicField(this, "name", "FollowingModule");
    }
    intercept() {
      return FollowingInterceptor;
    }
    render() {
      return FollowingPanel;
    }
  }
  const homeTimelineSignal = signals.signal([]);
  const HomeTimelineInterceptor = (req, res) => {
    if (!/\/graphql\/.+\/Home(Latest)?Timeline/.test(req.url)) {
      return;
    }
    try {
      const newData = extractDataFromResponse(res, (json) => json.data.home.home_timeline_urt.instructions, (entry) => extractTimelineTweet(entry.content.itemContent));
      homeTimelineSignal.value = [...homeTimelineSignal.value, ...newData];
      logger.info(`HomeTimeline: ${newData.length} items received`);
    } catch (err) {
      logger.debug(req.method, req.url, res.status, res.responseText);
      logger.errorWithBanner("HomeTimeline: Failed to parse API response", err);
    }
  };
  function HomeTimelinePanel() {
    return u(ModuleUI, {
      title: "HomeTimeline",
      recordsSignal: homeTimelineSignal,
      isTweet: true
    });
  }
  class HomeTimelineModule extends Extension {
    constructor() {
      super(...arguments);
      __publicField(this, "name", "HomeTimelineModule");
    }
    intercept() {
      return HomeTimelineInterceptor;
    }
    render() {
      return HomeTimelinePanel;
    }
  }
  const likesSignal = signals.signal([]);
  const LikesInterceptor = (req, res) => {
    if (!/\/graphql\/.+\/Likes/.test(req.url)) {
      return;
    }
    try {
      const newData = extractDataFromResponse(res, (json) => json.data.user.result.timeline_v2.timeline.instructions, (entry) => extractTimelineTweet(entry.content.itemContent));
      likesSignal.value = [...likesSignal.value, ...newData];
      logger.info(`Likes: ${newData.length} items received`);
    } catch (err) {
      logger.debug(req.method, req.url, res.status, res.responseText);
      logger.errorWithBanner("Likes: Failed to parse API response", err);
    }
  };
  function LikesPanel() {
    return u(ModuleUI, {
      title: "Likes",
      recordsSignal: likesSignal,
      isTweet: true
    });
  }
  class LikesModule extends Extension {
    constructor() {
      super(...arguments);
      __publicField(this, "name", "LikesModule");
    }
    intercept() {
      return LikesInterceptor;
    }
    render() {
      return LikesPanel;
    }
  }
  const listMembersSignal = signals.signal([]);
  const ListMembersInterceptor = (req, res) => {
    if (!/\/graphql\/.+\/ListMembers/.test(req.url)) {
      return;
    }
    try {
      const newData = extractDataFromResponse(res, (json) => json.data.list.members_timeline.timeline.instructions, (entry) => entry.content.itemContent.user_results.result);
      listMembersSignal.value = [...listMembersSignal.value, ...newData];
      logger.info(`ListMembers: ${newData.length} items received`);
    } catch (err) {
      logger.debug(req.method, req.url, res.status, res.responseText);
      logger.errorWithBanner("ListMembers: Failed to parse API response", err);
    }
  };
  function ListMembersPanel() {
    return u(ModuleUI, {
      title: "ListMembers",
      recordsSignal: listMembersSignal
    });
  }
  class ListMembersModule extends Extension {
    constructor() {
      super(...arguments);
      __publicField(this, "name", "ListMembersModule");
    }
    intercept() {
      return ListMembersInterceptor;
    }
    render() {
      return ListMembersPanel;
    }
  }
  const listSubscribersSignal = signals.signal([]);
  const ListSubscribersInterceptor = (req, res) => {
    if (!/\/graphql\/.+\/ListSubscribers/.test(req.url)) {
      return;
    }
    try {
      const newData = extractDataFromResponse(res, (json) => json.data.list.subscribers_timeline.timeline.instructions, (entry) => entry.content.itemContent.user_results.result);
      listSubscribersSignal.value = [...listSubscribersSignal.value, ...newData];
      logger.info(`ListSubscribers: ${newData.length} items received`);
    } catch (err) {
      logger.debug(req.method, req.url, res.status, res.responseText);
      logger.errorWithBanner("ListSubscribers: Failed to parse API response", err);
    }
  };
  function ListSubscribersPanel() {
    return u(ModuleUI, {
      title: "ListSubscribers",
      recordsSignal: listSubscribersSignal
    });
  }
  class ListSubscribersModule extends Extension {
    constructor() {
      super(...arguments);
      __publicField(this, "name", "ListSubscribersModule");
    }
    intercept() {
      return ListSubscribersInterceptor;
    }
    render() {
      return ListSubscribersPanel;
    }
  }
  const listTimelineSignal = signals.signal([]);
  const ListTimelineInterceptor = (req, res) => {
    if (!/\/graphql\/.+\/ListLatestTweetsTimeline/.test(req.url)) {
      return;
    }
    try {
      const newData = extractDataFromResponse(res, (json) => json.data.list.tweets_timeline.timeline.instructions, (entry) => extractTimelineTweet(entry.content.itemContent));
      listTimelineSignal.value = [...listTimelineSignal.value, ...newData];
      logger.info(`ListTimeline: ${newData.length} items received`);
    } catch (err) {
      logger.debug(req.method, req.url, res.status, res.responseText);
      logger.errorWithBanner("ListTimeline: Failed to parse API response", err);
    }
  };
  function ListTimelinePanel() {
    return u(ModuleUI, {
      title: "ListTimeline",
      recordsSignal: listTimelineSignal,
      isTweet: true
    });
  }
  class ListTimelineModule extends Extension {
    constructor() {
      super(...arguments);
      __publicField(this, "name", "ListTimelineModule");
    }
    intercept() {
      return ListTimelineInterceptor;
    }
    render() {
      return ListTimelinePanel;
    }
  }
  const colors = {
    info: "text-base-content",
    warn: "text-warning",
    error: "text-error"
  };
  function Logs({
    lines
  }) {
    const reversed = lines.value.slice().reverse();
    return u("pre", {
      class: "leading-none text-xs max-h-48 bg-base-200 overflow-y-scroll m-0 px-1 py-2.5 no-scrollbar rounded-box-half",
      children: reversed.map((line) => u("span", {
        class: colors[line.type],
        children: ["#", line.index, " ", line.line, "\n"]
      }, line.index))
    });
  }
  function RuntimeLogsPanel() {
    return u(preact.Fragment, {
      children: [u("div", {
        class: "divider mt-0 mb-1"
      }), u(Logs, {
        lines: logLinesSignal
      })]
    });
  }
  class RuntimeLogsModule extends Extension {
    constructor() {
      super(...arguments);
      __publicField(this, "name", "RuntimeLogsModule");
    }
    render() {
      return RuntimeLogsPanel;
    }
  }
  const searchTimelineSignal = signals.signal([]);
  const SearchTimelineInterceptor = (req, res) => {
    if (!/\/graphql\/.+\/SearchTimeline/.test(req.url)) {
      return;
    }
    try {
      const json = JSON.parse(res.responseText);
      const instructions = json.data.search_by_raw_query.search_timeline.timeline.instructions;
      const newTweets = [];
      const newUsers = [];
      const newLists = [];
      const timelineAddEntriesInstruction = instructions.find((i) => i.type === "TimelineAddEntries");
      const timelineAddToModuleInstruction = instructions.find((i) => i.type === "TimelineAddToModule");
      for (const entry of timelineAddEntriesInstruction.entries) {
        if (isTimelineEntryTweet(entry)) {
          const tweet = extractTimelineTweet(entry.content.itemContent);
          if (tweet) {
            newTweets.push(tweet);
          }
        }
        if (isTimelineEntrySearchGrid(entry)) {
          const tweetsInSearchGrid = entry.content.items.map((i) => extractTimelineTweet(i.item.itemContent)).filter((t) => !!t);
          newTweets.push(...tweetsInSearchGrid);
        }
        if (isTimelineEntryUser(entry)) {
          const user = entry.content.itemContent.user_results.result;
          newUsers.push(user);
        }
        if (isTimelineEntryListSearch(entry)) {
          const lists = entry.content.items.map((i) => i.item.itemContent.list);
          newLists.push(...lists);
        }
      }
      if (timelineAddToModuleInstruction) {
        const items = timelineAddToModuleInstruction.moduleItems.map((i) => i.item.itemContent);
        const tweets = items.filter((i) => i.__typename === "TimelineTweet").map((t) => extractTimelineTweet(t)).filter((t) => !!t);
        newTweets.push(...tweets);
        const lists = items.filter((i) => i.__typename === "TimelineTwitterList").map((i) => i.list);
        newLists.push(...lists);
      }
      searchTimelineSignal.value = [...searchTimelineSignal.value, ...newTweets];
      logger.info(`SearchTimeline: ${newTweets.length} items received`);
      if (newLists.length > 0) {
        logger.warn(`SearchList: ${newLists.length} lists received but ignored (Reason: not implemented)`, newLists);
      }
      if (newUsers.length > 0) {
        logger.warn(`SearchUser: ${newUsers.length} users received but ignored (Reason: not implemented)`, newUsers);
      }
    } catch (err) {
      logger.debug(req.method, req.url, res.status, res.responseText);
      logger.errorWithBanner("SearchTimeline: Failed to parse API response", err);
    }
  };
  function SearchTimelinePanel() {
    return u(ModuleUI, {
      title: "SearchTimeline",
      recordsSignal: searchTimelineSignal,
      isTweet: true
    });
  }
  class SearchTimelineModule extends Extension {
    constructor() {
      super(...arguments);
      __publicField(this, "name", "SearchTimelineModule");
    }
    intercept() {
      return SearchTimelineInterceptor;
    }
    render() {
      return SearchTimelinePanel;
    }
  }
  const tweetDetailSignal = signals.signal([]);
  const TweetDetailInterceptor = (req, res) => {
    if (!/\/graphql\/.+\/TweetDetail/.test(req.url)) {
      return;
    }
    try {
      const json = JSON.parse(res.responseText);
      const instructions = json.data.threaded_conversation_with_injections_v2.instructions;
      const newData = [];
      const timelineAddEntriesInstruction = instructions.find((i) => i.type === "TimelineAddEntries");
      const timelineAddEntriesInstructionEntries = (timelineAddEntriesInstruction == null ? void 0 : timelineAddEntriesInstruction.entries) ?? [];
      for (const entry of timelineAddEntriesInstructionEntries) {
        if (isTimelineEntryTweet(entry)) {
          const tweet = extractTimelineTweet(entry.content.itemContent);
          if (tweet) {
            newData.push(tweet);
          }
        }
        if (isTimelineEntryConversationThread(entry)) {
          const tweetsInConversation = entry.content.items.map((i) => {
            if (i.entryId.includes("-tweet-")) {
              return extractTimelineTweet(i.item.itemContent);
            }
          });
          newData.push(...tweetsInConversation.filter((t) => !!t));
        }
      }
      const timelineAddToModuleInstruction = instructions.find((i) => i.type === "TimelineAddToModule");
      if (timelineAddToModuleInstruction) {
        const tweetsInConversation = timelineAddToModuleInstruction.moduleItems.map((i) => extractTimelineTweet(i.item.itemContent)).filter((t) => !!t);
        newData.push(...tweetsInConversation);
      }
      tweetDetailSignal.value = [...tweetDetailSignal.value, ...newData];
      logger.info(`TweetDetail: ${newData.length} items received`);
    } catch (err) {
      logger.debug(req.method, req.url, res.status, res.responseText);
      logger.errorWithBanner("TweetDetail: Failed to parse API response", err);
    }
  };
  function TweetDetailPanel() {
    return u(ModuleUI, {
      title: "TweetDetail",
      recordsSignal: tweetDetailSignal,
      isTweet: true
    });
  }
  class TweetDetailModule extends Extension {
    constructor() {
      super(...arguments);
      __publicField(this, "name", "TweetDetailModule");
    }
    intercept() {
      return TweetDetailInterceptor;
    }
    render() {
      return TweetDetailPanel;
    }
  }
  const userMediaSignal = signals.signal([]);
  const UserMediaInterceptor = (req, res) => {
    if (!/\/graphql\/.+\/UserMedia/.test(req.url)) {
      return;
    }
    try {
      const json = JSON.parse(res.responseText);
      const instructions = json.data.user.result.timeline_v2.timeline.instructions;
      const newData = [];
      const timelineAddEntriesInstruction = instructions.find((i) => i.type === "TimelineAddEntries");
      for (const entry of timelineAddEntriesInstruction.entries) {
        if (isTimelineEntryProfileGrid(entry)) {
          const tweetsInSearchGrid = entry.content.items.map((i) => extractTimelineTweet(i.item.itemContent)).filter((t) => !!t);
          newData.push(...tweetsInSearchGrid);
        }
      }
      const timelineAddToModuleInstruction = instructions.find((i) => i.type === "TimelineAddToModule");
      if (timelineAddToModuleInstruction) {
        const tweetsInProfileGrid = timelineAddToModuleInstruction.moduleItems.map((i) => extractTimelineTweet(i.item.itemContent)).filter((t) => !!t);
        newData.push(...tweetsInProfileGrid);
      }
      userMediaSignal.value = [...userMediaSignal.value, ...newData];
      logger.info(`UserMedia: ${newData.length} items received`);
    } catch (err) {
      logger.debug(req.method, req.url, res.status, res.responseText);
      logger.errorWithBanner("UserMedia: Failed to parse API response", err);
    }
  };
  function UserMediaPanel() {
    return u(ModuleUI, {
      title: "UserMedia",
      recordsSignal: userMediaSignal,
      isTweet: true
    });
  }
  class UserMediaModule extends Extension {
    constructor() {
      super(...arguments);
      __publicField(this, "name", "UserMediaModule");
    }
    intercept() {
      return UserMediaInterceptor;
    }
    render() {
      return UserMediaPanel;
    }
  }
  const userTweetsSignal = signals.signal([]);
  const UserTweetsInterceptor = (req, res) => {
    if (!/\/graphql\/.+\/UserTweets/.test(req.url)) {
      return;
    }
    try {
      const json = JSON.parse(res.responseText);
      const instructions = json.data.user.result.timeline_v2.timeline.instructions;
      const newData = [];
      const timelinePinEntryInstruction = instructions.find((i) => i.type === "TimelinePinEntry");
      if (timelinePinEntryInstruction) {
        const tweet = extractTimelineTweet(timelinePinEntryInstruction.entry.content.itemContent);
        if (tweet) {
          newData.push(tweet);
        }
      }
      const timelineAddEntriesInstruction = instructions.find((i) => i.type === "TimelineAddEntries");
      for (const entry of timelineAddEntriesInstruction.entries) {
        if (isTimelineEntryTweet(entry)) {
          const tweet = extractTimelineTweet(entry.content.itemContent);
          if (tweet) {
            newData.push(tweet);
          }
        }
        if (isTimelineEntryProfileConversation(entry)) {
          const tweetsInConversation = entry.content.items.map((i) => extractTimelineTweet(i.item.itemContent)).filter((t) => !!t);
          newData.push(...tweetsInConversation);
        }
      }
      userTweetsSignal.value = [...userTweetsSignal.value, ...newData];
      logger.info(`UserTweets: ${newData.length} items received`);
    } catch (err) {
      logger.debug(req.method, req.url, res.status, res.responseText);
      logger.errorWithBanner("UserTweets: Failed to parse API response", err);
    }
  };
  function UserTweetsPanel() {
    return u(ModuleUI, {
      title: "UserTweets",
      recordsSignal: userTweetsSignal,
      isTweet: true
    });
  }
  class UserTweetsModule extends Extension {
    constructor() {
      super(...arguments);
      __publicField(this, "name", "UserTweetsModule");
    }
    intercept() {
      return UserTweetsInterceptor;
    }
    render() {
      return UserTweetsPanel;
    }
  }
  extensionManager.add(FollowersModule);
  extensionManager.add(FollowingModule);
  extensionManager.add(ListMembersModule);
  extensionManager.add(ListSubscribersModule);
  extensionManager.add(HomeTimelineModule);
  extensionManager.add(ListTimelineModule);
  extensionManager.add(BookmarksModule);
  extensionManager.add(LikesModule);
  extensionManager.add(UserTweetsModule);
  extensionManager.add(UserMediaModule);
  extensionManager.add(TweetDetailModule);
  extensionManager.add(SearchTimelineModule);
  extensionManager.add(RuntimeLogsModule);
  extensionManager.start();
  function mountApp() {
    const root = document.createElement("div");
    root.id = "twe-root";
    document.body.append(root);
    preact.render(u(App, {}), root);
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mountApp);
  } else {
    mountApp();
  }

})(preact, preactHooks, i18next, preactSignals, dayjs, TableCore);