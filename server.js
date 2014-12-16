// Module Dependencies
var express = require('express');
var search = require('./search');
var helpers = require('express-helpers'); // Required to make ejs links work

// Create the app server
app = express.createServer();

// Configuration
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('view options', { layout: false });
helpers(app);

// Define routes
app.get('/', function (req, res) {
	res.render('index'); // Renders index.ejs
});

app.get('/search', function (req, res, next) {
	search(req.query.q, function (err, gists) {
		if (err) return next(err);

		var dataObj = {
			results: gists,
			search: req.query.q
		}

		res.render('results', dataObj);
	});
});

app.get('/faq', function (req, res) {
	res.render('faq');
});

// Listen
app.listen(3000);








