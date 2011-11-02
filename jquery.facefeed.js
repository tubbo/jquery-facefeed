/**
 * jQuery.faceFeed
 * ===============
 *
 *
 * Feed the Need...for Faces.
 * --------------------------
 *
 * jQuery.faceFeed is a plugin for communicating with Facebook's Open Graph. Inspired by jQuery.tweet!, it
 * returns some of the latest posts to your public Facebook page. Includes a built-in implementation of
 * distance_of_time_in_words, and automatically builds links to URLs.
 *
 * Installation
 * ------------
 *
 * Include this JavaScript file in your project, then visit https://developers.facebook.com/tools/explorer 
 * and find the Open Graph resource you need. Once you've found a suitable resource, click "Get Access 
 * Token", tab to "Extended Permissions" and check the permissions `manage_pages` and `offline_access`. 
 * This will allow you to use the token even when the user on your page isn't connected to Facebook.
 *
 * Back in your code, apply the plugin to an element...
 *
 * 	$('#facebook-feed').faceFeed({
 * 	   pageName: 'YOUR_FACEBOOK_PAGE',
 * 	   accessToken: 'YOUR_ACCESS_TOKEN',
 * 	   dateClass: 'post-date',
 * 	});
 *
 * And you should be good to go! To style, select the `<p>` tags for the status and a specified class 
 * (`dateClass`) in the config for the date.
 *
 * Usage
 * -----
 * 
 * Just visit the page you placed your feed on, and it will asynchronously load your page's posts.
 *
 * @author Tom Scott
 */
(function($) {
	$.fn.faceFeed = function(options) {
		/**
		 * Configuration
		 */
		var config = {
			pageName: 	 '',
			generateToken: false,
			accessToken: '',
			postsToFetch: 5,
			dateClass: 'date'
		};
		$.fn.extend(config, options);
		
		function distanceOfTimeInWords(date) {
			var relative_to = (arguments.length > 1) ? arguments[1] : new Date();
			var delta = parseInt((relative_to.getTime() - date) / 1000, 10);
			var r = '';
			if (delta < 60) {
			  r = delta + ' seconds ago';
			} else if(delta < 120) {
			  r = 'a minute ago';
			} else if(delta < (45*60)) {
			  r = (parseInt(delta / 60, 10)).toString() + ' minutes ago';
			} else if(delta < (2*60*60)) {
			  r = 'an hour ago';
			} else if(delta < (24*60*60)) {
			  r = '' + (parseInt(delta / 3600, 10)).toString() + ' hours ago';
			} else if(delta < (48*60*60)) {
			  r = 'a day ago';
			} else {
			  r = (parseInt(delta / 86400, 10)).toString() + ' days ago';
			}
			return r;
	    }
		
		function linkify(text){
		    if (text) {
		        text = text.replace(
		            /((https?\:\/\/)|(www\.))(\S+)(\w{2,4})(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/gi,
		            function(url){
		                var full_url = url;
		                if (!full_url.match('^https?:\/\/')) {
		                    full_url = 'http://' + full_url;
		                }
		                return '<a href="' + full_url + '">' + url + '</a>';
		            }
		        );
		    }
		    return text;
		}
		
		
		/*
		 * Runtime
		 */
		return this.each(function() {
			var self = $(this);
			self.html('<p>Loading status updates...</p>');
			$.ajax({
				url: 'https://graph.facebook.com/'+config.pageName+'/statuses',
				type: 'GET',
				data: {
					access_token: ACCESS_TOKEN,
					limit: config.postsToFetch
				},
				dataType: 'json',
				success: function(response) {
					self.html('');
					for (var c=0; c < response.data.length; c++) {
						var status = response.data[c];
						var lastUpdated = new Date(status.updated_time.split('+0000').join(''));
						var timeAgoInWords = distanceOfTimeInWords(lastUpdated);
						
						var txt = linkify(status.message)+'<br>'+'<span class="'+config.dateClass+'"><a href="http://www.facebook.com/'+config.pageName+'/posts/'+status.id+'">'+timeAgoInWords+'</a></span>';
						
						var row = $('<p></p>').html(txt);
						self.append(row);
					}
				}
			})

		});
	};
})(jQuery)