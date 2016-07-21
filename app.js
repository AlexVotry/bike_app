const express = require('express');
const knex = require('./db/knex');
const passport = require('passport');
const util = require('util');
const StravaStrategy = require('passport-strava-oauth2').Strategy;
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const routes = require('./routes/index');
const users = require('./routes/users');
const bikes = require('./routes/bikes');
const parts = require('./routes/parts');
const methodOverride = require('method-override');
const session = require('cookie-session');
const models = require('./db/models');
require('dotenv').load();

const STRAVA_CLIENT_ID = process.env.STRAVA_CLIENT_ID;
const STRAVA_CLIENT_SECRET = process.env.STRAVA_CLIENT_SECRET;

passport.serializeUser(function(user, done) {
  console.log('serializing user', user);
  done(null, user.ID);
});

passport.deserializeUser(function(id, done) {
  console.log('deserializing id', id);
  models.getAthlete(id).then((athlete)=> {
    return done(null, athlete);
  });
});

passport.use(new StravaStrategy({
    clientID: STRAVA_CLIENT_ID,
    clientSecret: STRAVA_CLIENT_SECRET,
    callbackURL: process.env.Host + "/auth/strava/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    models.newId('athletes', profile.id).then(newId => {
      if(newId) {
        models.newAthlete(profile).then(newUser =>  {
          models.newBike(profile).then(()=> {
            models.newParts(profile).then(()=> {
              return done(null, newUser);
            });
          });
        }).catch((error)=>{
          console.log(error);
          return done(error);
        });
      } else {
        models.existingBike(profile).then(()=> {
          models.getAthlete(profile.id).then((athlete)=> {
            return done(null, athlete);
          });
        });
      }
    });
  }));

const app = express();

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(session({
  name: 'bikeRider',
  keys: [process.env.SESSION_KEY]
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);
app.use('/users', users);
app.use('/bikes', bikes);
app.use('/parts', parts);

app.get('/users', ensureAuthenticated, function(req, res){
  console.log('session: ', req.session);
  res.render('users', { user: req.user });
});

app.get('/auth/strava',
  passport.authenticate('strava', { scope: ['public'] }));

app.get('/auth/strava/callback',
  passport.authenticate('strava', { failureRedirect: '/' }),
  function(req, res) {
    console.log('authenticated!');
    res.redirect('/#/bikeList');
  });

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}

app.post('/users')


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
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
