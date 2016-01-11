/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Object$create = __webpack_require__(1)['default'];

	var _Promise = __webpack_require__(4)['default'];

	var _Array$from = __webpack_require__(64)['default'];

	var _Set = __webpack_require__(68)['default'];

	var _getIterator = __webpack_require__(79)['default'];

	var _Symbol$iterator = __webpack_require__(82)['default'];

	var _WeakMap = __webpack_require__(84)['default'];

	var _String$fromCodePoint = __webpack_require__(94)['default'];

	var _WeakSet = __webpack_require__(98)['default'];

	var _Map = __webpack_require__(101)['default'];

	var _Object$keys = __webpack_require__(105)['default'];

	var _Object$defineProperties = __webpack_require__(108)['default'];

	function _inherits(subClass, superClass) {
	  if (typeof superClass !== 'function' && superClass !== null) {
	    throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
	  }subClass.prototype = _Object$create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) subClass.__proto__ = superClass;
	}

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError('Cannot call a class as a function');
	  }
	}

	(function () {
	  'use strict';

	  function L10nError(message, id, lang) {
	    this.name = 'L10nError';
	    this.message = message;
	    this.id = id;
	    this.lang = lang;
	  }
	  L10nError.prototype = _Object$create(Error.prototype);
	  L10nError.prototype.constructor = L10nError;

	  function load(type, url) {
	    return new _Promise(function (resolve, reject) {
	      var xhr = new XMLHttpRequest();

	      if (xhr.overrideMimeType) {
	        xhr.overrideMimeType(type);
	      }

	      xhr.open('GET', url, true);

	      if (type === 'application/json') {
	        xhr.responseType = 'json';
	      }

	      xhr.addEventListener('load', function io_onload(e) {
	        if (e.target.status === 200 || e.target.status === 0) {
	          resolve(e.target.response || e.target.responseText);
	        } else {
	          reject(new L10nError('Not found: ' + url));
	        }
	      });
	      xhr.addEventListener('error', reject);
	      xhr.addEventListener('timeout', reject);

	      try {
	        xhr.send(null);
	      } catch (e) {
	        if (e.name === 'NS_ERROR_FILE_NOT_FOUND') {
	          reject(new L10nError('Not found: ' + url));
	        } else {
	          throw e;
	        }
	      }
	    });
	  }

	  var io = {
	    extra: function extra(code, ver, path, type) {
	      return navigator.mozApps.getLocalizationResource(code, ver, path, type);
	    },
	    app: function app(code, ver, path, type) {
	      switch (type) {
	        case 'text':
	          return load('text/plain', path);
	        case 'json':
	          return load('application/json', path);
	        default:
	          throw new L10nError('Unknown file type: ' + type);
	      }
	    }
	  };

	  function fetchResource(ver, res, lang) {
	    var url = res.replace('{locale}', lang.code);
	    var type = res.endsWith('.json') ? 'json' : 'text';
	    return io[lang.src](lang.code, ver, url, type);
	  }

	  function emit(listeners) {
	    var _this = this;

	    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      args[_key - 1] = arguments[_key];
	    }

	    var type = args.shift();

	    if (listeners['*']) {
	      listeners['*'].slice().forEach(function (listener) {
	        return listener.apply(_this, args);
	      });
	    }

	    if (listeners[type]) {
	      listeners[type].slice().forEach(function (listener) {
	        return listener.apply(_this, args);
	      });
	    }
	  }

	  function addEventListener(listeners, type, listener) {
	    if (!(type in listeners)) {
	      listeners[type] = [];
	    }
	    listeners[type].push(listener);
	  }

	  function removeEventListener(listeners, type, listener) {
	    var typeListeners = listeners[type];
	    var pos = typeListeners.indexOf(listener);
	    if (pos === -1) {
	      return;
	    }

	    typeListeners.splice(pos, 1);
	  }

	  var Client = (function () {
	    function Client(remote) {
	      _classCallCheck(this, Client);

	      this.id = this;
	      this.remote = remote;

	      var listeners = {};
	      this.on = function () {
	        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	          args[_key2] = arguments[_key2];
	        }

	        return addEventListener.apply(undefined, [listeners].concat(args));
	      };
	      this.emit = function () {
	        for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
	          args[_key3] = arguments[_key3];
	        }

	        return emit.apply(undefined, [listeners].concat(args));
	      };
	    }

	    Client.prototype.method = function method(name) {
	      var _remote;

	      for (var _len4 = arguments.length, args = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
	        args[_key4 - 1] = arguments[_key4];
	      }

	      return (_remote = this.remote)[name].apply(_remote, args);
	    };

	    return Client;
	  })();

	  function broadcast(type, data) {
	    _Array$from(this.ctxs.keys()).forEach(function (client) {
	      return client.emit(type, data);
	    });
	  }

	  var reOverlay = /<|&#?\w+;/;

	  var allowed = {
	    elements: ['a', 'em', 'strong', 'small', 's', 'cite', 'q', 'dfn', 'abbr', 'data', 'time', 'code', 'var', 'samp', 'kbd', 'sub', 'sup', 'i', 'b', 'u', 'mark', 'ruby', 'rt', 'rp', 'bdi', 'bdo', 'span', 'br', 'wbr'],
	    attributes: {
	      global: ['title', 'aria-label', 'aria-valuetext', 'aria-moz-hint'],
	      a: ['download'],
	      area: ['download', 'alt'],

	      input: ['alt', 'placeholder'],
	      menuitem: ['label'],
	      menu: ['label'],
	      optgroup: ['label'],
	      option: ['label'],
	      track: ['label'],
	      img: ['alt'],
	      textarea: ['placeholder'],
	      th: ['abbr']
	    }
	  };

	  function overlayElement(element, translation) {
	    var value = translation.value;

	    if (typeof value === 'string') {
	      if (!reOverlay.test(value)) {
	        element.textContent = value;
	      } else {
	        var tmpl = element.ownerDocument.createElement('template');
	        tmpl.innerHTML = value;

	        overlay(element, tmpl.content);
	      }
	    }

	    for (var key in translation.attrs) {
	      var attrName = camelCaseToDashed(key);
	      if (isAttrAllowed({ name: attrName }, element)) {
	        element.setAttribute(attrName, translation.attrs[key]);
	      }
	    }
	  }

	  function overlay(sourceElement, translationElement) {
	    var result = translationElement.ownerDocument.createDocumentFragment();
	    var k = undefined,
	        attr = undefined;

	    var childElement = undefined;
	    while (childElement = translationElement.childNodes[0]) {
	      translationElement.removeChild(childElement);

	      if (childElement.nodeType === childElement.TEXT_NODE) {
	        result.appendChild(childElement);
	        continue;
	      }

	      var index = getIndexOfType(childElement);
	      var sourceChild = getNthElementOfType(sourceElement, childElement, index);
	      if (sourceChild) {
	        overlay(sourceChild, childElement);
	        result.appendChild(sourceChild);
	        continue;
	      }

	      if (isElementAllowed(childElement)) {
	        var sanitizedChild = childElement.ownerDocument.createElement(childElement.nodeName);
	        overlay(sanitizedChild, childElement);
	        result.appendChild(sanitizedChild);
	        continue;
	      }

	      result.appendChild(translationElement.ownerDocument.createTextNode(childElement.textContent));
	    }

	    sourceElement.textContent = '';
	    sourceElement.appendChild(result);

	    if (translationElement.attributes) {
	      for (k = 0, attr; attr = translationElement.attributes[k]; k++) {
	        if (isAttrAllowed(attr, sourceElement)) {
	          sourceElement.setAttribute(attr.name, attr.value);
	        }
	      }
	    }
	  }

	  function isElementAllowed(element) {
	    return allowed.elements.indexOf(element.tagName.toLowerCase()) !== -1;
	  }

	  function isAttrAllowed(attr, element) {
	    var attrName = attr.name.toLowerCase();
	    var tagName = element.tagName.toLowerCase();

	    if (allowed.attributes.global.indexOf(attrName) !== -1) {
	      return true;
	    }

	    if (!allowed.attributes[tagName]) {
	      return false;
	    }

	    if (allowed.attributes[tagName].indexOf(attrName) !== -1) {
	      return true;
	    }

	    if (tagName === 'input' && attrName === 'value') {
	      var type = element.type.toLowerCase();
	      if (type === 'submit' || type === 'button' || type === 'reset') {
	        return true;
	      }
	    }
	    return false;
	  }

	  function getNthElementOfType(context, element, index) {
	    var nthOfType = 0;
	    for (var i = 0, child = undefined; child = context.children[i]; i++) {
	      if (child.nodeType === child.ELEMENT_NODE && child.tagName === element.tagName) {
	        if (nthOfType === index) {
	          return child;
	        }
	        nthOfType++;
	      }
	    }
	    return null;
	  }

	  function getIndexOfType(element) {
	    var index = 0;
	    var child = undefined;
	    while (child = element.previousElementSibling) {
	      if (child.tagName === element.tagName) {
	        index++;
	      }
	    }
	    return index;
	  }

	  function camelCaseToDashed(string) {
	    if (string === 'ariaValueText') {
	      return 'aria-valuetext';
	    }

	    return string.replace(/[A-Z]/g, function (match) {
	      return '-' + match.toLowerCase();
	    }).replace(/^-/, '');
	  }

	  var reHtml = /[&<>]/g;
	  var htmlEntities = {
	    '&': '&amp;',
	    '<': '&lt;',
	    '>': '&gt;'
	  };

	  function getResourceLinks(head) {
	    return Array.prototype.map.call(head.querySelectorAll('link[rel="localization"]'), function (el) {
	      return el.getAttribute('href');
	    });
	  }

	  function setAttributes(element, id, args) {
	    element.setAttribute('data-l10n-id', id);
	    if (args) {
	      element.setAttribute('data-l10n-args', JSON.stringify(args));
	    }
	  }

	  function getAttributes(element) {
	    return {
	      id: element.getAttribute('data-l10n-id'),
	      args: JSON.parse(element.getAttribute('data-l10n-args'))
	    };
	  }

	  function getTranslatables(element) {
	    var nodes = _Array$from(element.querySelectorAll('[data-l10n-id]'));

	    if (typeof element.hasAttribute === 'function' && element.hasAttribute('data-l10n-id')) {
	      nodes.push(element);
	    }

	    return nodes;
	  }

	  function translateMutations(view, langs, mutations) {
	    var targets = new _Set();

	    for (var _iterator = mutations, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _getIterator(_iterator);;) {
	      var _ref;

	      if (_isArray) {
	        if (_i >= _iterator.length) break;
	        _ref = _iterator[_i++];
	      } else {
	        _i = _iterator.next();
	        if (_i.done) break;
	        _ref = _i.value;
	      }

	      var mutation = _ref;

	      switch (mutation.type) {
	        case 'attributes':
	          targets.add(mutation.target);
	          break;
	        case 'childList':
	          for (var _iterator2 = mutation.addedNodes, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _getIterator(_iterator2);;) {
	            var _ref2;

	            if (_isArray2) {
	              if (_i2 >= _iterator2.length) break;
	              _ref2 = _iterator2[_i2++];
	            } else {
	              _i2 = _iterator2.next();
	              if (_i2.done) break;
	              _ref2 = _i2.value;
	            }

	            var addedNode = _ref2;

	            if (addedNode.nodeType === addedNode.ELEMENT_NODE) {
	              if (addedNode.childElementCount) {
	                getTranslatables(addedNode).forEach(targets.add.bind(targets));
	              } else {
	                if (addedNode.hasAttribute('data-l10n-id')) {
	                  targets.add(addedNode);
	                }
	              }
	            }
	          }
	          break;
	      }
	    }

	    if (targets.size === 0) {
	      return;
	    }

	    translateElements(view, langs, _Array$from(targets));
	  }

	  function _translateFragment(view, langs, frag) {
	    return translateElements(view, langs, getTranslatables(frag));
	  }

	  function getElementsTranslation(view, langs, elems) {
	    var keys = elems.map(function (elem) {
	      var id = elem.getAttribute('data-l10n-id');
	      var args = elem.getAttribute('data-l10n-args');
	      return args ? [id, JSON.parse(args.replace(reHtml, function (match) {
	        return htmlEntities[match];
	      }))] : id;
	    });

	    return view._resolveEntities(langs, keys);
	  }

	  function translateElements(view, langs, elements) {
	    return getElementsTranslation(view, langs, elements).then(function (translations) {
	      return applyTranslations(view, elements, translations);
	    });
	  }

	  function applyTranslations(view, elems, translations) {
	    view._disconnect();
	    for (var i = 0; i < elems.length; i++) {
	      overlayElement(elems[i], translations[i]);
	    }
	    view._observe();
	  }

	  if (typeof NodeList === 'function' && !NodeList.prototype[_Symbol$iterator]) {
	    NodeList.prototype[_Symbol$iterator] = Array.prototype[_Symbol$iterator];
	  }

	  function documentReady() {
	    if (document.readyState !== 'loading') {
	      return _Promise.resolve();
	    }

	    return new _Promise(function (resolve) {
	      document.addEventListener('readystatechange', function onrsc() {
	        document.removeEventListener('readystatechange', onrsc);
	        resolve();
	      });
	    });
	  }

	  function getDirection(code) {
	    var tag = code.split('-')[0];
	    return ['ar', 'he', 'fa', 'ps', 'ur'].indexOf(tag) >= 0 ? 'rtl' : 'ltr';
	  }

	  var observerConfig = {
	    attributes: true,
	    characterData: false,
	    childList: true,
	    subtree: true,
	    attributeFilter: ['data-l10n-id', 'data-l10n-args']
	  };

	  var readiness = new _WeakMap();

	  var View = (function () {
	    function View(client, doc) {
	      var _this2 = this;

	      _classCallCheck(this, View);

	      this._doc = doc;
	      this.pseudo = {
	        'fr-x-psaccent': createPseudo(this, 'fr-x-psaccent'),
	        'ar-x-psbidi': createPseudo(this, 'ar-x-psbidi')
	      };

	      this._interactive = documentReady().then(function () {
	        return init(_this2, client);
	      });

	      var observer = new MutationObserver(onMutations.bind(this));
	      this._observe = function () {
	        return observer.observe(doc, observerConfig);
	      };
	      this._disconnect = function () {
	        return observer.disconnect();
	      };

	      var translateView = function translateView(langs) {
	        return translateDocument(_this2, langs);
	      };
	      client.on('translateDocument', translateView);
	      this.ready = this._interactive.then(function (client) {
	        return client.method('resolvedLanguages');
	      }).then(translateView);
	    }

	    View.prototype.requestLanguages = function requestLanguages(langs, global) {
	      return this._interactive.then(function (client) {
	        return client.method('requestLanguages', langs, global);
	      });
	    };

	    View.prototype._resolveEntities = function _resolveEntities(langs, keys) {
	      return this._interactive.then(function (client) {
	        return client.method('resolveEntities', client.id, langs, keys);
	      });
	    };

	    View.prototype.formatValue = function formatValue(id, args) {
	      return this._interactive.then(function (client) {
	        return client.method('formatValues', client.id, [[id, args]]);
	      }).then(function (values) {
	        return values[0];
	      });
	    };

	    View.prototype.formatValues = function formatValues() {
	      for (var _len5 = arguments.length, keys = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
	        keys[_key5] = arguments[_key5];
	      }

	      return this._interactive.then(function (client) {
	        return client.method('formatValues', client.id, keys);
	      });
	    };

	    View.prototype.translateFragment = function translateFragment(frag) {
	      var _this3 = this;

	      return this._interactive.then(function (client) {
	        return client.method('resolvedLanguages');
	      }).then(function (langs) {
	        return _translateFragment(_this3, langs, frag);
	      });
	    };

	    return View;
	  })();

	  View.prototype.setAttributes = setAttributes;
	  View.prototype.getAttributes = getAttributes;

	  function createPseudo(view, code) {
	    return {
	      getName: function getName() {
	        return view._interactive.then(function (client) {
	          return client.method('getName', code);
	        });
	      },
	      processString: function processString(str) {
	        return view._interactive.then(function (client) {
	          return client.method('processString', code, str);
	        });
	      }
	    };
	  }

	  function init(view, client) {
	    view._observe();
	    return client.method('registerView', client.id, getResourceLinks(view._doc.head)).then(function () {
	      return client;
	    });
	  }

	  function onMutations(mutations) {
	    var _this4 = this;

	    return this._interactive.then(function (client) {
	      return client.method('resolvedLanguages');
	    }).then(function (langs) {
	      return translateMutations(_this4, langs, mutations);
	    });
	  }

	  function translateDocument(view, langs) {
	    var html = view._doc.documentElement;

	    if (readiness.has(html)) {
	      return _translateFragment(view, langs, html).then(function () {
	        return setAllAndEmit(html, langs);
	      });
	    }

	    var translated = langs[0].code === html.getAttribute('lang') ? _Promise.resolve() : _translateFragment(view, langs, html).then(function () {
	      return setLangDir(html, langs);
	    });

	    return translated.then(function () {
	      setLangs(html, langs);
	      readiness.set(html, true);
	    });
	  }

	  function setLangs(html, langs) {
	    var codes = langs.map(function (lang) {
	      return lang.code;
	    });
	    html.setAttribute('langs', codes.join(' '));
	  }

	  function setLangDir(html, langs) {
	    var code = langs[0].code;
	    html.setAttribute('lang', code);
	    html.setAttribute('dir', getDirection(code));
	  }

	  function setAllAndEmit(html, langs) {
	    setLangDir(html, langs);
	    setLangs(html, langs);
	    html.parentNode.dispatchEvent(new CustomEvent('DOMRetranslated', {
	      bubbles: false,
	      cancelable: false
	    }));
	  }

	  var MAX_PLACEABLES$1 = 100;

	  var L20nParser = {
	    parse: function parse(emit, string) {
	      this._source = string;
	      this._index = 0;
	      this._length = string.length;
	      this.entries = _Object$create(null);
	      this.emit = emit;

	      return this.getResource();
	    },

	    getResource: function getResource() {
	      this.getWS();
	      while (this._index < this._length) {
	        try {
	          this.getEntry();
	        } catch (e) {
	          if (e instanceof L10nError) {
	            this.getJunkEntry();
	            if (!this.emit) {
	              throw e;
	            }
	          } else {
	            throw e;
	          }
	        }

	        if (this._index < this._length) {
	          this.getWS();
	        }
	      }

	      return this.entries;
	    },

	    getEntry: function getEntry() {
	      if (this._source[this._index] === '<') {
	        ++this._index;
	        var id = this.getIdentifier();
	        if (this._source[this._index] === '[') {
	          ++this._index;
	          return this.getEntity(id, this.getItemList(this.getExpression, ']'));
	        }
	        return this.getEntity(id);
	      }

	      if (this._source.startsWith('/*', this._index)) {
	        return this.getComment();
	      }

	      throw this.error('Invalid entry');
	    },

	    getEntity: function getEntity(id, index) {
	      if (!this.getRequiredWS()) {
	        throw this.error('Expected white space');
	      }

	      var ch = this._source[this._index];
	      var value = this.getValue(ch, index === undefined);
	      var attrs = undefined;

	      if (value === undefined) {
	        if (ch === '>') {
	          throw this.error('Expected ">"');
	        }
	        attrs = this.getAttributes();
	      } else {
	        var ws1 = this.getRequiredWS();
	        if (this._source[this._index] !== '>') {
	          if (!ws1) {
	            throw this.error('Expected ">"');
	          }
	          attrs = this.getAttributes();
	        }
	      }

	      ++this._index;

	      if (id in this.entries) {
	        throw this.error('Duplicate entry ID "' + id, 'duplicateerror');
	      }
	      if (!attrs && !index && typeof value === 'string') {
	        this.entries[id] = value;
	      } else {
	        this.entries[id] = {
	          value: value,
	          attrs: attrs,
	          index: index
	        };
	      }
	    },

	    getValue: function getValue() {
	      var ch = arguments.length <= 0 || arguments[0] === undefined ? this._source[this._index] : arguments[0];
	      var optional = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

	      switch (ch) {
	        case '\'':
	        case '"':
	          return this.getString(ch, 1);
	        case '{':
	          return this.getHash();
	      }

	      if (!optional) {
	        throw this.error('Unknown value type');
	      }

	      return;
	    },

	    getWS: function getWS() {
	      var cc = this._source.charCodeAt(this._index);

	      while (cc === 32 || cc === 10 || cc === 9 || cc === 13) {
	        cc = this._source.charCodeAt(++this._index);
	      }
	    },

	    getRequiredWS: function getRequiredWS() {
	      var pos = this._index;
	      var cc = this._source.charCodeAt(pos);

	      while (cc === 32 || cc === 10 || cc === 9 || cc === 13) {
	        cc = this._source.charCodeAt(++this._index);
	      }
	      return this._index !== pos;
	    },

	    getIdentifier: function getIdentifier() {
	      var start = this._index;
	      var cc = this._source.charCodeAt(this._index);

	      if (cc >= 97 && cc <= 122 || cc >= 65 && cc <= 90 || cc === 95) {
	        cc = this._source.charCodeAt(++this._index);
	      } else {
	        throw this.error('Identifier has to start with [a-zA-Z_]');
	      }

	      while (cc >= 97 && cc <= 122 || cc >= 65 && cc <= 90 || cc >= 48 && cc <= 57 || cc === 95) {
	        cc = this._source.charCodeAt(++this._index);
	      }

	      return this._source.slice(start, this._index);
	    },

	    getUnicodeChar: function getUnicodeChar() {
	      for (var i = 0; i < 4; i++) {
	        var cc = this._source.charCodeAt(++this._index);
	        if (cc > 96 && cc < 103 || cc > 64 && cc < 71 || cc > 47 && cc < 58) {
	          continue;
	        }
	        throw this.error('Illegal unicode escape sequence');
	      }
	      this._index++;
	      return String.fromCharCode(parseInt(this._source.slice(this._index - 4, this._index), 16));
	    },

	    stringRe: /"|'|{{|\\/g,
	    getString: function getString(opchar, opcharLen) {
	      var body = [];
	      var placeables = 0;

	      this._index += opcharLen;
	      var start = this._index;

	      var bufStart = start;
	      var buf = '';

	      while (true) {
	        this.stringRe.lastIndex = this._index;
	        var match = this.stringRe.exec(this._source);

	        if (!match) {
	          throw this.error('Unclosed string literal');
	        }

	        if (match[0] === '"' || match[0] === '\'') {
	          if (match[0] !== opchar) {
	            this._index += opcharLen;
	            continue;
	          }
	          this._index = match.index + opcharLen;
	          break;
	        }

	        if (match[0] === '{{') {
	          if (placeables > MAX_PLACEABLES$1 - 1) {
	            throw this.error('Too many placeables, maximum allowed is ' + MAX_PLACEABLES$1);
	          }
	          placeables++;
	          if (match.index > bufStart || buf.length > 0) {
	            body.push(buf + this._source.slice(bufStart, match.index));
	            buf = '';
	          }
	          this._index = match.index + 2;
	          this.getWS();
	          body.push(this.getExpression());
	          this.getWS();
	          this._index += 2;
	          bufStart = this._index;
	          continue;
	        }

	        if (match[0] === '\\') {
	          this._index = match.index + 1;
	          var ch2 = this._source[this._index];
	          if (ch2 === 'u') {
	            buf += this._source.slice(bufStart, match.index) + this.getUnicodeChar();
	          } else if (ch2 === opchar || ch2 === '\\') {
	            buf += this._source.slice(bufStart, match.index) + ch2;
	            this._index++;
	          } else if (this._source.startsWith('{{', this._index)) {
	            buf += this._source.slice(bufStart, match.index) + '{{';
	            this._index += 2;
	          } else {
	            throw this.error('Illegal escape sequence');
	          }
	          bufStart = this._index;
	        }
	      }

	      if (body.length === 0) {
	        return buf + this._source.slice(bufStart, this._index - opcharLen);
	      }

	      if (this._index - opcharLen > bufStart || buf.length > 0) {
	        body.push(buf + this._source.slice(bufStart, this._index - opcharLen));
	      }

	      return body;
	    },

	    getAttributes: function getAttributes() {
	      var attrs = _Object$create(null);

	      while (true) {
	        this.getAttribute(attrs);
	        var ws1 = this.getRequiredWS();
	        var ch = this._source.charAt(this._index);
	        if (ch === '>') {
	          break;
	        } else if (!ws1) {
	          throw this.error('Expected ">"');
	        }
	      }
	      return attrs;
	    },

	    getAttribute: function getAttribute(attrs) {
	      var key = this.getIdentifier();
	      var index = undefined;

	      if (this._source[this._index] === '[') {
	        ++this._index;
	        this.getWS();
	        index = this.getItemList(this.getExpression, ']');
	      }
	      this.getWS();
	      if (this._source[this._index] !== ':') {
	        throw this.error('Expected ":"');
	      }
	      ++this._index;
	      this.getWS();
	      var value = this.getValue();

	      if (key in attrs) {
	        throw this.error('Duplicate attribute "' + key, 'duplicateerror');
	      }

	      if (!index && typeof value === 'string') {
	        attrs[key] = value;
	      } else {
	        attrs[key] = {
	          value: value,
	          index: index
	        };
	      }
	    },

	    getHash: function getHash() {
	      var items = _Object$create(null);

	      ++this._index;
	      this.getWS();

	      var defKey = undefined;

	      while (true) {
	        var _getHashItem = this.getHashItem();

	        var key = _getHashItem[0];
	        var value = _getHashItem[1];
	        var def = _getHashItem[2];

	        items[key] = value;

	        if (def) {
	          if (defKey) {
	            throw this.error('Default item redefinition forbidden');
	          }
	          defKey = key;
	        }
	        this.getWS();

	        var comma = this._source[this._index] === ',';
	        if (comma) {
	          ++this._index;
	          this.getWS();
	        }
	        if (this._source[this._index] === '}') {
	          ++this._index;
	          break;
	        }
	        if (!comma) {
	          throw this.error('Expected "}"');
	        }
	      }

	      if (defKey) {
	        items.__default = defKey;
	      }

	      return items;
	    },

	    getHashItem: function getHashItem() {
	      var defItem = false;
	      if (this._source[this._index] === '*') {
	        ++this._index;
	        defItem = true;
	      }

	      var key = this.getIdentifier();
	      this.getWS();
	      if (this._source[this._index] !== ':') {
	        throw this.error('Expected ":"');
	      }
	      ++this._index;
	      this.getWS();

	      return [key, this.getValue(), defItem];
	    },

	    getComment: function getComment() {
	      this._index += 2;
	      var start = this._index;
	      var end = this._source.indexOf('*/', start);

	      if (end === -1) {
	        throw this.error('Comment without a closing tag');
	      }

	      this._index = end + 2;
	    },

	    getExpression: function getExpression() {
	      var exp = this.getPrimaryExpression();

	      while (true) {
	        var ch = this._source[this._index];
	        if (ch === '.' || ch === '[') {
	          ++this._index;
	          exp = this.getPropertyExpression(exp, ch === '[');
	        } else if (ch === '(') {
	          ++this._index;
	          exp = this.getCallExpression(exp);
	        } else {
	          break;
	        }
	      }

	      return exp;
	    },

	    getPropertyExpression: function getPropertyExpression(idref, computed) {
	      var exp = undefined;

	      if (computed) {
	        this.getWS();
	        exp = this.getExpression();
	        this.getWS();
	        if (this._source[this._index] !== ']') {
	          throw this.error('Expected "]"');
	        }
	        ++this._index;
	      } else {
	        exp = this.getIdentifier();
	      }

	      return {
	        type: 'prop',
	        expr: idref,
	        prop: exp,
	        cmpt: computed
	      };
	    },

	    getCallExpression: function getCallExpression(callee) {
	      this.getWS();

	      return {
	        type: 'call',
	        expr: callee,
	        args: this.getItemList(this.getExpression, ')')
	      };
	    },

	    getPrimaryExpression: function getPrimaryExpression() {
	      var ch = this._source[this._index];

	      switch (ch) {
	        case '$':
	          ++this._index;
	          return {
	            type: 'var',
	            name: this.getIdentifier()
	          };
	        case '@':
	          ++this._index;
	          return {
	            type: 'glob',
	            name: this.getIdentifier()
	          };
	        default:
	          return {
	            type: 'id',
	            name: this.getIdentifier()
	          };
	      }
	    },

	    getItemList: function getItemList(callback, closeChar) {
	      var items = [];
	      var closed = false;

	      this.getWS();

	      if (this._source[this._index] === closeChar) {
	        ++this._index;
	        closed = true;
	      }

	      while (!closed) {
	        items.push(callback.call(this));
	        this.getWS();
	        var ch = this._source.charAt(this._index);
	        switch (ch) {
	          case ',':
	            ++this._index;
	            this.getWS();
	            break;
	          case closeChar:
	            ++this._index;
	            closed = true;
	            break;
	          default:
	            throw this.error('Expected "," or "' + closeChar + '"');
	        }
	      }

	      return items;
	    },

	    getJunkEntry: function getJunkEntry() {
	      var pos = this._index;
	      var nextEntity = this._source.indexOf('<', pos);
	      var nextComment = this._source.indexOf('/*', pos);

	      if (nextEntity === -1) {
	        nextEntity = this._length;
	      }
	      if (nextComment === -1) {
	        nextComment = this._length;
	      }

	      var nextEntry = Math.min(nextEntity, nextComment);

	      this._index = nextEntry;
	    },

	    error: function error(message) {
	      var type = arguments.length <= 1 || arguments[1] === undefined ? 'parsererror' : arguments[1];

	      var pos = this._index;

	      var start = this._source.lastIndexOf('<', pos - 1);
	      var lastClose = this._source.lastIndexOf('>', pos - 1);
	      start = lastClose > start ? lastClose + 1 : start;
	      var context = this._source.slice(start, pos + 10);

	      var msg = message + ' at pos ' + pos + ': `' + context + '`';
	      var err = new L10nError(msg);
	      if (this.emit) {
	        this.emit(type, err);
	      }
	      return err;
	    }
	  };

	  var MAX_PLACEABLES$2 = 100;

	  var PropertiesParser = {
	    patterns: null,
	    entryIds: null,
	    emit: null,

	    init: function init() {
	      this.patterns = {
	        comment: /^\s*#|^\s*$/,
	        entity: /^([^=\s]+)\s*=\s*(.*)$/,
	        multiline: /[^\\]\\$/,
	        index: /\{\[\s*(\w+)(?:\(([^\)]*)\))?\s*\]\}/i,
	        unicode: /\\u([0-9a-fA-F]{1,4})/g,
	        entries: /[^\r\n]+/g,
	        controlChars: /\\([\\\n\r\t\b\f\{\}\"\'])/g,
	        placeables: /\{\{\s*([^\s]*?)\s*\}\}/
	      };
	    },

	    parse: function parse(emit, source) {
	      if (!this.patterns) {
	        this.init();
	      }
	      this.emit = emit;

	      var entries = {};

	      var lines = source.match(this.patterns.entries);
	      if (!lines) {
	        return entries;
	      }
	      for (var i = 0; i < lines.length; i++) {
	        var line = lines[i];

	        if (this.patterns.comment.test(line)) {
	          continue;
	        }

	        while (this.patterns.multiline.test(line) && i < lines.length) {
	          line = line.slice(0, -1) + lines[++i].trim();
	        }

	        var entityMatch = line.match(this.patterns.entity);
	        if (entityMatch) {
	          try {
	            this.parseEntity(entityMatch[1], entityMatch[2], entries);
	          } catch (e) {
	            if (!this.emit) {
	              throw e;
	            }
	          }
	        }
	      }
	      return entries;
	    },

	    parseEntity: function parseEntity(id, value, entries) {
	      var name, key;

	      var pos = id.indexOf('[');
	      if (pos !== -1) {
	        name = id.substr(0, pos);
	        key = id.substring(pos + 1, id.length - 1);
	      } else {
	        name = id;
	        key = null;
	      }

	      var nameElements = name.split('.');

	      if (nameElements.length > 2) {
	        throw this.error('Error in ID: "' + name + '".' + ' Nested attributes are not supported.');
	      }

	      var attr;
	      if (nameElements.length > 1) {
	        name = nameElements[0];
	        attr = nameElements[1];

	        if (attr[0] === '$') {
	          throw this.error('Attribute can\'t start with "$"');
	        }
	      } else {
	        attr = null;
	      }

	      this.setEntityValue(name, attr, key, this.unescapeString(value), entries);
	    },

	    setEntityValue: function setEntityValue(id, attr, key, rawValue, entries) {
	      var value = rawValue.indexOf('{{') > -1 ? this.parseString(rawValue) : rawValue;

	      var isSimpleValue = typeof value === 'string';
	      var root = entries;

	      var isSimpleNode = typeof entries[id] === 'string';

	      if (!entries[id] && (attr || key || !isSimpleValue)) {
	        entries[id] = _Object$create(null);
	        isSimpleNode = false;
	      }

	      if (attr) {
	        if (isSimpleNode) {
	          var val = entries[id];
	          entries[id] = _Object$create(null);
	          entries[id].value = val;
	        }
	        if (!entries[id].attrs) {
	          entries[id].attrs = _Object$create(null);
	        }
	        if (!entries[id].attrs && !isSimpleValue) {
	          entries[id].attrs[attr] = _Object$create(null);
	        }
	        root = entries[id].attrs;
	        id = attr;
	      }

	      if (key) {
	        isSimpleNode = false;
	        if (typeof root[id] === 'string') {
	          var val = root[id];
	          root[id] = _Object$create(null);
	          root[id].index = this.parseIndex(val);
	          root[id].value = _Object$create(null);
	        }
	        root = root[id].value;
	        id = key;
	        isSimpleValue = true;
	      }

	      if (isSimpleValue && (!entries[id] || isSimpleNode)) {
	        if (id in root) {
	          throw this.error();
	        }
	        root[id] = value;
	      } else {
	        if (!root[id]) {
	          root[id] = _Object$create(null);
	        }
	        root[id].value = value;
	      }
	    },

	    parseString: function parseString(str) {
	      var chunks = str.split(this.patterns.placeables);
	      var complexStr = [];

	      var len = chunks.length;
	      var placeablesCount = (len - 1) / 2;

	      if (placeablesCount >= MAX_PLACEABLES$2) {
	        throw this.error('Too many placeables (' + placeablesCount + ', max allowed is ' + MAX_PLACEABLES$2 + ')');
	      }

	      for (var i = 0; i < chunks.length; i++) {
	        if (chunks[i].length === 0) {
	          continue;
	        }
	        if (i % 2 === 1) {
	          complexStr.push({ type: 'idOrVar', name: chunks[i] });
	        } else {
	          complexStr.push(chunks[i]);
	        }
	      }
	      return complexStr;
	    },

	    unescapeString: function unescapeString(str) {
	      if (str.lastIndexOf('\\') !== -1) {
	        str = str.replace(this.patterns.controlChars, '$1');
	      }
	      return str.replace(this.patterns.unicode, function (match, token) {
	        return _String$fromCodePoint(parseInt(token, 16));
	      });
	    },

	    parseIndex: function parseIndex(str) {
	      var match = str.match(this.patterns.index);
	      if (!match) {
	        throw new L10nError('Malformed index');
	      }
	      if (match[2]) {
	        return [{
	          type: 'call',
	          expr: {
	            type: 'prop',
	            expr: {
	              type: 'glob',
	              name: 'cldr'
	            },
	            prop: 'plural',
	            cmpt: false
	          }, args: [{
	            type: 'idOrVar',
	            name: match[2]
	          }]
	        }];
	      } else {
	        return [{ type: 'idOrVar', name: match[1] }];
	      }
	    },

	    error: function error(msg) {
	      var type = arguments.length <= 1 || arguments[1] === undefined ? 'parsererror' : arguments[1];

	      var err = new L10nError(msg);
	      if (this.emit) {
	        this.emit(type, err);
	      }
	      return err;
	    }
	  };

	  var KNOWN_MACROS = ['plural'];
	  var MAX_PLACEABLE_LENGTH = 2500;

	  var FSI = '⁨';
	  var PDI = '⁩';

	  var resolutionChain = new _WeakSet();

	  function format(ctx, lang, args, entity) {
	    if (typeof entity === 'string') {
	      return [{}, entity];
	    }

	    if (resolutionChain.has(entity)) {
	      throw new L10nError('Cyclic reference detected');
	    }

	    resolutionChain.add(entity);

	    var rv = undefined;

	    try {
	      rv = resolveValue({}, ctx, lang, args, entity.value, entity.index);
	    } finally {
	      resolutionChain['delete'](entity);
	    }
	    return rv;
	  }

	  function resolveIdentifier(ctx, lang, args, id) {
	    if (KNOWN_MACROS.indexOf(id) > -1) {
	      return [{}, ctx._getMacro(lang, id)];
	    }

	    if (args && args.hasOwnProperty(id)) {
	      if (typeof args[id] === 'string' || typeof args[id] === 'number' && !isNaN(args[id])) {
	        return [{}, args[id]];
	      } else {
	        throw new L10nError('Arg must be a string or a number: ' + id);
	      }
	    }

	    if (id === '__proto__') {
	      throw new L10nError('Illegal id: ' + id);
	    }

	    var entity = ctx._getEntity(lang, id);

	    if (entity) {
	      return format(ctx, lang, args, entity);
	    }

	    throw new L10nError('Unknown reference: ' + id);
	  }

	  function subPlaceable(locals, ctx, lang, args, id) {
	    var newLocals = undefined,
	        value = undefined;

	    try {
	      var _resolveIdentifier = resolveIdentifier(ctx, lang, args, id);

	      newLocals = _resolveIdentifier[0];
	      value = _resolveIdentifier[1];
	    } catch (err) {
	      return [{ error: err }, FSI + '{{ ' + id + ' }}' + PDI];
	    }

	    if (typeof value === 'number') {
	      var formatter = ctx._getNumberFormatter(lang);
	      return [newLocals, formatter.format(value)];
	    }

	    if (typeof value === 'string') {
	      if (value.length >= MAX_PLACEABLE_LENGTH) {
	        throw new L10nError('Too many characters in placeable (' + value.length + ', max allowed is ' + MAX_PLACEABLE_LENGTH + ')');
	      }
	      return [newLocals, FSI + value + PDI];
	    }

	    return [{}, FSI + '{{ ' + id + ' }}' + PDI];
	  }

	  function interpolate(locals, ctx, lang, args, arr) {
	    return arr.reduce(function (_ref4, cur) {
	      var localsSeq = _ref4[0];
	      var valueSeq = _ref4[1];

	      if (typeof cur === 'string') {
	        return [localsSeq, valueSeq + cur];
	      } else {
	        var _subPlaceable = subPlaceable(locals, ctx, lang, args, cur.name);

	        var value = _subPlaceable[1];

	        return [localsSeq, valueSeq + value];
	      }
	    }, [locals, '']);
	  }

	  function resolveSelector(ctx, lang, args, expr, index) {
	    var selectorName = undefined;
	    if (index[0].type === 'call' && index[0].expr.type === 'prop' && index[0].expr.expr.name === 'cldr') {
	      selectorName = 'plural';
	    } else {
	      selectorName = index[0].name;
	    }
	    var selector = resolveIdentifier(ctx, lang, args, selectorName)[1];

	    if (typeof selector !== 'function') {
	      return selector;
	    }

	    var argValue = index[0].args ? resolveIdentifier(ctx, lang, args, index[0].args[0].name)[1] : undefined;

	    if (selectorName === 'plural') {
	      if (argValue === 0 && 'zero' in expr) {
	        return 'zero';
	      }
	      if (argValue === 1 && 'one' in expr) {
	        return 'one';
	      }
	      if (argValue === 2 && 'two' in expr) {
	        return 'two';
	      }
	    }

	    return selector(argValue);
	  }

	  function resolveValue(_x, _x2, _x3, _x4, _x5, _x6) {
	    var _again = true;

	    _function: while (_again) {
	      var locals = _x,
	          ctx = _x2,
	          lang = _x3,
	          args = _x4,
	          expr = _x5,
	          index = _x6;
	      _again = false;

	      if (!expr) {
	        return [locals, expr];
	      }

	      if (typeof expr === 'string' || typeof expr === 'boolean' || typeof expr === 'number') {
	        return [locals, expr];
	      }

	      if (Array.isArray(expr)) {
	        return interpolate(locals, ctx, lang, args, expr);
	      }

	      if (index) {
	        var selector = resolveSelector(ctx, lang, args, expr, index);
	        if (selector in expr) {
	          _x = locals;
	          _x2 = ctx;
	          _x3 = lang;
	          _x4 = args;
	          _x5 = expr[selector];
	          _x6 = undefined;
	          _again = true;
	          selector = undefined;
	          continue _function;
	        }
	      }

	      var defaultKey = expr.__default || 'other';
	      if (defaultKey in expr) {
	        _x = locals;
	        _x2 = ctx;
	        _x3 = lang;
	        _x4 = args;
	        _x5 = expr[defaultKey];
	        _x6 = undefined;
	        _again = true;
	        selector = defaultKey = undefined;
	        continue _function;
	      }

	      throw new L10nError('Unresolvable value');
	    }
	  }

	  var locales2rules = {
	    'af': 3,
	    'ak': 4,
	    'am': 4,
	    'ar': 1,
	    'asa': 3,
	    'az': 0,
	    'be': 11,
	    'bem': 3,
	    'bez': 3,
	    'bg': 3,
	    'bh': 4,
	    'bm': 0,
	    'bn': 3,
	    'bo': 0,
	    'br': 20,
	    'brx': 3,
	    'bs': 11,
	    'ca': 3,
	    'cgg': 3,
	    'chr': 3,
	    'cs': 12,
	    'cy': 17,
	    'da': 3,
	    'de': 3,
	    'dv': 3,
	    'dz': 0,
	    'ee': 3,
	    'el': 3,
	    'en': 3,
	    'eo': 3,
	    'es': 3,
	    'et': 3,
	    'eu': 3,
	    'fa': 0,
	    'ff': 5,
	    'fi': 3,
	    'fil': 4,
	    'fo': 3,
	    'fr': 5,
	    'fur': 3,
	    'fy': 3,
	    'ga': 8,
	    'gd': 24,
	    'gl': 3,
	    'gsw': 3,
	    'gu': 3,
	    'guw': 4,
	    'gv': 23,
	    'ha': 3,
	    'haw': 3,
	    'he': 2,
	    'hi': 4,
	    'hr': 11,
	    'hu': 0,
	    'id': 0,
	    'ig': 0,
	    'ii': 0,
	    'is': 3,
	    'it': 3,
	    'iu': 7,
	    'ja': 0,
	    'jmc': 3,
	    'jv': 0,
	    'ka': 0,
	    'kab': 5,
	    'kaj': 3,
	    'kcg': 3,
	    'kde': 0,
	    'kea': 0,
	    'kk': 3,
	    'kl': 3,
	    'km': 0,
	    'kn': 0,
	    'ko': 0,
	    'ksb': 3,
	    'ksh': 21,
	    'ku': 3,
	    'kw': 7,
	    'lag': 18,
	    'lb': 3,
	    'lg': 3,
	    'ln': 4,
	    'lo': 0,
	    'lt': 10,
	    'lv': 6,
	    'mas': 3,
	    'mg': 4,
	    'mk': 16,
	    'ml': 3,
	    'mn': 3,
	    'mo': 9,
	    'mr': 3,
	    'ms': 0,
	    'mt': 15,
	    'my': 0,
	    'nah': 3,
	    'naq': 7,
	    'nb': 3,
	    'nd': 3,
	    'ne': 3,
	    'nl': 3,
	    'nn': 3,
	    'no': 3,
	    'nr': 3,
	    'nso': 4,
	    'ny': 3,
	    'nyn': 3,
	    'om': 3,
	    'or': 3,
	    'pa': 3,
	    'pap': 3,
	    'pl': 13,
	    'ps': 3,
	    'pt': 3,
	    'rm': 3,
	    'ro': 9,
	    'rof': 3,
	    'ru': 11,
	    'rwk': 3,
	    'sah': 0,
	    'saq': 3,
	    'se': 7,
	    'seh': 3,
	    'ses': 0,
	    'sg': 0,
	    'sh': 11,
	    'shi': 19,
	    'sk': 12,
	    'sl': 14,
	    'sma': 7,
	    'smi': 7,
	    'smj': 7,
	    'smn': 7,
	    'sms': 7,
	    'sn': 3,
	    'so': 3,
	    'sq': 3,
	    'sr': 11,
	    'ss': 3,
	    'ssy': 3,
	    'st': 3,
	    'sv': 3,
	    'sw': 3,
	    'syr': 3,
	    'ta': 3,
	    'te': 3,
	    'teo': 3,
	    'th': 0,
	    'ti': 4,
	    'tig': 3,
	    'tk': 3,
	    'tl': 4,
	    'tn': 3,
	    'to': 0,
	    'tr': 0,
	    'ts': 3,
	    'tzm': 22,
	    'uk': 11,
	    'ur': 3,
	    've': 3,
	    'vi': 0,
	    'vun': 3,
	    'wa': 4,
	    'wae': 3,
	    'wo': 0,
	    'xh': 3,
	    'xog': 3,
	    'yo': 0,
	    'zh': 0,
	    'zu': 3
	  };

	  function isIn(n, list) {
	    return list.indexOf(n) !== -1;
	  }
	  function isBetween(n, start, end) {
	    return typeof n === typeof start && start <= n && n <= end;
	  }

	  var pluralRules = {
	    '0': function _() {
	      return 'other';
	    },
	    '1': function _(n) {
	      if (isBetween(n % 100, 3, 10)) {
	        return 'few';
	      }
	      if (n === 0) {
	        return 'zero';
	      }
	      if (isBetween(n % 100, 11, 99)) {
	        return 'many';
	      }
	      if (n === 2) {
	        return 'two';
	      }
	      if (n === 1) {
	        return 'one';
	      }
	      return 'other';
	    },
	    '2': function _(n) {
	      if (n !== 0 && n % 10 === 0) {
	        return 'many';
	      }
	      if (n === 2) {
	        return 'two';
	      }
	      if (n === 1) {
	        return 'one';
	      }
	      return 'other';
	    },
	    '3': function _(n) {
	      if (n === 1) {
	        return 'one';
	      }
	      return 'other';
	    },
	    '4': function _(n) {
	      if (isBetween(n, 0, 1)) {
	        return 'one';
	      }
	      return 'other';
	    },
	    '5': function _(n) {
	      if (isBetween(n, 0, 2) && n !== 2) {
	        return 'one';
	      }
	      return 'other';
	    },
	    '6': function _(n) {
	      if (n === 0) {
	        return 'zero';
	      }
	      if (n % 10 === 1 && n % 100 !== 11) {
	        return 'one';
	      }
	      return 'other';
	    },
	    '7': function _(n) {
	      if (n === 2) {
	        return 'two';
	      }
	      if (n === 1) {
	        return 'one';
	      }
	      return 'other';
	    },
	    '8': function _(n) {
	      if (isBetween(n, 3, 6)) {
	        return 'few';
	      }
	      if (isBetween(n, 7, 10)) {
	        return 'many';
	      }
	      if (n === 2) {
	        return 'two';
	      }
	      if (n === 1) {
	        return 'one';
	      }
	      return 'other';
	    },
	    '9': function _(n) {
	      if (n === 0 || n !== 1 && isBetween(n % 100, 1, 19)) {
	        return 'few';
	      }
	      if (n === 1) {
	        return 'one';
	      }
	      return 'other';
	    },
	    '10': function _(n) {
	      if (isBetween(n % 10, 2, 9) && !isBetween(n % 100, 11, 19)) {
	        return 'few';
	      }
	      if (n % 10 === 1 && !isBetween(n % 100, 11, 19)) {
	        return 'one';
	      }
	      return 'other';
	    },
	    '11': function _(n) {
	      if (isBetween(n % 10, 2, 4) && !isBetween(n % 100, 12, 14)) {
	        return 'few';
	      }
	      if (n % 10 === 0 || isBetween(n % 10, 5, 9) || isBetween(n % 100, 11, 14)) {
	        return 'many';
	      }
	      if (n % 10 === 1 && n % 100 !== 11) {
	        return 'one';
	      }
	      return 'other';
	    },
	    '12': function _(n) {
	      if (isBetween(n, 2, 4)) {
	        return 'few';
	      }
	      if (n === 1) {
	        return 'one';
	      }
	      return 'other';
	    },
	    '13': function _(n) {
	      if (isBetween(n % 10, 2, 4) && !isBetween(n % 100, 12, 14)) {
	        return 'few';
	      }
	      if (n !== 1 && isBetween(n % 10, 0, 1) || isBetween(n % 10, 5, 9) || isBetween(n % 100, 12, 14)) {
	        return 'many';
	      }
	      if (n === 1) {
	        return 'one';
	      }
	      return 'other';
	    },
	    '14': function _(n) {
	      if (isBetween(n % 100, 3, 4)) {
	        return 'few';
	      }
	      if (n % 100 === 2) {
	        return 'two';
	      }
	      if (n % 100 === 1) {
	        return 'one';
	      }
	      return 'other';
	    },
	    '15': function _(n) {
	      if (n === 0 || isBetween(n % 100, 2, 10)) {
	        return 'few';
	      }
	      if (isBetween(n % 100, 11, 19)) {
	        return 'many';
	      }
	      if (n === 1) {
	        return 'one';
	      }
	      return 'other';
	    },
	    '16': function _(n) {
	      if (n % 10 === 1 && n !== 11) {
	        return 'one';
	      }
	      return 'other';
	    },
	    '17': function _(n) {
	      if (n === 3) {
	        return 'few';
	      }
	      if (n === 0) {
	        return 'zero';
	      }
	      if (n === 6) {
	        return 'many';
	      }
	      if (n === 2) {
	        return 'two';
	      }
	      if (n === 1) {
	        return 'one';
	      }
	      return 'other';
	    },
	    '18': function _(n) {
	      if (n === 0) {
	        return 'zero';
	      }
	      if (isBetween(n, 0, 2) && n !== 0 && n !== 2) {
	        return 'one';
	      }
	      return 'other';
	    },
	    '19': function _(n) {
	      if (isBetween(n, 2, 10)) {
	        return 'few';
	      }
	      if (isBetween(n, 0, 1)) {
	        return 'one';
	      }
	      return 'other';
	    },
	    '20': function _(n) {
	      if ((isBetween(n % 10, 3, 4) || n % 10 === 9) && !(isBetween(n % 100, 10, 19) || isBetween(n % 100, 70, 79) || isBetween(n % 100, 90, 99))) {
	        return 'few';
	      }
	      if (n % 1000000 === 0 && n !== 0) {
	        return 'many';
	      }
	      if (n % 10 === 2 && !isIn(n % 100, [12, 72, 92])) {
	        return 'two';
	      }
	      if (n % 10 === 1 && !isIn(n % 100, [11, 71, 91])) {
	        return 'one';
	      }
	      return 'other';
	    },
	    '21': function _(n) {
	      if (n === 0) {
	        return 'zero';
	      }
	      if (n === 1) {
	        return 'one';
	      }
	      return 'other';
	    },
	    '22': function _(n) {
	      if (isBetween(n, 0, 1) || isBetween(n, 11, 99)) {
	        return 'one';
	      }
	      return 'other';
	    },
	    '23': function _(n) {
	      if (isBetween(n % 10, 1, 2) || n % 20 === 0) {
	        return 'one';
	      }
	      return 'other';
	    },
	    '24': function _(n) {
	      if (isBetween(n, 3, 10) || isBetween(n, 13, 19)) {
	        return 'few';
	      }
	      if (isIn(n, [2, 12])) {
	        return 'two';
	      }
	      if (isIn(n, [1, 11])) {
	        return 'one';
	      }
	      return 'other';
	    }
	  };

	  function getPluralRule(code) {
	    var index = locales2rules[code.replace(/-.*$/, '')];
	    if (!(index in pluralRules)) {
	      return function () {
	        return 'other';
	      };
	    }
	    return pluralRules[index];
	  }

	  var Context = (function () {
	    function Context(env) {
	      _classCallCheck(this, Context);

	      this._env = env;
	      this._numberFormatters = null;
	    }

	    Context.prototype._formatTuple = function _formatTuple(lang, args, entity, id, key) {
	      try {
	        return format(this, lang, args, entity);
	      } catch (err) {
	        err.id = key ? id + '::' + key : id;
	        err.lang = lang;
	        this._env.emit('resolveerror', err, this);
	        return [{ error: err }, err.id];
	      }
	    };

	    Context.prototype._formatEntity = function _formatEntity(lang, args, entity, id) {
	      var _formatTuple2 = this._formatTuple(lang, args, entity, id);

	      var value = _formatTuple2[1];

	      var formatted = {
	        value: value,
	        attrs: null
	      };

	      if (entity.attrs) {
	        formatted.attrs = _Object$create(null);
	        for (var key in entity.attrs) {
	          var _formatTuple3 = this._formatTuple(lang, args, entity.attrs[key], id, key);

	          var attrValue = _formatTuple3[1];

	          formatted.attrs[key] = attrValue;
	        }
	      }

	      return formatted;
	    };

	    Context.prototype._formatValue = function _formatValue(lang, args, entity, id) {
	      return this._formatTuple(lang, args, entity, id)[1];
	    };

	    Context.prototype.fetch = function fetch(langs) {
	      if (langs.length === 0) {
	        return _Promise.resolve(langs);
	      }

	      var resIds = _Array$from(this._env._resLists.get(this));

	      return _Promise.all(resIds.map(this._env._getResource.bind(this._env, langs[0]))).then(function () {
	        return langs;
	      });
	    };

	    Context.prototype._resolve = function _resolve(langs, keys, formatter, prevResolved) {
	      var _this5 = this;

	      var lang = langs[0];

	      if (!lang) {
	        return reportMissing.call(this, keys, formatter, prevResolved);
	      }

	      var hasUnresolved = false;

	      var resolved = keys.map(function (key, i) {
	        if (prevResolved && prevResolved[i] !== undefined) {
	          return prevResolved[i];
	        }

	        var _ref5 = Array.isArray(key) ? key : [key, undefined];

	        var id = _ref5[0];
	        var args = _ref5[1];

	        var entity = _this5._getEntity(lang, id);

	        if (entity) {
	          return formatter.call(_this5, lang, args, entity, id);
	        }

	        _this5._env.emit('notfounderror', new L10nError('"' + id + '"' + ' not found in ' + lang.code, id, lang), _this5);
	        hasUnresolved = true;
	      });

	      if (!hasUnresolved) {
	        return resolved;
	      }

	      return this.fetch(langs.slice(1)).then(function (nextLangs) {
	        return _this5._resolve(nextLangs, keys, formatter, resolved);
	      });
	    };

	    Context.prototype.resolveEntities = function resolveEntities(langs, keys) {
	      var _this6 = this;

	      return this.fetch(langs).then(function (langs) {
	        return _this6._resolve(langs, keys, _this6._formatEntity);
	      });
	    };

	    Context.prototype.resolveValues = function resolveValues(langs, keys) {
	      var _this7 = this;

	      return this.fetch(langs).then(function (langs) {
	        return _this7._resolve(langs, keys, _this7._formatValue);
	      });
	    };

	    Context.prototype._getEntity = function _getEntity(lang, id) {
	      var cache = this._env._resCache;
	      var resIds = _Array$from(this._env._resLists.get(this));

	      for (var i = 0, resId = undefined; resId = resIds[i]; i++) {
	        var resource = cache.get(resId + lang.code + lang.src);
	        if (resource instanceof L10nError) {
	          continue;
	        }
	        if (id in resource) {
	          return resource[id];
	        }
	      }
	      return undefined;
	    };

	    Context.prototype._getNumberFormatter = function _getNumberFormatter(lang) {
	      if (!this._numberFormatters) {
	        this._numberFormatters = new _Map();
	      }
	      if (!this._numberFormatters.has(lang)) {
	        var formatter = Intl.NumberFormat(lang, {
	          useGrouping: false
	        });
	        this._numberFormatters.set(lang, formatter);
	        return formatter;
	      }
	      return this._numberFormatters.get(lang);
	    };

	    Context.prototype._getMacro = function _getMacro(lang, id) {
	      switch (id) {
	        case 'plural':
	          return getPluralRule(lang.code);
	        default:
	          return undefined;
	      }
	    };

	    return Context;
	  })();

	  function reportMissing(keys, formatter, resolved) {
	    var _this8 = this;

	    var missingIds = new _Set();

	    keys.forEach(function (key, i) {
	      if (resolved && resolved[i] !== undefined) {
	        return;
	      }
	      var id = Array.isArray(key) ? key[0] : key;
	      missingIds.add(id);
	      resolved[i] = formatter === _this8._formatValue ? id : { value: id, attrs: null };
	    });

	    this._env.emit('notfounderror', new L10nError('"' + _Array$from(missingIds).join(', ') + '"' + ' not found in any language', missingIds), this);

	    return resolved;
	  }

	  function walkEntry(entry, fn) {
	    if (typeof entry === 'string') {
	      return fn(entry);
	    }

	    var newEntry = _Object$create(null);

	    if (entry.value) {
	      newEntry.value = walkValue(entry.value, fn);
	    }

	    if (entry.index) {
	      newEntry.index = entry.index;
	    }

	    if (entry.attrs) {
	      newEntry.attrs = _Object$create(null);
	      for (var key in entry.attrs) {
	        newEntry.attrs[key] = walkEntry(entry.attrs[key], fn);
	      }
	    }

	    return newEntry;
	  }

	  function walkValue(value, fn) {
	    if (typeof value === 'string') {
	      return fn(value);
	    }

	    if (value.type) {
	      return value;
	    }

	    var newValue = Array.isArray(value) ? [] : _Object$create(null);
	    var keys = _Object$keys(value);

	    for (var i = 0, key = undefined; key = keys[i]; i++) {
	      newValue[key] = walkValue(value[key], fn);
	    }

	    return newValue;
	  }

	  function createGetter(id, name) {
	    var _pseudo = null;

	    return function getPseudo() {
	      if (_pseudo) {
	        return _pseudo;
	      }

	      var reAlphas = /[a-zA-Z]/g;
	      var reVowels = /[aeiouAEIOU]/g;
	      var reWords = /[^\W0-9_]+/g;

	      var reExcluded = /(%[EO]?\w|\{\s*.+?\s*\}|&[#\w]+;|<\s*.+?\s*>)/;

	      var charMaps = {
	        'fr-x-psaccent': 'ȦƁƇḒḖƑƓĦĪĴĶĿḾȠǾƤɊŘŞŦŬṼẆẊẎẐ[\\]^_`ȧƀƈḓḗƒɠħīĵķŀḿƞǿƥɋřşŧŭṽẇẋẏẑ',
	        'ar-x-psbidi': '∀ԐↃpƎɟפHIſӼ˥WNOԀÒᴚS⊥∩ɅＭXʎZ[\\]ᵥ_,ɐqɔpǝɟƃɥıɾʞʅɯuodbɹsʇnʌʍxʎz'
	      };

	      var mods = {
	        'fr-x-psaccent': function frXPsaccent(val) {
	          return val.replace(reVowels, function (match) {
	            return match + match.toLowerCase();
	          });
	        },

	        'ar-x-psbidi': function arXPsbidi(val) {
	          return val.replace(reWords, function (match) {
	            return '‮' + match + '‬';
	          });
	        }
	      };

	      var replaceChars = function replaceChars(map, val) {
	        return val.replace(reAlphas, function (match) {
	          return map.charAt(match.charCodeAt(0) - 65);
	        });
	      };

	      var transform = function transform(val) {
	        return replaceChars(charMaps[id], mods[id](val));
	      };

	      var apply = function apply(fn, val) {
	        if (!val) {
	          return val;
	        }

	        var parts = val.split(reExcluded);
	        var modified = parts.map(function (part) {
	          if (reExcluded.test(part)) {
	            return part;
	          }
	          return fn(part);
	        });
	        return modified.join('');
	      };

	      return _pseudo = {
	        name: transform(name),
	        process: function process(str) {
	          return apply(transform, str);
	        }
	      };
	    };
	  }

	  var pseudo = _Object$defineProperties(_Object$create(null), {
	    'fr-x-psaccent': {
	      enumerable: true,
	      get: createGetter('fr-x-psaccent', 'Runtime Accented')
	    },
	    'ar-x-psbidi': {
	      enumerable: true,
	      get: createGetter('ar-x-psbidi', 'Runtime Bidi')
	    }
	  });

	  var parsers = {
	    properties: PropertiesParser,
	    l20n: L20nParser
	  };

	  var Env = (function () {
	    function Env(defaultLang, fetchResource) {
	      _classCallCheck(this, Env);

	      this.defaultLang = defaultLang;
	      this.fetchResource = fetchResource;

	      this._resLists = new _Map();
	      this._resCache = new _Map();

	      var listeners = {};
	      this.emit = emit.bind(this, listeners);
	      this.addEventListener = addEventListener.bind(this, listeners);
	      this.removeEventListener = removeEventListener.bind(this, listeners);
	    }

	    Env.prototype.createContext = function createContext(resIds) {
	      var ctx = new Context(this);
	      this._resLists.set(ctx, new _Set(resIds));
	      return ctx;
	    };

	    Env.prototype.destroyContext = function destroyContext(ctx) {
	      var _this9 = this;

	      var lists = this._resLists;
	      var resList = lists.get(ctx);

	      lists['delete'](ctx);
	      resList.forEach(function (resId) {
	        return deleteIfOrphan(_this9._resCache, lists, resId);
	      });
	    };

	    Env.prototype._parse = function _parse(syntax, lang, data) {
	      var _this10 = this;

	      var parser = parsers[syntax];
	      if (!parser) {
	        return data;
	      }

	      var emit = function emit(type, err) {
	        return _this10.emit(type, amendError(lang, err));
	      };
	      return parser.parse.call(parser, emit, data);
	    };

	    Env.prototype._create = function _create(lang, entries) {
	      if (lang.src !== 'pseudo') {
	        return entries;
	      }

	      var pseudoentries = _Object$create(null);
	      for (var key in entries) {
	        pseudoentries[key] = walkEntry(entries[key], pseudo[lang.code].process);
	      }
	      return pseudoentries;
	    };

	    Env.prototype._getResource = function _getResource(lang, res) {
	      var _this11 = this;

	      var cache = this._resCache;
	      var id = res + lang.code + lang.src;

	      if (cache.has(id)) {
	        return cache.get(id);
	      }

	      var syntax = res.substr(res.lastIndexOf('.') + 1);

	      var saveEntries = function saveEntries(data) {
	        var entries = _this11._parse(syntax, lang, data);
	        cache.set(id, _this11._create(lang, entries));
	      };

	      var recover = function recover(err) {
	        err.lang = lang;
	        _this11.emit('fetcherror', err);
	        cache.set(id, err);
	      };

	      var langToFetch = lang.src === 'pseudo' ? { code: this.defaultLang, src: 'app' } : lang;

	      var resource = this.fetchResource(res, langToFetch).then(saveEntries, recover);

	      cache.set(id, resource);

	      return resource;
	    };

	    return Env;
	  })();

	  function deleteIfOrphan(cache, lists, resId) {
	    var isNeeded = _Array$from(lists).some(function (_ref6) {
	      var ctx = _ref6[0];
	      var resIds = _ref6[1];
	      return resIds.has(resId);
	    });

	    if (!isNeeded) {
	      cache.forEach(function (val, key) {
	        return key.startsWith(resId) ? cache['delete'](key) : null;
	      });
	    }
	  }

	  function amendError(lang, err) {
	    err.lang = lang;
	    return err;
	  }

	  function prioritizeLocales(def, availableLangs, requested) {
	    var supportedLocale = undefined;

	    for (var i = 0; i < requested.length; i++) {
	      var locale = requested[i];
	      if (availableLangs.indexOf(locale) !== -1) {
	        supportedLocale = locale;
	        break;
	      }
	    }
	    if (!supportedLocale || supportedLocale === def) {
	      return [def];
	    }

	    return [supportedLocale, def];
	  }

	  function getMeta(head) {
	    var availableLangs = _Object$create(null);
	    var defaultLang = null;
	    var appVersion = null;

	    var metas = head.querySelectorAll('meta[name="availableLanguages"],' + 'meta[name="defaultLanguage"],' + 'meta[name="appVersion"]');
	    for (var _iterator3 = metas, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _getIterator(_iterator3);;) {
	      var _ref3;

	      if (_isArray3) {
	        if (_i3 >= _iterator3.length) break;
	        _ref3 = _iterator3[_i3++];
	      } else {
	        _i3 = _iterator3.next();
	        if (_i3.done) break;
	        _ref3 = _i3.value;
	      }

	      var meta = _ref3;

	      var _name = meta.getAttribute('name');
	      var content = meta.getAttribute('content').trim();
	      switch (_name) {
	        case 'availableLanguages':
	          availableLangs = getLangRevisionMap(availableLangs, content);
	          break;
	        case 'defaultLanguage':
	          var _getLangRevisionTuple = getLangRevisionTuple(content),
	              lang = _getLangRevisionTuple[0],
	              rev = _getLangRevisionTuple[1];

	          defaultLang = lang;
	          if (!(lang in availableLangs)) {
	            availableLangs[lang] = rev;
	          }
	          break;
	        case 'appVersion':
	          appVersion = content;
	      }
	    }

	    return {
	      defaultLang: defaultLang,
	      availableLangs: availableLangs,
	      appVersion: appVersion
	    };
	  }

	  function getLangRevisionMap(seq, str) {
	    return str.split(',').reduce(function (seq, cur) {
	      var _getLangRevisionTuple2 = getLangRevisionTuple(cur);

	      var lang = _getLangRevisionTuple2[0];
	      var rev = _getLangRevisionTuple2[1];

	      seq[lang] = rev;
	      return seq;
	    }, seq);
	  }

	  function getLangRevisionTuple(str) {
	    var _str$trim$split = str.trim().split(':');

	    var lang = _str$trim$split[0];
	    var rev = _str$trim$split[1];

	    return [lang, parseInt(rev)];
	  }

	  function negotiateLanguages(fn, appVersion, defaultLang, availableLangs, additionalLangs, prevLangs, requestedLangs) {

	    var allAvailableLangs = _Object$keys(availableLangs).concat(additionalLangs || []).concat(_Object$keys(pseudo));
	    var newLangs = prioritizeLocales(defaultLang, allAvailableLangs, requestedLangs);

	    var langs = newLangs.map(function (code) {
	      return {
	        code: code,
	        src: getLangSource(appVersion, availableLangs, additionalLangs, code)
	      };
	    });

	    if (!arrEqual(prevLangs, newLangs)) {
	      fn(langs);
	    }

	    return langs;
	  }

	  function arrEqual(arr1, arr2) {
	    return arr1.length === arr2.length && arr1.every(function (elem, i) {
	      return elem === arr2[i];
	    });
	  }

	  function getMatchingLangpack(appVersion, langpacks) {
	    for (var i = 0, langpack = undefined; langpack = langpacks[i]; i++) {
	      if (langpack.target === appVersion) {
	        return langpack;
	      }
	    }
	    return null;
	  }

	  function getLangSource(appVersion, availableLangs, additionalLangs, code) {
	    if (additionalLangs && additionalLangs[code]) {
	      var lp = getMatchingLangpack(appVersion, additionalLangs[code]);
	      if (lp && (!(code in availableLangs) || parseInt(lp.revision) > availableLangs[code])) {
	        return 'extra';
	      }
	    }

	    if (code in pseudo && !(code in availableLangs)) {
	      return 'pseudo';
	    }

	    return 'app';
	  }

	  var Remote = (function () {
	    function Remote(fetchResource, broadcast, requestedLangs) {
	      var _this12 = this;

	      _classCallCheck(this, Remote);

	      this.fetchResource = fetchResource;
	      this.broadcast = broadcast;
	      this.ctxs = new _Map();
	      this.interactive = documentReady().then(function () {
	        return _this12.init(requestedLangs);
	      });
	    }

	    Remote.prototype.init = function init(requestedLangs) {
	      var _this13 = this;

	      var meta = getMeta(document.head);
	      this.defaultLanguage = meta.defaultLang;
	      this.availableLanguages = meta.availableLangs;
	      this.appVersion = meta.appVersion;

	      this.env = new Env(this.defaultLanguage, function () {
	        for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
	          args[_key6] = arguments[_key6];
	        }

	        return _this13.fetchResource.apply(_this13, [_this13.appVersion].concat(args));
	      });

	      return this.requestLanguages(requestedLangs);
	    };

	    Remote.prototype.registerView = function registerView(view, resources) {
	      var _this14 = this;

	      return this.interactive.then(function () {
	        _this14.ctxs.set(view, _this14.env.createContext(resources));
	        return true;
	      });
	    };

	    Remote.prototype.unregisterView = function unregisterView(view) {
	      return this.ctxs['delete'](view);
	    };

	    Remote.prototype.resolveEntities = function resolveEntities(view, langs, keys) {
	      return this.ctxs.get(view).resolveEntities(langs, keys);
	    };

	    Remote.prototype.formatValues = function formatValues(view, keys) {
	      var _this15 = this;

	      return this.languages.then(function (langs) {
	        return _this15.ctxs.get(view).resolveValues(langs, keys);
	      });
	    };

	    Remote.prototype.resolvedLanguages = function resolvedLanguages() {
	      return this.languages;
	    };

	    Remote.prototype.requestLanguages = function requestLanguages(requestedLangs) {
	      return changeLanguages.call(this, getAdditionalLanguages(), requestedLangs);
	    };

	    Remote.prototype.getName = function getName(code) {
	      return pseudo[code].name;
	    };

	    Remote.prototype.processString = function processString(code, str) {
	      return pseudo[code].process(str);
	    };

	    Remote.prototype.handleEvent = function handleEvent(evt) {
	      return changeLanguages.call(this, evt.detail || getAdditionalLanguages(), navigator.languages);
	    };

	    return Remote;
	  })();

	  function getAdditionalLanguages() {
	    if (navigator.mozApps && navigator.mozApps.getAdditionalLanguages) {
	      return navigator.mozApps.getAdditionalLanguages()['catch'](function () {
	        return [];
	      });
	    }

	    return _Promise.resolve([]);
	  }

	  function changeLanguages(additionalLangs, requestedLangs) {
	    var _this16 = this;

	    var prevLangs = this.languages || [];
	    return this.languages = _Promise.all([additionalLangs, prevLangs]).then(function (_ref7) {
	      var additionalLangs = _ref7[0];
	      var prevLangs = _ref7[1];
	      return negotiateLanguages(_this16.broadcast.bind(_this16, 'translateDocument'), _this16.appVersion, _this16.defaultLanguage, _this16.availableLanguages, additionalLangs, prevLangs, requestedLangs);
	    });
	  }

	  var Node = function Node() {
	    _classCallCheck(this, Node);

	    this.type = this.constructor.name;
	  };

	  var Entry = (function (_Node) {
	    _inherits(Entry, _Node);

	    function Entry() {
	      _classCallCheck(this, Entry);

	      _Node.call(this);
	    }

	    return Entry;
	  })(Node);

	  var Identifier = (function (_Node2) {
	    _inherits(Identifier, _Node2);

	    function Identifier(name) {
	      _classCallCheck(this, Identifier);

	      _Node2.call(this);
	      this.name = name;
	    }

	    return Identifier;
	  })(Node);

	  var Variable = (function (_Node3) {
	    _inherits(Variable, _Node3);

	    function Variable(name) {
	      _classCallCheck(this, Variable);

	      _Node3.call(this);
	      this.name = name;
	    }

	    return Variable;
	  })(Node);

	  var Global = (function (_Node4) {
	    _inherits(Global, _Node4);

	    function Global(name) {
	      _classCallCheck(this, Global);

	      _Node4.call(this);
	      this.name = name;
	    }

	    return Global;
	  })(Node);

	  var Value = (function (_Node5) {
	    _inherits(Value, _Node5);

	    function Value() {
	      _classCallCheck(this, Value);

	      _Node5.call(this);
	    }

	    return Value;
	  })(Node);

	  var String$1 = (function (_Value) {
	    _inherits(String$1, _Value);

	    function String$1(source, content) {
	      _classCallCheck(this, String$1);

	      _Value.call(this);
	      this.source = source;
	      this.content = content;

	      this._opchar = '"';
	    }

	    return String$1;
	  })(Value);

	  var Hash = (function (_Value2) {
	    _inherits(Hash, _Value2);

	    function Hash(items) {
	      _classCallCheck(this, Hash);

	      _Value2.call(this);
	      this.items = items;
	    }

	    return Hash;
	  })(Value);

	  var Entity = (function (_Entry) {
	    _inherits(Entity, _Entry);

	    function Entity(id) {
	      var value = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
	      var index = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
	      var attrs = arguments.length <= 3 || arguments[3] === undefined ? [] : arguments[3];

	      _classCallCheck(this, Entity);

	      _Entry.call(this);
	      this.id = id;
	      this.value = value;
	      this.index = index;
	      this.attrs = attrs;
	    }

	    return Entity;
	  })(Entry);

	  var Resource = (function (_Node6) {
	    _inherits(Resource, _Node6);

	    function Resource() {
	      _classCallCheck(this, Resource);

	      _Node6.call(this);
	      this.body = [];
	    }

	    return Resource;
	  })(Node);

	  var Attribute = (function (_Node7) {
	    _inherits(Attribute, _Node7);

	    function Attribute(id, value) {
	      var index = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

	      _classCallCheck(this, Attribute);

	      _Node7.call(this);
	      this.id = id;
	      this.value = value;
	      this.index = index;
	    }

	    return Attribute;
	  })(Node);

	  var HashItem = (function (_Node8) {
	    _inherits(HashItem, _Node8);

	    function HashItem(id, value, defItem) {
	      _classCallCheck(this, HashItem);

	      _Node8.call(this);
	      this.id = id;
	      this.value = value;
	      this['default'] = defItem;
	    }

	    return HashItem;
	  })(Node);

	  var Comment = (function (_Entry2) {
	    _inherits(Comment, _Entry2);

	    function Comment(body) {
	      _classCallCheck(this, Comment);

	      _Entry2.call(this);
	      this.body = body;
	    }

	    return Comment;
	  })(Entry);

	  var Expression = (function (_Node9) {
	    _inherits(Expression, _Node9);

	    function Expression() {
	      _classCallCheck(this, Expression);

	      _Node9.call(this);
	    }

	    return Expression;
	  })(Node);

	  var PropertyExpression = (function (_Expression) {
	    _inherits(PropertyExpression, _Expression);

	    function PropertyExpression(idref, exp) {
	      var computed = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

	      _classCallCheck(this, PropertyExpression);

	      _Expression.call(this);
	      this.idref = idref;
	      this.exp = exp;
	      this.computed = computed;
	    }

	    return PropertyExpression;
	  })(Expression);

	  var CallExpression = (function (_Expression2) {
	    _inherits(CallExpression, _Expression2);

	    function CallExpression(callee, args) {
	      _classCallCheck(this, CallExpression);

	      _Expression2.call(this);
	      this.callee = callee;
	      this.args = args;
	    }

	    return CallExpression;
	  })(Expression);

	  var JunkEntry = (function (_Entry3) {
	    _inherits(JunkEntry, _Entry3);

	    function JunkEntry(content) {
	      _classCallCheck(this, JunkEntry);

	      _Entry3.call(this);
	      this.content = content;
	    }

	    return JunkEntry;
	  })(Entry);

	  var AST = {
	    Node: Node,
	    Identifier: Identifier,
	    Value: Value,
	    String: String$1,
	    Hash: Hash,
	    Entity: Entity,
	    Resource: Resource,
	    Attribute: Attribute,
	    HashItem: HashItem,
	    Comment: Comment,
	    Variable: Variable,
	    Global: Global,
	    Expression: Expression,
	    PropertyExpression: PropertyExpression,
	    CallExpression: CallExpression,
	    JunkEntry: JunkEntry
	  };

	  var MAX_PLACEABLES = 100;

	  var ParseContext = (function () {
	    function ParseContext(string, pos) {
	      _classCallCheck(this, ParseContext);

	      this._config = {
	        pos: pos
	      };
	      this._source = string;
	      this._index = 0;
	      this._length = string.length;
	      this._curEntryStart = 0;
	    }

	    ParseContext.prototype.setPosition = function setPosition(node, start, end) {
	      if (!this._config.pos) {
	        return;
	      }
	      node._pos = { start: start, end: end };
	    };

	    ParseContext.prototype.getResource = function getResource() {
	      var resource = new AST.Resource();
	      this.setPosition(resource, 0, this._length);
	      resource._errors = [];

	      this.getWS();
	      while (this._index < this._length) {
	        try {
	          resource.body.push(this.getEntry());
	        } catch (e) {
	          if (e instanceof L10nError) {
	            resource._errors.push(e);
	            resource.body.push(this.getJunkEntry());
	          } else {
	            throw e;
	          }
	        }
	        if (this._index < this._length) {
	          this.getWS();
	        }
	      }

	      return resource;
	    };

	    ParseContext.prototype.getEntry = function getEntry() {
	      this._curEntryStart = this._index;

	      if (this._source[this._index] === '<') {
	        ++this._index;
	        var id = this.getIdentifier();
	        if (this._source[this._index] === '[') {
	          ++this._index;
	          return this.getEntity(id, this.getItemList(this.getExpression, ']'));
	        }
	        return this.getEntity(id);
	      }

	      if (this._source.startsWith('/*', this._index)) {
	        return this.getComment();
	      }

	      throw this.error('Invalid entry');
	    };

	    ParseContext.prototype.getEntity = function getEntity(id, index) {
	      if (!this.getRequiredWS()) {
	        throw this.error('Expected white space');
	      }

	      var ch = this._source.charAt(this._index);
	      var value = this.getValue(ch, index === undefined);
	      var attrs = undefined;

	      if (value === null) {
	        if (ch === '>') {
	          throw this.error('Expected ">"');
	        }
	        attrs = this.getAttributes();
	      } else {
	        var ws1 = this.getRequiredWS();
	        if (this._source[this._index] !== '>') {
	          if (!ws1) {
	            throw this.error('Expected ">"');
	          }
	          attrs = this.getAttributes();
	        }
	      }

	      ++this._index;

	      var entity = new AST.Entity(id, value, index, attrs);
	      this.setPosition(entity, this._curEntryStart, this._index);
	      return entity;
	    };

	    ParseContext.prototype.getValue = function getValue() {
	      var ch = arguments.length <= 0 || arguments[0] === undefined ? this._source[this._index] : arguments[0];
	      var optional = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

	      switch (ch) {
	        case '\'':
	        case '"':
	          return this.getString(ch, 1);
	        case '{':
	          return this.getHash();
	      }

	      if (!optional) {
	        throw this.error('Unknown value type');
	      }
	      return null;
	    };

	    ParseContext.prototype.getWS = function getWS() {
	      var cc = this._source.charCodeAt(this._index);

	      while (cc === 32 || cc === 10 || cc === 9 || cc === 13) {
	        cc = this._source.charCodeAt(++this._index);
	      }
	    };

	    ParseContext.prototype.getRequiredWS = function getRequiredWS() {
	      var pos = this._index;
	      var cc = this._source.charCodeAt(pos);

	      while (cc === 32 || cc === 10 || cc === 9 || cc === 13) {
	        cc = this._source.charCodeAt(++this._index);
	      }
	      return this._index !== pos;
	    };

	    ParseContext.prototype.getIdentifier = function getIdentifier() {
	      var start = this._index;
	      var cc = this._source.charCodeAt(this._index);

	      if (cc >= 97 && cc <= 122 || cc >= 65 && cc <= 90 || cc === 95) {
	        cc = this._source.charCodeAt(++this._index);
	      } else {
	        throw this.error('Identifier has to start with [a-zA-Z_]');
	      }

	      while (cc >= 97 && cc <= 122 || cc >= 65 && cc <= 90 || cc >= 48 && cc <= 57 || cc === 95) {
	        cc = this._source.charCodeAt(++this._index);
	      }

	      var id = new AST.Identifier(this._source.slice(start, this._index));
	      this.setPosition(id, start, this._index);
	      return id;
	    };

	    ParseContext.prototype.getUnicodeChar = function getUnicodeChar() {
	      for (var i = 0; i < 4; i++) {
	        var cc = this._source.charCodeAt(++this._index);
	        if (cc > 96 && cc < 103 || cc > 64 && cc < 71 || cc > 47 && cc < 58) {
	          continue;
	        }
	        throw this.error('Illegal unicode escape sequence');
	      }
	      return '\\u' + this._source.slice(this._index - 3, this._index + 1);
	    };

	    ParseContext.prototype.getString = function getString(opchar, opcharLen) {
	      var body = [];
	      var buf = '';
	      var placeables = 0;

	      this._index += opcharLen - 1;

	      var start = this._index + 1;

	      var closed = false;

	      while (!closed) {
	        var ch = this._source[++this._index];

	        switch (ch) {
	          case '\\':
	            var ch2 = this._source[++this._index];
	            if (ch2 === 'u') {
	              buf += this.getUnicodeChar();
	            } else if (ch2 === opchar || ch2 === '\\') {
	              buf += ch2;
	            } else if (ch2 === '{' && this._source[this._index + 1] === '{') {
	              buf += '{';
	            } else {
	              throw this.error('Illegal escape sequence');
	            }
	            break;
	          case '{':
	            if (this._source[this._index + 1] === '{') {
	              if (placeables > MAX_PLACEABLES - 1) {
	                throw this.error('Too many placeables, maximum allowed is ' + MAX_PLACEABLES);
	              }
	              if (buf.length) {
	                body.push(buf);
	                buf = '';
	              }
	              this._index += 2;
	              this.getWS();
	              body.push(this.getExpression());
	              this.getWS();
	              if (!this._source.startsWith('}}', this._index)) {
	                throw this.error('Expected "}}"');
	              }
	              this._index += 1;
	              placeables++;
	              break;
	            }

	          default:
	            if (ch === opchar) {
	              this._index++;
	              closed = true;
	              break;
	            }

	            buf += ch;
	            if (this._index + 1 >= this._length) {
	              throw this.error('Unclosed string literal');
	            }
	        }
	      }

	      if (buf.length) {
	        body.push(buf);
	      }

	      var string = new AST.String(this._source.slice(start, this._index - 1), body);
	      this.setPosition(string, start, this._index);
	      string._opchar = opchar;

	      return string;
	    };

	    ParseContext.prototype.getAttributes = function getAttributes() {
	      var attrs = [];

	      while (true) {
	        var attr = this.getAttribute();
	        attrs.push(attr);
	        var ws1 = this.getRequiredWS();
	        var ch = this._source.charAt(this._index);
	        if (ch === '>') {
	          break;
	        } else if (!ws1) {
	          throw this.error('Expected ">"');
	        }
	      }
	      return attrs;
	    };

	    ParseContext.prototype.getAttribute = function getAttribute() {
	      var start = this._index;
	      var key = this.getIdentifier();
	      var index = undefined;

	      if (this._source[this._index] === '[') {
	        ++this._index;
	        this.getWS();
	        index = this.getItemList(this.getExpression, ']');
	      }
	      this.getWS();
	      if (this._source[this._index] !== ':') {
	        throw this.error('Expected ":"');
	      }
	      ++this._index;
	      this.getWS();
	      var attr = new AST.Attribute(key, this.getValue(), index);
	      this.setPosition(attr, start, this._index);
	      return attr;
	    };

	    ParseContext.prototype.getHash = function getHash() {
	      var start = this._index;
	      var items = [];

	      ++this._index;
	      this.getWS();

	      while (true) {
	        items.push(this.getHashItem());
	        this.getWS();

	        var comma = this._source[this._index] === ',';
	        if (comma) {
	          ++this._index;
	          this.getWS();
	        }
	        if (this._source[this._index] === '}') {
	          ++this._index;
	          break;
	        }
	        if (!comma) {
	          throw this.error('Expected "}"');
	        }
	      }

	      var hash = new AST.Hash(items);
	      this.setPosition(hash, start, this._index);
	      return hash;
	    };

	    ParseContext.prototype.getHashItem = function getHashItem() {
	      var start = this._index;

	      var defItem = false;
	      if (this._source[this._index] === '*') {
	        ++this._index;
	        defItem = true;
	      }

	      var key = this.getIdentifier();
	      this.getWS();
	      if (this._source[this._index] !== ':') {
	        throw this.error('Expected ":"');
	      }
	      ++this._index;
	      this.getWS();

	      var hashItem = new AST.HashItem(key, this.getValue(), defItem);
	      this.setPosition(hashItem, start, this._index);
	      return hashItem;
	    };

	    ParseContext.prototype.getComment = function getComment() {
	      this._index += 2;
	      var start = this._index;
	      var end = this._source.indexOf('*/', start);

	      if (end === -1) {
	        throw this.error('Comment without a closing tag');
	      }

	      this._index = end + 2;
	      var comment = new AST.Comment(this._source.slice(start, end));
	      this.setPosition(comment, start - 2, this._index);
	      return comment;
	    };

	    ParseContext.prototype.getExpression = function getExpression() {
	      var start = this._index;
	      var exp = this.getPrimaryExpression();

	      while (true) {
	        var ch = this._source[this._index];
	        if (ch === '.' || ch === '[') {
	          ++this._index;
	          exp = this.getPropertyExpression(exp, ch === '[', start);
	        } else if (ch === '(') {
	          ++this._index;
	          exp = this.getCallExpression(exp, start);
	        } else {
	          break;
	        }
	      }

	      return exp;
	    };

	    ParseContext.prototype.getPropertyExpression = function getPropertyExpression(idref, computed, start) {
	      var exp = undefined;

	      if (computed) {
	        this.getWS();
	        exp = this.getExpression();
	        this.getWS();
	        if (this._source[this._index] !== ']') {
	          throw this.error('Expected "]"');
	        }
	        ++this._index;
	      } else {
	        exp = this.getIdentifier();
	      }

	      var propExpr = new AST.PropertyExpression(idref, exp, computed);
	      this.setPosition(propExpr, start, this._index);
	      return propExpr;
	    };

	    ParseContext.prototype.getCallExpression = function getCallExpression(callee, start) {
	      this.getWS();

	      var callExpr = new AST.CallExpression(callee, this.getItemList(this.getExpression, ')'));
	      this.setPosition(callExpr, start, this._index);
	      return callExpr;
	    };

	    ParseContext.prototype.getPrimaryExpression = function getPrimaryExpression() {
	      var start = this._index;
	      var ch = this._source[this._index];

	      switch (ch) {
	        case '$':
	          ++this._index;
	          var variable = new AST.Variable(this.getIdentifier());
	          this.setPosition(variable, start, this._index);
	          return variable;
	        case '@':
	          ++this._index;
	          var global = new AST.Global(this.getIdentifier());
	          this.setPosition(global, start, this._index);
	          return global;
	        default:
	          return this.getIdentifier();
	      }
	    };

	    ParseContext.prototype.getItemList = function getItemList(callback, closeChar) {
	      var items = [];
	      var closed = false;

	      this.getWS();

	      if (this._source[this._index] === closeChar) {
	        ++this._index;
	        closed = true;
	      }

	      while (!closed) {
	        items.push(callback.call(this));
	        this.getWS();
	        var ch = this._source.charAt(this._index);
	        switch (ch) {
	          case ',':
	            ++this._index;
	            this.getWS();
	            break;
	          case closeChar:
	            ++this._index;
	            closed = true;
	            break;
	          default:
	            throw this.error('Expected "," or "' + closeChar + '"');
	        }
	      }

	      return items;
	    };

	    ParseContext.prototype.error = function error(message) {
	      var pos = this._index;

	      var start = this._source.lastIndexOf('<', pos - 1);
	      var lastClose = this._source.lastIndexOf('>', pos - 1);
	      start = lastClose > start ? lastClose + 1 : start;
	      var context = this._source.slice(start, pos + 10);

	      var msg = message + ' at pos ' + pos + ': `' + context + '`';

	      var err = new L10nError(msg);
	      err._pos = { start: pos, end: undefined };
	      err.offset = pos - start;
	      err.description = message;
	      err.context = context;
	      return err;
	    };

	    ParseContext.prototype.getJunkEntry = function getJunkEntry() {
	      var pos = this._index;
	      var nextEntity = this._source.indexOf('<', pos);
	      var nextComment = this._source.indexOf('/*', pos);

	      if (nextEntity === -1) {
	        nextEntity = this._length;
	      }
	      if (nextComment === -1) {
	        nextComment = this._length;
	      }

	      var nextEntry = Math.min(nextEntity, nextComment);

	      this._index = nextEntry;

	      var junk = new AST.JunkEntry(this._source.slice(this._curEntryStart, nextEntry));

	      this.setPosition(junk, this._curEntryStart, nextEntry);
	      return junk;
	    };

	    return ParseContext;
	  })();

	  var ASTParser = {
	    parseResource: function parseResource(string) {
	      var pos = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

	      var parseContext = new ParseContext(string, pos);
	      return parseContext.getResource();
	    }
	  };

	  var ASTSerializer = {
	    serialize: function serialize(ast) {
	      var string = '';
	      for (var id in ast) {
	        string += this.dumpEntry(ast[id]) + '\n';
	      }
	      return string;
	    },

	    serializeString: function serializeString(ast) {
	      var string = '';

	      if (typeof ast === 'object') {
	        string += this.dumpValue(ast, 0);
	      } else {
	        string += this.dumpString(ast);
	      }

	      return string;
	    },

	    dumpEntry: function dumpEntry(entry) {
	      return this.dumpEntity(entry);
	    },

	    dumpEntity: function dumpEntity(entity) {
	      var id,
	          val = null,
	          attrs = {};
	      var index = '';

	      for (var key in entity) {
	        switch (key) {
	          case '$v':
	            val = entity.$v;
	            break;
	          case '$x':
	            index = this.dumpIndex(entity.$x);
	            break;
	          case '$i':
	            id = this.dumpIdentifier(entity.$i);
	            break;
	          default:
	            attrs[key] = entity[key];
	        }
	      }

	      if (_Object$keys(attrs).length === 0) {
	        return '<' + id + index + ' ' + this.dumpValue(val, 0) + '>';
	      } else {
	        return '<' + id + index + ' ' + this.dumpValue(val, 0) + '\n' + this.dumpAttributes(attrs) + '>';
	      }
	    },

	    dumpIdentifier: function dumpIdentifier(id) {
	      return id.replace(/-/g, '_');
	    },

	    dumpValue: function dumpValue(value, depth) {
	      if (value === null) {
	        return '';
	      }

	      if (typeof value === 'string') {
	        return this.dumpString(value);
	      }
	      if (Array.isArray(value)) {
	        return this.dumpComplexString(value);
	      }
	      if (typeof value === 'object') {
	        if (value.o) {
	          return this.dumpValue(value.v);
	        }
	        return this.dumpHash(value, depth);
	      }
	    },

	    dumpString: function dumpString(str) {
	      if (str) {
	        return '"' + str.replace(/"/g, '\\"') + '"';
	      }
	      return '';
	    },

	    dumpComplexString: function dumpComplexString(chunks) {
	      var str = '"';
	      for (var i = 0; i < chunks.length; i++) {
	        if (typeof chunks[i] === 'string') {
	          str += chunks[i].replace(/"/g, '\\"');
	        } else {
	          str += '{{ ' + this.dumpExpression(chunks[i]) + ' }}';
	        }
	      }
	      return str + '"';
	    },

	    dumpAttributes: function dumpAttributes(attrs) {
	      var str = '';
	      for (var key in attrs) {
	        if (attrs[key].x) {
	          str += '  ' + key + this.dumpIndex(attrs[key].x) + ': ' + this.dumpValue(attrs[key].v, 1) + '\n';
	        } else {
	          str += '  ' + key + ': ' + this.dumpValue(attrs[key], 1) + '\n';
	        }
	      }

	      return str;
	    },

	    dumpExpression: function dumpExpression(exp) {
	      switch (exp.t) {
	        case 'call':
	          return this.dumpCallExpression(exp);
	        case 'prop':
	          return this.dumpPropertyExpression(exp);
	      }

	      return this.dumpPrimaryExpression(exp);
	    },

	    dumpPropertyExpression: function dumpPropertyExpression(exp) {
	      var idref = this.dumpExpression(exp.e);
	      var prop = undefined;

	      if (exp.c) {
	        prop = this.dumpExpression(exp.p);
	        return idref + '[' + prop + ']';
	      }

	      prop = this.dumpIdentifier(exp.p);
	      return idref + '.' + prop;
	    },

	    dumpCallExpression: function dumpCallExpression(exp) {
	      var pexp = this.dumpExpression(exp.v);

	      var attrs = this.dumpItemList(exp.a, this.dumpExpression.bind(this));
	      pexp += '(' + attrs + ')';
	      return pexp;
	    },

	    dumpPrimaryExpression: function dumpPrimaryExpression(exp) {
	      var ret = '';

	      if (typeof exp === 'string') {
	        return exp;
	      }

	      switch (exp.t) {
	        case 'glob':
	          ret += '@';
	          ret += exp.v;
	          break;
	        case 'var':
	          ret += '$';
	          ret += exp.v;
	          break;
	        case 'id':
	          ret += this.dumpIdentifier(exp.v);
	          break;
	        case 'idOrVar':
	          ret += this.dumpIdentifier(exp.v);
	          break;
	        default:
	          throw new L10nError('Unknown primary expression');
	      }

	      return ret;
	    },

	    dumpHash: function dumpHash(hash, depth) {
	      var items = [];
	      var str;

	      var defIndex;
	      if ('__default' in hash) {
	        defIndex = hash.__default;
	      }

	      for (var key in hash) {
	        var _indent = '  ';
	        if (key.charAt(0) === '_' && key.charAt(1) === '_') {
	          continue;
	        }

	        if (key === defIndex) {
	          _indent = ' *';
	        }
	        str = _indent + key + ': ' + this.dumpValue(hash[key], depth + 1);
	        items.push(str);
	      }

	      var indent = new Array(depth + 1).join('  ');
	      return '{\n' + indent + items.join(',\n' + indent) + '\n' + indent + '}';
	    },

	    dumpItemList: function dumpItemList(itemList, cb) {
	      return itemList.map(cb).join(', ');
	    },

	    dumpIndex: function dumpIndex(index) {
	      return '[' + this.dumpItemList(index, this.dumpExpression.bind(this)) + ']';
	    }
	  };

	  function EntriesSerializer() {
	    this.serialize = function (ast) {
	      var string = '';
	      for (var id in ast) {
	        string += dumpEntry(ast[id]) + '\n';
	      }

	      return string;
	    };

	    function dumpEntry(entry) {
	      return dumpEntity(entry);
	    }

	    function dumpEntity(entity) {
	      var id,
	          val = null,
	          attrs = {};
	      var index = '';

	      for (var key in entity) {
	        switch (key) {
	          case '$v':
	            val = entity.$v;
	            break;
	          case '$x':
	            index = dumpIndex(entity.$x);
	            break;
	          case '$i':
	            id = entity.$i.replace(/-/g, '_');
	            break;
	          default:
	            attrs[key] = entity[key];
	        }
	      }

	      if (_Object$keys(attrs).length === 0) {
	        return '<' + id + index + ' ' + dumpValue(val, 0) + '>';
	      } else {
	        return '<' + id + index + ' ' + dumpValue(val, 0) + '\n' + dumpAttributes(attrs) + '>';
	      }
	    }

	    function dumpIndex(index) {
	      if (index[0].v === 'plural') {
	        return '[ @cldr.plural($' + index[1] + ') ]';
	      }
	    }

	    function dumpValue(_x7, _x8) {
	      var _again2 = true;

	      _function2: while (_again2) {
	        var value = _x7,
	            depth = _x8;
	        _again2 = false;

	        if (value === null) {
	          return '';
	        }
	        if (typeof value === 'string') {
	          return dumpString(value);
	        }
	        if (Array.isArray(value)) {
	          return dumpComplexString(value);
	        }
	        if (typeof value === 'object') {
	          if (value.$o) {
	            _x7 = value.$o;
	            _x8 = undefined;
	            _again2 = true;
	            continue _function2;
	          }
	          return dumpHash(value, depth);
	        }
	      }
	    }

	    function dumpString(str) {
	      if (str) {
	        return '"' + str.replace(/"/g, '\\"') + '"';
	      }
	      return '';
	    }

	    function dumpComplexString(chunks) {
	      var str = '"';
	      for (var i = 0; i < chunks.length; i++) {
	        if (typeof chunks[i] === 'string') {
	          str += chunks[i];
	        } else {
	          str += '{{ ' + chunks[i].v.replace(/-/g, '_') + ' }}';
	        }
	      }
	      return str + '"';
	    }

	    function dumpHash(hash, depth) {
	      var items = [];
	      var str;

	      for (var key in hash) {
	        str = '  ' + key + ': ' + dumpValue(hash[key]);
	        items.push(str);
	      }

	      var indent = depth ? '  ' : '';
	      return '{\n' + indent + items.join(',\n' + indent) + '\n' + indent + '}';
	    }

	    function dumpAttributes(attrs) {
	      var str = '';
	      for (var key in attrs) {
	        if (attrs[key].$x) {
	          str += '  ' + key + dumpIndex(attrs[key].$x) + ': ' + dumpValue(attrs[key].$v, 1) + '\n';
	        } else {
	          str += '  ' + key + ': ' + dumpValue(attrs[key], 1) + '\n';
	        }
	      }

	      return str;
	    }
	  }

	  var lang = {
	    code: 'en-US',
	    src: 'app'
	  };

	  function MockContext(entries) {
	    this._getNumberFormatter = function () {
	      return {
	        format: function format(value) {
	          return value;
	        }
	      };
	    };
	    this._getEntity = function (lang, id) {
	      return entries[id];
	    };

	    this._getMacro = function (lang, id) {
	      switch (id) {
	        case 'plural':
	          return getPluralRule(lang.code);
	        default:
	          return undefined;
	      }
	    };
	  }

	  window.L20n = {
	    fetchResource: fetchResource, Client: Client, Remote: Remote, View: View, broadcast: broadcast,
	    ASTParser: ASTParser, ASTSerializer: ASTSerializer, EntriesParser: L20nParser, EntriesSerializer: EntriesSerializer, PropertiesParser: PropertiesParser,
	    Context: Context, Env: Env, L10nError: L10nError, emit: emit, addEventListener: addEventListener, removeEventListener: removeEventListener,
	    prioritizeLocales: prioritizeLocales, MockContext: MockContext, lang: lang, getPluralRule: getPluralRule, walkEntry: walkEntry, walkValue: walkValue,
	    pseudo: pseudo, format: format
	  };
	})();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = { "default": __webpack_require__(2), __esModule: true };

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $ = __webpack_require__(3);
	module.exports = function create(P, D) {
	  return $.create(P, D);
	};

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	var $Object = Object;
	module.exports = {
	  create: $Object.create,
	  getProto: $Object.getPrototypeOf,
	  isEnum: ({}).propertyIsEnumerable,
	  getDesc: $Object.getOwnPropertyDescriptor,
	  setDesc: $Object.defineProperty,
	  setDescs: $Object.defineProperties,
	  getKeys: $Object.keys,
	  getNames: $Object.getOwnPropertyNames,
	  getSymbols: $Object.getOwnPropertySymbols,
	  each: [].forEach
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = { "default": __webpack_require__(5), __esModule: true };

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(6);
	__webpack_require__(7);
	__webpack_require__(30);
	__webpack_require__(37);
	module.exports = __webpack_require__(15).Promise;

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at = __webpack_require__(8)(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(11)(String, 'String', function (iterated) {
	  this._t = String(iterated); // target
	  this._i = 0; // next index
	  // 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function () {
	  var O = this._t,
	      index = this._i,
	      point;
	  if (index >= O.length) return { value: undefined, done: true };
	  point = $at(O, index);
	  this._i += point.length;
	  return { value: point, done: false };
	});

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var toInteger = __webpack_require__(9),
	    defined = __webpack_require__(10);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function (TO_STRING) {
	  return function (that, pos) {
	    var s = String(defined(that)),
	        i = toInteger(pos),
	        l = s.length,
	        a,
	        b;
	    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff ? TO_STRING ? s.charAt(i) : a : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 9 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	"use strict";

	var ceil = Math.ceil,
	    floor = Math.floor;
	module.exports = function (it) {
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 10 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	"use strict";

	module.exports = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY = __webpack_require__(12),
	    $export = __webpack_require__(13),
	    redefine = __webpack_require__(18),
	    hide = __webpack_require__(19),
	    has = __webpack_require__(23),
	    Iterators = __webpack_require__(24),
	    $iterCreate = __webpack_require__(25),
	    setToStringTag = __webpack_require__(26),
	    getProto = __webpack_require__(3).getProto,
	    ITERATOR = __webpack_require__(27)('iterator'),
	    BUGGY = !([].keys && 'next' in [].keys()),
	    // Safari has buggy iterators w/o `next`
	FF_ITERATOR = '@@iterator',
	    KEYS = 'keys',
	    VALUES = 'values';

	var returnThis = function returnThis() {
	  return this;
	};

	module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function getMethod(kind) {
	    if (!BUGGY && kind in proto) return proto[kind];
	    switch (kind) {
	      case KEYS:
	        return function keys() {
	          return new Constructor(this, kind);
	        };
	      case VALUES:
	        return function values() {
	          return new Constructor(this, kind);
	        };
	    }return function entries() {
	      return new Constructor(this, kind);
	    };
	  };
	  var TAG = NAME + ' Iterator',
	      DEF_VALUES = DEFAULT == VALUES,
	      VALUES_BUG = false,
	      proto = Base.prototype,
	      $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT],
	      $default = $native || getMethod(DEFAULT),
	      methods,
	      key;
	  // Fix native
	  if ($native) {
	    var IteratorPrototype = getProto($default.call(new Base()));
	    // Set @@toStringTag to native iterators
	    setToStringTag(IteratorPrototype, TAG, true);
	    // FF fix
	    if (!LIBRARY && has(proto, FF_ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
	    // fix Array#{values, @@iterator}.name in V8 / FF
	    if (DEF_VALUES && $native.name !== VALUES) {
	      VALUES_BUG = true;
	      $default = function values() {
	        return $native.call(this);
	      };
	    }
	  }
	  // Define iterator
	  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG] = returnThis;
	  if (DEFAULT) {
	    methods = {
	      values: DEF_VALUES ? $default : getMethod(VALUES),
	      keys: IS_SET ? $default : getMethod(KEYS),
	      entries: !DEF_VALUES ? $default : getMethod('entries')
	    };
	    if (FORCED) for (key in methods) {
	      if (!(key in proto)) redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 12 */
/***/ function(module, exports) {

	"use strict";

	module.exports = true;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var global = __webpack_require__(14),
	    core = __webpack_require__(15),
	    ctx = __webpack_require__(16),
	    PROTOTYPE = 'prototype';

	var $export = function $export(type, name, source) {
	  var IS_FORCED = type & $export.F,
	      IS_GLOBAL = type & $export.G,
	      IS_STATIC = type & $export.S,
	      IS_PROTO = type & $export.P,
	      IS_BIND = type & $export.B,
	      IS_WRAP = type & $export.W,
	      exports = IS_GLOBAL ? core : core[name] || (core[name] = {}),
	      target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE],
	      key,
	      own,
	      out;
	  if (IS_GLOBAL) source = name;
	  for (key in source) {
	    // contains in native
	    own = !IS_FORCED && target && key in target;
	    if (own && key in exports) continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function (C) {
	      var F = function F(param) {
	        return this instanceof C ? new C(param) : C(param);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	      // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    if (IS_PROTO) (exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
	  }
	};
	// type bitmap
	$export.F = 1; // forced
	$export.G = 2; // global
	$export.S = 4; // static
	$export.P = 8; // proto
	$export.B = 16; // bind
	$export.W = 32; // wrap
	module.exports = $export;

/***/ },
/* 14 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	'use strict';

	var global = module.exports = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef

/***/ },
/* 15 */
/***/ function(module, exports) {

	'use strict';

	var core = module.exports = { version: '1.2.6' };
	if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	'use strict';

	var aFunction = __webpack_require__(17);
	module.exports = function (fn, that, length) {
	  aFunction(fn);
	  if (that === undefined) return fn;
	  switch (length) {
	    case 1:
	      return function (a) {
	        return fn.call(that, a);
	      };
	    case 2:
	      return function (a, b) {
	        return fn.call(that, a, b);
	      };
	    case 3:
	      return function (a, b, c) {
	        return fn.call(that, a, b, c);
	      };
	  }
	  return function () /* ...args */{
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 17 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function (it) {
	  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(19);

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $ = __webpack_require__(3),
	    createDesc = __webpack_require__(20);
	module.exports = __webpack_require__(21) ? function (object, key, value) {
	  return $.setDesc(object, key, createDesc(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

/***/ },
/* 20 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	'use strict';

	module.exports = !__webpack_require__(22)(function () {
	  return Object.defineProperty({}, 'a', { get: function get() {
	      return 7;
	    } }).a != 7;
	});

/***/ },
/* 22 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function (exec) {
	  try {
	    return !!exec();
	  } catch (e) {
	    return true;
	  }
	};

/***/ },
/* 23 */
/***/ function(module, exports) {

	"use strict";

	var hasOwnProperty = ({}).hasOwnProperty;
	module.exports = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 24 */
/***/ function(module, exports) {

	"use strict";

	module.exports = {};

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $ = __webpack_require__(3),
	    descriptor = __webpack_require__(20),
	    setToStringTag = __webpack_require__(26),
	    IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(19)(IteratorPrototype, __webpack_require__(27)('iterator'), function () {
	  return this;
	});

	module.exports = function (Constructor, NAME, next) {
	  Constructor.prototype = $.create(IteratorPrototype, { next: descriptor(1, next) });
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var def = __webpack_require__(3).setDesc,
	    has = __webpack_require__(23),
	    TAG = __webpack_require__(27)('toStringTag');

	module.exports = function (it, tag, stat) {
	  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
	};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var store = __webpack_require__(28)('wks'),
	    uid = __webpack_require__(29),
	    Symbol = __webpack_require__(14).Symbol;
	module.exports = function (name) {
	  return store[name] || (store[name] = Symbol && Symbol[name] || (Symbol || uid)('Symbol.' + name));
	};

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var global = __webpack_require__(14),
	    SHARED = '__core-js_shared__',
	    store = global[SHARED] || (global[SHARED] = {});
	module.exports = function (key) {
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 29 */
/***/ function(module, exports) {

	'use strict';

	var id = 0,
	    px = Math.random();
	module.exports = function (key) {
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(31);
	var Iterators = __webpack_require__(24);
	Iterators.NodeList = Iterators.HTMLCollection = Iterators.Array;

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(32),
	    step = __webpack_require__(33),
	    Iterators = __webpack_require__(24),
	    toIObject = __webpack_require__(34);

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(11)(Array, 'Array', function (iterated, kind) {
	  this._t = toIObject(iterated); // target
	  this._i = 0; // next index
	  this._k = kind; // kind
	  // 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function () {
	  var O = this._t,
	      kind = this._k,
	      index = this._i++;
	  if (!O || index >= O.length) {
	    this._t = undefined;
	    return step(1);
	  }
	  if (kind == 'keys') return step(0, index);
	  if (kind == 'values') return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;

	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },
/* 32 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function () {/* empty */};

/***/ },
/* 33 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function (done, value) {
	  return { value: value, done: !!done };
	};

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	'use strict';

	var IObject = __webpack_require__(35),
	    defined = __webpack_require__(10);
	module.exports = function (it) {
	  return IObject(defined(it));
	};

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	'use strict';

	var cof = __webpack_require__(36);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 36 */
/***/ function(module, exports) {

	"use strict";

	var toString = ({}).toString;

	module.exports = function (it) {
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $ = __webpack_require__(3),
	    LIBRARY = __webpack_require__(12),
	    global = __webpack_require__(14),
	    ctx = __webpack_require__(16),
	    classof = __webpack_require__(38),
	    $export = __webpack_require__(13),
	    isObject = __webpack_require__(39),
	    anObject = __webpack_require__(40),
	    aFunction = __webpack_require__(17),
	    strictNew = __webpack_require__(41),
	    forOf = __webpack_require__(42),
	    setProto = __webpack_require__(47).set,
	    same = __webpack_require__(51),
	    SPECIES = __webpack_require__(27)('species'),
	    speciesConstructor = __webpack_require__(55),
	    asap = __webpack_require__(56),
	    PROMISE = 'Promise',
	    process = global.process,
	    isNode = classof(process) == 'process',
	    P = global[PROMISE],
	    Wrapper;

	var testResolve = function testResolve(sub) {
	  var test = new P(function () {});
	  if (sub) test.constructor = Object;
	  return P.resolve(test) === test;
	};

	var USE_NATIVE = (function () {
	  var works = false;
	  function P2(x) {
	    var self = new P(x);
	    setProto(self, P2.prototype);
	    return self;
	  }
	  try {
	    works = P && P.resolve && testResolve();
	    setProto(P2, P);
	    P2.prototype = $.create(P.prototype, { constructor: { value: P2 } });
	    // actual Firefox has broken subclass support, test that
	    if (!(P2.resolve(5).then(function () {}) instanceof P2)) {
	      works = false;
	    }
	    // actual V8 bug, https://code.google.com/p/v8/issues/detail?id=4162
	    if (works && __webpack_require__(21)) {
	      var thenableThenGotten = false;
	      P.resolve($.setDesc({}, 'then', {
	        get: function get() {
	          thenableThenGotten = true;
	        }
	      }));
	      works = thenableThenGotten;
	    }
	  } catch (e) {
	    works = false;
	  }
	  return works;
	})();

	// helpers
	var sameConstructor = function sameConstructor(a, b) {
	  // library wrapper special case
	  if (LIBRARY && a === P && b === Wrapper) return true;
	  return same(a, b);
	};
	var getConstructor = function getConstructor(C) {
	  var S = anObject(C)[SPECIES];
	  return S != undefined ? S : C;
	};
	var isThenable = function isThenable(it) {
	  var then;
	  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
	};
	var PromiseCapability = function PromiseCapability(C) {
	  var resolve, reject;
	  this.promise = new C(function ($$resolve, $$reject) {
	    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
	    resolve = $$resolve;
	    reject = $$reject;
	  });
	  this.resolve = aFunction(resolve), this.reject = aFunction(reject);
	};
	var perform = function perform(exec) {
	  try {
	    exec();
	  } catch (e) {
	    return { error: e };
	  }
	};
	var notify = function notify(record, isReject) {
	  if (record.n) return;
	  record.n = true;
	  var chain = record.c;
	  asap(function () {
	    var value = record.v,
	        ok = record.s == 1,
	        i = 0;
	    var run = function run(reaction) {
	      var handler = ok ? reaction.ok : reaction.fail,
	          resolve = reaction.resolve,
	          reject = reaction.reject,
	          result,
	          then;
	      try {
	        if (handler) {
	          if (!ok) record.h = true;
	          result = handler === true ? value : handler(value);
	          if (result === reaction.promise) {
	            reject(TypeError('Promise-chain cycle'));
	          } else if (then = isThenable(result)) {
	            then.call(result, resolve, reject);
	          } else resolve(result);
	        } else reject(value);
	      } catch (e) {
	        reject(e);
	      }
	    };
	    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
	    chain.length = 0;
	    record.n = false;
	    if (isReject) setTimeout(function () {
	      var promise = record.p,
	          handler,
	          console;
	      if (isUnhandled(promise)) {
	        if (isNode) {
	          process.emit('unhandledRejection', value, promise);
	        } else if (handler = global.onunhandledrejection) {
	          handler({ promise: promise, reason: value });
	        } else if ((console = global.console) && console.error) {
	          console.error('Unhandled promise rejection', value);
	        }
	      }record.a = undefined;
	    }, 1);
	  });
	};
	var isUnhandled = function isUnhandled(promise) {
	  var record = promise._d,
	      chain = record.a || record.c,
	      i = 0,
	      reaction;
	  if (record.h) return false;
	  while (chain.length > i) {
	    reaction = chain[i++];
	    if (reaction.fail || !isUnhandled(reaction.promise)) return false;
	  }return true;
	};
	var $reject = function $reject(value) {
	  var record = this;
	  if (record.d) return;
	  record.d = true;
	  record = record.r || record; // unwrap
	  record.v = value;
	  record.s = 2;
	  record.a = record.c.slice();
	  notify(record, true);
	};
	var $resolve = function $resolve(value) {
	  var record = this,
	      then;
	  if (record.d) return;
	  record.d = true;
	  record = record.r || record; // unwrap
	  try {
	    if (record.p === value) throw TypeError("Promise can't be resolved itself");
	    if (then = isThenable(value)) {
	      asap(function () {
	        var wrapper = { r: record, d: false }; // wrap
	        try {
	          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
	        } catch (e) {
	          $reject.call(wrapper, e);
	        }
	      });
	    } else {
	      record.v = value;
	      record.s = 1;
	      notify(record, false);
	    }
	  } catch (e) {
	    $reject.call({ r: record, d: false }, e); // wrap
	  }
	};

	// constructor polyfill
	if (!USE_NATIVE) {
	  // 25.4.3.1 Promise(executor)
	  P = function Promise(executor) {
	    aFunction(executor);
	    var record = this._d = {
	      p: strictNew(this, P, PROMISE), // <- promise
	      c: [], // <- awaiting reactions
	      a: undefined, // <- checked in isUnhandled reactions
	      s: 0, // <- state
	      d: false, // <- done
	      v: undefined, // <- value
	      h: false, // <- handled rejection
	      n: false // <- notify
	    };
	    try {
	      executor(ctx($resolve, record, 1), ctx($reject, record, 1));
	    } catch (err) {
	      $reject.call(record, err);
	    }
	  };
	  __webpack_require__(61)(P.prototype, {
	    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
	    then: function then(onFulfilled, onRejected) {
	      var reaction = new PromiseCapability(speciesConstructor(this, P)),
	          promise = reaction.promise,
	          record = this._d;
	      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
	      reaction.fail = typeof onRejected == 'function' && onRejected;
	      record.c.push(reaction);
	      if (record.a) record.a.push(reaction);
	      if (record.s) notify(record, false);
	      return promise;
	    },
	    // 25.4.5.1 Promise.prototype.catch(onRejected)
	    'catch': function _catch(onRejected) {
	      return this.then(undefined, onRejected);
	    }
	  });
	}

	$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: P });
	__webpack_require__(26)(P, PROMISE);
	__webpack_require__(62)(PROMISE);
	Wrapper = __webpack_require__(15)[PROMISE];

	// statics
	$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
	  // 25.4.4.5 Promise.reject(r)
	  reject: function reject(r) {
	    var capability = new PromiseCapability(this),
	        $$reject = capability.reject;
	    $$reject(r);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * (!USE_NATIVE || testResolve(true)), PROMISE, {
	  // 25.4.4.6 Promise.resolve(x)
	  resolve: function resolve(x) {
	    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
	    if (x instanceof P && sameConstructor(x.constructor, this)) return x;
	    var capability = new PromiseCapability(this),
	        $$resolve = capability.resolve;
	    $$resolve(x);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(63)(function (iter) {
	  P.all(iter)['catch'](function () {});
	})), PROMISE, {
	  // 25.4.4.1 Promise.all(iterable)
	  all: function all(iterable) {
	    var C = getConstructor(this),
	        capability = new PromiseCapability(C),
	        resolve = capability.resolve,
	        reject = capability.reject,
	        values = [];
	    var abrupt = perform(function () {
	      forOf(iterable, false, values.push, values);
	      var remaining = values.length,
	          results = Array(remaining);
	      if (remaining) $.each.call(values, function (promise, index) {
	        var alreadyCalled = false;
	        C.resolve(promise).then(function (value) {
	          if (alreadyCalled) return;
	          alreadyCalled = true;
	          results[index] = value;
	          --remaining || resolve(results);
	        }, reject);
	      });else resolve(results);
	    });
	    if (abrupt) reject(abrupt.error);
	    return capability.promise;
	  },
	  // 25.4.4.4 Promise.race(iterable)
	  race: function race(iterable) {
	    var C = getConstructor(this),
	        capability = new PromiseCapability(C),
	        reject = capability.reject;
	    var abrupt = perform(function () {
	      forOf(iterable, false, function (promise) {
	        C.resolve(promise).then(capability.resolve, reject);
	      });
	    });
	    if (abrupt) reject(abrupt.error);
	    return capability.promise;
	  }
	});

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	'use strict';

	var cof = __webpack_require__(36),
	    TAG = __webpack_require__(27)('toStringTag'),

	// ES3 wrong here
	ARG = cof((function () {
	  return arguments;
	})()) == 'Arguments';

	module.exports = function (it) {
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	  // @@toStringTag case
	  : typeof (T = (O = Object(it))[TAG]) == 'string' ? T
	  // builtinTag case
	  : ARG ? cof(O)
	  // ES3 arguments fallback
	  : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ },
/* 39 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isObject = __webpack_require__(39);
	module.exports = function (it) {
	  if (!isObject(it)) throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 41 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function (it, Constructor, name) {
	  if (!(it instanceof Constructor)) throw TypeError(name + ": use the 'new' operator!");
	  return it;
	};

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var ctx = __webpack_require__(16),
	    call = __webpack_require__(43),
	    isArrayIter = __webpack_require__(44),
	    anObject = __webpack_require__(40),
	    toLength = __webpack_require__(45),
	    getIterFn = __webpack_require__(46);
	module.exports = function (iterable, entries, fn, that) {
	  var iterFn = getIterFn(iterable),
	      f = ctx(fn, that, entries ? 2 : 1),
	      index = 0,
	      length,
	      step,
	      iterator;
	  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
	  // fast case for arrays with default iterator
	  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
	    entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
	  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
	    call(iterator, f, step.value, entries);
	  }
	};

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	'use strict';

	var anObject = __webpack_require__(40);
	module.exports = function (iterator, fn, value, entries) {
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	    // 7.4.6 IteratorClose(iterator, completion)
	  } catch (e) {
	    var ret = iterator['return'];
	    if (ret !== undefined) anObject(ret.call(iterator));
	    throw e;
	  }
	};

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	// check on default Array iterator
	'use strict';

	var Iterators = __webpack_require__(24),
	    ITERATOR = __webpack_require__(27)('iterator'),
	    ArrayProto = Array.prototype;

	module.exports = function (it) {
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	'use strict';

	var toInteger = __webpack_require__(9),
	    min = Math.min;
	module.exports = function (it) {
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var classof = __webpack_require__(38),
	    ITERATOR = __webpack_require__(27)('iterator'),
	    Iterators = __webpack_require__(24);
	module.exports = __webpack_require__(15).getIteratorMethod = function (it) {
	  if (it != undefined) return it[ITERATOR] || it['@@iterator'] || Iterators[classof(it)];
	};

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	'use strict';

	var _Object$setPrototypeOf = __webpack_require__(48)['default'];

	var getDesc = __webpack_require__(3).getDesc,
	    isObject = __webpack_require__(39),
	    anObject = __webpack_require__(40);
	var check = function check(O, proto) {
	  anObject(O);
	  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: _Object$setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	  (function (test, buggy, set) {
	    try {
	      set = __webpack_require__(16)(Function.call, getDesc(Object.prototype, '__proto__').set, 2);
	      set(test, []);
	      buggy = !(test instanceof Array);
	    } catch (e) {
	      buggy = true;
	    }
	    return function setPrototypeOf(O, proto) {
	      check(O, proto);
	      if (buggy) O.__proto__ = proto;else set(O, proto);
	      return O;
	    };
	  })({}, false) : undefined),
	  check: check
	};

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = { "default": __webpack_require__(49), __esModule: true };

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(50);
	module.exports = __webpack_require__(15).Object.setPrototypeOf;

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	'use strict';

	var $export = __webpack_require__(13);
	$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(47).set });

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.9 SameValue(x, y)
	"use strict";

	var _Object$is = __webpack_require__(52)["default"];

	module.exports = _Object$is || function is(x, y) {
	  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
	};

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = { "default": __webpack_require__(53), __esModule: true };

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(54);
	module.exports = __webpack_require__(15).Object.is;

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.10 Object.is(value1, value2)
	'use strict';

	var $export = __webpack_require__(13);
	$export($export.S, 'Object', { is: __webpack_require__(51) });

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	// 7.3.20 SpeciesConstructor(O, defaultConstructor)
	'use strict';

	var anObject = __webpack_require__(40),
	    aFunction = __webpack_require__(17),
	    SPECIES = __webpack_require__(27)('species');
	module.exports = function (O, D) {
	  var C = anObject(O).constructor,
	      S;
	  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
	};

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var global = __webpack_require__(14),
	    macrotask = __webpack_require__(57).set,
	    Observer = global.MutationObserver || global.WebKitMutationObserver,
	    process = global.process,
	    Promise = global.Promise,
	    isNode = __webpack_require__(36)(process) == 'process',
	    head,
	    last,
	    notify;

	var flush = function flush() {
	  var parent, domain, fn;
	  if (isNode && (parent = process.domain)) {
	    process.domain = null;
	    parent.exit();
	  }
	  while (head) {
	    domain = head.domain;
	    fn = head.fn;
	    if (domain) domain.enter();
	    fn(); // <- currently we use it only for Promise - try / catch not required
	    if (domain) domain.exit();
	    head = head.next;
	  }last = undefined;
	  if (parent) parent.enter();
	};

	// Node.js
	if (isNode) {
	  notify = function () {
	    process.nextTick(flush);
	  };
	  // browsers with MutationObserver
	} else if (Observer) {
	    var toggle = 1,
	        node = document.createTextNode('');
	    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
	    notify = function () {
	      node.data = toggle = -toggle;
	    };
	    // environments with maybe non-completely correct, but existent Promise
	  } else if (Promise && Promise.resolve) {
	      notify = function () {
	        Promise.resolve().then(flush);
	      };
	      // for other environments - macrotask based on:
	      // - setImmediate
	      // - MessageChannel
	      // - window.postMessag
	      // - onreadystatechange
	      // - setTimeout
	    } else {
	        notify = function () {
	          // strange IE + webpack dev server bug - use .call(global)
	          macrotask.call(global, flush);
	        };
	      }

	module.exports = function asap(fn) {
	  var task = { fn: fn, next: undefined, domain: isNode && process.domain };
	  if (last) last.next = task;
	  if (!head) {
	    head = task;
	    notify();
	  }last = task;
	};

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var ctx = __webpack_require__(16),
	    invoke = __webpack_require__(58),
	    html = __webpack_require__(59),
	    cel = __webpack_require__(60),
	    global = __webpack_require__(14),
	    process = global.process,
	    setTask = global.setImmediate,
	    clearTask = global.clearImmediate,
	    MessageChannel = global.MessageChannel,
	    counter = 0,
	    queue = {},
	    ONREADYSTATECHANGE = 'onreadystatechange',
	    defer,
	    channel,
	    port;
	var run = function run() {
	  var id = +this;
	  if (queue.hasOwnProperty(id)) {
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	};
	var listner = function listner(event) {
	  run.call(event.data);
	};
	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if (!setTask || !clearTask) {
	  setTask = function setImmediate(fn) {
	    var args = [],
	        i = 1;
	    while (arguments.length > i) args.push(arguments[i++]);
	    queue[++counter] = function () {
	      invoke(typeof fn == 'function' ? fn : Function(fn), args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clearTask = function clearImmediate(id) {
	    delete queue[id];
	  };
	  // Node.js 0.8-
	  if (__webpack_require__(36)(process) == 'process') {
	    defer = function (id) {
	      process.nextTick(ctx(run, id, 1));
	    };
	    // Browsers with MessageChannel, includes WebWorkers
	  } else if (MessageChannel) {
	      channel = new MessageChannel();
	      port = channel.port2;
	      channel.port1.onmessage = listner;
	      defer = ctx(port.postMessage, port, 1);
	      // Browsers with postMessage, skip WebWorkers
	      // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	    } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
	        defer = function (id) {
	          global.postMessage(id + '', '*');
	        };
	        global.addEventListener('message', listner, false);
	        // IE8-
	      } else if (ONREADYSTATECHANGE in cel('script')) {
	          defer = function (id) {
	            html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
	              html.removeChild(this);
	              run.call(id);
	            };
	          };
	          // Rest old browsers
	        } else {
	            defer = function (id) {
	              setTimeout(ctx(run, id, 1), 0);
	            };
	          }
	}
	module.exports = {
	  set: setTask,
	  clear: clearTask
	};

/***/ },
/* 58 */
/***/ function(module, exports) {

	// fast apply, http://jsperf.lnkit.com/fast-apply/5
	"use strict";

	module.exports = function (fn, args, that) {
	                  var un = that === undefined;
	                  switch (args.length) {
	                                    case 0:
	                                                      return un ? fn() : fn.call(that);
	                                    case 1:
	                                                      return un ? fn(args[0]) : fn.call(that, args[0]);
	                                    case 2:
	                                                      return un ? fn(args[0], args[1]) : fn.call(that, args[0], args[1]);
	                                    case 3:
	                                                      return un ? fn(args[0], args[1], args[2]) : fn.call(that, args[0], args[1], args[2]);
	                                    case 4:
	                                                      return un ? fn(args[0], args[1], args[2], args[3]) : fn.call(that, args[0], args[1], args[2], args[3]);
	                  }return fn.apply(that, args);
	};

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(14).document && document.documentElement;

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isObject = __webpack_require__(39),
	    document = __webpack_require__(14).document,

	// in old IE typeof document.createElement is 'object'
	is = isObject(document) && isObject(document.createElement);
	module.exports = function (it) {
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var redefine = __webpack_require__(18);
	module.exports = function (target, src) {
	  for (var key in src) redefine(target, key, src[key]);
	  return target;
	};

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var core = __webpack_require__(15),
	    $ = __webpack_require__(3),
	    DESCRIPTORS = __webpack_require__(21),
	    SPECIES = __webpack_require__(27)('species');

	module.exports = function (KEY) {
	  var C = core[KEY];
	  if (DESCRIPTORS && C && !C[SPECIES]) $.setDesc(C, SPECIES, {
	    configurable: true,
	    get: function get() {
	      return this;
	    }
	  });
	};

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Array$from = __webpack_require__(64)['default'];

	var ITERATOR = __webpack_require__(27)('iterator'),
	    SAFE_CLOSING = false;

	try {
	  var riter = [7][ITERATOR]();
	  riter['return'] = function () {
	    SAFE_CLOSING = true;
	  };
	  _Array$from(riter, function () {
	    throw 2;
	  });
	} catch (e) {/* empty */}

	module.exports = function (exec, skipClosing) {
	  if (!skipClosing && !SAFE_CLOSING) return false;
	  var safe = false;
	  try {
	    var arr = [7],
	        iter = arr[ITERATOR]();
	    iter.next = function () {
	      safe = true;
	    };
	    arr[ITERATOR] = function () {
	      return iter;
	    };
	    exec(arr);
	  } catch (e) {/* empty */}
	  return safe;
	};

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = { "default": __webpack_require__(65), __esModule: true };

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(7);
	__webpack_require__(66);
	module.exports = __webpack_require__(15).Array.from;

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Array$from = __webpack_require__(64)['default'];

	var ctx = __webpack_require__(16),
	    $export = __webpack_require__(13),
	    toObject = __webpack_require__(67),
	    call = __webpack_require__(43),
	    isArrayIter = __webpack_require__(44),
	    toLength = __webpack_require__(45),
	    getIterFn = __webpack_require__(46);
	$export($export.S + $export.F * !__webpack_require__(63)(function (iter) {
	  _Array$from(iter);
	}), 'Array', {
	  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
	  from: function from(arrayLike /*, mapfn = undefined, thisArg = undefined*/) {
	    var O = toObject(arrayLike),
	        C = typeof this == 'function' ? this : Array,
	        $$ = arguments,
	        $$len = $$.length,
	        mapfn = $$len > 1 ? $$[1] : undefined,
	        mapping = mapfn !== undefined,
	        index = 0,
	        iterFn = getIterFn(O),
	        length,
	        result,
	        step,
	        iterator;
	    if (mapping) mapfn = ctx(mapfn, $$len > 2 ? $$[2] : undefined, 2);
	    // if object isn't iterable or it's array with default iterator - use simple case
	    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
	      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
	        result[index] = mapping ? call(iterator, mapfn, [step.value, index], true) : step.value;
	      }
	    } else {
	      length = toLength(O.length);
	      for (result = new C(length); length > index; index++) {
	        result[index] = mapping ? mapfn(O[index], index) : O[index];
	      }
	    }
	    result.length = index;
	    return result;
	  }
	});

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	'use strict';

	var defined = __webpack_require__(10);
	module.exports = function (it) {
	  return Object(defined(it));
	};

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = { "default": __webpack_require__(69), __esModule: true };

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(6);
	__webpack_require__(7);
	__webpack_require__(30);
	__webpack_require__(70);
	__webpack_require__(77);
	module.exports = __webpack_require__(15).Set;

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var strong = __webpack_require__(71);

	// 23.2 Set Objects
	__webpack_require__(76)('Set', function (get) {
	  return function Set() {
	    return get(this, arguments.length > 0 ? arguments[0] : undefined);
	  };
	}, {
	  // 23.2.3.1 Set.prototype.add(value)
	  add: function add(value) {
	    return strong.def(this, value = value === 0 ? 0 : value, value);
	  }
	}, strong);

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Object$isExtensible = __webpack_require__(72)['default'];

	var $ = __webpack_require__(3),
	    hide = __webpack_require__(19),
	    redefineAll = __webpack_require__(61),
	    ctx = __webpack_require__(16),
	    strictNew = __webpack_require__(41),
	    defined = __webpack_require__(10),
	    forOf = __webpack_require__(42),
	    $iterDefine = __webpack_require__(11),
	    step = __webpack_require__(33),
	    ID = __webpack_require__(29)('id'),
	    $has = __webpack_require__(23),
	    isObject = __webpack_require__(39),
	    setSpecies = __webpack_require__(62),
	    DESCRIPTORS = __webpack_require__(21),
	    isExtensible = _Object$isExtensible || isObject,
	    SIZE = DESCRIPTORS ? '_s' : 'size',
	    id = 0;

	var fastKey = function fastKey(it, create) {
	  // return primitive with prefix
	  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if (!$has(it, ID)) {
	    // can't set id to frozen object
	    if (!isExtensible(it)) return 'F';
	    // not necessary to add id
	    if (!create) return 'E';
	    // add missing object id
	    hide(it, ID, ++id);
	    // return object id with prefix
	  }return 'O' + it[ID];
	};

	var getEntry = function getEntry(that, key) {
	  // fast case
	  var index = fastKey(key),
	      entry;
	  if (index !== 'F') return that._i[index];
	  // frozen object case
	  for (entry = that._f; entry; entry = entry.n) {
	    if (entry.k == key) return entry;
	  }
	};

	module.exports = {
	  getConstructor: function getConstructor(wrapper, NAME, IS_MAP, ADDER) {
	    var C = wrapper(function (that, iterable) {
	      strictNew(that, C, NAME);
	      that._i = $.create(null); // index
	      that._f = undefined; // first entry
	      that._l = undefined; // last entry
	      that[SIZE] = 0; // size
	      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
	    });
	    redefineAll(C.prototype, {
	      // 23.1.3.1 Map.prototype.clear()
	      // 23.2.3.2 Set.prototype.clear()
	      clear: function clear() {
	        for (var that = this, data = that._i, entry = that._f; entry; entry = entry.n) {
	          entry.r = true;
	          if (entry.p) entry.p = entry.p.n = undefined;
	          delete data[entry.i];
	        }
	        that._f = that._l = undefined;
	        that[SIZE] = 0;
	      },
	      // 23.1.3.3 Map.prototype.delete(key)
	      // 23.2.3.4 Set.prototype.delete(value)
	      'delete': function _delete(key) {
	        var that = this,
	            entry = getEntry(that, key);
	        if (entry) {
	          var next = entry.n,
	              prev = entry.p;
	          delete that._i[entry.i];
	          entry.r = true;
	          if (prev) prev.n = next;
	          if (next) next.p = prev;
	          if (that._f == entry) that._f = next;
	          if (that._l == entry) that._l = prev;
	          that[SIZE]--;
	        }return !!entry;
	      },
	      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
	      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
	      forEach: function forEach(callbackfn /*, that = undefined */) {
	        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3),
	            entry;
	        while (entry = entry ? entry.n : this._f) {
	          f(entry.v, entry.k, this);
	          // revert to the last existing entry
	          while (entry && entry.r) entry = entry.p;
	        }
	      },
	      // 23.1.3.7 Map.prototype.has(key)
	      // 23.2.3.7 Set.prototype.has(value)
	      has: function has(key) {
	        return !!getEntry(this, key);
	      }
	    });
	    if (DESCRIPTORS) $.setDesc(C.prototype, 'size', {
	      get: function get() {
	        return defined(this[SIZE]);
	      }
	    });
	    return C;
	  },
	  def: function def(that, key, value) {
	    var entry = getEntry(that, key),
	        prev,
	        index;
	    // change existing entry
	    if (entry) {
	      entry.v = value;
	      // create new entry
	    } else {
	        that._l = entry = {
	          i: index = fastKey(key, true), // <- index
	          k: key, // <- key
	          v: value, // <- value
	          p: prev = that._l, // <- previous entry
	          n: undefined, // <- next entry
	          r: false // <- removed
	        };
	        if (!that._f) that._f = entry;
	        if (prev) prev.n = entry;
	        that[SIZE]++;
	        // add to index
	        if (index !== 'F') that._i[index] = entry;
	      }return that;
	  },
	  getEntry: getEntry,
	  setStrong: function setStrong(C, NAME, IS_MAP) {
	    // add .keys, .values, .entries, [@@iterator]
	    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
	    $iterDefine(C, NAME, function (iterated, kind) {
	      this._t = iterated; // target
	      this._k = kind; // kind
	      this._l = undefined; // previous
	    }, function () {
	      var that = this,
	          kind = that._k,
	          entry = that._l;
	      // revert to the last existing entry
	      while (entry && entry.r) entry = entry.p;
	      // get next entry
	      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
	        // or finish the iteration
	        that._t = undefined;
	        return step(1);
	      }
	      // return step by kind
	      if (kind == 'keys') return step(0, entry.k);
	      if (kind == 'values') return step(0, entry.v);
	      return step(0, [entry.k, entry.v]);
	    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

	    // add [@@species], 23.1.2.2, 23.2.2.2
	    setSpecies(NAME);
	  }
	};

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = { "default": __webpack_require__(73), __esModule: true };

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(74);
	module.exports = __webpack_require__(15).Object.isExtensible;

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.11 Object.isExtensible(O)
	'use strict';

	var isObject = __webpack_require__(39);

	__webpack_require__(75)('isExtensible', function ($isExtensible) {
	  return function isExtensible(it) {
	    return isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
	  };
	});

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	'use strict';

	var $export = __webpack_require__(13),
	    core = __webpack_require__(15),
	    fails = __webpack_require__(22);
	module.exports = function (KEY, exec) {
	  var fn = (core.Object || {})[KEY] || Object[KEY],
	      exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function () {
	    fn(1);
	  }), 'Object', exp);
	};

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $ = __webpack_require__(3),
	    global = __webpack_require__(14),
	    $export = __webpack_require__(13),
	    fails = __webpack_require__(22),
	    hide = __webpack_require__(19),
	    redefineAll = __webpack_require__(61),
	    forOf = __webpack_require__(42),
	    strictNew = __webpack_require__(41),
	    isObject = __webpack_require__(39),
	    setToStringTag = __webpack_require__(26),
	    DESCRIPTORS = __webpack_require__(21);

	module.exports = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
	  var Base = global[NAME],
	      C = Base,
	      ADDER = IS_MAP ? 'set' : 'add',
	      proto = C && C.prototype,
	      O = {};
	  if (!DESCRIPTORS || typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function () {
	    new C().entries().next();
	  }))) {
	    // create collection constructor
	    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
	    redefineAll(C.prototype, methods);
	  } else {
	    C = wrapper(function (target, iterable) {
	      strictNew(target, C, NAME);
	      target._c = new Base();
	      if (iterable != undefined) forOf(iterable, IS_MAP, target[ADDER], target);
	    });
	    $.each.call('add,clear,delete,forEach,get,has,set,keys,values,entries'.split(','), function (KEY) {
	      var IS_ADDER = KEY == 'add' || KEY == 'set';
	      if (KEY in proto && !(IS_WEAK && KEY == 'clear')) hide(C.prototype, KEY, function (a, b) {
	        if (!IS_ADDER && IS_WEAK && !isObject(a)) return KEY == 'get' ? undefined : false;
	        var result = this._c[KEY](a === 0 ? 0 : a, b);
	        return IS_ADDER ? this : result;
	      });
	    });
	    if ('size' in proto) $.setDesc(C.prototype, 'size', {
	      get: function get() {
	        return this._c.size;
	      }
	    });
	  }

	  setToStringTag(C, NAME);

	  O[NAME] = C;
	  $export($export.G + $export.W + $export.F, O);

	  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

	  return C;
	};

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	'use strict';

	var $export = __webpack_require__(13);

	$export($export.P, 'Set', { toJSON: __webpack_require__(78)('Set') });

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	'use strict';

	var forOf = __webpack_require__(42),
	    classof = __webpack_require__(38);
	module.exports = function (NAME) {
	  return function toJSON() {
	    if (classof(this) != NAME) throw TypeError(NAME + "#toJSON isn't generic");
	    var arr = [];
	    forOf(this, false, arr.push, arr);
	    return arr;
	  };
	};

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = { "default": __webpack_require__(80), __esModule: true };

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(30);
	__webpack_require__(7);
	module.exports = __webpack_require__(81);

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var anObject = __webpack_require__(40),
	    get = __webpack_require__(46);
	module.exports = __webpack_require__(15).getIterator = function (it) {
	  var iterFn = get(it);
	  if (typeof iterFn != 'function') throw TypeError(it + ' is not iterable!');
	  return anObject(iterFn.call(it));
	};

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = { "default": __webpack_require__(83), __esModule: true };

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(7);
	__webpack_require__(30);
	module.exports = __webpack_require__(27)('iterator');

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = { "default": __webpack_require__(85), __esModule: true };

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(6);
	__webpack_require__(30);
	__webpack_require__(86);
	module.exports = __webpack_require__(15).WeakMap;

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Object$isExtensible = __webpack_require__(72)['default'];

	var _Object$freeze = __webpack_require__(87)['default'];

	var $ = __webpack_require__(3),
	    redefine = __webpack_require__(18),
	    weak = __webpack_require__(90),
	    isObject = __webpack_require__(39),
	    has = __webpack_require__(23),
	    frozenStore = weak.frozenStore,
	    WEAK = weak.WEAK,
	    isExtensible = _Object$isExtensible || isObject,
	    tmp = {};

	// 23.3 WeakMap Objects
	var $WeakMap = __webpack_require__(76)('WeakMap', function (get) {
	  return function WeakMap() {
	    return get(this, arguments.length > 0 ? arguments[0] : undefined);
	  };
	}, {
	  // 23.3.3.3 WeakMap.prototype.get(key)
	  get: function get(key) {
	    if (isObject(key)) {
	      if (!isExtensible(key)) return frozenStore(this).get(key);
	      if (has(key, WEAK)) return key[WEAK][this._i];
	    }
	  },
	  // 23.3.3.5 WeakMap.prototype.set(key, value)
	  set: function set(key, value) {
	    return weak.def(this, key, value);
	  }
	}, weak, true, true);

	// IE11 WeakMap frozen keys fix
	if (new $WeakMap().set((_Object$freeze || Object)(tmp), 7).get(tmp) != 7) {
	  $.each.call(['delete', 'has', 'get', 'set'], function (key) {
	    var proto = $WeakMap.prototype,
	        method = proto[key];
	    redefine(proto, key, function (a, b) {
	      // store frozen objects on leaky map
	      if (isObject(a) && !isExtensible(a)) {
	        var result = frozenStore(this)[key](a, b);
	        return key == 'set' ? this : result;
	        // store all the rest on native weakmap
	      }return method.call(this, a, b);
	    });
	  });
	}

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = { "default": __webpack_require__(88), __esModule: true };

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(89);
	module.exports = __webpack_require__(15).Object.freeze;

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.5 Object.freeze(O)
	'use strict';

	var isObject = __webpack_require__(39);

	__webpack_require__(75)('freeze', function ($freeze) {
	  return function freeze(it) {
	    return $freeze && isObject(it) ? $freeze(it) : it;
	  };
	});

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Object$isExtensible = __webpack_require__(72)['default'];

	var hide = __webpack_require__(19),
	    redefineAll = __webpack_require__(61),
	    anObject = __webpack_require__(40),
	    isObject = __webpack_require__(39),
	    strictNew = __webpack_require__(41),
	    forOf = __webpack_require__(42),
	    createArrayMethod = __webpack_require__(91),
	    $has = __webpack_require__(23),
	    WEAK = __webpack_require__(29)('weak'),
	    isExtensible = _Object$isExtensible || isObject,
	    arrayFind = createArrayMethod(5),
	    arrayFindIndex = createArrayMethod(6),
	    id = 0;

	// fallback for frozen keys
	var frozenStore = function frozenStore(that) {
	  return that._l || (that._l = new FrozenStore());
	};
	var FrozenStore = function FrozenStore() {
	  this.a = [];
	};
	var findFrozen = function findFrozen(store, key) {
	  return arrayFind(store.a, function (it) {
	    return it[0] === key;
	  });
	};
	FrozenStore.prototype = {
	  get: function get(key) {
	    var entry = findFrozen(this, key);
	    if (entry) return entry[1];
	  },
	  has: function has(key) {
	    return !!findFrozen(this, key);
	  },
	  set: function set(key, value) {
	    var entry = findFrozen(this, key);
	    if (entry) entry[1] = value;else this.a.push([key, value]);
	  },
	  'delete': function _delete(key) {
	    var index = arrayFindIndex(this.a, function (it) {
	      return it[0] === key;
	    });
	    if (~index) this.a.splice(index, 1);
	    return !! ~index;
	  }
	};

	module.exports = {
	  getConstructor: function getConstructor(wrapper, NAME, IS_MAP, ADDER) {
	    var C = wrapper(function (that, iterable) {
	      strictNew(that, C, NAME);
	      that._i = id++; // collection id
	      that._l = undefined; // leak store for frozen objects
	      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
	    });
	    redefineAll(C.prototype, {
	      // 23.3.3.2 WeakMap.prototype.delete(key)
	      // 23.4.3.3 WeakSet.prototype.delete(value)
	      'delete': function _delete(key) {
	        if (!isObject(key)) return false;
	        if (!isExtensible(key)) return frozenStore(this)['delete'](key);
	        return $has(key, WEAK) && $has(key[WEAK], this._i) && delete key[WEAK][this._i];
	      },
	      // 23.3.3.4 WeakMap.prototype.has(key)
	      // 23.4.3.4 WeakSet.prototype.has(value)
	      has: function has(key) {
	        if (!isObject(key)) return false;
	        if (!isExtensible(key)) return frozenStore(this).has(key);
	        return $has(key, WEAK) && $has(key[WEAK], this._i);
	      }
	    });
	    return C;
	  },
	  def: function def(that, key, value) {
	    if (!isExtensible(anObject(key))) {
	      frozenStore(that).set(key, value);
	    } else {
	      $has(key, WEAK) || hide(key, WEAK, {});
	      key[WEAK][that._i] = value;
	    }return that;
	  },
	  frozenStore: frozenStore,
	  WEAK: WEAK
	};

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	// 0 -> Array#forEach
	// 1 -> Array#map
	// 2 -> Array#filter
	// 3 -> Array#some
	// 4 -> Array#every
	// 5 -> Array#find
	// 6 -> Array#findIndex
	'use strict';

	var ctx = __webpack_require__(16),
	    IObject = __webpack_require__(35),
	    toObject = __webpack_require__(67),
	    toLength = __webpack_require__(45),
	    asc = __webpack_require__(92);
	module.exports = function (TYPE) {
	  var IS_MAP = TYPE == 1,
	      IS_FILTER = TYPE == 2,
	      IS_SOME = TYPE == 3,
	      IS_EVERY = TYPE == 4,
	      IS_FIND_INDEX = TYPE == 6,
	      NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
	  return function ($this, callbackfn, that) {
	    var O = toObject($this),
	        self = IObject(O),
	        f = ctx(callbackfn, that, 3),
	        length = toLength(self.length),
	        index = 0,
	        result = IS_MAP ? asc($this, length) : IS_FILTER ? asc($this, 0) : undefined,
	        val,
	        res;
	    for (; length > index; index++) if (NO_HOLES || index in self) {
	      val = self[index];
	      res = f(val, index, O);
	      if (TYPE) {
	        if (IS_MAP) result[index] = res; // map
	        else if (res) switch (TYPE) {
	            case 3:
	              return true; // some
	            case 5:
	              return val; // find
	            case 6:
	              return index; // findIndex
	            case 2:
	              result.push(val); // filter
	          } else if (IS_EVERY) return false; // every
	      }
	    }
	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
	  };
	};

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
	'use strict';

	var isObject = __webpack_require__(39),
	    isArray = __webpack_require__(93),
	    SPECIES = __webpack_require__(27)('species');
	module.exports = function (original, length) {
	  var C;
	  if (isArray(original)) {
	    C = original.constructor;
	    // cross-realm fallback
	    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
	    if (isObject(C)) {
	      C = C[SPECIES];
	      if (C === null) C = undefined;
	    }
	  }return new (C === undefined ? Array : C)(length);
	};

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	'use strict';

	var cof = __webpack_require__(36);
	module.exports = Array.isArray || function (arg) {
	  return cof(arg) == 'Array';
	};

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = { "default": __webpack_require__(95), __esModule: true };

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(96);
	module.exports = __webpack_require__(15).String.fromCodePoint;

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _String$fromCodePoint = __webpack_require__(94)['default'];

	var $export = __webpack_require__(13),
	    toIndex = __webpack_require__(97),
	    fromCharCode = String.fromCharCode,
	    $fromCodePoint = _String$fromCodePoint;

	// length should be 1, old FF problem
	$export($export.S + $export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
	  // 21.1.2.2 String.fromCodePoint(...codePoints)
	  fromCodePoint: function fromCodePoint(x) {
	    // eslint-disable-line no-unused-vars
	    var res = [],
	        $$ = arguments,
	        $$len = $$.length,
	        i = 0,
	        code;
	    while ($$len > i) {
	      code = +$$[i++];
	      if (toIndex(code, 0x10ffff) !== code) throw RangeError(code + ' is not a valid code point');
	      res.push(code < 0x10000 ? fromCharCode(code) : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00));
	    }return res.join('');
	  }
	});

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var toInteger = __webpack_require__(9),
	    max = Math.max,
	    min = Math.min;
	module.exports = function (index, length) {
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = { "default": __webpack_require__(99), __esModule: true };

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(6);
	__webpack_require__(30);
	__webpack_require__(100);
	module.exports = __webpack_require__(15).WeakSet;

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var weak = __webpack_require__(90);

	// 23.4 WeakSet Objects
	__webpack_require__(76)('WeakSet', function (get) {
	  return function WeakSet() {
	    return get(this, arguments.length > 0 ? arguments[0] : undefined);
	  };
	}, {
	  // 23.4.3.1 WeakSet.prototype.add(value)
	  add: function add(value) {
	    return weak.def(this, value, true);
	  }
	}, weak, false, true);

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = { "default": __webpack_require__(102), __esModule: true };

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(6);
	__webpack_require__(7);
	__webpack_require__(30);
	__webpack_require__(103);
	__webpack_require__(104);
	module.exports = __webpack_require__(15).Map;

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var strong = __webpack_require__(71);

	// 23.1 Map Objects
	__webpack_require__(76)('Map', function (get) {
	  return function Map() {
	    return get(this, arguments.length > 0 ? arguments[0] : undefined);
	  };
	}, {
	  // 23.1.3.6 Map.prototype.get(key)
	  get: function get(key) {
	    var entry = strong.getEntry(this, key);
	    return entry && entry.v;
	  },
	  // 23.1.3.9 Map.prototype.set(key, value)
	  set: function set(key, value) {
	    return strong.def(this, key === 0 ? 0 : key, value);
	  }
	}, strong, true);

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	'use strict';

	var $export = __webpack_require__(13);

	$export($export.P, 'Map', { toJSON: __webpack_require__(78)('Map') });

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = { "default": __webpack_require__(106), __esModule: true };

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(107);
	module.exports = __webpack_require__(15).Object.keys;

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 Object.keys(O)
	'use strict';

	var toObject = __webpack_require__(67);

	__webpack_require__(75)('keys', function ($keys) {
	  return function keys(it) {
	    return $keys(toObject(it));
	  };
	});

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = { "default": __webpack_require__(109), __esModule: true };

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $ = __webpack_require__(3);
	module.exports = function defineProperties(T, D) {
	  return $.setDescs(T, D);
	};

/***/ }
/******/ ]);