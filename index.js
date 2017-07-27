var express = require('express');

var app = express();

//
// Disable sending server details back to client
//
app.disable('x-powered-by');

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

	// Set 'onDevelopment' to true if we are NOT in production
	res.locals.onDevelopment = app.get('env') !== 'production';

	// Set 'showTests' to true if we are NOT in production AND the query string 'test' has value of 1
	res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';

	//console.log("DEBUG: res.locals.showTests:", res.locals.showTests);
	//console.log("DEBUG: app.get('env'):", app.get('env'));
	//console.log("DEBUG: req.query.test:", req.query.test);

	next();

});

// Confirm that JSHint throws error on following line: 
if ( 1 == null) console.log('who knew');


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


// Tours
app.get('/tours/hood-river', function(req, res){
	res.render('tours/hood-river');
});
app.get('/tours/oregon-coast', function(req, res){
	res.render('tours/oregon-coast');
});
app.get('/tours/request-group-rate', function(req, res){
	res.render('tours/request-group-rate');
});


// Debug
app.get('/debug/echo-req-res', function(req, res){

	if (0) {
			
		console.log("========== BEGIN DEBUG REQUEST req ==========");

		//console.log("request 'req'",req);

		//console.log("*** debug req ***");
		//for(var name in req) {
			//console.log("req", name);
			//console.log("req", name, req[name]);
		//}

		console.log("*** debug req.headers ***");
		for(var name in req.headers) {
			console.log("req.headers",name, req.headers[name]);
		}

		console.log("*** debug req.params ***");
		for(var name in req.params) {
			console.log("req.params",name, req.params[name]);
		}

		console.log("*** debug req.query ***");
		for(var name in req.query) {
			console.log("req.query",name, req.query[name]);
		}

		console.log("*** debug req.body ***");
		for(var name in req.body) {
			console.log("req.body",name, req.body[name]);
		}

		console.log("*** debug req.cookies ***");
		for(var name in req.cookies) {
			console.log("req.cookies",name, req.cookies[name]);
		}

		console.log("*** debug req.signedCookies ***");
		for(var name in req.signedCookies) {
			console.log("req.signedCookies",name, req.signedCookies[name]);
		}

		console.log("*** debug req.accepts ***");
		for(var name in req.accepts) {
			console.log("req.accepts",name, req.accepts[name]);
		}


		var kinds = ['ip', 'path', 'hostname', 'xhr', 'protocol', 'secure', 'url', 'originalUrl', 'acceptedLanguages'];
		//console.log("kinds", kinds);
		for (var index in kinds) {
			var kind = kinds[index];
			//console.log("kind", kind);
			console.log("*** debug req."+kind+" ***");

			console.log("req."+kind, req[kind]);

			//for(var name in req[kind]) {
			//	console.log("req."+kind,name, req[kind][name]);
			//}

		}
		

		//console.log("*** debug req.route ***");
		//for(var name in req.route) {
		//	console.log("req.route",name, req.route[name]);
		//}

		//console.log("*** debug req.socket ***");
		//for(var name in req.socket["_httpMessage"]) {
		//	console.log("req.socket[]",name, req.socket[name]);
		//}

		var kinds = ['ip', 'path', 'hostname', 'xhr', 'protocol', 'secure', 'url', 'originalUrl', 'acceptedLanguages'];
		//console.log("kinds", kinds);
		for (var index in kinds) {
			var kind = kinds[index];
			console.log("*** debug req."+kind+" ***");
			console.log("req."+kind, req[kind]);
		}


		console.log("========== BEGIN DEBUG RESPONSE res ==========");

		//console.log("*** debug res ***");
		//for(var name in res) {
			//console.log("res", name);
			//console.log("res", name, res[name]);
		//}

		var kinds = ['status'];
		for (var index in kinds) {
			var kind = kinds[index];
			console.log("*** debug res."+kind+" ***");
			console.log("res."+kind, res[kind]);
		}
	}

	res.render('debug/echo-req-res');
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

