var request = require('superagent');

/**
*	Search Function
*	
*	@param {String} search query
*	@param {Function} callback
*	@api public
*/

module.exports = function search (queryString, fn) {
	request
	.get('https://api.github.com/users/' + queryString + '/gists')
	.set('User-Agent', 'ivanlesko')
		// .send(queryObject)
		.end(function (res) {
			if (res.ok) {
				console.log('got response!!');

				var parsed = JSON.parse(res.text);
				var results = [];

				for (var i in parsed) {
					var gistObj = {
						htmlURL: parsed[i].html_url,
						description: parsed[i].description,
						createdAt: parsed[i].created_at
					}

					results.push(gistObj);
				}

				return fn(null, results);
			} else {
				console.log('Oh no! error ');
			}
		});
	};


