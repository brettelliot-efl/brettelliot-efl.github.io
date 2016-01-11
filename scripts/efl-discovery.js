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
	
	var _discoveryJs = __webpack_require__(1);
	
	window.EFLDiscoveryModule = new _discoveryJs.EFLDiscoveryModule(window);

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
	
	var EFLDiscoveryModule = (function () {
	    function EFLDiscoveryModule(context) {
	        var _this = this;
	
	        _classCallCheck(this, EFLDiscoveryModule);
	
	        this.context = context;
	
	        context.handleMessageProxy = function (event) {
	            _this.handleMessage(event);
	        };
	
	        context.onresize = function () {
	            _this.resizedScreen();
	        };
	
	        if (!this.context.location.origin) {
	            this.context.location.origin = this.context.location.protocol + "//" + this.context.location.hostname + (this.context.location.port ? ':' + this.context.location.port : '');
	        }
	
	        this.context.addEventListener('message', this.context.handleMessageProxy, false);
	        this.pendingEvents = [];
	    }
	
	    _createClass(EFLDiscoveryModule, [{
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
	            var stepName;
	            var config;
	            var lang;
	            var timerTime;
	            switch (eventData.type) {
	                case _moduleEventsJs.MODULE_EVENTS.INITIALIZE_MODULE:
	                    if (eventData.data) {
	                        stepName = eventData.data.stepName;
	                        config = eventData.data.config;
	                    }
	                    this.initializeModule(event.source, stepName, config);
	                    break;
	                case _moduleEventsJs.MODULE_EVENTS.PRESSED_NAVIGATION_BUTTON:
	                    if (eventData.data.button === 'back' && this.backButtonHandler) {
	                        this.backButtonHandler();
	                    } else if (eventData.data.button === 'next' && this.nextButtonHandler) {
	                        this.nextButtonHandler();
	                    }
	                    break;
	                case _moduleEventsJs.MODULE_EVENTS.CHANGED_LANGUAGE:
	                    if (eventData.data) {
	                        lang = eventData.data.language;
	                    }
	                    if (this.changedLanguageHandler) {
	                        this.changedLanguageHandler(lang);
	                    }
	                    break;
	                case _moduleEventsJs.MODULE_EVENTS.INITIALIZED_TIMER:
	                    if (this.initializedTimerHandler) {
	                        this.initializedTimerHandler();
	                    }
	                    break;
	                case _moduleEventsJs.MODULE_EVENTS.CHANGED_TIMER_STATE:
	                    if (eventData.data.state === _moduleEventsJs.TIMER_STATES.STARTED && this.startedTimerHandler) {
	                        this.startedTimerHandler();
	                    } else if (eventData.data.state === _moduleEventsJs.TIMER_STATES.PAUSED && this.pausedTimerHandler) {
	                        this.pausedTimerHandler();
	                    } else if (eventData.data.state === _moduleEventsJs.TIMER_STATES.FINISHED && this.finishedTimerHandler) {
	                        this.finishedTimerHandler();
	                    }
	                    break;
	                case _moduleEventsJs.MODULE_EVENTS.TIMER_TIME_RESPONSE:
	                    if (eventData.data) {
	                        timerTime = eventData.data.time;
	                    }
	                    if (this.timerTimeResponseHandler) {
	                        this.timerTimeResponseHandler(timerTime);
	                    }
	                    break;
	                default:
	                    break;
	            }
	        }
	    }, {
	        key: 'init',
	        value: function init(config) {
	            if (config instanceof Object) {
	                this.initModuleHandler = config.initModuleHandler;
	                this.backButtonHandler = config.backButtonHandler;
	                this.nextButtonHandler = config.nextButtonHandler;
	                this.changedLanguageHandler = config.changedLanguageHandler;
	                this.initializedTimerHandler = config.initializedTimerHandler;
	                this.startedTimerHandler = config.startedTimerHandler;
	                this.pausedTimerHandler = config.pausedTimerHandler;
	                this.finishedTimerHandler = config.finishedTimerHandler;
	                this.timerTimeResponseHandler = config.timerTimeResponseHandler;
	            }
	        }
	    }, {
	        key: 'initializeModule',
	        value: function initializeModule(eventSource, stepName, config) {
	            if (eventSource !== undefined) {
	                this.eventsDestination = eventSource;
	                this.stepName = stepName;
	                for (var i = 0; i < this.pendingEvents.length; i++) {
	                    var eventData = this.pendingEvents[i];
	                    this.eventsDestination.postMessage(JSON.stringify(eventData), document.location.origin);
	                }
	                this.pendingEvents = [];
	            }
	            if (config && config.hasOwnProperty('applicantJourney') && config['applicantJourney'].hasOwnProperty('step') && config['applicantJourney']['step'].hasOwnProperty('style')) {
	                this.injectStyle(config['applicantJourney']['step']['style']);
	            }
	            if (this.initModuleHandler) {
	                this.initModuleHandler(stepName, config);
	            }
	        }
	    }, {
	        key: 'sendPostMessage',
	        value: function sendPostMessage(type, data) {
	            var eventData;
	            if (type !== undefined) {
	                eventData = {
	                    type: type
	                };
	                if (data !== undefined) {
	                    eventData.data = data;
	                }
	            }
	
	            if (this.eventsDestination !== undefined) {
	                this.eventsDestination.postMessage(JSON.stringify(eventData), document.location.origin);
	            } else {
	                this.pendingEvents.push(eventData);
	            }
	        }
	    }, {
	        key: 'loadedModule',
	        value: function loadedModule() {
	            this.sendPostMessage(_moduleEventsJs.MODULE_EVENTS.LOADED_MODULE, { stepName: this.stepName });
	        }
	    }, {
	        key: 'finishedModule',
	        value: function finishedModule(moduleValues) {
	            var data = {
	                'stepName': this.stepName
	            };
	            if (typeof moduleValues === 'object') {
	                if (typeof moduleValues.observations === 'object') {
	                    data.observations = moduleValues.observations;
	                }
	                if (typeof moduleValues.metas === 'object') {
	                    data.metas = moduleValues.metas;
	                }
	                if (typeof moduleValues.applicant === 'object') {
	                    data.applicant = moduleValues.applicant;
	                }
	                if (typeof moduleValues.state === 'object') {
	                    data.state = moduleValues.state;
	                }
	            }
	            this.sendPostMessage(_moduleEventsJs.MODULE_EVENTS.FINISHED_MODULE, data);
	        }
	    }, {
	        key: 'loadedScreen',
	        value: function loadedScreen(navigation) {
	            var value = {};
	            if (navigation) {
	                if (navigation.showNextButton === true) {
	                    value.showNextButton = true;
	                }
	                if (navigation.showBackButton === true) {
	                    value.showBackButton = true;
	                }
	                if (navigation.hideTitle === true) {
	                    value.hideTitle = true;
	                }
	                if (navigation.hideProgress === true) {
	                    value.hideProgress = true;
	                }
	                if (navigation.showTimer === true) {
	                    value.showTimer = true;
	                }
	            }
	            this.sendPostMessage(_moduleEventsJs.MODULE_EVENTS.LOADED_SCREEN, { 'navigation': value });
	            this.resizedScreen();
	        }
	    }, {
	        key: 'finishedScreen',
	        value: function finishedScreen(progress) {
	            this.sendPostMessage(_moduleEventsJs.MODULE_EVENTS.FINISHED_SCREEN, { 'progress': progress });
	        }
	    }, {
	        key: 'caughtException',
	        value: function caughtException(category, message) {
	            var data = {};
	            if (category) {
	                data.category = category;
	            }
	            if (message) {
	                data.message = message;
	            }
	            this.sendPostMessage(_moduleEventsJs.MODULE_EVENTS.CAUGHT_EXCEPTION, data);
	        }
	    }, {
	        key: 'resizedScreen',
	        value: function resizedScreen() {
	            var topMeasureDiv = document.createElement('div');
	            topMeasureDiv.style.position = 'absolute';
	            topMeasureDiv.style.top = 0;
	            document.body.insertBefore(topMeasureDiv, document.body.firstChild);
	
	            var bottomMeasureDiv = document.createElement('div');
	            document.body.appendChild(bottomMeasureDiv);
	
	            var top = +topMeasureDiv.getBoundingClientRect().top;
	            var bottom = +bottomMeasureDiv.getBoundingClientRect().bottom;
	
	            var data = {
	                height: Math.ceil(bottom - top)
	            };
	            document.body.removeChild(topMeasureDiv);
	            document.body.removeChild(bottomMeasureDiv);
	
	            this.sendPostMessage(_moduleEventsJs.MODULE_EVENTS.CHANGED_HEIGHT, data);
	        }
	    }, {
	        key: 'getElementSizeValue',
	        value: function getElementSizeValue(element, style) {
	            var margin = window.getComputedStyle(element, null)[style];
	            var regex = /(\d+)px/g;
	            var found = regex.exec(margin);
	            if (found && found[1]) {
	                return found[1];
	            }
	        }
	    }, {
	        key: 'injectStyle',
	        value: function injectStyle(style) {
	            var el = document.createElement('style');
	            el.type = 'text/css';
	            el.innerText = style;
	            document.head.appendChild(el);
	        }
	    }, {
	        key: 'initTimer',
	        value: function initTimer(time, enableTimeExtension, enableControl) {
	            var data = {
	                time: time,
	                enableTimeExtension: enableTimeExtension !== false,
	                enableControl: enableControl !== false
	            };
	            this.sendPostMessage(_moduleEventsJs.MODULE_EVENTS.INIT_TIMER, data);
	        }
	    }, {
	        key: 'startTimer',
	        value: function startTimer() {
	            this.sendPostMessage(_moduleEventsJs.MODULE_EVENTS.START_TIMER);
	        }
	    }, {
	        key: 'pauseTimer',
	        value: function pauseTimer() {
	            this.sendPostMessage(_moduleEventsJs.MODULE_EVENTS.PAUSE_TIMER);
	        }
	    }, {
	        key: 'requestTimerTime',
	        value: function requestTimerTime() {
	            this.sendPostMessage(_moduleEventsJs.MODULE_EVENTS.REQUEST_TIMER_TIME);
	        }
	    }, {
	        key: 'changedView',
	        value: function changedView() {
	            this.sendPostMessage(_moduleEventsJs.MODULE_EVENTS.CHANGED_VIEW);
	        }
	    }]);
	
	    return EFLDiscoveryModule;
	})();

	exports.EFLDiscoveryModule = EFLDiscoveryModule;

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
//# sourceMappingURL=efl-discovery.js.map