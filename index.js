/**
 * Trakerr Client API
 * Get your application events and errors to Trakerr via the *Trakerr API*.
 *
 * OpenAPI spec version: 1.0.0
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['./generated/src/trakerr/index', 'stacktrace-js'], factory);
    } else if (typeof module === 'object' && module.exports) {
        // CommonJS-like environments that support module.exports, like Node.
        module.exports = factory(require('./generated/src/trakerr/index'), require('stacktrace-js'), require('error-stack-parser'));
    }
}(function (TrakerrApi, StackTrace, ErrorStackParser) {
    'use strict';

    /**
     * Create a TrakerrClient instance
     * @param apiKey API Key for the application
     * @param contextAppVersion (optional) application version, defaults to 1.0
     * @param contextEnvName (optional) environment name like "development", "staging", "production" or a custom string
     * @module index
     * @version 1.0.0
     */
    var exports = function TrakerrClient(apiKey,
        contextAppVersion,
        contextDeploymentStage) {
        var _this = this;

        _this.apiKey = apiKey;
        _this.contextAppVersion = contextAppVersion ? contextAppVersion : '1.0';
        _this.contextDeploymentStage = contextDeploymentStage ? contextDeploymentStage : 'development';
        _this.contextEnvLanguage = "JavaScript";
        _this.contextEnvName = "JavaScript";


        if (typeof navigator !== undefined) {
            //from http://stackoverflow.com/questions/9514179/how-to-find-the-operating-system-version-using-javascript

            // browser
            var nVer = navigator.appVersion;
            var nAgt = navigator.userAgent;
            var browser = navigator.appName;
            var version = '' + parseFloat(navigator.appVersion);
            var majorVersion = parseInt(navigator.appVersion, 10);
            var nameOffset, verOffset, ix;

            // Opera
            if ((verOffset = nAgt.indexOf('Opera')) != -1) {
                browser = 'Opera';
                version = nAgt.substring(verOffset + 6);
                if ((verOffset = nAgt.indexOf('Version')) != -1) {
                    version = nAgt.substring(verOffset + 8);
                }
            }
            // Opera Next
            if ((verOffset = nAgt.indexOf('OPR')) != -1) {
                browser = 'Opera';
                version = nAgt.substring(verOffset + 4);
            }
            // Edge
            else if ((verOffset = nAgt.indexOf('Edge')) != -1) {
                browser = 'Microsoft Edge';
                version = nAgt.substring(verOffset + 5);
            }
            // MSIE
            else if ((verOffset = nAgt.indexOf('MSIE')) != -1) {
                browser = 'Microsoft Internet Explorer';
                version = nAgt.substring(verOffset + 5);
            }

            //IE 11 no longer identifies itself as MS IE, so trap it
            //http://stackoverflow.com/questions/17907445/how-to-detect-ie11
            else if ((browser == 'Netscape') && (nAgt.indexOf('Trident/') != -1)) {
                browser = 'Microsoft Internet Explorer';
                version = nAgt.substring(verOffset + 5);
                if ((verOffset = nAgt.indexOf('rv:')) != -1) {
                    version = nAgt.substring(verOffset + 3);
                }

            }

            // Chrome
            else if ((verOffset = nAgt.indexOf('Chrome')) != -1) {
                browser = 'Chrome';
                version = nAgt.substring(verOffset + 7);
            }

            // Safari
            else if ((verOffset = nAgt.indexOf('Safari')) != -1) {
                browser = 'Safari';
                version = nAgt.substring(verOffset + 7);
                if ((verOffset = nAgt.indexOf('Version')) != -1) {
                    version = nAgt.substring(verOffset + 8);
                }

                // Chrome on iPad identifies itself as Safari. Actual results do not match what Google claims
                //  at: https://developers.google.com/chrome/mobile/docs/user-agent?hl=ja
                //  No mention of chrome in the user agent string. However it does mention CriOS, which presumably
                //  can be keyed on to detect it.
                if ((verOffset = nAgt.indexOf('CriOS')) != -1) {
                    //Chrome on iPad spoofing Safari...correct it.
                    browser = 'Chrome';
                    version = nAgt.substring(verOffset + 6);//should get the criOS ver.
                }
            }
            // Firefox
            else if ((verOffset = nAgt.indexOf('Firefox')) != -1) {
                browser = 'Firefox';
                version = nAgt.substring(verOffset + 8);
            }
            // MSIE 11+
            else if (nAgt.indexOf('Trident/') != -1) {
                browser = 'Microsoft Internet Explorer';
                version = nAgt.substring(nAgt.indexOf('rv:') + 3);
            }
            // Other browsers
            else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) {
                browser = nAgt.substring(nameOffset, verOffset);
                version = nAgt.substring(verOffset + 1);
                if (browser.toLowerCase() == browser.toUpperCase()) {
                    browser = navigator.appName;
                }
            }
            // trim the version string
            if ((ix = version.indexOf(';')) != -1) version = version.substring(0, ix);
            if ((ix = version.indexOf(' ')) != -1) version = version.substring(0, ix);
            if ((ix = version.indexOf(')')) != -1) version = version.substring(0, ix);

            majorVersion = parseInt('' + version, 10);
            if (isNaN(majorVersion)) {
                version = '' + parseFloat(navigator.appVersion);
                majorVersion = parseInt(navigator.appVersion, 10);
            }

            // mobile version
            var mobile = /Mobile|mini|Fennec|Android|iP(ad|od|hone)/.test(nVer);

            // cookie
            var cookieEnabled = (navigator.cookieEnabled) ? true : false;

            if (typeof navigator.cookieEnabled == 'undefined' && !cookieEnabled) {
                document.cookie = 'testcookie';
                cookieEnabled = (document.cookie.indexOf('testcookie') != -1) ? true : false;
            }

            // system
            var os = undefined;
            var clientStrings = [
                { s: 'Windows 10', r: /(Windows 10.0|Windows NT 10.0)/ },
                { s: 'Windows 8.1', r: /(Windows 8.1|Windows NT 6.3)/ },
                { s: 'Windows 8', r: /(Windows 8|Windows NT 6.2)/ },
                { s: 'Windows 7', r: /(Windows 7|Windows NT 6.1)/ },
                { s: 'Windows Vista', r: /Windows NT 6.0/ },
                { s: 'Windows Server 2003', r: /Windows NT 5.2/ },
                { s: 'Windows XP', r: /(Windows NT 5.1|Windows XP)/ },
                { s: 'Windows 2000', r: /(Windows NT 5.0|Windows 2000)/ },
                { s: 'Windows ME', r: /(Win 9x 4.90|Windows ME)/ },
                { s: 'Windows 98', r: /(Windows 98|Win98)/ },
                { s: 'Windows 95', r: /(Windows 95|Win95|Windows_95)/ },
                { s: 'Windows NT 4.0', r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/ },
                { s: 'Windows CE', r: /Windows CE/ },
                { s: 'Windows 3.11', r: /Win16/ },
                { s: 'Android', r: /Android/ },
                { s: 'Open BSD', r: /OpenBSD/ },
                { s: 'Sun OS', r: /SunOS/ },
                { s: 'Linux', r: /(Linux|X11)/ },
                { s: 'iOS', r: /(iPhone|iPad|iPod)/ },
                { s: 'Mac OS X', r: /Mac OS X/ },
                { s: 'Mac OS', r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/ },
                { s: 'QNX', r: /QNX/ },
                { s: 'UNIX', r: /UNIX/ },
                { s: 'BeOS', r: /BeOS/ },
                { s: 'OS/2', r: /OS\/2/ },
                { s: 'Search Bot', r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/ }
            ];
            for (var id in clientStrings) {
                var cs = clientStrings[id];
                if (cs.r.test(nAgt)) {
                    os = cs.s;
                    break;
                }
            }

            var osVersion = undefined;

            if (/Windows/.test(os)) {
                osVersion = /Windows (.*)/.exec(os)[1];
                os = 'Windows';
            }

            switch (os) {
                case 'Mac OS X':
                    osVersion = /Mac OS X (10[\.\_\d]+)/.exec(nAgt)[1];
                    break;

                case 'Android':
                    osVersion = /Android ([\.\_\d]+)/.exec(nAgt)[1];
                    break;

                case 'iOS':
                    osVersion = /OS (\d+)_(\d+)_?(\d+)?/.exec(nVer);
                    osVersion = osVersion[1] + '.' + osVersion[2] + '.' + (osVersion[3] | 0);
                    break;
            }

            document.getElementById("outputhook").innerHTML = "I'm a browser!";
            _this.contextEnvVersion = navigator.userAgent;
            _this.contextAppOS = os;
            _this.contextAppOSVersion = osVersion;
            _this.contextAppBrowser = browser;
            _this.contextAppBrowserVersion = version;

        } else {
            try {
                var os = require('os');

                if (typeof os !== 'undefined') {
                    _this.contextAppOS = os.platform();
                    _this.contextAppOSVersion = os.release();
                    _this.contextEnvHostname = os.hostname();
                }
            } catch (err) {

            }
        }

        var apiClient = new TrakerrApi.ApiClient();

        _this.eventsApi = new TrakerrApi.EventsApi(apiClient);

        /**
         * Takes the AppEvent and if a field is undefined, fills it with the trakerrclient default.
         * @param {AppEvent} appEvent An AppEvent instance to fill.
         * @returns Filled AppEvent Instance.
         */
        function fillDefaults(appEvent) {
            if (typeof appEvent.apiKey === 'undefined') appEvent.apiKey = _this.apiKey;

            if (typeof appEvent.contextAppVersion === 'undefined') appEvent.contextAppVersion = _this.contextAppVersion;

            if (typeof appEvent.deploymentStage === 'undefined') appEvent.deploymentStage = _this.deploymentStage;
            if (typeof appEvent.contextEnvLanguage === 'undefined') appEvent.contextEnvLanguage = _this.contextEnvLanguage;
            if (typeof appEvent.contextEnvName === 'undefined') appEvent.contextEnvName = _this.contextEnvName;
            if (typeof appEvent.contextEnvVersion === 'undefined') appEvent.contextEnvVersion = _this.contextEnvVersion;
            if (typeof appEvent.contextEnvHostname === 'undefined') appEvent.contextEnvHostname = _this.contextEnvHostname;

            if (typeof appEvent.contextAppOS === 'undefined') {
                appEvent.contextAppOS = _this.contextAppOS;
                appEvent.contextAppOSVersion = _this.contextAppOSVersion;
            }

            if (typeof appEvent.contextAppBrowser === 'undefined') {
                appEvent.contextAppBrowser = _this.contextAppBrowser;
                appEvent.contextAppBrowserVersion = _this.contextAppBrowserVersion;
            }

            if (typeof appEvent.contextDataCenter === 'undefined') appEvent.contextDataCenter = _this.contextDataCenter;
            if (typeof appEvent.contextDataCenterRegion === 'undefined') appEvent.contextDataCenterRegion = _this.contextDataCenterRegion;

            if (typeof appEvent.eventTime === 'undefined') appEvent.eventTime = (new Date()).getTime();
            return appEvent;
        }

        /**
         * Gets the error information and seralizes the stacktrace to sent to trakerr
         * @param {object} error Error captured.
         * @param {string} logLevel String representation of the level.
         * @param {string} classification optional extra error string 
         * @param {stackframe[]} stackFrames Stackframes to parse.
         * @return New AppEvent instance.
         */
        function fillStacktrace(error, logLevel, classification, stackFrames) {
            var type = (typeof error === 'object') ? error.constructor.name : (typeof error).toString();

            var newEvent = _this.createAppEvent(logLevel ? logLevel : "Error", classification, type, error.toString());
            newEvent.eventStacktrace = new TrakerrApi.Stacktrace();

            var innerTrace = new TrakerrApi.InnerStackTrace();
            innerTrace.type = type;
            innerTrace.message = error instanceof Error ? error.message : error.toString();
            innerTrace.traceLines = new TrakerrApi.StackTraceLines();

            for (var i in stackFrames) {
                var traceLine = new TrakerrApi.StackTraceLine();
                traceLine.function = stackFrames[i].functionName;
                traceLine.file = stackFrames[i].fileName;
                traceLine.line = stackFrames[i].lineNumber + ":" + stackFrames[i].columnNumber;
                Array.prototype.push.call(innerTrace.traceLines, traceLine);
            }

            Array.prototype.push.call(newEvent.eventStacktrace, innerTrace);
            return newEvent;
        }

        /**
         * Takes a captured error and sends it.
         * @param {*} err Error that has been triggered.
         * @param {*} classification string representation on the level of the error.
         * @param {*} shouldDie boolean on if the program should crash after handling.
         * @param {*} callbackFn callback function for sendEvent. Falsy value if you don't need it.
         */
        function sendEventFromError(err, logLevel, classification, shouldDie, callbackFn) {
            StackTrace
                .fromError(err)
                .then(function (stackFrames) {
                    var newEvent = fillStacktrace(err, logLevel, classification, stackFrames);
                    if (callbackFn) {
                        callbackFn(newEvent);
                    }
                    _this.sendEvent(newEvent, function (error, data, response) {
                        if (error) {
                            console.error('Error Response: ' + error + ', data = ' + data + ', response = ' + JSON.stringify(response));
                        } else {
                            console.log('Response: data = ' + data + ', response = ' + JSON.stringify(response));
                        }
                        if (shouldDie) {
                            process.exit(1);
                        }
                    });
                })
                .catch(function (err) {
                    console.error("Error: " + err);
                    if (shouldDie) {
                        process.exit(1);
                    }
                });
        }

        /**
         * Setup global exception handling
         *
         * @param shouldDie should the process exit on error (applicable to node or other environments, ignored if in browser)
         */
        TrakerrClient.prototype.handleExceptions = function(shouldDie) {
            if (typeof window !== 'undefined') {
                window.onerror = function (msg, file, line, col, error) {
                    var string = msg.toLowerCase();
                    var substring = "script error";
                    if (string.indexOf(substring) > -1) {
                        console.error('Script Error: Script error encountered, see browser console for more.');
                    } else {
                        sendEventFromError(error, "Error", false);
                    }
                }
            } else if (typeof process !== 'undefined') {
                shouldDie = (typeof shouldDie === 'undefined') ? true : shouldDie;
                process.on('uncaughtException', function (err) {
                    sendEventFromError(err, "Error", shouldDie);
                });
            }
        };


        /**
         * Constructs a new {model:AppEvent}
         *
         * @param classification classification like "Error", "Debug", "Warning" or "Info" or a custom string
         * @param eventType event type
         * @param eventMessage event message
         * @returns app event
         */
        TrakerrClient.prototype.createAppEvent = function (logLevel, classification, eventType, eventMessage) {
            var _this = this;
            if (!logLevel) logLevel = 'Error';
            if (!classification) classification = "unknown";
            if (!eventType) eventType = 'unknown';
            if (!eventMessage) eventMessage = 'unknown';

            var appevent = new TrakerrApi.AppEvent(_this.apiKey, classification, eventType, eventMessage);
            appevent.logLevel = logLevel;

            return fillDefaults(appevent);
        };


        /**
         * Send err to Trackerr with optional callback to populate custom properties
         *
         * @param err the error to send
         * @param {string} logLevel classification like "Error", "Debug", "Warning" or "Info" or a custom string
         * @param {string} classification (optional) error descriptor string on what the specific error is under it's type
         * @param {function} callbackFn (optional) callback function that is called with one parameter i.e. the event, so other properties can be populated before the event is sent
         */
        TrakerrClient.prototype.sendError = function (err, logLevel, classification, callbackFn) {
            sendEventFromError(err, logLevel, classification, false, callbackFn);
        };

        /**
         * Send event to Trakerr
         *
         * @param appEvent the event to send constructed using {createAppEvent}
         * @param callback the callback accepting the following parameters: error, data, response
         */
        TrakerrClient.prototype.sendEvent = function (appEvent, callback) {
            var _this = this;

            return _this.eventsApi.eventsPost(fillDefaults(appEvent), callback);
        };


        //accessors
        TrakerrClient.prototype.get_ApiKey = function () {
            var _this = this;

            return _this.apiKey;
        };

        TrakerrClient.prototype.set_ApiKey = function (apikey) {
            var _this = this;

            _this.apiKey = apikey;
        };

        TrakerrClient.prototype.get_contextAppVersion = function () {
            var _this = this;

            return _this.contextAppVersion;
        };

        TrakerrClient.prototype.set_contextAppVersion = function (contextappversion) {
            var _this = this;

            _this.contextAppVersion = contextappversion;
        };

        TrakerrClient.prototype.get_contextDeploymentStage = function () {
            var _this = this;

            return _this.contextDeploymentStage;
        };

        TrakerrClient.prototype.set_contextDeploymentStage = function (contextdeploymentstage) {
            var _this = this;

            _this.contextDeploymentStage = contextdeploymentstage;
        };

        TrakerrClient.prototype.get_contextEnvLanguage = function () {
            var _this = this;

            return _this.contextEnvLanguage;
        };

        TrakerrClient.prototype.set_contextEnvLanguage = function (contextenvlanguage) {
            var _this = this;

            _this.contextEnvLanguage = contextenvlanguage;
        };

        TrakerrClient.prototype.get_contextEnvName = function () {
            var _this = this;

            return _this.contextEnvName;
        };

        TrakerrClient.prototype.set_contextEnvName = function (contextenvname) {
            var _this = this;

            _this.contextEnvName = contextenvname;
        };

        TrakerrClient.prototype.get_contextEnvVersion = function () {
            var _this = this;

            return _this.contextEnvVersion;
        };

        TrakerrClient.prototype.set_contextEnvVersion = function (contextenvversion) {
            var _this = this;

            _this.contextEnvVersion = contextenvversion;
        };

        TrakerrClient.prototype.get_contextEnvHostname = function () {
            var _this = this;

            return _this.contextEnvHostname;
        };

        TrakerrClient.prototype.set_contextEnvHostname = function (contextenvhostname) {
            var _this = this;

            _this.contextEnvHostname = contextenvhostname;
        };

        TrakerrClient.prototype.get_contextAppOS = function () {
            var _this = this;

            return _this.contextAppOS;
        };

        TrakerrClient.prototype.set_contextAppOS = function (contextappos) {
            var _this = this;

            _this.contextAppOS = contextappos;
        };

        TrakerrClient.prototype.get_contextAppOSVersion = function () {
            var _this = this;

            return _this.contextAppOSVersion;
        };

        TrakerrClient.prototype.set_contextAppOSVersion = function (contextapposversion) {
            var _this = this;

            _this.contextAppOSVersion = contextapposversion;
        };

        TrakerrClient.prototype.get_contextAppBrowser = function () {
            var _this = this;

            return _this.contextAppBrowser;
        };

        TrakerrClient.prototype.set_contextAppBrowser = function (contextappbrowser) {
            var _this = this;

            _this.contextAppBrowser = contextappbrowser;
        };

        TrakerrClient.prototype.get_contextAppBrowserVersion = function () {
            var _this = this;

            return _this.contextAppBrowserVersion;
        };

        TrakerrClient.prototype.set_contextAppBrowserVersion = function (contextappbrowserversion) {
            var _this = this;

            _this.contextAppBrowserVersion = contextappbrowserversion;
        };

        TrakerrClient.prototype.get_contextDataCenter = function () {
            var _this = this;

            return _this.contextDataCenter;
        };

        TrakerrClient.prototype.set_contextDataCenter = function (contextdatacenter) {
            var _this = this;

            _this.contextDataCenter = contextdatacenter;
        };

        TrakerrClient.prototype.get_contextDataCenterRegion = function () {
            var _this = this;

            return _this.contextDataCenter;
        };

        TrakerrClient.prototype.set_contextDataCenterRegion = function (contextdatacenterregion) {
            var _this = this;

            _this.contextDataCenterRegion = contextdatacenterregion;
        };
    };

    return exports;
}));
