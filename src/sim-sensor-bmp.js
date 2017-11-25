/**
*  BMP simulated sensor
*
* @class simSensorBMP
*
* @package    HeartShare open source project
* @copyright  Copyright (c) 2017 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-3.0.html
* @version    $Id$
*/
var util = require('util');
var events = require("events");
var fs = require('fs');

var simSensorBMP = function() {

	events.EventEmitter.call(this);


};

/**
* inherits core emitter class within this class
* @method
*/
util.inherits(simSensorBMP, events.EventEmitter);

/**
*  read output flow
* @method readOutputFlow
*
*/
simSensorBMP.prototype.readOutputFlow = function() {


};


module.exports = simSensorBMP;
