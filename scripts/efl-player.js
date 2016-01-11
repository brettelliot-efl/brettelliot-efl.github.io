/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _playerJs = __webpack_require__(1);
	
	window.EFLPlayer = new _playerJs.EFLPlayer(window);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	var _moduleEventsJs = __webpack_require__(2);
	
	var EFLPlayer = (function () {
	    function EFLPlayer(context) {
	        var _this = this;
	
	        _classCallCheck(this, EFLPlayer);
	
	        this.context = context;
	
	        if (!this.context.location.origin) {
	            this.context.location.origin = this.context.location.protocol + "//" + this.context.location.hostname + (this.context.location.port ? ':' + this.context.location.port : '');
	        }
	
	        context.handleMessageProxy = function (event) {
	            _this.handleMessage(event);
	        };
	
	        this.context.addEventListener('message', this.context.handleMessageProxy, false);
	        this.moduleLoadedHandler = undefined;
	        this.moduleFinishedHandler = undefined;
	        this.screenLoadedHandler = undefined;
	        this.screenFinishedHandler = undefined;
	        this.moduleExceptionHandler = undefined;
	        this.moduleHeightChangedHandler = undefined;
	        this.initTimerHandler = undefined;
	        this.startTimerHandler = undefined;
	        this.pauseTimerHandler = undefined;
	        this.requestTimerTimeHandler = undefined;
	
	        EPUBJS.Hooks.register("beforeChapterDisplay").wgxpath = function (callback, renderer) {
	            wgxpath.install(renderer.render.window);
	            if (callback) callback();
	        };
	        wgxpath.install(context);
	    }
	
	    _createClass(EFLPlayer, [{
	        key: 'removeListener',
	        value: function removeListener() {
	            this.context.removeEventListener('message', this.context.handleMessageProxy);
	        }
	    }, {
	        key: 'handleMessage',
	        value: function handleMessage(event) {
	            if (event.origin !== document.location.origin) {
	                return;
	            }
	            var eventData = JSON.parse(event.data);
	            var navigation;
	            var progress;
	            var stepName;
	            var observations, metas, applicant, state;
	            var category;
	            var message;
	            var height;
	            var timerTime, enableTimeExtension, enableControl;
	            switch (eventData.type) {
	                case _moduleEventsJs.MODULE_EVENTS.LOADED_MODULE:
	                    if (eventData.data) {
	                        stepName = eventData.data.stepName;
	                    }
	                    this.loadedModule(stepName);
	                    break;
	                case _moduleEventsJs.MODULE_EVENTS.LOADED_SCREEN:
	                    if (eventData.data) {
	                        navigation = eventData.data.navigation;
	                    }
	                    this.loadedScreen(navigation);
	                    break;
	                case _moduleEventsJs.MODULE_EVENTS.FINISHED_SCREEN:
	                    if (eventData.data) {
	                        progress = eventData.data.progress;
	                    }
	                    this.finishedScreen(progress);
	                    break;
	                case _moduleEventsJs.MODULE_EVENTS.FINISHED_MODULE:
	                    if (eventData.data) {
	                        stepName = eventData.data.stepName;
	                        observations = eventData.data.observations;
	                        metas = eventData.data.metas;
	                        applicant = eventData.data.applicant;
	                        state = eventData.data.state;
	                    }
	                    this.finishedModule(stepName, observations, metas, applicant, state);
	                    break;
	                case _moduleEventsJs.MODULE_EVENTS.CAUGHT_EXCEPTION:
	                    if (eventData.data) {
	                        category = eventData.data.category;
	                        message = eventData.data.message;
	                    }
	                    this.moduleException(category, message);
	                    break;
	                case _moduleEventsJs.MODULE_EVENTS.CHANGED_HEIGHT:
	                    if (eventData.data) {
	                        height = eventData.data.height;
	                    }
	                    this.moduleHeightChanged(height);
	                    break;
	                case _moduleEventsJs.MODULE_EVENTS.INIT_TIMER:
	                    if (eventData.data) {
	                        timerTime = eventData.data.time;
	                        enableTimeExtension = eventData.data.enableTimeExtension;
	                        enableControl = eventData.data.enableControl;
	                    }
	                    this.initTimer(timerTime, enableTimeExtension, enableControl);
	                    break;
	                case _moduleEventsJs.MODULE_EVENTS.START_TIMER:
	                    this.startTimer();
	                    break;
	                case _moduleEventsJs.MODULE_EVENTS.PAUSE_TIMER:
	                    this.pauseTimer();
	                    break;
	                case _moduleEventsJs.MODULE_EVENTS.REQUEST_TIMER_TIME:
	                    this.requestTimerTime();
	                    break;
	                case _moduleEventsJs.MODULE_EVENTS.CHANGED_VIEW:
	                    this.changedView();
	                    break;
	                default:
	                    break;
	            }
	        }
	    }, {
	        key: 'sendPostMessage',
	        value: function sendPostMessage(type, data) {
	            if (this.moduleWindow !== undefined && type !== undefined) {
	                var eventData = {
	                    type: type
	                };
	                if (data !== undefined) {
	                    eventData.data = data;
	                }
	                this.moduleWindow.postMessage(JSON.stringify(eventData), document.location.origin);
	            }
	        }
	    }, {
	        key: 'init',
	        value: function init(config) {
	            var options = {
	                layoutOveride: {
	                    layout: 'pre-paginated'
	                }
	            };
	            config = config || {};
	            if (config.width) {
	                options.width = config.width;
	            }
	            if (config.height) {
	                options.height = config.height;
	            }
	            if (config.target) {
	                this.target = config.target;
	            }
	            this.rendererOptions = options;
	        }
	    }, {
	        key: 'loadModule',
	        value: function loadModule(stepName, url, config) {
	            var self = this;
	            this.moduleName = name;
	            this.moduleInitilized = false;
	
	            if (this.renderer) {
	                this.renderer.destroy();
	            }
	
	            this.renderer = ePub(url, this.rendererOptions);
	
	            var bookReadyHandler = function bookReadyHandler() {
	                var iframe = document.getElementById(self.target).getElementsByTagName('iframe');
	                if (iframe.length > 0) {
	                    self.moduleWindow = iframe[0].contentWindow;
	                }
	                self.renderer.off('book:ready', bookReadyHandler);
	            };
	
	            var chapterDisplayedHandler = function chapterDisplayedHandler() {
	                if (!self.moduleInitilized) {
	                    self.sendPostMessage(_moduleEventsJs.MODULE_EVENTS.INITIALIZE_MODULE, { stepName: stepName, config: config });
	                    self.moduleInitilized = true;
	                }
	                self.renderer.off('renderer:chapterDisplayed', chapterDisplayedHandler);
	            };
	
	            this.renderer.on('book:ready', bookReadyHandler);
	            this.renderer.on('renderer:chapterDisplayed', chapterDisplayedHandler);
	
	            this.renderer.renderTo(this.target);
	        }
	    }, {
	        key: 'loadedModule',
	        value: function loadedModule(stepName) {
	            if (this.moduleLoadedHandler) {
	                this.moduleLoadedHandler(stepName);
	            }
	        }
	    }, {
	        key: 'loadedScreen',
	        value: function loadedScreen(navigation) {
	            if (this.screenLoadedHandler) {
	                this.screenLoadedHandler(navigation);
	            }
	        }
	    }, {
	        key: 'finishedScreen',
	        value: function finishedScreen(progress) {
	            if (this.screenFinishedHandler) {
	                this.screenFinishedHandler(progress);
	            }
	        }
	    }, {
	        key: 'finishedModule',
	        value: function finishedModule(stepName, observations, metas, applicant, state) {
	            if (this.moduleFinishedHandler) {
	                this.moduleFinishedHandler(stepName, observations, metas, applicant, state);
	            }
	        }
	    }, {
	        key: 'moduleException',
	        value: function moduleException(category, message) {
	            if (this.moduleExceptionHandler) {
	                this.moduleExceptionHandler(category, message);
	            }
	        }
	    }, {
	        key: 'nextButtonTapped',
	        value: function nextButtonTapped() {
	            this.sendPostMessage(_moduleEventsJs.MODULE_EVENTS.PRESSED_NAVIGATION_BUTTON, { button: 'next' });
	        }
	    }, {
	        key: 'backButtonTapped',
	        value: function backButtonTapped() {
	            this.sendPostMessage(_moduleEventsJs.MODULE_EVENTS.PRESSED_NAVIGATION_BUTTON, { button: 'back' });
	        }
	    }, {
	        key: 'languageChanged',
	        value: function languageChanged(language) {
	            this.sendPostMessage(_moduleEventsJs.MODULE_EVENTS.CHANGED_LANGUAGE, { language: language });
	        }
	    }, {
	        key: 'closeModule',
	        value: function closeModule() {
	            if (this.renderer) {
	                this.renderer.destroy();
	                this.renderer = undefined;
	            }
	        }
	    }, {
	        key: 'moduleHeightChanged',
	        value: function moduleHeightChanged(height) {
	            if (this.moduleHeightChangedHandler) {
	                this.moduleHeightChangedHandler(height);
	            }
	        }
	    }, {
	        key: 'initTimer',
	        value: function initTimer(time, enableTimeExtension, enableControl) {
	            if (this.initTimerHandler) {
	                this.initTimerHandler(time, enableTimeExtension !== false, enableControl !== false);
	            }
	        }
	    }, {
	        key: 'startTimer',
	        value: function startTimer() {
	            if (this.startTimerHandler) {
	                this.startTimerHandler();
	            }
	        }
	    }, {
	        key: 'pauseTimer',
	        value: function pauseTimer() {
	            if (this.pauseTimerHandler) {
	                this.pauseTimerHandler();
	            }
	        }
	    }, {
	        key: 'requestTimerTime',
	        value: function requestTimerTime() {
	            if (this.requestTimerTimeHandler) {
	                this.requestTimerTimeHandler();
	            }
	        }
	    }, {
	        key: 'initializedTimer',
	        value: function initializedTimer() {
	            this.sendPostMessage(_moduleEventsJs.MODULE_EVENTS.INITIALIZED_TIMER);
	        }
	    }, {
	        key: 'changedTimerState',
	        value: function changedTimerState(state) {
	            this.sendPostMessage(_moduleEventsJs.MODULE_EVENTS.CHANGED_TIMER_STATE, { state: state });
	        }
	    }, {
	        key: 'timerTimeResponse',
	        value: function timerTimeResponse(time) {
	            this.sendPostMessage(_moduleEventsJs.MODULE_EVENTS.TIMER_TIME_RESPONSE, { time: time });
	        }
	    }, {
	        key: 'changedView',
	        value: function changedView() {
	            var chapter = this.renderer.renderer.currentChapter;
	            chapter.contents = document.querySelector('div#efl-player > iframe').contentWindow.document;
	            chapter.replaceWithStored("[src]", "src", EPUBJS.replace.srcs);
	        }
	    }]);
	
	    return EFLPlayer;
	})();

	exports.EFLPlayer = EFLPlayer;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	var MODULE_EVENTS = {
	    INITIALIZE_MODULE: 'initializeModule',
	    PRESSED_NAVIGATION_BUTTON: 'pressedNavigationButton',
	    LOADED_MODULE: 'loadedModule',
	    LOADED_SCREEN: 'loadedScreen',
	    FINISHED_SCREEN: 'finishedScreen',
	    FINISHED_MODULE: 'finishedModule',
	    CAUGHT_EXCEPTION: 'caughtException',
	    CHANGED_LANGUAGE: 'changedLanguage',
	    CHANGED_HEIGHT: 'changedHeight',
	    INITIALIZED_TIMER: 'initializedTimer',
	    CHANGED_TIMER_STATE: 'changedTimerState',
	    TIMER_TIME_RESPONSE: 'timerTimeResponse',
	    INIT_TIMER: 'initTimer',
	    START_TIMER: 'startTimer',
	    PAUSE_TIMER: 'pauseTimer',
	    REQUEST_TIMER_TIME: 'requestTimerTime',
	    CHANGED_VIEW: 'changedView'
	};
	
	exports.MODULE_EVENTS = MODULE_EVENTS;
	var TIMER_STATES = {
	    STARTED: 'STARTED',
	    PAUSED: 'PAUSED',
	    FINISHED: 'FINISHED'
	};
	exports.TIMER_STATES = TIMER_STATES;

/***/ }
/******/ ]);
//# sourceMappingURL=efl-player.js.map