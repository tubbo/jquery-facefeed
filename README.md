jQuery.faceFeed
===============

Feed the Need...for Faces.
--------------------------

jQuery.faceFeed is a plugin for communicating with Facebook's Open Graph. Inspired by jQuery.tweet!, it
returns some of the latest posts to your public Facebook page. Includes a built-in implementation of
distance_of_time_in_words, and automatically builds links to URLs.

Installation
------------

You need a Facebook access token to use this plugin. To obtain one, visit the [Facebook Graph Explorer][1]
and find the Open Graph resource you need. Once you've found a suitable resource, click "Get Access 
Token", tab to "Extended Permissions" and check the permissions `manage_pages` and `offline_access`. 
This will allow you to use the token even when the user on your page isn't connected to Facebook.

Back in your code, apply the plugin to an element...

	$('#facebook-feed').faceFeed({
	   pageName: 'YOUR_FACEBOOK_PAGE',
	   accessToken: 'YOUR_ACCESS_TOKEN',
	   dateClass: 'post-date',
	});

### Generating your own access token

Some users prefer to generate their own access token on the server. This is a _much_ more secure way to
authorize the plugin with Facebook, because it doesn't expose any identifying information of the Facebook
user who set this up. Instead, it keeps all sensitive data on the server, and makes the plugin perform
an Ajax request to a PHP file on the local server which will obtain an access token.

Customization
-------------

To style, select the `<p>` tags for the status and a specified class (`dateClass`) in the config for the date.

Configuration
-------------

* `pageName:` The name of your Facebook page. Required.
* `accessToken:` A token you generate at <https://developers.facebook.com/tools/explorer>.
* `dateClass:` The class of the `<span>` that contains your date "ago in words". Default: `post-date`
	
[1]:https://developers.facebook.com/tools/explorer
[2]:https://developers.facebook.com/apps