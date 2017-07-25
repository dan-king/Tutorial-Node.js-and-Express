var express = require('express');

var app = express();

// set up handlebars view engine
var handlebars = require('express-handlebars').create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// set port
app.set('port', process.env.PORT || 3000);

//Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(__dirname + '/public'));
//app.use("/public", express.static(__dirname + '/public'));


// Include fortune data
var fortune = require('./lib/fortune.js');


//
// Enable debugging by passing test=1 in URL query-string
//
app.use(function(req, res, next){

	// Set 'showTests' to true if we are NOT in production AND the query string 'test' has value of 1
	res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';

	console.log("DEBUG: res.locals.showTests:", res.locals.showTests);
	console.log("DEBUG: app.get('env'):", app.get('env'));
	console.log("DEBUG: req.query.test:", req.query.test);

	next();

});



//
// ROUTES
//


//routes = require('path/to/router')
//app.use('/', routes)

//app.use('/', index);
//app.use('/about', about);
//app.use('/firstpage', firstpage);

//app.get('/*', function(req, res, next){
//  res.redirect('/public/index.html');
//})


// Home
app.get('/', function(req, res) {
	res.render('home');
});

// About
app.get('/about', function(req, res) {
	//var randomFortune =
	//	fortunes[Math.floor(Math.random() * fortunes.length)];

	//res.render('about', { fortune: randomFortune });

	//res.render('about', { fortune: fortune.getFortune() });
	
	res.render('about', { fortune: fortune.getFortune(), pageTestScript: '/qa/tests-about.js' });
});

// Dingo
app.get('/dingo', function(req, res) {
	res.render('dingo');
});



// custom 404 page
app.use(function(req, res){
	res.status(404);
	res.render('404');
});

// custom 500 page
app.use(function(err, req, res, next){
	console.error(err.stack);
	res.status(500);
	res.render('500');
	// Node way, without express:
	//res.type('text/plain');
	//res.status(500);
	//res.send('500 - Server Error');
});

app.listen(app.get('port'), function(){
  console.log( 'Express started on http://localhost:' +
    app.get('port') + '; press Ctrl-C to terminate.' );
});

