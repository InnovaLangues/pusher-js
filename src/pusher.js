;(function() {
	function Pusher(app, key, url) { 
		checkApp(app);
		checkAppKey(key);

	    this.app = app; 
	    this.key = key;

	    var client = new Faye.Client(url);

	    client.setHeader('key', key);
		client.setHeader('app', app);
	    
	    this.subscribe = function(channel, callback) {
	    	return client.subscribe('/' + app + channel, function(message) {
				return callback(message.data);
			});
	    };

	    this.unsubscribe = function(subscription) {
	    	subscription.cancel();
	    };

	    this.publish = function(channel, data) {
			client.publish('/' + app + channel, {
			  	app: app,
				key : key,
			  	data
			});
	    };

	    function checkApp(app) {
	    	if (key === null || key === undefined) {
		      	Pusher.warn(
		        	'Warning', 'You must pass your app id when you instantiate Pusher.'
		      	);
		    }
	    }

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