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
	
	var _journeyJs = __webpack_require__(1);
	
	window.EFLJourney = new _journeyJs.EFLJourney(window);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	var _apiJs = __webpack_require__(2);
	
	var _apiJs2 = _interopRequireDefault(_apiJs);
	
	var _localizationJs = __webpack_require__(3);
	
	var _localizationJs2 = _interopRequireDefault(_localizationJs);
	
	var _moduleEventsJs = __webpack_require__(4);
	
	var JOURNEY_STATE = {
	    LIBRARY_NOT_INITIALIZED: 0,
	    LIBRARY_INITIALIZED: 1,
	    STEP_LOADING: 2,
	    STEP_STARTED: 3,
	    SCREENS_COMPLETED: 4,
	    STEP_SEND_RESULTS: 5,
	    STEP_FINISHED: 6,
	    APPLICATION_FINISHED: 7
	};
	
	exports.JOURNEY_STATE = JOURNEY_STATE;
	
	var EFLJourney = (function () {
	    function EFLJourney(context) {
	        _classCallCheck(this, EFLJourney);
	
	        this.context = context;
	        this.moduleState = JOURNEY_STATE.LIBRARY_NOT_INITIALIZED;
	        this.showHeader = true;
	        this.showFooter = true;
	        this.autoStart = true;
	        this.currentModuleNumber = 0;
	        this.currentStepProgress = 0;
	        this.navigation = {
	            logo: false,
	            logoSrc: 'EFL_logo.png',
	            title: true,
	            progressBar: true,
	            localization: false,
	            timer: true,
	            helpButton: true,
	            buttons: true
	        };
	        this.localization = {
	            localePath: 'locales/journey.{locale}.l20n',
	            locales: {
	                'en': {
	                    name: 'English'
	                },
	                'es': {
	                    name: 'Spanish'
	                }
	            }
	        };
	    }
	
	    /*
	     config = {
	         player: object, // player object - required
	         target: string, // target div id - required
	         encryptorEndpoint: url, // url to encryptor endpoint - required
	         ajEndpoint: url, // url to the aj backend server - required
	         assessmentKey: string, // for example onlineBasicPsychometric - required
	         autoStart: true, // start first module automatically - default true
	         showHeader: true, // show header navigation bar - default true
	         showFooter: true, // show footer navigation bar - default true
	         navigation: {
	             logo: false, // show logo - default false
	             logoSrc: url, // url to logo file - default efl logo
	             title: true, // show title - default true
	             progressBar: true, // show progress bar - default true
	             localization: false, // show localization picker - default false
	             timer: true, // enable showing timer on the navigation header - default true
	             helpButton: true, // enable showing help button on the navigation header - default true
	             buttons: true // show next/back buttons - default true
	         },
	         moduleStyle: 'module_style.css', // path to the file with style that should be injected to the modules
	         localization: {
	            localePath: 'http://www.example.com/locales/journey.{locale}.l20n',
	            defaultLanguage: 'en',
	            locales: {
	                'en': {
	                    name: 'English'
	                },
	                'es': {
	                    name: 'Spanish'
	                }
	            }
	         }
	     }
	     */
	
	    _createClass(EFLJourney, [{
	        key: 'init',
	        value: function init(config) {
	            var self = this;
	
	            if (!config) {
	                console.error('Cannot initialize Journey API: no config object.');
	                return;
	            }
	            if (!config.player) {
	                console.error('Cannot initialize Journey API: no player object.');
	                return;
	            }
	            if (!config.target) {
	                console.error('Cannot initialize Journey API: no target value.');
	                return;
	            }
	            if (!config.ajEndpoint) {
	                console.error('Cannot initialize Journey API: no ajEndpoint value.');
	            }
	            if (!config.encryptorEndpoint) {
	                console.error('Cannot initialize Journey API: no encryptorEndpoint value.');
	                return;
	            }
	            if (!config.assessmentKey) {
	                console.error('Cannot initialize Journey API: no assessmentKey value.');
	                return;
	            }
	
	            this.target = config.target;
	            this.encryptorEndpoint = config.encryptorEndpoint;
	            this.ajEndpoint = config.ajEndpoint;
	            this.assessmentKey = config.assessmentKey;
	            this.setupPlayer(config.player);
	            this.completedStep = 0;
	
	            if (typeof config.autoStart === 'boolean') {
	                this.autoStart = config.autoStart;
	            }
	
	            if (typeof config.showHeader === 'boolean') {
	                this.showHeader = config.showHeader;
	            }
	
	            if (typeof config.showFooter === 'boolean') {
	                this.showFooter = config.showFooter;
	            }
	
	            if (typeof config.navigation === 'object') {
	                this.setupNavigation(config.navigation);
	            }
	
	            if (typeof config.localization === 'object') {
	                this.L20n = new _localizationJs2['default'](config.localization);
	            } else {
	                this.L20n = new _localizationJs2['default'](this.localization);
	            }
	
	            this.api = new _apiJs2['default']({
	                encrypterUrl: this.encryptorEndpoint,
	                backendUrl: this.ajEndpoint
	            });
	
	            var createNavigationPromise = this.createNavigation(this.target);
	            var getModulesPromise = this.getModules(this.assessmentKey);
	            var promises = [createNavigationPromise, getModulesPromise];
	
	            if (config.moduleStyle && typeof config.moduleStyle === 'string') {
	                promises.push(this.getStyleConfig(config.moduleStyle));
	            }
	
	            return Promise.all(promises).then(function (results) {
	                self.modules = results[1].modules;
	                self.steps = results[1].steps;
	                self.firstStep = results[1].firstStep;
	                self.applicant = results[1].applicant ? results[1].applicant : {};
	                self.currentStep = results[1].currentStep;
	
	                if (promises.length == 3) {
	                    self.moduleStyle = results[2];
	                }
	
	                self.moduleState = JOURNEY_STATE.LIBRARY_INITIALIZED;
	                if (self.autoStart) {
	                    self.startNextStep();
	                } else {
	                    self.updateUIState();
	                }
	            })['catch'](function (error) {
	                console.error(error.stack);
	            });
	        }
	    }, {
	        key: 'createNavigation',
	        value: function createNavigation(target) {
	            var self = this;
	            return new Promise(function (resolve, reject) {
	                var rootDiv = document.getElementById(target);
	                if (!rootDiv) {
	                    reject(new Error('No element with id: ' + target + '.'));
	                    return;
	                }
	                rootDiv.setAttribute('class', 'efl-journey-root');
	                var logo = self.navigation.logoSrc;
	
	                var html = '\n                <div id="efl-below-nav-overlay" class="efl-overlay efl-hidden"></div>\n                <div class="efl-top-bar">\n                    <div id="efl-nav-overlay" class="efl-overlay efl-hidden"></div>\n                    <div class="mui-container-fluid">\n                        <div class="mui-row">\n                            <div class="mui-col-xs-12">\n                                <div id="efl-journey-top-bar" class="efl-top-progress-bar-wrapper">\n                                    <div id="efl-logo" class="efl-img-wrapper">\n                                        <img src="' + logo + '">\n                                    </div>\n                                    <div class="efl-progress-bar-wrapper">\n                                        <div id="efl-progress" class="efl-progress-bar"></div>\n                                    </div>\n                                    <div class="efl-locale-select-wrapper">\n                                        <div id="efl-locale-select" class="efl-language-picker">\n                                            <div class="mui-dropdown">\n                                                <button id="efl-selected-language-button" class="mui-btn mui-btn--primary" data-mui-toggle="dropdown"><span class="label"></span><i class="efl-icon-font_icons-chevron"></i></button>\n                                                <ul id="efl-language-dropdown-list" class="mui-dropdown__menu mui-dropdown__menu--right"></ul>\n                                            </div>\n                                        </div>\n                                    </div>\n                                </div>\n                                <div id="efl-progress-small" class="efl-small-progress-bar"></div>\n                                <div id="efl-title-timer-container">\n                                    <h1 id="efl-title"></h1>\n                                    <div id="efl-timer-container">\n                                        <div id="efl-timer" class="mui-col-xs-12 mui-col-sm-4">\n                                            <span id="efl-timer-clock">\n                                                <svg id="efl-timer-svg" viewbox="0 0 22 22">\n                                                    <path id="efl-timer-path" transform="translate(11, 11)"></path>\n                                                </svg>\n                                            </span>\n                                            <span id="efl-timer-time"></span>\n                                            <button id="efl-timer-button"></button>\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n\n                <div id="efl-player-container" style="overflow-y: auto">\n                    <div class="mui-container-fluid">\n                        <div id="efl-loading" class="efl-loading">\n                            <svg class="efl-spinner" width="200px" height="200px" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">\n                                <circle fill="none" stroke-width="16" stroke-linecap="round" cx="100" cy="100" r="84"></circle>\n                            </svg>\n                            <div>\n                                The application is preparing the next step.<br />It can last up to 2 minutes.\n                            </div>\n                        </div>\n\n                        <div class="mui-row">\n                            <div class="mui-col-xs-12">\n                                <div id="efl-player" class="efl-player"></div>\n                            </div>\n                        </div>\n                    </div>\n\n                    <div class="efl-footer">\n                        <div class="mui-container-fluid">\n                            <div class="mui-row">\n                                <div class="mui-col-xs-12">\n                                    <div id="efl-journey-footer">\n                                        <button id="efl-back-button" class="mui-btn mui-btn--large mui-btn--primary mui-btn--fab efl-left"><i class="efl-icon-font_icons-left-arrow"></i></button>\n                                        <button id="efl-next-button" class="mui-btn mui-btn--large mui-btn--primary mui-btn--fab efl-right"><i class="efl-icon-font_icons-right-arrow"></i></button>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                <div>\n            ';
	
	                rootDiv.innerHTML = html;
	
	                document.getElementById('efl-back-button').onclick = function () {
	                    self.backButtonTapped();
	                };
	
	                document.getElementById('efl-next-button').onclick = function () {
	                    self.nextButtonTapped();
	                };
	
	                document.getElementById('efl-timer-button').onclick = function () {
	                    self.changeTimerState();
	                };
	
	                self.player.target = 'efl-player';
	                self.setupLanguageList();
	                self.setupEventsListeners();
	                self.updateUIState();
	                resolve();
	            });
	        }
	    }, {
	        key: 'getModules',
	        value: function getModules(assessmentKey) {
	            var self = this;
	            return new Promise(function (resolve, reject) {
	                try {
	                    self.fetchModulesData(assessmentKey).then(function (modules) {
	                        var parsedData = self.parseModulesData(modules);
	                        resolve(parsedData);
	                    })['catch'](function (error) {
	                        reject(error);
	                    });
	                } catch (error) {
	                    reject(error);
	                }
	            });
	        }
	    }, {
	        key: 'backButtonTapped',
	        value: function backButtonTapped() {
	            if (this.moduleState === JOURNEY_STATE.STEP_STARTED) {
	                this.player.backButtonTapped();
	            }
	        }
	    }, {
	        key: 'nextButtonTapped',
	        value: function nextButtonTapped() {
	            if (this.moduleState === JOURNEY_STATE.STEP_STARTED) {
	                this.player.nextButtonTapped();
	            } else if (this.moduleState === JOURNEY_STATE.LIBRARY_INITIALIZED) {
	                this.startNextStep();
	            }
	        }
	    }, {
	        key: 'startNextStep',
	        value: function startNextStep() {
	            var _this = this;
	
	            if (!this.currentStep) {
	                this.currentStep = this.firstStep;
	            } else if (this.steps[this.currentStep].nextStep) {
	                this.currentModuleNumber += 1;
	                this.currentStepProgress = 0;
	                this.currentStep = this.steps[this.currentStep].nextStep;
	            } else {
	                console.warn('No next step');
	                return;
	            }
	
	            var step = this.steps[this.currentStep];
	            var module = this.modules[step.module];
	            this.moduleState = JOURNEY_STATE.STEP_LOADING;
	            this.setTitle(step.title);
	            this.updateUIState();
	
	            this.player.moduleLoadedHandler = function () {
	                _this.player.moduleLoadedHandler = undefined;
	                _this.moduleState = JOURNEY_STATE.STEP_STARTED;
	                _this.updateUIState();
	            };
	
	            this.stepTimer = Date.now();
	
	            var config = this.updateConfig(module.config);
	            this.player.loadModule(this.currentStep, module.uri, config);
	        }
	    }, {
	        key: 'finishedScreen',
	        value: function finishedScreen(progress) {
	            if (progress < 0) {
	                progress = 0;
	            }
	            if (progress > 100) {
	                progress = 100;
	            }
	
	            this.currentStepProgress = progress;
	
	            if (progress === 100) {
	                if (this.moduleState === JOURNEY_STATE.STEP_SEND_RESULTS) {
	                    this.finishedModule();
	                } else {
	                    this.moduleState = JOURNEY_STATE.SCREENS_COMPLETED;
	                    this.updateUIState();
	                }
	            }
	        }
	    }, {
	        key: 'handleModuleReturnValues',
	        value: function handleModuleReturnValues(stepName, observations, metas, applicant, state) {
	            var timeElapsed = Math.floor(Date.now() - this.stepTimer);
	            if (!metas) {
	                metas = {};
	            }
	            metas.timeElapsed = timeElapsed;
	            this.applicant = this.mergeObjects(this.applicant, applicant);
	            this.sendObservations(stepName, this.completedStep, observations, metas, applicant, state);
	            this.completedStep++;
	
	            if (this.moduleState === JOURNEY_STATE.SCREENS_COMPLETED) {
	                this.finishedModule();
	            } else {
	                this.moduleState = JOURNEY_STATE.STEP_SEND_RESULTS;
	            }
	        }
	    }, {
	        key: 'moduleException',
	        value: function moduleException(category, message) {
	            console.error(category + ' error: ' + message);
	        }
	    }, {
	        key: 'finishedModule',
	        value: function finishedModule() {
	            if (this.steps[this.currentStep].nextStep) {
	                this.moduleState = JOURNEY_STATE.STEP_FINISHED;
	                this.startNextStep();
	            } else {
	                this.player.closeModule();
	                this.moduleState = JOURNEY_STATE.APPLICATION_FINISHED;
	                this.sendFinishedApplication(this.completedStep++);
	                this.updateUIState();
	            }
	        }
	    }, {
	        key: 'setupPlayer',
	        value: function setupPlayer(player) {
	            var _this2 = this;
	
	            this.player = player;
	            this.player.moduleFinishedHandler = function (stepName, observations, metas, applicant, state) {
	                _this2.handleModuleReturnValues(stepName, observations, metas, applicant, state);
	            };
	            this.player.screenFinishedHandler = function (progress) {
	                _this2.finishedScreen(progress);
	            };
	            this.player.screenLoadedHandler = function (navigation) {
	                _this2.showBackButton = navigation.showBackButton === true;
	                _this2.showNextButton = navigation.showNextButton === true;
	                _this2.stepHideTitle = navigation.hideTitle === true;
	                _this2.stepHideProgress = navigation.hideProgress === true;
	                _this2.showTimer = navigation.showTimer === true;
	
	                _this2.timerInitialized = false;
	                _this2.updateUIState();
	            };
	            this.player.moduleExceptionHandler = this.moduleException;
	            this.player.moduleHeightChangedHandler = function (height) {
	                _this2.moduleHeightUpdated(height);
	            };
	            this.player.initTimerHandler = function (time, enableTimeExtension, enableControl) {
	                _this2.setupTimer(time, enableTimeExtension, enableControl);
	            };
	            this.player.startTimerHandler = function () {
	                _this2.startTimer();
	            };
	            this.player.pauseTimerHandler = function () {
	                _this2.changeTimerState(true);
	            };
	            this.player.requestTimerTimeHandler = function () {
	                _this2.sendCurrentTime();
	            };
	        }
	    }, {
	        key: 'setupNavigation',
	        value: function setupNavigation(navigation) {
	            if (typeof navigation.logo === 'boolean') {
	                this.navigation.logo = navigation.logo;
	            }
	
	            if (navigation.logoSrc) {
	                this.navigation.logoSrc = navigation.logoSrc;
	            }
	
	            if (typeof navigation.title === 'boolean') {
	                this.navigation.title = navigation.title;
	            }
	
	            if (typeof navigation.progressBar === 'boolean') {
	                this.navigation.progressBar = navigation.progressBar;
	            }
	
	            if (typeof navigation.localization === 'boolean') {
	                this.navigation.localization = navigation.localization;
	            }
	
	            if (typeof navigation.timer === 'boolean') {
	                this.navigation.timer = navigation.timer;
	            }
	
	            if (typeof navigation.helpButton === 'boolean') {
	                this.navigation.helpButton = navigation.helpButton;
	            }
	
	            if (typeof navigation.buttons === 'boolean') {
	                this.navigation.buttons = navigation.buttons;
	            }
	        }
	    }, {
	        key: 'getStyleConfig',
	        value: function getStyleConfig(styleConfig) {
	            return new Promise(function (resolve, reject) {
	                var xhttp = new XMLHttpRequest();
	                xhttp.onreadystatechange = function () {
	                    if (xhttp.readyState == 4) {
	                        if (xhttp.status == 200) {
	                            resolve(xhttp.responseText);
	                        } else {
	                            reject(new Error('Can\'t get ' + styleConfig + '. Status: ' + xhttp.statusText));
	                        }
	                    }
	                };
	                xhttp.onError = function () {
	                    reject(new Error('Can\'t get ' + styleConfig + '. Status: ' + xhttp.statusText));
	                };
	                xhttp.open("GET", styleConfig, true);
	                xhttp.send();
	            });
	        }
	    }, {
	        key: 'updateUIState',
	        value: function updateUIState() {
	            var state = this.moduleState;
	            var isloading = state === JOURNEY_STATE.LIBRARY_NOT_INITIALIZED || state === JOURNEY_STATE.STEP_LOADING || state === JOURNEY_STATE.SCREENS_COMPLETED;
	            var nextButtonVisible = this.showFooter && this.navigation.buttons && (state === JOURNEY_STATE.LIBRARY_INITIALIZED || state == JOURNEY_STATE.STEP_STARTED && this.showNextButton);
	            var backButtonVisible = this.showFooter && this.navigation.buttons && state == JOURNEY_STATE.STEP_STARTED && this.showBackButton;
	            var titleVisible = this.showHeader && this.navigation.title && (state === JOURNEY_STATE.STEP_STARTED || state === JOURNEY_STATE.SCREENS_COMPLETED || state === JOURNEY_STATE.STEP_SEND_RESULTS) && !this.stepHideTitle;
	            var progressVisible = this.showHeader && this.navigation.progressBar && !this.stepHideProgress;
	            var localizationVisible = this.showHeader && this.navigation.localization;
	            var logoVisible = this.showHeader && this.navigation.logo;
	            var timerVisible = state === JOURNEY_STATE.STEP_STARTED && this.showHeader && this.navigation.timer && this.showTimer && this.timerInitialized;
	
	            var navbar = document.querySelector('.efl-top-bar');
	            this.showHeader ? navbar.classList.remove('efl-hidden') : navbar.classList.add('efl-hidden');
	
	            var footer = document.querySelector('.efl-footer');
	            this.showFooter ? footer.classList.remove('efl-hidden') : footer.classList.add('efl-hidden');
	
	            var loading = document.getElementById('efl-loading');
	            isloading ? loading.classList.remove('efl-hidden') : loading.classList.add('efl-hidden');
	
	            var player = document.getElementById('efl-player');
	            isloading ? player.classList.add('efl-hidden') : player.classList.remove('efl-hidden');
	
	            var nextButton = document.getElementById('efl-next-button');
	            nextButtonVisible ? nextButton.classList.remove('efl-hidden') : nextButton.classList.add('efl-hidden');
	
	            var backButton = document.getElementById('efl-back-button');
	            backButtonVisible ? backButton.classList.remove('efl-hidden') : backButton.classList.add('efl-hidden');
	
	            var title = document.getElementById('efl-title');
	            titleVisible ? title.classList.remove('efl-hidden') : title.classList.add('efl-hidden');
	
	            var logo = document.getElementById('efl-logo');
	            logoVisible ? logo.classList.remove('efl-hidden') : logo.classList.add('efl-hidden');
	
	            var progress = document.getElementById('efl-progress');
	            var progressSmall = document.getElementById('efl-progress-small');
	            progressVisible ? progress.classList.remove('efl-hidden') : progress.classList.add('efl-hidden');
	            progressVisible ? progressSmall.classList.remove('efl-hidden') : progressSmall.classList.add('efl-hidden');
	
	            while (progress.firstChild) {
	                progress.removeChild(progress.firstChild);
	            }
	            while (progressSmall.firstChild) {
	                progressSmall.removeChild(progressSmall.firstChild);
	            }
	
	            if (this.modules) {
	                Object.keys(this.modules).forEach(function () {
	                    var moduleBar = document.createElement('div');
	                    moduleBar.setAttribute('class', 'efl-module-bar');
	                    moduleBar.innerHTML = '<div class="efl-filling"></div>';
	                    progress.appendChild(moduleBar);
	                    moduleBar = document.createElement('div');
	                    moduleBar.setAttribute('class', 'efl-module-bar');
	                    moduleBar.innerHTML = '<div class="efl-filling"></div>';
	                    progressSmall.appendChild(moduleBar);
	                });
	
	                for (var i = 0; i < this.currentModuleNumber; i++) {
	                    progress.children[i].children[0].style.width = '100%';
	                    progressSmall.children[i].children[0].style.width = '100%';
	                }
	                progress.children[this.currentModuleNumber].children[0].style.width = this.currentStepProgress + '%';
	                progressSmall.children[this.currentModuleNumber].children[0].style.width = this.currentStepProgress + '%';
	            }
	
	            var picker = document.getElementById('efl-locale-select');
	            localizationVisible ? picker.classList.remove('efl-hidden') : picker.classList.add('efl-hidden');
	
	            var timer = document.getElementById('efl-timer-container');
	            timerVisible ? timer.classList.remove('efl-hidden') : timer.classList.add('efl-hidden');
	
	            var updateEvent = document.createEvent('Event');
	            updateEvent.initEvent('EFLJourneyUpdateUi', true, true);
	            document.dispatchEvent(updateEvent);
	        }
	    }, {
	        key: 'fetchModulesData',
	        value: function fetchModulesData(assessmentKey) {
	            return this.api.fetchModules(assessmentKey); // TODO move to configuration.
	        }
	    }, {
	        key: 'sendObservations',
	        value: function sendObservations(step, sequence, observations, metas, applicant, state) {
	            return this.api.finishStep({ step: step, sequence: sequence, observations: observations, metas: metas, state: state, applicant: applicant }).then(this.api.getProgress).then(function (progress) {
	                console.log(progress);
	            });
	        }
	    }, {
	        key: 'sendFinishedApplication',
	        value: function sendFinishedApplication(sequence) {
	            return this.api.finishApplication({ sequence: sequence }).then(this.api.getProgress).then(function (progress) {
	                console.log(progress);
	            });
	        }
	    }, {
	        key: 'parseModulesData',
	        value: function parseModulesData(data) {
	            var modules = data.modules;
	            var steps = {};
	            var firstStep;
	            var applicant = data.applicant;
	            var currentStep;
	
	            if (data.state && data.state.completedSteps && data.state.completedSteps.length) {
	                currentStep = data.state.completedSteps[data.state.completedSteps.length - 1];
	            }
	
	            for (var stepName in data.steps) {
	                if (data.steps.hasOwnProperty(stepName)) {
	                    var step = {
	                        title: data.steps[stepName].title,
	                        module: data.steps[stepName].module
	                    };
	                    var links = data.steps[stepName].links;
	                    for (var i = 0; i < links.length; i++) {
	                        var link = links[i];
	                        if (link.type === 'next') {
	                            step.nextStep = link.target;
	                        }
	                    }
	                    steps[stepName] = step;
	
	                    if (data.steps[stepName].isRoot === true) {
	                        firstStep = stepName;
	                    }
	                }
	            }
	
	            return { modules: modules, steps: steps, firstStep: firstStep, currentStep: currentStep, applicant: applicant };
	        }
	    }, {
	        key: 'setupLanguageList',
	        value: function setupLanguageList() {
	            var _this3 = this;
	
	            var ul = document.getElementById('efl-language-dropdown-list');
	            Object.keys(this.L20n.locales).forEach(function (key) {
	                var li = document.createElement('li');
	                var a = document.createElement('a');
	                a.setAttribute('data-key', key);
	                a.setAttribute('data-name', _this3.L20n.locales[key].name);
	                _this3.L20n.setKey(a, key);
	                a.onclick = function (event) {
	                    event.preventDefault();
	                    _this3.selectLanguage(event.target.getAttribute('data-key'));
	                };
	                li.appendChild(a);
	                ul.appendChild(li);
	            });
	
	            this.selectLanguage(this.L20n.defaultLanguage);
	        }
	    }, {
	        key: 'selectLanguage',
	        value: function selectLanguage(languageKey) {
	            this.currentLocale = languageKey;
	            this.L20n.setKey(document.querySelector('#efl-selected-language-button > span.label'), languageKey);
	            this.L20n.selectLanguage(languageKey);
	            this.player.languageChanged(languageKey);
	        }
	    }, {
	        key: 'localePickerChanged',
	        value: function localePickerChanged() {
	            var selectedValue = document.getElementById('efl-locale-select').value;
	            this.player.languageChanged(selectedValue);
	        }
	    }, {
	        key: 'setTitle',
	        value: function setTitle(title) {
	            document.getElementById('efl-title').innerHTML = title;
	        }
	    }, {
	        key: 'updateConfig',
	        value: function updateConfig(config) {
	            var newConfig = config;
	            if (!newConfig.applicantJourney) {
	                newConfig.applicantJourney = {};
	            }
	            if (!newConfig.applicantJourney.step) {
	                newConfig.applicantJourney.step = {};
	            }
	            newConfig.applicantJourney.step.locale = this.currentLocale;
	            if (this.moduleStyle) {
	                newConfig.applicantJourney.step.style = this.moduleStyle;
	            }
	            newConfig.applicant = this.applicant;
	
	            var step = this.steps[this.currentStep];
	            if (!newConfig.applicantJourney.step.moduleKey) {
	                newConfig.applicantJourney.step.moduleKey = step.module;
	            }
	            if (!newConfig.applicantJourney.step.title) {
	                newConfig.applicantJourney.step.title = step.title;
	            }
	            if (!newConfig.applicantJourney.step.ordinal) {
	                newConfig.applicantJourney.step.ordinal = this.completedStep;
	            }
	
	            return newConfig;
	        }
	    }, {
	        key: 'moduleHeightUpdated',
	        value: function moduleHeightUpdated(height) {
	            var player = document.getElementById('efl-player');
	            var currentHeight = player.clientHeight;
	
	            if (height != currentHeight) {
	                player.style.height = height + 'px';
	            }
	        }
	    }, {
	        key: 'stickyFooter',
	        value: function stickyFooter() {
	            try {
	                var topBar = document.querySelector('.efl-journey-root .efl-top-bar');
	                var parentHeight = topBar.parentNode.offsetHeight;
	                var contentAndFooterHeight = parentHeight - topBar.offsetHeight;
	                var footerHeight = document.querySelector('.efl-journey-root .efl-footer').offsetHeight;
	                var content = document.querySelector('#efl-player');
	                var loading = document.querySelector('#efl-loading');
	                var MAGIC_ONE_PIXEL = 1;
	                var minHeight = contentAndFooterHeight - footerHeight - MAGIC_ONE_PIXEL + 'px';
	                if (window.getComputedStyle(loading, null).display === 'none') {
	                    content.style.minHeight = minHeight;
	                } else {
	                    loading.style.minHeight = minHeight;
	                }
	                var contentContainer = document.querySelector('#efl-player-container');
	                contentContainer.style.height = contentAndFooterHeight + 'px';
	            } catch (err) {}
	        }
	    }, {
	        key: 'setupEventsListeners',
	        value: function setupEventsListeners() {
	            var self = this;
	            this.context.addEventListener('resize', function () {
	                self.stickyFooter();
	            }, false);
	
	            document.addEventListener('DOMContentLoaded', function () {
	                self.stickyFooter();
	            }, false);
	
	            document.addEventListener('EFLJourneyUpdateUi', function () {
	                self.stickyFooter();
	            }, false);
	        }
	    }, {
	        key: 'setupTimer',
	        value: function setupTimer(time, enableExtension, enableControl) {
	            if (!this.showTimer || !this.navigation.timer || !this.showHeader) {
	                return;
	            }
	
	            this.timerInitialTime = time;
	            this.timerStarted = false;
	            this.timerPaused = false;
	            this.realElapsedTime = 0;
	            this.timerFinished = false;
	            this.enableTimerControl = enableControl;
	            this.enableTimerExtension = enableExtension;
	            this.timerExtended = false;
	            this.setupTimerControl(false);
	            this.updateTimerPath(360);
	            this.setupTimerLabel(this.timerInitialTime);
	            this.setupTimerButton(false);
	            this.timerInitialized = true;
	            this.updateUIState();
	            this.player.initializedTimer();
	        }
	    }, {
	        key: 'startTimer',
	        value: function startTimer() {
	            if (!this.timerInitialized || this.timerStarted && !this.timerPaused && !this.timerExtended) {
	                return;
	            }
	            this.setupTimerControl(this.enableTimerControl);
	
	            this.startTimerTimestamp = new Date().getTime();
	            this.timerPaused = false;
	
	            this.setupTimerButton(true);
	            var self = this;
	            var timeout = 1000;
	            if (timeout > this.timerInitialTime / 360) {
	                timeout = this.timerInitialTime / 360;
	            }
	
	            var refresh = function refresh() {
	                if (self.timerPaused || !self.timerInitialized || self.moduleState != JOURNEY_STATE.STEP_STARTED) {
	                    return;
	                }
	
	                var currentAngle;
	                var currentElapsedTime = self.realElapsedTime + new Date().getTime() - self.startTimerTimestamp;
	                if (self.timerInitialTime < 0) {
	                    currentAngle = 0;
	                } else {
	                    currentAngle = 360 - currentElapsedTime / self.timerInitialTime * 360;
	                }
	
	                self.updateTimerPath(currentAngle);
	
	                var currentRemainTime = self.timerInitialTime - currentElapsedTime;
	                self.setupTimerLabel(currentRemainTime);
	
	                if (currentRemainTime > 0) {
	                    setTimeout(function () {
	                        refresh();
	                    }, timeout);
	                } else if (currentRemainTime <= 0) {
	                    self.setupTimerControl(false);
	                    self.timerFinished = true;
	                    self.realElapsedTime = currentElapsedTime;
	                    if (self.enableTimerExtension) {
	                        self.showTimeExtensionModal();
	                    } else {
	                        self.sendFinishedTimer();
	                    }
	                }
	            };
	            refresh();
	            if (!this.timerStarted) {
	                this.timerStarted = true;
	                this.player.changedTimerState(_moduleEventsJs.TIMER_STATES.STARTED);
	            }
	            if (this.timerExtended) {
	                this.timerExtended = false;
	                this.player.changedTimerState(_moduleEventsJs.TIMER_STATES.STARTED);
	            }
	        }
	    }, {
	        key: 'updateTimerPath',
	        value: function updateTimerPath(angle) {
	            var path = document.getElementById('efl-timer-path');
	            var layer = document.getElementById('efl-timer-svg');
	            var radius = 11;
	            if (angle > 0) {
	                layer.classList.remove('efl-hidden');
	                var rad = angle * Math.PI / 180;
	                var x = Math.round(Math.sin(rad) * -radius * 1000) / 1000;
	                var y = Math.round(Math.cos(rad) * -radius * 1000) / 1000;
	                var mid = angle > 180 ? 1 : 0;
	                var anim = 'M 0 0 v -' + radius + ' A ' + radius + ' ' + radius + ' 1 ' + mid + ' 0 ' + x + ' ' + y + ' z';
	
	                path.setAttribute('d', anim);
	            } else {
	                layer.classList.add('efl-hidden');
	            }
	        }
	    }, {
	        key: 'setupTimerLabel',
	        value: function setupTimerLabel(time) {
	            var currentTime = time;
	            if (currentTime < 0) {
	                currentTime = 0;
	            }
	            var min = Math.floor(currentTime / 60000);
	            var sec = Math.ceil(currentTime % 60000 / 1000);
	            if (sec == 60) {
	                min++;
	                sec = 0;
	            }
	            var followingZero = sec < 10 ? '0' : '';
	
	            var timeEl = document.getElementById('efl-timer-time');
	            timeEl.innerText = min + ':' + followingZero + sec;
	        }
	    }, {
	        key: 'setupTimerButton',
	        value: function setupTimerButton(pause) {
	            var button = document.getElementById('efl-timer-button');
	            var className = pause ? 'efl-icon-font_icons-pause' : 'efl-icon-font_icons-play';
	            button.innerHTML = '<i class="' + className + '"></i>';
	        }
	    }, {
	        key: 'changeTimerState',
	        value: function changeTimerState(pause) {
	            if (this.timerStarted && !this.timerFinished) {
	                if (pause === undefined) {
	                    pause = !this.timerPaused;
	                }
	                if (pause != this.timerPaused) {
	                    this.setupTimerButton(!pause);
	                    if (!pause) {
	                        this.startTimer();
	                        this.changeTimerOverlayState(false);
	                    } else {
	                        this.changeTimerOverlayState(true);
	                        this.realElapsedTime += new Date().getTime() - this.startTimerTimestamp;
	                        this.timerPaused = true;
	                    }
	                    this.player.changedTimerState(pause ? _moduleEventsJs.TIMER_STATES.PAUSED : _moduleEventsJs.TIMER_STATES.STARTED);
	                }
	            }
	        }
	    }, {
	        key: 'sendCurrentTime',
	        value: function sendCurrentTime() {
	            if (this.timerInitialized) {
	                var time = this.realElapsedTime;
	                if (!this.timerFinished && !this.timerPaused) {
	                    time += new Date().getTime() - this.startTimerTimestamp;
	                }
	                this.player.timerTimeResponse(Math.ceil(time));
	            }
	        }
	    }, {
	        key: 'setupTimerControl',
	        value: function setupTimerControl(show) {
	            var timer = document.getElementById('efl-timer-button');
	            show ? timer.classList.remove('efl-hidden') : timer.classList.add('efl-hidden');
	        }
	    }, {
	        key: 'changeTimerOverlayState',
	        value: function changeTimerOverlayState(show) {
	            var globalOverlay = document.getElementById('efl-below-nav-overlay');
	            var navOverlay = document.getElementById('efl-nav-overlay');
	            var overlays = [globalOverlay, navOverlay];
	            for (var i = 0; i < overlays.length; i++) {
	                var el = overlays[i];
	                if (show) {
	                    el.classList.remove('efl-hidden', 'efl-hide-animation');
	                    el.classList.add('efl-show-animation');
	                } else {
	                    (function () {
	                        el.classList.remove('efl-show-animation');
	                        el.classList.add('efl-hide-animation');
	                        var handler = function handler(event) {
	                            event.srcElement.classList.add('efl-hidden');
	                            event.srcElement.removeEventListener('webkitAnimationEnd', handler);
	                        };
	                        el.addEventListener('webkitAnimationEnd', handler);
	                    })();
	                }
	            }
	        }
	    }, {
	        key: 'mergeObjects',
	        value: function mergeObjects(obj1, obj2) {
	            if (typeof obj2 !== 'object') {
	                return obj1;
	            }
	            if (typeof obj1 !== 'object') {
	                return obj2;
	            }
	            var newObj = obj1;
	            for (var key in obj2) {
	                if (obj2.hasOwnProperty(key)) {
	                    if (newObj.hasOwnProperty(key) && typeof obj2[key] === 'object') {
	                        newObj[key] = this.mergeObjects(obj1[key], obj2[key]);
	                    } else {
	                        newObj[key] = obj2[key];
	                    }
	                }
	            }
	            return newObj;
	        }
	    }, {
	        key: 'showTimeExtensionModal',
	        value: function showTimeExtensionModal() {
	            var _this4 = this;
	
	            var html = '\n            <div class="efl-modal" id="efl-time-extension-modal">\n                <h2>Would you like an extension?</h2>\n                <div>Your time has expired, but you may select to extend your time if you like.</div>\n                <form>\n                    <div>Choose time to add:</div>\n                    <div class="efl-radio">\n                        <input type="radio" name="timeExtensionRadio" id="timeExtensionRadio_30" value="30" />\n                        <span><span></span></span>\n                        <label for="timeExtensionRadio_30">30 seconds</label>\n                    </div>\n                    <div class="efl-radio">\n                        <input type="radio" name="timeExtensionRadio" id="timeExtensionRadio_60" value="60" />\n                        <span><span></span></span>\n                        <label for="timeExtensionRadio_60">60 seconds</label>\n                    </div>\n                </form>\n                <div class="mui-row efl-buttons-row">\n                    <div class="mui-col-xs-12 mui-col-sm-6" id="efl-time-extension-cancel">\n                        <button class="mui-btn mui-btn--raised efl-button-small efl-primary">NO, THANKS</button>\n                    </div>\n                    <div class="mui-col-xs-12 mui-col-sm-6" id="efl-time-extension-ok">\n                        <button class="mui-btn mui-btn--raised efl-button efl-action" disabled>ADD TIME <i class="efl-icon-font_icons-check"></i></button>\n                    </div>\n                </div>\n            </div>\n        ';
	            this.showModal(html);
	
	            document.querySelector('#efl-time-extension-cancel button').onclick = function () {
	                var self = _this4;
	                _this4.hideModal().then(function () {
	                    self.sendFinishedTimer();
	                });
	            };
	
	            document.querySelector('#efl-time-extension-ok button').onclick = function () {
	                var self = _this4;
	                var time = document.querySelector('input[name=timeExtensionRadio]:checked').value * 1000;
	                _this4.hideModal().then(function () {
	                    self.extendTimerTime(time);
	                });
	            };
	
	            var radios = document.querySelectorAll('#efl-time-extension-modal input[type=radio]');
	            for (var i = 0; i < radios.length; i++) {
	                radios[i].onchange = function () {
	                    document.querySelector('#efl-time-extension-ok > button').removeAttribute('disabled');
	                };
	            }
	        }
	    }, {
	        key: 'showModal',
	        value: function showModal(modalHtml) {
	            var html = '\n            <div class="mui-container-fluid">\n                <div class="mui-row">\n                    <div id="efl-global-overlay-container" class="mui-col-xs-12">\n                        ' + modalHtml + '\n                    </div>\n                </div>\n            </div>\n        ';
	
	            var rootElement = document.querySelector('.efl-journey-root');
	            var overlay = document.createElement('div');
	            overlay.id = 'efl-global-overlay';
	            overlay.classList.add('efl-show-animation');
	            overlay.innerHTML = html;
	            var modal = overlay.querySelector('.efl-modal');
	            modal.classList.add('efl-modal-slide-down-animation');
	            modal.style.opacity = 0;
	            rootElement.appendChild(overlay);
	        }
	    }, {
	        key: 'hideModal',
	        value: function hideModal() {
	            return new Promise(function (resolve, reject) {
	                var rootElement = document.querySelector('.efl-journey-root');
	                var overlay = document.querySelector('#efl-global-overlay');
	
	                if (overlay) {
	                    (function () {
	                        overlay.classList.remove('efl-show-animation');
	                        overlay.classList.add('efl-hide-animation');
	                        var handler = function handler() {
	                            overlay.removeEventListener('webkitAnimationEnd', handler);
	                            rootElement.removeChild(overlay);
	                            resolve();
	                        };
	                        overlay.addEventListener('webkitAnimationEnd', handler);
	                    })();
	                } else {
	                    reject(new Error('No overlay object'));
	                }
	            });
	        }
	    }, {
	        key: 'sendFinishedTimer',
	        value: function sendFinishedTimer() {
	            this.player.changedTimerState(_moduleEventsJs.TIMER_STATES.FINISHED);
	        }
	    }, {
	        key: 'extendTimerTime',
	        value: function extendTimerTime(time) {
	            this.timerFinished = false;
	            this.timerExtended = true;
	            this.timerInitialTime += time;
	            this.startTimer();
	        }
	    }]);
	
	    return EFLJourney;
	})();

	exports.EFLJourney = EFLJourney;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _get = function get(_x6, _x7, _x8) { var _again = true; _function: while (_again) { var object = _x6, property = _x7, receiver = _x8; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x6 = parent; _x7 = property; _x8 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	var emptyObjectOr = function emptyObjectOr(object) {
	    return object == null ? {} : object;
	};
	
	var Session = (function () {
	    function Session() {
	        var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	        var authorizationToken = _ref.authorizationToken;
	        var requestToken = _ref.requestToken;
	        var uid = _ref.uid;
	
	        _classCallCheck(this, Session);
	
	        if (!authorizationToken || !requestToken || !uid) {
	            throw new Error('Session: missing params');
	        }
	        this.authorizationToken = authorizationToken;
	        this.requestToken = requestToken;
	        this.uid = uid;
	        this.save = this.save.bind(this);
	        this.save();
	    }
	
	    _createClass(Session, [{
	        key: 'save',
	        value: function save() {
	            window.localStorage.setItem('session', JSON.stringify({
	                authorizationToken: this.authorizationToken,
	                requestToken: this.requestToken,
	                uid: this.uid
	            }));
	        }
	    }], [{
	        key: 'load',
	        value: function load() {
	            var session = JSON.parse(window.localStorage.getItem('session'));
	            if (session) {
	                return new Session(session);
	            } else {
	                throw new Error('No session data.');
	            }
	        }
	    }]);
	
	    return Session;
	})();
	
	var AbstractApi = (function () {
	    function AbstractApi(config) {
	        _classCallCheck(this, AbstractApi);
	
	        if (!config || typeof config !== 'object') {
	            throw new Error('Config object is required.');
	        }
	
	        if (!config.encrypterUrl) {
	            throw new Error('\'encrypterUrl\' missing in config object.');
	        }
	
	        if (!config.backendUrl) {
	            throw new Error('\'backendUrl\' missing in config object.');
	        }
	
	        this.config = config;
	
	        // Bind instance methods
	        this.fetchModules = this.fetchModules.bind(this);
	        this.finishStep = this.finishStep.bind(this);
	        this.finishApplication = this.finishApplication.bind(this);
	        this.getProgress = this.getProgress.bind(this);
	        this._login = this._login.bind(this);
	        this._startSession = this._startSession.bind(this);
	        this._resumeSession = this._resumeSession.bind(this);
	        this._startApplication = this._startApplication.bind(this);
	        this._finishApplication = this._finishApplication.bind(this);
	        this._finishStep = this._finishStep.bind(this);
	        this._getProgress = this._getProgress.bind(this);
	    }
	
	    _createClass(AbstractApi, [{
	        key: 'fetchModules',
	        value: function fetchModules() {
	            throw new Error('Not implemented.');
	        }
	    }, {
	        key: 'finishStep',
	        value: function finishStep() {
	            throw new Error('Not implemented.');
	        }
	    }, {
	        key: 'finishApplication',
	        value: function finishApplication() {
	            throw new Error('Not implemented.');
	        }
	    }, {
	        key: 'getProgress',
	        value: function getProgress() {
	            throw new Error('Not implemented.');
	        }
	
	        // Private API methods
	    }, {
	        key: '_login',
	        value: function _login() {
	            throw new Error('Not implemented.');
	        }
	    }, {
	        key: '_startSession',
	        value: function _startSession() {
	            throw new Error('Not implemented.');
	        }
	    }, {
	        key: '_resumeSession',
	        value: function _resumeSession() {
	            throw new Error('Not implemented.');
	        }
	    }, {
	        key: '_startApplication',
	        value: function _startApplication() {
	            throw new Error('Not implemented.');
	        }
	    }, {
	        key: '_finishApplication',
	        value: function _finishApplication() {
	            throw new Error('Not implemented.');
	        }
	    }, {
	        key: '_finishStep',
	        value: function _finishStep() {
	            throw new Error('Not implemented.');
	        }
	    }, {
	        key: '_getProgress',
	        value: function _getProgress() {
	            throw new Error('Not implemented.');
	        }
	    }, {
	        key: '_validate',
	        value: function _validate() {
	            var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	            var validation = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];
	
	            validation.forEach(function (value) {
	                if (!params.hasOwnProperty(value)) {
	                    throw new Error('Missing ' + value + ' parameter.');
	                }
	            });
	        }
	    }]);
	
	    return AbstractApi;
	})();
	
	function request(method, url, body) {
	    return new Promise(function (resolve, reject) {
	        var request = new XMLHttpRequest();
	        request.open(method, url);
	        request.setRequestHeader('Content-Type', 'application/json');
	        request.onload = function () {
	            if (request.status >= 200 && request.status < 300) {
	                resolve(JSON.parse(request.responseText));
	            } else {
	                reject(new Error('Error in request: [' + request.status + '] ' + method + ', ' + url + ', ' + request.responseText + '.'));
	            }
	        };
	        request.onerror = function () {
	            reject(new Error('Error in request: ' + method + ', ' + url + ', ' + request.responseText + '.'));
	        };
	        if (body) {
	            request.send(JSON.stringify(body));
	        } else {
	            request.send();
	        }
	    });
	}
	
	var Api = (function (_AbstractApi) {
	    _inherits(Api, _AbstractApi);
	
	    function Api() {
	        _classCallCheck(this, Api);
	
	        _get(Object.getPrototypeOf(Api.prototype), 'constructor', this).apply(this, arguments);
	    }
	
	    _createClass(Api, [{
	        key: 'fetchModules',
	        value: function fetchModules(applicationName) {
	            var _this = this;
	
	            if (!applicationName) {
	                throw new Error('applicationName is required.');
	            }
	
	            return new Promise(function (resolve, reject) {
	                return _this._login().then(function (response) {
	                    _this.authorizationToken = response.authorizationToken;
	                    _this.requestToken = response.requestToken;
	
	                    try {
	                        _this.session = Session.load();
	                        return _this._resumeSession({
	                            authorizationToken: _this.authorizationToken,
	                            requestToken: _this.requestToken,
	                            sessionId: _this.session.uid,
	                            applicant: {}
	                        });
	                    } catch (e) {
	                        return _this._startSession({
	                            authorizationToken: _this.authorizationToken,
	                            requestToken: _this.requestToken,
	                            applicationName: applicationName
	                        });
	                    }
	                }).then(function (response) {
	                    _this.session = new Session({
	                        authorizationToken: _this.authorizationToken,
	                        requestToken: _this.requestToken,
	                        uid: response.data.uid
	                    });
	                    return _this._startApplication({
	                        authorizationToken: _this.authorizationToken,
	                        requestToken: _this.requestToken,
	                        sessionId: _this.session.uid
	                    });
	                }).then(function (response) {
	                    resolve({
	                        modules: response.data.modules,
	                        steps: response.data.steps,
	                        applicant: response.data.applicant,
	                        state: response.data.state,
	                        indicators: response.data.indicators
	                    });
	                })['catch'](function (error) {
	                    console.log(error);
	                    reject(error);
	                });
	            });
	        }
	    }, {
	        key: 'finishStep',
	        value: function finishStep() {
	            var _ref2 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	            var step = _ref2.step;
	            var sequence = _ref2.sequence;
	            var observations = _ref2.observations;
	            var metas = _ref2.metas;
	            var state = _ref2.state;
	            var applicant = _ref2.applicant;
	
	            return this._finishStep({
	                authorizationToken: this.authorizationToken,
	                requestToken: this.requestToken,
	                sessionId: this.session.uid,
	                step: step,
	                sequence: sequence,
	                observations: observations,
	                metas: metas,
	                state: state,
	                applicant: applicant
	            });
	        }
	    }, {
	        key: 'finishApplication',
	        value: function finishApplication() {
	            var _ref3 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	            var sequence = _ref3.sequence;
	
	            return this._finishApplication({
	                authorizationToken: this.authorizationToken,
	                requestToken: this.requestToken,
	                sessionId: this.session.uid,
	                sequence: sequence
	            });
	        }
	    }, {
	        key: 'getProgress',
	        value: function getProgress() {
	            return this._getProgress({
	                authorizationToken: this.authorizationToken,
	                requestToken: this.requestToken,
	                sessionId: this.session.uid
	            });
	        }
	    }, {
	        key: '_login',
	        value: function _login() {
	            return request('POST', this.config.encrypterUrl);
	        }
	    }, {
	        key: '_startSession',
	        value: function _startSession(options) {
	            this._validate(options, ['authorizationToken', 'requestToken', 'applicationName']);
	            var authorizationToken = options.authorizationToken;
	            var requestToken = options.requestToken;
	            var applicationName = options.applicationName;
	
	            return request('POST', this.config.backendUrl + 'startSession.json', {
	                authToken: authorizationToken,
	                reqToken: requestToken,
	                data: {
	                    application: applicationName,
	                    applicant: emptyObjectOr({})
	                }
	            });
	        }
	    }, {
	        key: '_resumeSession',
	        value: function _resumeSession(options) {
	            this._validate(options, ['authorizationToken', 'requestToken', 'sessionId', 'applicant']);
	            var authorizationToken = options.authorizationToken;
	            var requestToken = options.requestToken;
	            var sessionId = options.sessionId;
	            var applicant = options.applicant;
	
	            return request('POST', this.config.backendUrl + 'resumeSession.json', {
	                authToken: authorizationToken,
	                reqToken: requestToken,
	                data: {
	                    uid: sessionId,
	                    applicant: emptyObjectOr(applicant)
	                }
	            });
	        }
	    }, {
	        key: '_startApplication',
	        value: function _startApplication(options) {
	            this._validate(options, ['authorizationToken', 'requestToken', 'sessionId']);
	            var authorizationToken = options.authorizationToken;
	            var requestToken = options.requestToken;
	            var sessionId = options.sessionId;
	
	            return request('POST', this.config.backendUrl + 'startApplication.json', {
	                authToken: authorizationToken,
	                reqToken: requestToken,
	                data: {
	                    uid: sessionId,
	                    player: {
	                        type: 'web-embedded',
	                        version: '1'
	                    },
	                    device: {}
	                }
	            });
	        }
	    }, {
	        key: '_finishApplication',
	        value: function _finishApplication(options) {
	            this._validate(options, ['authorizationToken', 'requestToken', 'sessionId', 'sequence']);
	            var authorizationToken = options.authorizationToken;
	            var requestToken = options.requestToken;
	            var sessionId = options.sessionId;
	            var sequence = options.sequence;
	
	            return request('POST', this.config.backendUrl + 'finishApplication.json', {
	                authToken: authorizationToken,
	                reqToken: requestToken,
	                data: {
	                    uid: sessionId,
	                    sequence: sequence
	                }
	            });
	        }
	    }, {
	        key: '_finishStep',
	        value: function _finishStep(options) {
	            this._validate(options, ['authorizationToken', 'requestToken', 'sessionId', 'step', 'sequence', 'observations', 'metas', 'state', 'applicant']);
	            var authorizationToken = options.authorizationToken;
	            var requestToken = options.requestToken;
	            var sessionId = options.sessionId;
	            var step = options.step;
	            var sequence = options.sequence;
	            var observations = options.observations;
	            var metas = options.metas;
	            var state = options.state;
	            var applicant = options.applicant;
	
	            return request('POST', this.config.backendUrl + 'finishStep.json', {
	                authToken: authorizationToken,
	                reqToken: requestToken,
	                data: {
	                    uid: sessionId,
	                    step: step,
	                    sequence: sequence,
	                    observations: emptyObjectOr(observations),
	                    metas: emptyObjectOr(metas),
	                    state: emptyObjectOr(state),
	                    applicant: emptyObjectOr(applicant)
	                }
	            });
	        }
	    }, {
	        key: '_getProgress',
	        value: function _getProgress(options) {
	            this._validate(options, ['authorizationToken', 'requestToken', 'sessionId']);
	            var authorizationToken = options.authorizationToken;
	            var requestToken = options.requestToken;
	            var sessionId = options.sessionId;
	            var applicant = options.applicant;
	
	            return request('POST', this.config.backendUrl + 'getProgress.json', {
	                authToken: authorizationToken,
	                reqToken: requestToken,
	                data: {
	                    uid: sessionId
	                }
	            });
	        }
	    }]);
	
	    return Api;
	})(AbstractApi);
	
	exports['default'] = Api;
	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	var Localization = (function () {
	    function Localization(config) {
	        _classCallCheck(this, Localization);
	
	        this.localePath = config.localePath;
	        this.locales = this.setupLocales(config.locales);
	        this.defaultLanguage = config.defaultLanguage || this.setDefaultLocale();
	        this.availableLanguages = Object.keys(this.locales);
	        this.reload();
	    }
	
	    _createClass(Localization, [{
	        key: 'reload',
	        value: function reload() {
	            if (this.remote) {
	                window.removeEventListener('languagechange', this.remote);
	                document.removeEventListener('additionallanguageschange', this.remote);
	            }
	            this.buildLocales();
	
	            this.remote = new L20n.Remote(L20n.fetchResource, L20n.broadcast, navigator.languages);
	            window.addEventListener('languagechange', this.remote);
	            document.addEventListener('additionallanguageschange', this.remote);
	            this.l10n = new L20n.View(new L20n.Client(this.remote), document);
	        }
	    }, {
	        key: 'buildLocales',
	        value: function buildLocales() {
	            var head = document.querySelector('head');
	            var metas = head.querySelectorAll('meta[name="availableLanguages"],' + 'meta[name="defaultLanguage"],' + 'link[rel="localization"]');
	            for (var i = 0; i < metas.length; i++) {
	                metas[i].parentElement.removeChild(metas[i]);
	            }
	
	            var localization = document.createElement('link');
	            localization.setAttribute('rel', 'localization');
	            localization.setAttribute('href', this.localePath);
	            head.appendChild(localization);
	
	            if (this.defaultLanguage) {
	                var defaultLanguage = document.createElement('meta');
	                defaultLanguage.setAttribute('name', 'defaultLanguage');
	                defaultLanguage.setAttribute('content', this.defaultLanguage);
	                head.appendChild(defaultLanguage);
	            }
	
	            var availableLanguages = document.createElement('meta');
	            availableLanguages.setAttribute('name', 'availableLanguages');
	            availableLanguages.setAttribute('content', this.availableLanguages.join(', '));
	            head.appendChild(availableLanguages);
	        }
	    }, {
	        key: 'setupLocales',
	        value: function setupLocales(langs) {
	            var keys = Object.keys(langs);
	            if (keys.length > 0) {
	                var locales = {};
	
	                for (var i = 0; i < keys.length; i++) {
	                    if (langs.hasOwnProperty(keys[i]) && langs[keys[i]].name) {
	                        locales[keys[i].toLowerCase()] = {
	                            name: langs[keys[i]].name
	                        };
	                    }
	                }
	            }
	            return locales;
	        }
	    }, {
	        key: 'setDefaultLocale',
	        value: function setDefaultLocale() {
	            var browserLocale = (navigator.language || navigator.browserLanguage).toLocaleLowerCase();
	            var browserLocaleShort = browserLocale.split('-')[0];
	            var defaultLocaleKey = Object.keys(this.locales)[0];
	
	            if (this.locales.hasOwnProperty(browserLocale)) {
	                defaultLocaleKey = browserLocale;
	            } else if (this.locales.hasOwnProperty(browserLocaleShort)) {
	                defaultLocaleKey = browserLocaleShort;
	            } else {
	                var found = false;
	                for (var locale in this.locales) {
	                    if (locale.split('-')[0] === browserLocaleShort) {
	                        defaultLocaleKey = locale;
	                        found = true;
	                        break;
	                    }
	                }
	                if (!found && this.locales.hasOwnProperty('en')) {
	                    defaultLocaleKey = 'en';
	                }
	            }
	            return defaultLocaleKey;
	        }
	    }, {
	        key: 'setKey',
	        value: function setKey(element, key) {
	            this.l10n.setAttributes(element, key);
	        }
	    }, {
	        key: 'selectLanguage',
	        value: function selectLanguage(lang) {
	            this.l10n.requestLanguages([lang]);
	        }
	    }, {
	        key: 'setDefaultLanguage',
	        value: function setDefaultLanguage(lang) {
	            this.defaultLanguage = lang;
	            this.reload();
	        }
	    }, {
	        key: 'setAvailableLanguages',
	        value: function setAvailableLanguages(languages) {
	            this.availableLanguages = languages;
	            this.reload();
	        }
	    }]);
	
	    return Localization;
	})();
	
	exports['default'] = Localization;
	module.exports = exports['default'];

/***/ },
/* 4 */
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
//# sourceMappingURL=efl-journey.js.map