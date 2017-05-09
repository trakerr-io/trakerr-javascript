/**
 * Trakerr API
 * Get your application events and errors to Trakerr via the *Trakerr API*.
 *
 * OpenAPI spec version: 1.0.0
 * 
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

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['trakerr/ApiClient', 'trakerr/model/CustomData', 'trakerr/model/Stacktrace'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./CustomData'), require('./Stacktrace'));
  } else {
    // Browser globals (root is window)
    if (!root.TrakerrApi) {
      root.TrakerrApi = {};
    }
    root.TrakerrApi.AppEvent = factory(root.TrakerrApi.ApiClient, root.TrakerrApi.CustomData, root.TrakerrApi.Stacktrace);
  }
}(this, function(ApiClient, CustomData, Stacktrace) {
  'use strict';




  /**
   * The AppEvent model module.
   * @module trakerr/model/AppEvent
   * @version 1.0.0
   */

  /**
   * Constructs a new <code>AppEvent</code>.
   * @alias module:trakerr/model/AppEvent
   * @class
   * @param apiKey {String} API key generated for the application
   * @param classification {String} (optional) one of 'issue' or a custom string for non-issues, defaults to 'issue'
   * @param eventType {String} type of the event or error (eg. NullPointerException)
   * @param eventMessage {String} message containing details of the event or error
   */
  var exports = function(apiKey, logLevel, classification, eventType, eventMessage) {
    var _this = this;

    _this['apiKey'] = apiKey;
    _this['logLevel'] = logLevel;
    _this['classification'] = classification;
    _this['eventType'] = eventType;
    _this['eventMessage'] = eventMessage;


























  };

  /**
   * Constructs a <code>AppEvent</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:trakerr/model/AppEvent} obj Optional instance to populate.
   * @return {module:trakerr/model/AppEvent} The populated <code>AppEvent</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('apiKey')) {
        obj['apiKey'] = ApiClient.convertToType(data['apiKey'], 'String');
      }
      if (data.hasOwnProperty('logLevel')) {
        obj['logLevel'] = ApiClient.convertToType(data['logLevel'], 'String');
      }
      if (data.hasOwnProperty('classification')) {
        obj['classification'] = ApiClient.convertToType(data['classification'], 'String');
      }
      if (data.hasOwnProperty('eventType')) {
        obj['eventType'] = ApiClient.convertToType(data['eventType'], 'String');
      }
      if (data.hasOwnProperty('eventMessage')) {
        obj['eventMessage'] = ApiClient.convertToType(data['eventMessage'], 'String');
      }
      if (data.hasOwnProperty('eventTime')) {
        obj['eventTime'] = ApiClient.convertToType(data['eventTime'], 'Integer');
      }
      if (data.hasOwnProperty('eventStacktrace')) {
        obj['eventStacktrace'] = Stacktrace.constructFromObject(data['eventStacktrace']);
      }
      if (data.hasOwnProperty('eventUser')) {
        obj['eventUser'] = ApiClient.convertToType(data['eventUser'], 'String');
      }
      if (data.hasOwnProperty('eventSession')) {
        obj['eventSession'] = ApiClient.convertToType(data['eventSession'], 'String');
      }
      if (data.hasOwnProperty('contextAppVersion')) {
        obj['contextAppVersion'] = ApiClient.convertToType(data['contextAppVersion'], 'String');
      }
      if (data.hasOwnProperty('deploymentStage')) {
        obj['deploymentStage'] = ApiClient.convertToType(data['deploymentStage'], 'String');
      }
      if (data.hasOwnProperty('contextEnvName')) {
        obj['contextEnvName'] = ApiClient.convertToType(data['contextEnvName'], 'String');
      }
      if (data.hasOwnProperty('contextEnvLanguage')) {
        obj['contextEnvLanguage'] = ApiClient.convertToType(data['contextEnvLanguage'], 'String');
      }
      if (data.hasOwnProperty('contextEnvVersion')) {
        obj['contextEnvVersion'] = ApiClient.convertToType(data['contextEnvVersion'], 'String');
      }
      if (data.hasOwnProperty('contextEnvHostname')) {
        obj['contextEnvHostname'] = ApiClient.convertToType(data['contextEnvHostname'], 'String');
      }
      if (data.hasOwnProperty('contextAppBrowser')) {
        obj['contextAppBrowser'] = ApiClient.convertToType(data['contextAppBrowser'], 'String');
      }
      if (data.hasOwnProperty('contextAppBrowserVersion')) {
        obj['contextAppBrowserVersion'] = ApiClient.convertToType(data['contextAppBrowserVersion'], 'String');
      }
      if (data.hasOwnProperty('contextAppOS')) {
        obj['contextAppOS'] = ApiClient.convertToType(data['contextAppOS'], 'String');
      }
      if (data.hasOwnProperty('contextAppOSVersion')) {
        obj['contextAppOSVersion'] = ApiClient.convertToType(data['contextAppOSVersion'], 'String');
      }
      if (data.hasOwnProperty('contextDataCenter')) {
        obj['contextDataCenter'] = ApiClient.convertToType(data['contextDataCenter'], 'String');
      }
      if (data.hasOwnProperty('contextDataCenterRegion')) {
        obj['contextDataCenterRegion'] = ApiClient.convertToType(data['contextDataCenterRegion'], 'String');
      }
      if (data.hasOwnProperty('contextTags')) {
        obj['contextTags'] = ApiClient.convertToType(data['contextTags'], ['String']);
      }
      if (data.hasOwnProperty('contextURL')) {
        obj['contextURL'] = ApiClient.convertToType(data['contextURL'], 'String');
      }
      if (data.hasOwnProperty('contextOperationTimeMillis')) {
        obj['contextOperationTimeMillis'] = ApiClient.convertToType(data['contextOperationTimeMillis'], 'Integer');
      }
      if (data.hasOwnProperty('contextCpuPercentage')) {
        obj['contextCpuPercentage'] = ApiClient.convertToType(data['contextCpuPercentage'], 'Integer');
      }
      if (data.hasOwnProperty('contextMemoryPercentage')) {
        obj['contextMemoryPercentage'] = ApiClient.convertToType(data['contextMemoryPercentage'], 'Integer');
      }
      if (data.hasOwnProperty('contextCrossAppCorrelationId')) {
        obj['contextCrossAppCorrelationId'] = ApiClient.convertToType(data['contextCrossAppCorrelationId'], 'String');
      }
      if (data.hasOwnProperty('contextDevice')) {
        obj['contextDevice'] = ApiClient.convertToType(data['contextDevice'], 'String');
      }
      if (data.hasOwnProperty('contextAppSku')) {
        obj['contextAppSku'] = ApiClient.convertToType(data['contextAppSku'], 'String');
      }
      if (data.hasOwnProperty('customProperties')) {
        obj['customProperties'] = CustomData.constructFromObject(data['customProperties']);
      }
      if (data.hasOwnProperty('customSegments')) {
        obj['customSegments'] = CustomData.constructFromObject(data['customSegments']);
      }
    }
    return obj;
  }

  /**
   * API key generated for the application
   * @member {String} apiKey
   */
  exports.prototype['apiKey'] = undefined;
  /**
   * (optional) Logging level, one of 'debug','info','warning','error', 'fatal', defaults to 'error'
   * @member {module:trakerr/model/AppEvent.LogLevelEnum} logLevel
   */
  exports.prototype['logLevel'] = undefined;
  /**
   * (optional) one of 'issue' or a custom string for non-issues, defaults to 'issue'
   * @member {String} classification
   */
  exports.prototype['classification'] = undefined;
  /**
   * type of the event or error (eg. NullPointerException)
   * @member {String} eventType
   */
  exports.prototype['eventType'] = undefined;
  /**
   * message containing details of the event or error
   * @member {String} eventMessage
   */
  exports.prototype['eventMessage'] = undefined;
  /**
   * (optional) event time in ms since epoch
   * @member {Integer} eventTime
   */
  exports.prototype['eventTime'] = undefined;
  /**
   * @member {module:trakerr/model/Stacktrace} eventStacktrace
   */
  exports.prototype['eventStacktrace'] = undefined;
  /**
   * (optional) event user identifying a user
   * @member {String} eventUser
   */
  exports.prototype['eventUser'] = undefined;
  /**
   * (optional) session identification
   * @member {String} eventSession
   */
  exports.prototype['eventSession'] = undefined;
  /**
   * (optional) application version information
   * @member {String} contextAppVersion
   */
  exports.prototype['contextAppVersion'] = undefined;
  /**
   * (optional) deployment stage, one of 'development','staging','production' or a custom string
   * @member {String} deploymentStage
   */
  exports.prototype['deploymentStage'] = undefined;
  /**
   * (optional) environment name (like 'cpython' or 'ironpython' etc.)
   * @member {String} contextEnvName
   */
  exports.prototype['contextEnvName'] = undefined;
  /**
   * (optional) language (like 'python' or 'c#' etc.)
   * @member {String} contextEnvLanguage
   */
  exports.prototype['contextEnvLanguage'] = undefined;
  /**
   * (optional) version of environment
   * @member {String} contextEnvVersion
   */
  exports.prototype['contextEnvVersion'] = undefined;
  /**
   * (optional) hostname or ID of environment
   * @member {String} contextEnvHostname
   */
  exports.prototype['contextEnvHostname'] = undefined;
  /**
   * (optional) browser name if running in a browser (eg. Chrome)
   * @member {String} contextAppBrowser
   */
  exports.prototype['contextAppBrowser'] = undefined;
  /**
   * (optional) browser version if running in a browser
   * @member {String} contextAppBrowserVersion
   */
  exports.prototype['contextAppBrowserVersion'] = undefined;
  /**
   * (optional) OS the application is running on
   * @member {String} contextAppOS
   */
  exports.prototype['contextAppOS'] = undefined;
  /**
   * (optional) OS version the application is running on
   * @member {String} contextAppOSVersion
   */
  exports.prototype['contextAppOSVersion'] = undefined;
  /**
   * (optional) Data center the application is running on or connected to
   * @member {String} contextDataCenter
   */
  exports.prototype['contextDataCenter'] = undefined;
  /**
   * (optional) Data center region
   * @member {String} contextDataCenterRegion
   */
  exports.prototype['contextDataCenterRegion'] = undefined;
  /**
   * @member {Array.<String>} contextTags
   */
  exports.prototype['contextTags'] = undefined;
  /**
   * (optional) The full URL when running in a browser when the event was generated.
   * @member {String} contextURL
   */
  exports.prototype['contextURL'] = undefined;
  /**
   * (optional) duration that this event took to occur in millis. Example - database call time in millis.
   * @member {Integer} contextOperationTimeMillis
   */
  exports.prototype['contextOperationTimeMillis'] = undefined;
  /**
   * (optional) CPU utilization as a percent when event occured
   * @member {Integer} contextCpuPercentage
   */
  exports.prototype['contextCpuPercentage'] = undefined;
  /**
   * (optional) Memory utilization as a percent when event occured
   * @member {Integer} contextMemoryPercentage
   */
  exports.prototype['contextMemoryPercentage'] = undefined;
  /**
   * (optional) Cross application correlation ID
   * @member {String} contextCrossAppCorrelationId
   */
  exports.prototype['contextCrossAppCorrelationId'] = undefined;
  /**
   * (optional) Device information
   * @member {String} contextDevice
   */
  exports.prototype['contextDevice'] = undefined;
  /**
   * (optional) Application SKU
   * @member {String} contextAppSku
   */
  exports.prototype['contextAppSku'] = undefined;
  /**
   * @member {module:trakerr/model/CustomData} customProperties
   */
  exports.prototype['customProperties'] = undefined;
  /**
   * @member {module:trakerr/model/CustomData} customSegments
   */
  exports.prototype['customSegments'] = undefined;


  /**
   * Allowed values for the <code>logLevel</code> property.
   * @enum {String}
   * @readonly
   */
  exports.LogLevelEnum = {
    /**
     * value: "debug"
     * @const
     */
    "debug": "debug",
    /**
     * value: "info"
     * @const
     */
    "info": "info",
    /**
     * value: "warning"
     * @const
     */
    "warning": "warning",
    /**
     * value: "error"
     * @const
     */
    "error": "error",
    /**
     * value: "fatal"
     * @const
     */
    "fatal": "fatal"  };


  return exports;
}));


