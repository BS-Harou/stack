const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const passport = require('passport');
const helmet = require('helmet');
const csurf = require('csurf');

const passportSetup = require('./setup/passport-setup');
const routes = require('./routes');
const settings = require('./settings');

module.exports = (app) => {
	passportSetup();
	app.use(favicon(path.join(__base, 'dist', 'favicon.png')));
	app.use(helmet());
	app.use(helmet.contentSecurityPolicy({
		directives: settings.csp,
	}));
	app.use(logger('tiny'));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended: false}));
	app.use(cookieParser());
	app.use('/health', (req, res) => {
		res.writeHead(200);
		res.end();
	});
	app.use(session({
		store: new RedisStore(settings.redis),
		secret: settings.sessions.secret,
		resave: false,
		saveUninitialized: false,
		name: settings.sessions.name,
	}));
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(csurf());
	app.use((req, res, next) => {
		let user = req.user;
		if (user) {
			res.locals.user = {
				username: user.username,
				avatar: user.avatar,
			};
		}
		// res.locals.flash = req.flash('success'); // TODO socket.io flash notifications
		res.locals.csrfToken = req.csrfToken();
		next();
	});
	app.use(express.static(
		path.join(__base, 'dist'),
		{maxAge: 1000 * 60},
	));
	routes(app, settings);
	app.use('*', (req, res) => res.sendFile(path.join(__base, 'dist/index.html')));
};
