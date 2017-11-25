'use strict';
// least mean squares based on actual bpm via the output form simulated heartShare
/**
*  Fitness Function LMS between actual BPM and Simulation Prediction
*
* @class Fitness
*
* @package    HeartShare open source project
* @copyright  Copyright (c) 2017 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-3.0.html
* @version    $Id$
*/
var util = require('util');
var events = require("events");
var fs = require('fs');
var ss = require('simple-statistics');

var Fitness = function() {
console.log('ready to check fitness of model')
	events.EventEmitter.call(this);
  this.ss = ss;

};

/**
* inherits core emitter class within this class
* @method
*/
util.inherits(Fitness, events.EventEmitter);

/**
*  take two inputs and perform LMS via stats package
* @method startLMS
*
*/
Fitness.prototype.startLMS = function(inSolution) {
//console.log(inSolution);
  return Math.pow(inSolution.a,4)+ (inSolution.b * 10) + inSolution.c
};


module.exports = Fitness;
