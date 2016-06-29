var express = require('express');
var passport = require('passport')
var util = require('util')
var StravaStrategy = require('passport-strava-oauth2').Strategy;
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var users = require('./routes/users');
var methodOverride = require('method-override');
require('dotenv').load();

var STRAVA_CLIENT_ID = process.env.STRAVA_CLIENT_ID;
var STRAVA_CLIENT_SECRET = process.env.STRAVA_CLIENT_SECRET;

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});
passport.use(new StravaStrategy({
    clientID: STRAVA_CLIENT_ID,
    clientSecret: STRAVA_CLIENT_SECRET,
    callbackURL: process.env.Host + "/auth/strava/callback"
  },
  function(accessToken, refreshToken, profile, done) {
      // asynchronous verification, for effect...
      process.nextTick(function () {

        return done(null, profile);
      });
    }
  ));
var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'public', 'views'));
// app.set('view engine', 'jade');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(methodOverride('_method'));
// app.use(session({
//   name: 'bikeRider',
//   keys: [process.env.SESSION_KEY]
// }));
app.use(function (req, res, next) {
  res.locals.user = req.user;
  next();
});
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);

// app.get('/', function(req, res){
//   res.render('index', { user: req.user });
// });

app.get('/users', ensureAuthenticated, function(req, res){
  res.render('users', { user: req.user });
});

app.get('/auth/strava',
  passport.authenticate('strava', { scope: ['public'] }));

app.get('/auth/strava/callback',
  passport.authenticate('strava', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/users');
  });

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});
app.use('/users', users);

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
});

module.exports = app;
