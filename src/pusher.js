;(function() {
	function Pusher(key, url) { 
	    checkAppKey(key);

	    this.key = key;

	    var client = new Faye.Client(url);
	    
	    this.subscribe = function(channel, callback) {
	    	return client.subscribe('/' + key + channel, function(message) {
			return callback(message);
		});
	    };

	    this.unsubscribe = function(subscription) {
	    	subscription.cancel();
	    };

	    function checkAppKey(key) {
	    	if (key === null || key === undefined) {
		      	Pusher.warn(
		        	'Warning', 'You must pass your app key when you instantiate Pusher.'
		      	);
		    }
	    }
	}

    this.Pusher = Pusher;

}).call(this);
