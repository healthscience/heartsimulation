/**
*  HeartShare - Parse wearable data
*
* Manages events coming from wearable sensors in the network

* @class parseWearable
*
* @package    HeartShare open source project
* @copyright  Copyright (c) 2012 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-3.0.html
* @version    $Id$
*/
const util = require('util');
const events = require("events");
const fs = require('fs');
const http = require('http');

var parseWearable = function() {

	events.EventEmitter.call(this);
  this.accellerometerDataIN();

};

/**
* inherits core emitter class within this class
* @method
*/
util.inherits(parseWearable, events.EventEmitter);

/**
*  settings of amiigo wristband mode, record record frequency etc.
* @method wearableSettings
*
*/
parseWearable.prototype.wearableSettings = function() {


};

/**
*  input accellerometer data
* @method accellerometerDataIN
*
*/
parseWearable.prototype.accellerometerDataIN = function() {

  // first number time, second x axis
  var accelTime = [[1,35],[2,37],[3,34],[4,36],[5,99]]
console.log(accelTime);
};

/**
*  back ground metabolism work
* @method metabolismWork
*
*/
parseWearable.prototype.metabolismWork = function() {


};

/**
*  activity to work
* @method activityWork
*
*/
parseWearable.prototype.activityWork = function() {


};

/**
*  total input work
* @method totalWork
*
*/
parseWearable.prototype.totalWork = function() {


};


module.exports = parseWearable;
