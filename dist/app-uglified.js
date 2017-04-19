!function(a,b){"function"==typeof define&&define.amd?define(["superagent"],b):"object"==typeof module&&module.exports?module.exports=b(require("superagent")):(a.TrakerrApi||(a.TrakerrApi={}),a.TrakerrApi.ApiClient=b(a.superagent))}(this,function(a){"use strict";var b=function(){this.basePath="https://www.trakerr.io/api/v1".replace(/\/+$/,""),this.authentications={},this.defaultHeaders={},this.timeout=6e4};return b.prototype.paramToString=function(a){return void 0==a||null==a?"":a instanceof Date?a.toJSON():a.toString()},b.prototype.buildUrl=function(a,b){a.match(/^\//)||(a="/"+a);var c=this.basePath+a,d=this;return c=c.replace(/\{([\w-]+)\}/g,function(a,c){var e;return e=b.hasOwnProperty(c)?d.paramToString(b[c]):a,encodeURIComponent(e)})},b.prototype.isJsonMime=function(a){return Boolean(null!=a&&a.match(/^application\/json(;.*)?$/i))},b.prototype.jsonPreferredMime=function(a){for(var b=0;b<a.length;b++)if(this.isJsonMime(a[b]))return a[b];return a[0]},b.prototype.isFileParam=function(a){return!!("undefined"==typeof window&&"function"==typeof require&&require("fs")&&a instanceof require("fs").ReadStream)||("function"==typeof Buffer&&a instanceof Buffer||("function"==typeof Blob&&a instanceof Blob||"function"==typeof File&&a instanceof File))},b.prototype.normalizeParams=function(a){var b={};for(var c in a)if(a.hasOwnProperty(c)&&void 0!=a[c]&&null!=a[c]){var d=a[c];this.isFileParam(d)||Array.isArray(d)?b[c]=d:b[c]=this.paramToString(d)}return b},b.CollectionFormatEnum={CSV:",",SSV:" ",TSV:"\t",PIPES:"|",MULTI:"multi"},b.prototype.buildCollectionParam=function(a,b){if(null==a)return null;switch(b){case"csv":return a.map(this.paramToString).join(",");case"ssv":return a.map(this.paramToString).join(" ");case"tsv":return a.map(this.paramToString).join("\t");case"pipes":return a.map(this.paramToString).join("|");case"multi":return a.map(this.paramToString);default:throw new Error("Unknown collection format: "+b)}},b.prototype.applyAuthToRequest=function(a,b){var c=this;b.forEach(function(b){var d=c.authentications[b];switch(d.type){case"basic":(d.username||d.password)&&a.auth(d.username||"",d.password||"");break;case"apiKey":if(d.apiKey){var e={};d.apiKeyPrefix?e[d.name]=d.apiKeyPrefix+" "+d.apiKey:e[d.name]=d.apiKey,"header"===d.in?a.set(e):a.query(e)}break;case"oauth2":d.accessToken&&a.set({Authorization:"Bearer "+d.accessToken});break;default:throw new Error("Unknown authentication type: "+d.type)}})},b.prototype.deserialize=function(a,c){if(null==a||null==c)return null;var d=a.body;return null==d&&(d=a.text),b.convertToType(d,c)},b.prototype.callApi=function(b,c,d,e,f,g,h,i,j,k,l,m){var n=this,o=this.buildUrl(b,d),p=a(c,o);this.applyAuthToRequest(p,i),p.query(this.normalizeParams(e)),p.set(this.defaultHeaders).set(this.normalizeParams(f)),p.timeout(this.timeout);var q=this.jsonPreferredMime(j);if(q?p.type(q):p.header["Content-Type"]||p.type("application/json"),"application/x-www-form-urlencoded"===q)p.send(this.normalizeParams(g));else if("multipart/form-data"==q){var r=this.normalizeParams(g);for(var s in r)r.hasOwnProperty(s)&&(this.isFileParam(r[s])?p.attach(s,r[s]):p.field(s,r[s]))}else h&&p.send(h);var t=this.jsonPreferredMime(k);return t&&p.accept(t),p.end(function(a,b){if(m){var c=null;a||(c=n.deserialize(b,l)),m(a,c,b)}}),p},b.parseDate=function(a){return new Date(a.replace(/T/i," "))},b.convertToType=function(a,c){switch(c){case"Boolean":return Boolean(a);case"Integer":return parseInt(a,10);case"Number":return parseFloat(a);case"String":return String(a);case"Date":return this.parseDate(String(a));default:if(c===Object)return a;if("function"==typeof c)return c.constructFromObject(a);if(Array.isArray(c)){var d=c[0];return a.map(function(a){return b.convertToType(a,d)})}if("object"==typeof c){var e,f;for(var g in c)if(c.hasOwnProperty(g)){e=g,f=c[g];break}var h={};for(var g in a)if(a.hasOwnProperty(g)){var i=b.convertToType(g,e),j=b.convertToType(a[g],f);h[i]=j}return h}return a}},b.constructFromObject=function(a,c,d){if(Array.isArray(a))for(var e=0;e<a.length;e++)a.hasOwnProperty(e)&&(c[e]=b.convertToType(a[e],d));else for(var f in a)a.hasOwnProperty(f)&&(c[f]=b.convertToType(a[f],d))},b.instance=new b,b}),function(a,b){"function"==typeof define&&define.amd?define(["trakerr/ApiClient","trakerr/model/AppEvent","trakerr/model/Error"],b):"object"==typeof module&&module.exports?module.exports=b(require("../ApiClient"),require("../model/AppEvent"),require("../model/Error")):(a.TrakerrApi||(a.TrakerrApi={}),a.TrakerrApi.EventsApi=b(a.TrakerrApi.ApiClient,a.TrakerrApi.AppEvent,a.TrakerrApi.Error))}(this,function(a,b,c){"use strict";var d=function(b){this.apiClient=b||a.instance,this.eventsPost=function(a,b){var c=a;if(void 0==a||null==a)throw"Missing the required parameter 'data' when calling eventsPost";var d={},e={},f={},g={},h=[],i=[],j=["application/json"],k=null;return this.apiClient.callApi("/events","POST",d,e,f,g,c,h,i,j,k,b)}};return d}),function(a){"function"==typeof define&&define.amd?define(["trakerr/ApiClient","trakerr/model/AppEvent","trakerr/model/CustomData","trakerr/model/CustomDoubleData","trakerr/model/CustomStringData","trakerr/model/Error","trakerr/model/InnerStackTrace","trakerr/model/StackTraceLine","trakerr/model/StackTraceLines","trakerr/model/Stacktrace","trakerr/api/EventsApi"],a):"object"==typeof module&&module.exports&&(module.exports=a(require("./ApiClient"),require("./model/AppEvent"),require("./model/CustomData"),require("./model/CustomDoubleData"),require("./model/CustomStringData"),require("./model/Error"),require("./model/InnerStackTrace"),require("./model/StackTraceLine"),require("./model/StackTraceLines"),require("./model/Stacktrace"),require("./api/EventsApi")))}(function(a,b,c,d,e,f,g,h,i,j,k){"use strict";var l={ApiClient:a,AppEvent:b,CustomData:c,CustomDoubleData:d,CustomStringData:e,Error:f,InnerStackTrace:g,StackTraceLine:h,StackTraceLines:i,Stacktrace:j,EventsApi:k};return l}),function(a,b){"function"==typeof define&&define.amd?define(["trakerr/ApiClient","trakerr/model/CustomData","trakerr/model/Stacktrace"],b):"object"==typeof module&&module.exports?module.exports=b(require("../ApiClient"),require("./CustomData"),require("./Stacktrace")):(a.TrakerrApi||(a.TrakerrApi={}),a.TrakerrApi.AppEvent=b(a.TrakerrApi.ApiClient,a.TrakerrApi.CustomData,a.TrakerrApi.Stacktrace))}(this,function(a,b,c){"use strict";var d=function(a,b,c,d,e){var f=this;f.apiKey=a,f.logLevel=b,f.classification=c,f.eventType=d,f.eventMessage=e};return d.constructFromObject=function(e,f){return e&&(f=f||new d,e.hasOwnProperty("apiKey")&&(f.apiKey=a.convertToType(e.apiKey,"String")),e.hasOwnProperty("logLevel")&&(f.logLevel=a.convertToType(e.logLevel,"String")),e.hasOwnProperty("classification")&&(f.classification=a.convertToType(e.classification,"String")),e.hasOwnProperty("eventType")&&(f.eventType=a.convertToType(e.eventType,"String")),e.hasOwnProperty("eventMessage")&&(f.eventMessage=a.convertToType(e.eventMessage,"String")),e.hasOwnProperty("eventTime")&&(f.eventTime=a.convertToType(e.eventTime,"Integer")),e.hasOwnProperty("eventStacktrace")&&(f.eventStacktrace=c.constructFromObject(e.eventStacktrace)),e.hasOwnProperty("eventUser")&&(f.eventUser=a.convertToType(e.eventUser,"String")),e.hasOwnProperty("eventSession")&&(f.eventSession=a.convertToType(e.eventSession,"String")),e.hasOwnProperty("contextAppVersion")&&(f.contextAppVersion=a.convertToType(e.contextAppVersion,"String")),e.hasOwnProperty("deploymentStage")&&(f.deploymentStage=a.convertToType(e.deploymentStage,"String")),e.hasOwnProperty("contextEnvName")&&(f.contextEnvName=a.convertToType(e.contextEnvName,"String")),e.hasOwnProperty("contextEnvLanguage")&&(f.contextEnvLanguage=a.convertToType(e.contextEnvLanguage,"String")),e.hasOwnProperty("contextEnvVersion")&&(f.contextEnvVersion=a.convertToType(e.contextEnvVersion,"String")),e.hasOwnProperty("contextEnvHostname")&&(f.contextEnvHostname=a.convertToType(e.contextEnvHostname,"String")),e.hasOwnProperty("contextAppBrowser")&&(f.contextAppBrowser=a.convertToType(e.contextAppBrowser,"String")),e.hasOwnProperty("contextAppBrowserVersion")&&(f.contextAppBrowserVersion=a.convertToType(e.contextAppBrowserVersion,"String")),e.hasOwnProperty("contextAppOS")&&(f.contextAppOS=a.convertToType(e.contextAppOS,"String")),e.hasOwnProperty("contextAppOSVersion")&&(f.contextAppOSVersion=a.convertToType(e.contextAppOSVersion,"String")),e.hasOwnProperty("contextDataCenter")&&(f.contextDataCenter=a.convertToType(e.contextDataCenter,"String")),e.hasOwnProperty("contextDataCenterRegion")&&(f.contextDataCenterRegion=a.convertToType(e.contextDataCenterRegion,"String")),e.hasOwnProperty("customProperties")&&(f.customProperties=b.constructFromObject(e.customProperties)),e.hasOwnProperty("customSegments")&&(f.customSegments=b.constructFromObject(e.customSegments))),f},d.prototype.apiKey=void 0,d.prototype.logLevel=void 0,d.prototype.classification=void 0,d.prototype.eventType=void 0,d.prototype.eventMessage=void 0,d.prototype.eventTime=void 0,d.prototype.eventStacktrace=void 0,d.prototype.eventUser=void 0,d.prototype.eventSession=void 0,d.prototype.contextAppVersion=void 0,d.prototype.deploymentStage=void 0,d.prototype.contextEnvName=void 0,d.prototype.contextEnvLanguage=void 0,d.prototype.contextEnvVersion=void 0,d.prototype.contextEnvHostname=void 0,d.prototype.contextAppBrowser=void 0,d.prototype.contextAppBrowserVersion=void 0,d.prototype.contextAppOS=void 0,d.prototype.contextAppOSVersion=void 0,d.prototype.contextDataCenter=void 0,d.prototype.contextDataCenterRegion=void 0,d.prototype.customProperties=void 0,d.prototype.customSegments=void 0,d.LogLevelEnum={debug:"debug",info:"info",warning:"warning",error:"error",fatal:"fatal"},d}),function(a,b){"function"==typeof define&&define.amd?define(["trakerr/ApiClient","trakerr/model/CustomDoubleData","trakerr/model/CustomStringData"],b):"object"==typeof module&&module.exports?module.exports=b(require("../ApiClient"),require("./CustomDoubleData"),require("./CustomStringData")):(a.TrakerrApi||(a.TrakerrApi={}),a.TrakerrApi.CustomData=b(a.TrakerrApi.ApiClient,a.TrakerrApi.CustomDoubleData,a.TrakerrApi.CustomStringData))}(this,function(a,b,c){"use strict";var d=function(){};return d.constructFromObject=function(a,e){return a&&(e=e||new d,a.hasOwnProperty("stringData")&&(e.stringData=c.constructFromObject(a.stringData)),a.hasOwnProperty("doubleData")&&(e.doubleData=b.constructFromObject(a.doubleData))),e},d.prototype.stringData=void 0,d.prototype.doubleData=void 0,d}),function(a,b){"function"==typeof define&&define.amd?define(["trakerr/ApiClient"],b):"object"==typeof module&&module.exports?module.exports=b(require("../ApiClient")):(a.TrakerrApi||(a.TrakerrApi={}),a.TrakerrApi.CustomDoubleData=b(a.TrakerrApi.ApiClient))}(this,function(a){"use strict";var b=function(){};return b.constructFromObject=function(c,d){return c&&(d=d||new b,c.hasOwnProperty("customData1")&&(d.customData1=a.convertToType(c.customData1,"Number")),c.hasOwnProperty("customData2")&&(d.customData2=a.convertToType(c.customData2,"Number")),c.hasOwnProperty("customData3")&&(d.customData3=a.convertToType(c.customData3,"Number")),c.hasOwnProperty("customData4")&&(d.customData4=a.convertToType(c.customData4,"Number")),c.hasOwnProperty("customData5")&&(d.customData5=a.convertToType(c.customData5,"Number")),c.hasOwnProperty("customData6")&&(d.customData6=a.convertToType(c.customData6,"Number")),c.hasOwnProperty("customData7")&&(d.customData7=a.convertToType(c.customData7,"Number")),c.hasOwnProperty("customData8")&&(d.customData8=a.convertToType(c.customData8,"Number")),c.hasOwnProperty("customData9")&&(d.customData9=a.convertToType(c.customData9,"Number")),c.hasOwnProperty("customData10")&&(d.customData10=a.convertToType(c.customData10,"Number"))),d},b.prototype.customData1=void 0,b.prototype.customData2=void 0,b.prototype.customData3=void 0,b.prototype.customData4=void 0,b.prototype.customData5=void 0,b.prototype.customData6=void 0,b.prototype.customData7=void 0,b.prototype.customData8=void 0,b.prototype.customData9=void 0,b.prototype.customData10=void 0,b}),function(a,b){"function"==typeof define&&define.amd?define(["trakerr/ApiClient"],b):"object"==typeof module&&module.exports?module.exports=b(require("../ApiClient")):(a.TrakerrApi||(a.TrakerrApi={}),a.TrakerrApi.CustomStringData=b(a.TrakerrApi.ApiClient))}(this,function(a){"use strict";var b=function(){};return b.constructFromObject=function(c,d){return c&&(d=d||new b,c.hasOwnProperty("customData1")&&(d.customData1=a.convertToType(c.customData1,"String")),c.hasOwnProperty("customData2")&&(d.customData2=a.convertToType(c.customData2,"String")),c.hasOwnProperty("customData3")&&(d.customData3=a.convertToType(c.customData3,"String")),c.hasOwnProperty("customData4")&&(d.customData4=a.convertToType(c.customData4,"String")),c.hasOwnProperty("customData5")&&(d.customData5=a.convertToType(c.customData5,"String")),c.hasOwnProperty("customData6")&&(d.customData6=a.convertToType(c.customData6,"String")),c.hasOwnProperty("customData7")&&(d.customData7=a.convertToType(c.customData7,"String")),c.hasOwnProperty("customData8")&&(d.customData8=a.convertToType(c.customData8,"String")),c.hasOwnProperty("customData9")&&(d.customData9=a.convertToType(c.customData9,"String")),c.hasOwnProperty("customData10")&&(d.customData10=a.convertToType(c.customData10,"String"))),d},b.prototype.customData1=void 0,b.prototype.customData2=void 0,b.prototype.customData3=void 0,b.prototype.customData4=void 0,b.prototype.customData5=void 0,b.prototype.customData6=void 0,b.prototype.customData7=void 0,b.prototype.customData8=void 0,b.prototype.customData9=void 0,b.prototype.customData10=void 0,b}),function(a,b){"function"==typeof define&&define.amd?define(["trakerr/ApiClient"],b):"object"==typeof module&&module.exports?module.exports=b(require("../ApiClient")):(a.TrakerrApi||(a.TrakerrApi={}),a.TrakerrApi.Error=b(a.TrakerrApi.ApiClient))}(this,function(a){"use strict";var b=function(){};return b.constructFromObject=function(c,d){return c&&(d=d||new b,c.hasOwnProperty("code")&&(d.code=a.convertToType(c.code,"Integer")),c.hasOwnProperty("message")&&(d.message=a.convertToType(c.message,"String")),c.hasOwnProperty("fields")&&(d.fields=a.convertToType(c.fields,"String"))),d},b.prototype.code=void 0,b.prototype.message=void 0,b.prototype.fields=void 0,b}),function(a,b){"function"==typeof define&&define.amd?define(["trakerr/ApiClient","trakerr/model/StackTraceLines"],b):"object"==typeof module&&module.exports?module.exports=b(require("../ApiClient"),require("./StackTraceLines")):(a.TrakerrApi||(a.TrakerrApi={}),a.TrakerrApi.InnerStackTrace=b(a.TrakerrApi.ApiClient,a.TrakerrApi.StackTraceLines))}(this,function(a,b){"use strict";var c=function(){};return c.constructFromObject=function(d,e){return d&&(e=e||new c,d.hasOwnProperty("type")&&(e.type=a.convertToType(d.type,"String")),d.hasOwnProperty("message")&&(e.message=a.convertToType(d.message,"String")),d.hasOwnProperty("traceLines")&&(e.traceLines=b.constructFromObject(d.traceLines))),e},c.prototype.type=void 0,c.prototype.message=void 0,c.prototype.traceLines=void 0,c}),function(a,b){"function"==typeof define&&define.amd?define(["trakerr/ApiClient"],b):"object"==typeof module&&module.exports?module.exports=b(require("../ApiClient")):(a.TrakerrApi||(a.TrakerrApi={}),a.TrakerrApi.StackTraceLine=b(a.TrakerrApi.ApiClient))}(this,function(a){"use strict";var b=function(){};return b.constructFromObject=function(c,d){return c&&(d=d||new b,c.hasOwnProperty("function")&&(d.function=a.convertToType(c.function,"String")),c.hasOwnProperty("line")&&(d.line=a.convertToType(c.line,"Integer")),c.hasOwnProperty("file")&&(d.file=a.convertToType(c.file,"String"))),d},b.prototype.function=void 0,b.prototype.line=void 0,b.prototype.file=void 0,b}),function(a,b){"function"==typeof define&&define.amd?define(["trakerr/ApiClient","trakerr/model/StackTraceLine"],b):"object"==typeof module&&module.exports?module.exports=b(require("../ApiClient"),require("./StackTraceLine")):(a.TrakerrApi||(a.TrakerrApi={}),a.TrakerrApi.StackTraceLines=b(a.TrakerrApi.ApiClient,a.TrakerrApi.StackTraceLine))}(this,function(a,b){"use strict";var c=function(){var a=this;return a=new Array,Object.setPrototypeOf(a,c),a};return c.constructFromObject=function(d,e){return d&&(e=e||new c,a.constructFromObject(d,e,b)),e},c}),function(a,b){"function"==typeof define&&define.amd?define(["trakerr/ApiClient","trakerr/model/InnerStackTrace"],b):"object"==typeof module&&module.exports?module.exports=b(require("../ApiClient"),require("./InnerStackTrace")):(a.TrakerrApi||(a.TrakerrApi={}),a.TrakerrApi.Stacktrace=b(a.TrakerrApi.ApiClient,a.TrakerrApi.InnerStackTrace))}(this,function(a,b){"use strict";var c=function(){var a=this;return a=new Array,Object.setPrototypeOf(a,c),a};return c.constructFromObject=function(d,e){return d&&(e=e||new c,a.constructFromObject(d,e,b)),e},c}),function(a,b){"function"==typeof define&&define.amd?define(["./generated/src/trakerr/index","stacktrace-js"],b):"object"==typeof module&&module.exports?module.exports=b(require("./generated/src/trakerr/index"),require("stacktrace-js")):a.TrakerrClient=b(a.TrakerrApi,a.StackTrace)}(this,function(a,b){"use strict";var c=function c(d,e,f){function g(a){return"undefined"==typeof a.apiKey&&(a.apiKey=j.apiKey),"undefined"==typeof a.contextAppVersion&&(a.contextAppVersion=j.contextAppVersion),"undefined"==typeof a.deploymentStage&&(a.deploymentStage=j.contextDeploymentStage),"undefined"==typeof a.contextEnvLanguage&&(a.contextEnvLanguage=j.contextEnvLanguage),"undefined"==typeof a.contextEnvName&&(a.contextEnvName=j.contextEnvName),"undefined"==typeof a.contextEnvVersion&&(a.contextEnvVersion=j.contextEnvVersion),"undefined"==typeof a.contextEnvHostname&&(a.contextEnvHostname=j.contextEnvHostname),"undefined"==typeof a.contextAppOS&&(a.contextAppOS=j.contextAppOS,a.contextAppOSVersion=j.contextAppOSVersion),"undefined"==typeof a.contextAppBrowser&&(a.contextAppBrowser=j.contextAppBrowser,a.contextAppBrowserVersion=j.contextAppBrowserVersion),"undefined"==typeof a.contextDataCenter&&(a.contextDataCenter=j.contextDataCenter),"undefined"==typeof a.contextDataCenterRegion&&(a.contextDataCenterRegion=j.contextDataCenterRegion),"undefined"==typeof a.eventTime&&(a.eventTime=(new Date).getTime()),a}function h(b,c,d,e){var f="object"==typeof b?b.constructor.name:(typeof b).toString(),g=j.createAppEvent(c?c:"Error",d,f,b.toString());g.eventStacktrace=new a.Stacktrace;var h=new a.InnerStackTrace;h.type=f,h.message=b instanceof Error?b.message:b.toString(),h.traceLines=new a.StackTraceLines;for(var i in e){var k=new a.StackTraceLine;k.function=e[i].functionName,k.file=e[i].fileName,k.line=e[i].lineNumber+":"+e[i].columnNumber,Array.prototype.push.call(h.traceLines,k)}return Array.prototype.push.call(g.eventStacktrace,h),g}function i(a,c,d,e,f){b.fromError(a).then(function(b){var g=h(a,c,d,b);f&&f(g),j.sendEvent(g,function(a,b,c){a&&console.error("Error Response: "+a+", data = "+b+", response = "+JSON.stringify(c)),e&&process.exit(1)})}).catch(function(a){console.error("Error: "+a),e&&process.exit(1)})}var j=this;if(j.apiKey=d,j.contextAppVersion=e?e:"1.0",j.contextDeploymentStage=f?f:"development",j.contextEnvLanguage="JavaScript",j.contextEnvName="JavaScript","undefined"!=typeof navigator){var k,l,m,n=navigator.appVersion,o=navigator.userAgent,p=navigator.appName,q=""+parseFloat(navigator.appVersion),r=parseInt(navigator.appVersion,10);(l=o.indexOf("Opera"))!=-1&&(p="Opera",q=o.substring(l+6),(l=o.indexOf("Version"))!=-1&&(q=o.substring(l+8))),(l=o.indexOf("OPR"))!=-1?(p="Opera",q=o.substring(l+4)):(l=o.indexOf("Edge"))!=-1?(p="Microsoft Edge",q=o.substring(l+5)):(l=o.indexOf("MSIE"))!=-1?(p="Microsoft Internet Explorer",q=o.substring(l+5)):"Netscape"==p&&o.indexOf("Trident/")!=-1?(p="Microsoft Internet Explorer",q=o.substring(l+5),(l=o.indexOf("rv:"))!=-1&&(q=o.substring(l+3))):(l=o.indexOf("Chrome"))!=-1?(p="Chrome",q=o.substring(l+7)):(l=o.indexOf("Safari"))!=-1?(p="Safari",q=o.substring(l+7),(l=o.indexOf("Version"))!=-1&&(q=o.substring(l+8)),(l=o.indexOf("CriOS"))!=-1&&(p="Chrome",q=o.substring(l+6))):(l=o.indexOf("Firefox"))!=-1?(p="Firefox",q=o.substring(l+8)):o.indexOf("Trident/")!=-1?(p="Microsoft Internet Explorer",q=o.substring(o.indexOf("rv:")+3)):(k=o.lastIndexOf(" ")+1)<(l=o.lastIndexOf("/"))&&(p=o.substring(k,l),q=o.substring(l+1),p.toLowerCase()==p.toUpperCase()&&(p=navigator.appName)),(m=q.indexOf(";"))!=-1&&(q=q.substring(0,m)),(m=q.indexOf(" "))!=-1&&(q=q.substring(0,m)),(m=q.indexOf(")"))!=-1&&(q=q.substring(0,m)),r=parseInt(""+q,10),isNaN(r)&&(q=""+parseFloat(navigator.appVersion),r=parseInt(navigator.appVersion,10));var s=(/Mobile|mini|Fennec|Android|iP(ad|od|hone)/.test(n),!!navigator.cookieEnabled);"undefined"!=typeof navigator.cookieEnabled||s||(document.cookie="testcookie",s=document.cookie.indexOf("testcookie")!=-1);var t=void 0,u=[{s:"Windows 10",r:/(Windows 10.0|Windows NT 10.0)/},{s:"Windows 8.1",r:/(Windows 8.1|Windows NT 6.3)/},{s:"Windows 8",r:/(Windows 8|Windows NT 6.2)/},{s:"Windows 7",r:/(Windows 7|Windows NT 6.1)/},{s:"Windows Vista",r:/Windows NT 6.0/},{s:"Windows Server 2003",r:/Windows NT 5.2/},{s:"Windows XP",r:/(Windows NT 5.1|Windows XP)/},{s:"Windows 2000",r:/(Windows NT 5.0|Windows 2000)/},{s:"Windows ME",r:/(Win 9x 4.90|Windows ME)/},{s:"Windows 98",r:/(Windows 98|Win98)/},{s:"Windows 95",r:/(Windows 95|Win95|Windows_95)/},{s:"Windows NT 4.0",r:/(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/},{s:"Windows CE",r:/Windows CE/},{s:"Windows 3.11",r:/Win16/},{s:"Android",r:/Android/},{s:"Open BSD",r:/OpenBSD/},{s:"Sun OS",r:/SunOS/},{s:"Linux",r:/(Linux|X11)/},{s:"iOS",r:/(iPhone|iPad|iPod)/},{s:"Mac OS X",r:/Mac OS X/},{s:"Mac OS",r:/(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/},{s:"QNX",r:/QNX/},{s:"UNIX",r:/UNIX/},{s:"BeOS",r:/BeOS/},{s:"OS/2",r:/OS\/2/},{s:"Search Bot",r:/(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/}];for(var v in u){var w=u[v];if(w.r.test(o)){t=w.s;break}}var x=void 0;switch(/Windows/.test(t)&&(x=/Windows (.*)/.exec(t)[1],t="Windows"),t){case"Mac OS X":x=/Mac OS X (10[\.\_\d]+)/.exec(o)[1];break;case"Android":x=/Android ([\.\_\d]+)/.exec(o)[1];break;case"iOS":x=/OS (\d+)_(\d+)_?(\d+)?/.exec(n),x=x[1]+"."+x[2]+"."+(0|x[3])}j.contextEnvVersion=navigator.userAgent,j.contextAppOS=t,j.contextAppOSVersion=x,j.contextAppBrowser=p,j.contextAppBrowserVersion=q}else try{var t=require("os");"undefined"!=typeof t&&(j.contextAppOS=t.platform(),j.contextAppOSVersion=t.release(),j.contextEnvHostname=t.hostname())}catch(a){}var y=new a.ApiClient;j.eventsApi=new a.EventsApi(y),c.prototype.handleExceptions=function(a){"undefined"!=typeof window?window.onerror=function(a,b,c,d,e){var f=a.toLowerCase(),g="script error";f.indexOf(g)>-1?console.error("Script Error: Script error encountered, see browser console for more."):i(e,"Error",!1)}:"undefined"!=typeof process&&(a="undefined"==typeof a||a,process.on("uncaughtException",function(b){i(b,"Error",a)}))},c.prototype.createAppEvent=function(b,c,d,e){var f=this;b||(b="Error"),c||(c="issue"),d||(d="unknown"),e||(e="unknown");var h=new a.AppEvent(f.apiKey,b,c,d,e);return g(h)},c.prototype.sendError=function(a,b,c,d){i(a,b,c,!1,d)},c.prototype.sendEvent=function(a,b){var c=this;return c.eventsApi.eventsPost(g(a),b)},c.prototype.get_ApiKey=function(){var a=this;return a.apiKey},c.prototype.set_ApiKey=function(a){var b=this;b.apiKey=a},c.prototype.get_contextAppVersion=function(){var a=this;return a.contextAppVersion},c.prototype.set_contextAppVersion=function(a){var b=this;b.contextAppVersion=a},c.prototype.get_contextDeploymentStage=function(){var a=this;return a.contextDeploymentStage},c.prototype.set_contextDeploymentStage=function(a){var b=this;b.contextDeploymentStage=a},c.prototype.get_contextEnvLanguage=function(){var a=this;return a.contextEnvLanguage},c.prototype.set_contextEnvLanguage=function(a){var b=this;b.contextEnvLanguage=a},c.prototype.get_contextEnvName=function(){var a=this;return a.contextEnvName},c.prototype.set_contextEnvName=function(a){var b=this;b.contextEnvName=a},c.prototype.get_contextEnvVersion=function(){var a=this;return a.contextEnvVersion},c.prototype.set_contextEnvVersion=function(a){var b=this;b.contextEnvVersion=a},c.prototype.get_contextEnvHostname=function(){var a=this;return a.contextEnvHostname},c.prototype.set_contextEnvHostname=function(a){var b=this;b.contextEnvHostname=a},c.prototype.get_contextAppOS=function(){var a=this;return a.contextAppOS},c.prototype.set_contextAppOS=function(a){var b=this;b.contextAppOS=a},c.prototype.get_contextAppOSVersion=function(){var a=this;return a.contextAppOSVersion},c.prototype.set_contextAppOSVersion=function(a){var b=this;b.contextAppOSVersion=a},c.prototype.get_contextAppBrowser=function(){var a=this;return a.contextAppBrowser},c.prototype.set_contextAppBrowser=function(a){var b=this;b.contextAppBrowser=a},c.prototype.get_contextAppBrowserVersion=function(){var a=this;return a.contextAppBrowserVersion},c.prototype.set_contextAppBrowserVersion=function(a){var b=this;b.contextAppBrowserVersion=a},c.prototype.get_contextDataCenter=function(){var a=this;return a.contextDataCenter},c.prototype.set_contextDataCenter=function(a){var b=this;b.contextDataCenter=a},c.prototype.get_contextDataCenterRegion=function(){var a=this;return a.contextDataCenter},c.prototype.set_contextDataCenterRegion=function(a){var b=this;b.contextDataCenterRegion=a}};return c});