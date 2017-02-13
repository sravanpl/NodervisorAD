
/**
 * Declare Module dependencies
 */
let monkey = require('node-monkey')();

// Do this if you want to bind to the console and have all output directed to the browser
// Pass `true` to disable server side logging and only see output in the browser
monkey.attachConsole();
var express = require('express'),
	path = require('path'),
	config = require('./config'),
	schema = require('./sql/schema'),
	sessionstore = require('connect-session-knex')(express);

// Express App Server
var app = express();
var passport= require('passport')
// Settings for all environments
app.set('port', config.port);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.set('env', config.env);

var Knex = require('knex');
var db = Knex.initialize(config.db);

schema.create(db);
config.readHosts(db);

var knexsessions = Knex.initialize(config.sessionstore);

/**
 * Set up Middleware
 */
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({
	secret: config.sessionSecret,
	cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 },
	store: new sessionstore({knex: knexsessions, tablename: 'sessions'})
}));
app.use(function(req, res, next){
    res.locals.session = req.session;
    next();
});
app.use('/sra',app.router);
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

// Middleware for Dev Env only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

var supervisordapi = require('supervisord');

/**
 * Set routes
 */
require('./passport.js')(passport);

var routes = require('./routes')({
	'app': app,
	'config': config,
	'supervisordapi': supervisordapi,
	'db': db,
	'passport':passport
});

/**
 * Start Express Server
 */
app.listen(app.get('port'), function(){
	console.log('Nodervisor launched on port ' + app.get('port'));
});
