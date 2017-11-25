/**
*  Prepares data outflow for simulated sensor reading
*
* @class outFlowWork
*
* @package    HeartShare open source project
* @copyright  Copyright (c) 2017 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-3.0.html
* @version    $Id$
*/
var util = require('util');
var events = require("events");
var fs = require('fs');

var outFlowWork = function() {
console.log('outflowwork')
	events.EventEmitter.call(this);


};

/**
* inherits core emitter class within this class
* @method
*/
util.inherits(outFlowWork, events.EventEmitter);

/**
*  prepare for sim sensor readings
* @method outWork
*
*/
outFlowWork.prototype.inWork = function() {


};

module.exports = outFlowWork;
