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


var fortunes = [
	"Conquer your fears or they will conquer you.",
	"Rivers need springs.",
	"Do not fear what you don't know.",
	"You will have a pleasant surprise.",
	"Whenever possible, keep it simple.",
];


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
	var randomFortune =
		fortunes[Math.floor(Math.random() * fortunes.length)];

	res.render('about', { fortune: randomFortune });
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

