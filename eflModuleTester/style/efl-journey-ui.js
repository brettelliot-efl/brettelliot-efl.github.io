!function e(t,n,i){function o(s,l){if(!n[s]){if(!t[s]){var a="function"==typeof require&&require;if(!l&&a)return a(s,!0);if(r)return r(s,!0);var c=new Error("Cannot find module '"+s+"'");throw c.code="MODULE_NOT_FOUND",c}var u=n[s]={exports:{}};t[s][0].call(u.exports,function(e){var n=t[s][1][e];return o(n?n:e)},u,u.exports,e,t,n,i)}return n[s].exports}for(var r="function"==typeof require&&require,s=0;s<i.length;s++)o(i[s]);return o}({1:[function(e,t,n){t.exports={debug:!0}},{}],2:[function(e,t,n){"use strict";function i(e){e._muiDropdown!==!0&&(e._muiDropdown=!0,s.on(e,"click",o))}function o(e){if(0===e.button){var t=this;null===t.getAttribute("disabled")&&(e.preventDefault(),e.stopPropagation(),r(t))}}function r(e){function t(){s.removeClass(o,u),s.off(r,"click",t)}function n(){var n=i.getBoundingClientRect(),l=e.getBoundingClientRect(),a=l.top-n.top+l.height;s.css(o,"top",a+"px"),s.addClass(o,u),s.on(r,"click",t)}var i=e.parentNode,o=e.nextElementSibling,r=i.ownerDocument;return o&&s.hasClass(o,d)?void(s.hasClass(o,u)?t():n()):l.raiseError("Dropdown menu element not found")}var s=e("./lib/jqLite.js"),l=e("./lib/util.js"),a="data-mui-toggle",c='[data-mui-toggle="dropdown"]',u="mui--is-open",d="mui-dropdown__menu";t.exports={initListeners:function(){for(var e=document,t=e.querySelectorAll(c),n=t.length-1;n>=0;n--)i(t[n]);l.onNodeInserted(function(e){"dropdown"===e.getAttribute(a)&&i(e)})}}},{"./lib/jqLite.js":5,"./lib/util.js":6}],3:[function(e,t,n){"use strict";function i(e){e._muiSelect!==!0&&(e._muiSelect=!0,"ontouchstart"in h.documentElement||new o(e))}function o(e){this.selectEl=e,this.wrapperEl=e.parentNode,this.useDefault=!1,s.on(e,"mousedown",l.callback(this,"mousedownHandler")),s.on(e,"focus",l.callback(this,"focusHandler")),s.on(e,"click",l.callback(this,"clickHandler")),this.wrapperEl.tabIndex=-1;var t=l.callback(this,"wrapperFocusHandler");s.on(this.wrapperEl,"focus",t)}function r(e,t){l.enableScrollLock(),this.origIndex=null,this.currentIndex=null,this.selectEl=t,this.menuEl=this._createMenuEl(e,t),this.clickCallbackFn=l.callback(this,"clickHandler"),this.keydownCallbackFn=l.callback(this,"keydownHandler"),this.destroyCallbackFn=l.callback(this,"destroy"),e.appendChild(this.menuEl),s.scrollTop(this.menuEl,this.menuEl._muiScrollTop),setTimeout(function(){"body"!==h.activeElement.nodeName.toLowerCase()&&h.activeElement.blur()},0),s.on(this.menuEl,"click",this.clickCallbackFn),s.on(h,"keydown",this.keydownCallbackFn),s.on(v,"resize",this.destroyCallbackFn);var n=this.destroyCallbackFn;setTimeout(function(){s.on(h,"click",n)},0)}var s=e("../lib/jqLite.js"),l=e("../lib/util.js"),a="mui-select",c=".mui-select > select",u="mui-select__menu",d=15,f=32,p=42,m=8,h=document,v=window;o.prototype.mousedownHandler=function(e){0===e.button&&this.useDefault!==!0&&e.preventDefault()},o.prototype.focusHandler=function(e){if(this.useDefault!==!0){var t=this.selectEl,n=this.wrapperEl,i=t.tabIndex,o=l.callback(this,"keydownHandler");s.on(h,"keydown",o),t.tabIndex=-1,s.one(n,"blur",function(){t.tabIndex=i,s.off(h,"keydown",o)}),n.focus()}},o.prototype.keydownHandler=function(e){(32===e.keyCode||38===e.keyCode||40===e.keyCode)&&(e.preventDefault(),this.selectEl.disabled!==!0&&this.renderMenu())},o.prototype.wrapperFocusHandler=function(){return this.selectEl.disabled?this.wrapperEl.blur():void 0},o.prototype.clickHandler=function(e){0===e.button&&this.renderMenu()},o.prototype.renderMenu=function(){return this.useDefault===!0?this.useDefault=!1:void new r(this.wrapperEl,this.selectEl)},r.prototype._createMenuEl=function(e,t){var n,i,o,r,l,a,c=h.createElement("div"),v=t.children,b=v.length,y=0,g=m+p-(d+f);for(c.className=u,o=0;b>o;o++)n=v[o],i=h.createElement("div"),i.textContent=n.textContent,i._muiPos=o,n.selected&&(y=o),c.appendChild(i);c.children[y].setAttribute("selected",!0),this.origIndex=y,this.currentIndex=y;var E=h.documentElement.clientHeight,C=b*p+2*m,j=C>E;if(C=Math.min(C,E),s.css(c,"height",C+"px"),g-=y*p,r=-1*e.getBoundingClientRect().top,l=E-C+r,a=Math.max(g,r),a=Math.min(a,l),s.css(c,"top",a+"px"),j){var k,w;k=m+(y+1)*p-(-1*a+d+f),w=b*p+2*m-C,c._muiHasOverflow=!0,c._muiScrollTop=Math.min(k,w)}else c._muiHasOverflow=!1,c._muiScrollTop=0;return c},r.prototype.keydownHandler=function(e){var t=e.keyCode;return 9===t?this.destroy():((27===t||40===t||38===t||13===t)&&e.preventDefault(),void(27===t?this.destroy():40===t?this.increment():38===t?this.decrement():13===t&&(this.selectCurrent(),this.destroy())))},r.prototype.clickHandler=function(e){e.stopPropagation();var t=e.target._muiPos;void 0!==t&&(this.currentIndex=t,this.selectCurrent(),this.destroy())},r.prototype.increment=function(){this.currentIndex!==this.menuEl.children.length-1&&(this.menuEl.children[this.currentIndex].removeAttribute("selected"),this.currentIndex+=1,this.menuEl.children[this.currentIndex].setAttribute("selected",!0))},r.prototype.decrement=function(){0!==this.currentIndex&&(this.menuEl.children[this.currentIndex].removeAttribute("selected"),this.currentIndex-=1,this.menuEl.children[this.currentIndex].setAttribute("selected",!0))},r.prototype.selectCurrent=function(){this.currentIndex!==this.origIndex&&(this.selectEl.children[this.origIndex].selected=!1,this.selectEl.children[this.currentIndex].selected=!0,l.dispatchEvent(this.selectEl,"change"))},r.prototype.destroy=function(){this.menuEl.parentNode.removeChild(this.menuEl),this.selectEl.focus(),l.disableScrollLock(),s.off(this.menuEl,"click",this.clickCallbackFn),s.off(h,"keydown",this.keydownCallbackFn),s.off(h,"click",this.destroyCallbackFn),s.off(v,"resize",this.destroyCallbackFn)},t.exports={initListeners:function(){for(var e=h.querySelectorAll(c),t=e.length-1;t>=0;t--)i(e[t]);l.onNodeInserted(function(e){"SELECT"===e.tagName&&s.hasClass(e.parentNode,a)&&i(e)})}}},{"../lib/jqLite.js":5,"../lib/util.js":6}],4:[function(e,t,n){"use strict";function i(e){e._muiTextfield!==!0&&(e._muiTextfield=!0,e.value.length?r.addClass(e,c):r.addClass(e,a),r.on(e,"input",o),r.on(e,"focus",function(){r.addClass(this,u)}))}function o(){var e=this;e.value.length?(r.removeClass(e,a),r.addClass(e,c)):(r.removeClass(e,c),r.addClass(e,a)),r.addClass(e,u)}var r=e("../lib/jqLite.js"),s=e("../lib/util.js"),l=".mui-textfield > input, .mui-textfield > textarea",a="mui--is-empty",c="mui--is-not-empty",u="mui--is-dirty",d="mui-textfield--float-label";t.exports={initialize:i,initListeners:function(){for(var e=document,t=e.querySelectorAll(l),n=t.length-1;n>=0;n--)i(t[n]);s.onNodeInserted(function(e){("INPUT"===e.tagName||"TEXTAREA"===e.tagName)&&i(e)}),setTimeout(function(){var e=".mui-textfield.mui-textfield--float-label > label {"+["-webkit-transition","-moz-transition","-o-transition","transition",""].join(":all .15s ease-out;")+"}";s.loadStyle(e)},150),s.supportsPointerEvents()===!1&&r.on(document,"click",function(e){var t=e.target;if("LABEL"===t.tagName&&r.hasClass(t.parentNode,d)){var n=t.previousElementSibling;n&&n.focus()}})}}},{"../lib/jqLite.js":5,"../lib/util.js":6}],5:[function(e,t,n){"use strict";function i(e,t){if(t&&e.setAttribute){for(var n,i=h(e),o=t.split(" "),r=0;r<o.length;r++)n=o[r].trim(),-1===i.indexOf(" "+n+" ")&&(i+=n+" ");e.setAttribute("class",i.trim())}}function o(e,t,n){if(void 0===t)return getComputedStyle(e);var i=s(t);{if("object"!==i){"string"===i&&void 0!==n&&(e.style[v(t)]=n);var o=getComputedStyle(e),r="array"===s(t);if(!r)return b(e,t,o);for(var l,a={},c=0;c<t.length;c++)l=t[c],a[l]=b(e,l,o);return a}for(var l in t)e.style[v(l)]=t[l]}}function r(e,t){return t&&e.getAttribute?h(e).indexOf(" "+t+" ")>-1:!1}function s(e){if(void 0===e)return"undefined";var t=Object.prototype.toString.call(e);if(0===t.indexOf("[object "))return t.slice(8,-1).toLowerCase();throw new Error("MUI: Could not understand type: "+t)}function l(e,t,n,i){i=void 0===i?!1:i,e.addEventListener(t,n,i);var o=e._muiEventCache=e._muiEventCache||{};o[t]=o[t]||[],o[t].push([n,i])}function a(e,t,n,i){i=void 0===i?!1:i;var o,r,s=e._muiEventCache=e._muiEventCache||{},l=s[t]||[];for(r=l.length;r--;)o=l[r],(void 0===n||o[0]===n&&o[1]===i)&&(l.splice(r,1),e.removeEventListener(t,o[0],o[1]))}function c(e,t,n,i){l(e,t,function o(i){n&&n.apply(this,arguments),a(e,t,o)},i)}function u(e,t){if(void 0===t){if(e===C){var n=C.pageXOffset||E.scrollLeft;return n-(E.clientLeft||0)}return e.scrollLeft}e===C?C.scrollTo(t,d(C)):e.scrollLeft=t}function d(e,t){return void 0===t?e===C?(C.pageYOffset||E.scrollTop)-(E.clientTop||0):e.scrollTop:void(e===C?C.scrollTo(u(C),t):e.scrollTop=t)}function f(e){var t=e.getBoundingClientRect(),n=d(C),i=u(C);return{top:t.top+n,left:t.left+i,height:t.height,width:t.width}}function p(e){var t=!1,n=!0,i=document,o=i.defaultView,r=i.documentElement,s=i.addEventListener?"addEventListener":"attachEvent",l=i.addEventListener?"removeEventListener":"detachEvent",a=i.addEventListener?"":"on",c=function(n){("readystatechange"!=n.type||"complete"==i.readyState)&&(("load"==n.type?o:i)[l](a+n.type,c,!1),!t&&(t=!0)&&e.call(o,n.type||n))},u=function(){try{r.doScroll("left")}catch(e){return void setTimeout(u,50)}c("poll")};if("complete"==i.readyState)e.call(o,"lazy");else{if(i.createEventObject&&r.doScroll){try{n=!o.frameElement}catch(d){}n&&u()}i[s](a+"DOMContentLoaded",c,!1),i[s](a+"readystatechange",c,!1),o[s](a+"load",c,!1)}}function m(e,t){if(t&&e.setAttribute){for(var n,i=h(e),o=t.split(" "),r=0;r<o.length;r++)for(n=o[r].trim();i.indexOf(" "+n+" ")>=0;)i=i.replace(" "+n+" "," ");e.setAttribute("class",i.trim())}}function h(e){var t=(e.getAttribute("class")||"").replace(/[\n\t]/g,"");return" "+t+" "}function v(e){return e.replace(j,function(e,t,n,i){return i?n.toUpperCase():n}).replace(k,"Moz$1")}function b(e,t,n){var i;return i=n.getPropertyValue(t),""!==i||e.ownerDocument||(i=e.style[v(t)]),i}var y,g=document,E=g.documentElement,C=window,j=/([\:\-\_]+(.))/g,k=/^moz([A-Z])/;y={multiple:!0,selected:!0,checked:!0,disabled:!0,readonly:!0,required:!0,open:!0},t.exports={addClass:i,css:o,hasClass:r,off:a,offset:f,on:l,one:c,ready:p,removeClass:m,type:s,scrollLeft:u,scrollTop:d}},{}],6:[function(e,t,n){"use strict";function i(){if(b.debug&&"undefined"!=typeof g.console)try{g.console.log.apply(g.console,arguments)}catch(e){var t=Array.prototype.slice.call(arguments);g.console.log(t.join("\n"))}}function o(e){var t=E.createElement("style");return t.type="text/css",t.styleSheet?t.styleSheet.cssText=e:t.appendChild(E.createTextNode(e)),h.insertBefore(t,h.firstChild),t}function r(e){throw new Error("MUI: "+e)}function s(e){C.push(e),void 0===C._initialized&&(y.on(E,"animationstart",l),y.on(E,"mozAnimationStart",l),y.on(E,"webkitAnimationStart",l),C._initialized=!0)}function l(e){if("mui-node-inserted"===e.animationName)for(var t=e.target,n=C.length-1;n>=0;n--)C[n](t)}function a(e){var t="";for(var n in e)t+=e[n]?n+" ":"";return t.trim()}function c(){if(void 0!==v)return v;var e=document.createElement("x");return e.style.cssText="pointer-events:auto",v="auto"===e.style.pointerEvents}function u(e,t){return function(){e[t].apply(e,arguments)}}function d(e,t,n,i,o){var r,s=document.createEvent("HTMLEvents"),n=void 0!==n?n:!0,i=void 0!==i?i:!0;if(s.initEvent(t,n,i),o)for(r in o)s[r]=o[r];return e&&e.dispatchEvent(s),s}function f(){j+=1,1===j&&(m={left:y.scrollLeft(g),top:y.scrollTop(g)},y.addClass(E.body,k),g.scrollTo(m.left,m.top))}function p(){0!==j&&(j-=1,0===j&&(y.removeClass(E.body,k),g.scrollTo(m.left,m.top)))}var m,h,v,b=e("../config.js"),y=e("./jqLite.js"),g=window,E=document,C=[],j=0,k="mui-body--scroll-lock";h=E.head||E.getElementsByTagName("head")[0]||E.documentElement,t.exports={callback:u,classNames:a,disableScrollLock:p,dispatchEvent:d,enableScrollLock:f,log:i,loadStyle:o,onNodeInserted:s,raiseError:r,supportsPointerEvents:c}},{"../config.js":1,"./jqLite.js":5}],7:[function(e,t,n){!function(t){"use strict";if(!t._muiLoadedJS){t._muiLoadedJS=!0;var n=e("./lib/jqLite.js"),i=(e("./lib/util.js"),e("./forms/textfield.js")),o=e("./forms/select.js"),r=e("./ripple.js"),s=e("./dropdowns.js"),l=e("./tabs.js"),a=e("./overlay.js");t.mui={overlay:a,tabs:l.api},n.ready(function(){i.initListeners(),o.initListeners(),r.initListeners(),s.initListeners(),l.initListeners()})}}(window)},{"./dropdowns.js":2,"./forms/select.js":3,"./forms/textfield.js":4,"./lib/jqLite.js":5,"./lib/util.js":6,"./overlay.js":8,"./ripple.js":9,"./tabs.js":10}],8:[function(e,t,n){"use strict";function i(e){var t;if("on"===e){for(var n,i,s,l=arguments.length-1;l>0;l--)n=arguments[l],"object"===p.type(n)&&(i=n),n instanceof Element&&1===n.nodeType&&(s=n);i=i||{},void 0===i.keyboard&&(i.keyboard=!0),void 0===i["static"]&&(i["static"]=!1),t=o(i,s)}else"off"===e?t=r():f.raiseError("Expecting 'on' or 'off'");return t}function o(e,t){var n=document.body,i=document.getElementById(m);if(f.enableScrollLock(),i){for(;i.firstChild;)i.removeChild(i.firstChild);t&&i.appendChild(t)}else i=document.createElement("div"),i.setAttribute("id",m),t&&i.appendChild(t),n.appendChild(i);return h.test(navigator.userAgent)&&p.css(i,"cursor","pointer"),e.keyboard?s():l(),e["static"]?u(i):c(i),i.muiOptions=e,i}function r(){var e,t=document.getElementById(m);if(t){for(;t.firstChild;)t.removeChild(t.firstChild);t.parentNode.removeChild(t),e=t.muiOptions.onclose}return f.disableScrollLock(),l(),u(t),e&&e(),t}function s(){p.on(document,"keyup",a)}function l(){p.off(document,"keyup",a)}function a(e){27===e.keyCode&&r()}function c(e){p.on(e,"click",d)}function u(e){p.off(e,"click",d)}function d(e){e.target.id===m&&r()}var f=e("./lib/util.js"),p=e("./lib/jqLite.js"),m="mui-overlay",h=/(iPad|iPhone|iPod)/g;t.exports=i},{"./lib/jqLite.js":5,"./lib/util.js":6}],9:[function(e,t,n){"use strict";function i(e){e._muiRipple!==!0&&(e._muiRipple=!0,"INPUT"!==e.tagName&&(r.on(e,"touchstart",o),r.on(e,"mousedown",o)))}function o(e){if(0===e.button){var t=this;if(t.disabled!==!0&&t.touchFlag!==!0){t.touchFlag=!0,setTimeout(function(){t.touchFlag=!1},100);var n=document.createElement("div");n.className=c;var i,o,s=r.offset(t),l=e.pageX-s.left,u=e.pageY-s.top;i=r.hasClass(t,a)?s.height/2:s.height,o=i/2,r.css(n,{height:i+"px",width:i+"px",top:u-o+"px",left:l-o+"px"}),t.appendChild(n),window.setTimeout(function(){t.removeChild(n)},2e3)}}}var r=e("./lib/jqLite.js"),s=e("./lib/util.js"),l="mui-btn",a="mui-btn--fab",c="mui-ripple-effect";t.exports={initListeners:function(){for(var e=document,t=e.getElementsByClassName(l),n=t.length-1;n>=0;n--)i(t[n]);s.onNodeInserted(function(e){r.hasClass(e,l)&&i(e)})}}},{"./lib/jqLite.js":5,"./lib/util.js":6}],10:[function(e,t,n){"use strict";function i(e){e._muiTabs!==!0&&(e._muiTabs=!0,l.on(e,"click",o))}function o(e){if(0===e.button){var t=this;null===t.getAttribute("disabled")&&r(t)}}function r(e){var t,n,i,o,r,c,u,b,y,g=e.parentNode,E=e.getAttribute(d),C=document.getElementById(E);l.hasClass(g,f)||(C||a.raiseError('Tab pane "'+E+'" not found'),n=s(C),i=n.id,y="["+d+'="'+i+'"]',o=document.querySelectorAll(y)[0],t=o.parentNode,r={paneId:E,relatedPaneId:i},c={paneId:i,relatedPaneId:E},u=a.dispatchEvent(o,h,!0,!0,c),b=a.dispatchEvent(e,p,!0,!0,r),setTimeout(function(){u.defaultPrevented||b.defaultPrevented||(t&&l.removeClass(t,f),n&&l.removeClass(n,f),l.addClass(g,f),l.addClass(C,f),a.dispatchEvent(o,v,!0,!1,c),a.dispatchEvent(e,m,!0,!1,r))},0))}function s(e){for(var t,n=e.parentNode.children,i=n.length,o=null;i--&&!o;)t=n[i],t!==e&&l.hasClass(t,f)&&(o=t);return o}var l=e("./lib/jqLite.js"),a=e("./lib/util.js"),c="data-mui-toggle",u="["+c+'="tab"]',d="data-mui-controls",f="mui--is-active",p="mui.tabs.showstart",m="mui.tabs.showend",h="mui.tabs.hidestart",v="mui.tabs.hideend";t.exports={initListeners:function(){for(var e=document.querySelectorAll(u),t=e.length-1;t>=0;t--)i(e[t]);a.onNodeInserted(function(e){"tab"===e.getAttribute(c)&&i(e)})},api:{activate:function(e){var t="["+d+"="+e+"]",n=document.querySelectorAll(t);n.length||a.raiseError('Tab control for pane "'+e+'" not found'),r(n[0])}}}},{"./lib/jqLite.js":5,"./lib/util.js":6}],11:[function(e,t,n){!function(t){"use strict";t._eflComponentsLoadedJS||(t._eflComponentsLoadedJS=!0,e("../../bower_components/mui/src/js/mui.js"))}(window)},{"../../bower_components/mui/src/js/mui.js":7}]},{},[11]);
//# sourceMappingURL=efl-journey-ui.js.map
