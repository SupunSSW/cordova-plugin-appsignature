var channel = require('cordova/channel');
var exec = require('cordova/exec');
var cordova = require('cordova');

channel.createSticky('onCordovaInfoReady');
// Tell cordova channel to wait on the CordovaInfoReady event
channel.waitForInitialization('onCordovaInfoReady');

/**
 * This represents the mobile device, and provides properties for inspecting the model, version, UUID of the
 * phone, etc.
 * @constructor
 */
function AppSignature() {
    this.cordova = null;

    var me = this;

    channel.onCordovaReady.subscribe(function() {
        me.getSign(
            function(info) {
                var buildLabel = cordova.version;
                me.cordova = buildLabel;

                console.log("Cordova version -> ", me.cordova);
                console.log(info);

                channel.onCordovaInfoReady.fire();
            },
            function(e) {
                console.error('[ERROR] Error initializing cordova-plugin-appsignature: ' + e);
            }
        );
    });
}

/**
 * Get app signature
 *
 * @param {Function} successCallback The function to call when the heading data is available
 * @param {Function} errorCallback The function to call when there is an error getting the heading data. (OPTIONAL)
 */
AppSignature.prototype.getSign = function(successCallback, errorCallback) {
    exec(successCallback, errorCallback, 'AppSignature', 'getSignature', []);
};

module.exports = new AppSignature();