const util = require('util');
const events = require("events");
const fs = require('fs');
const Heart = require('./real-heart-data.js');
const inputWork = require('./prepare-input-work.js');
const heartShare = require('./sim-heart.js');

// starting volume of heartShare  ie. 0.008 cubic meters
var x = 0.2;
var y = 0.2;
var z = 0.2;

var liveHeart = new Heart();
var liveINwork = new inputWork();
var liveSimHeart = new heartShare();
console.log(liveSimHeart);
liveSimHeart.heartVolume(x, y, z);
