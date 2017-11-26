/**
*  HeartShare - Live heart data
*
* Stream live heart data coming from wearable sensor

* @class liveHeart
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

var liveHeart = function() {

	events.EventEmitter.call(this);
  this.heartDataIN();

};

/**
* inherits core emitter class within this class
* @method
*/
util.inherits(liveHeart, events.EventEmitter);

/**
*  input heart data
* @method heartDataIN
*
*/
liveHeart.prototype.heartDataIN = function() {

	var opts = {
	    host: 'localhost',
	    port: 8881,
	    method: 'GET',
	    path: '/heartdata/c9d2l0di2sd09s9ss',
	    headers: {}
	  };

	        var res_data = '';
		// JSON encoding
	opts.headers['Content-Type'] = 'application/json';
	data = JSON.stringify({"device": "mio", "hr": "76"});//JSON.stringify(req.data);
	opts.headers['Content-Length'] = data.length;
	res_data = '';

	console.log(opts);



		var req = http.request(opts, function(response) {
	        var chunk = '';
	        var res_data = '';
					response.on('data', function(chunk) {
			console.log(chunk);
						res_data += chunk;
					});

					response.on('end', function() {
				console.log('any response data>??');
						console.log(res_data);
					});

				});


				req.on('error', function(e) {
					console.log(e);
					console.log("Got error: " + e.message);
				});

	// write the data
	if (opts.method == 'GET') {
	console.log('post has been sent');
	  req.write(data);
	}
	console.log(data);
	req.end();
	//console.log(req);


};



module.exports = liveHeart;
