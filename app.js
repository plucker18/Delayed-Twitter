/**
 * Module dependencies.
 */

const express = require('express');
const routes = require('./routes');
const user = require('./routes/user');
const http = require('http');
const path = require('path');
const passport = require('passport');
// const User = require('./user.js');
// const fs = require('fs');
const Twit = require('twit');
const volleyball = require('volleyball');
const bodyParser = require('body-parser');

const app = express();

// const auth = require('./authentication.js');
const config = require('./oauth.js');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// logging and body-parsing
app.use(volleyball);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.use(express.session({ secret: 'SECRETA' }));
app.use(passport.initialize());
app.use(passport.session());
// app.use(app.router);
// app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// development only
// if ('development' == app.get('env')) {
//   app.use(express.errorHandler());
// }

// serialize and deserialize
passport.serializeUser(function(user, done) {
  console.log('serializeUser: ' + user._id);
  done(null, user._id);
});
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user){
    console.log(user);
    if (!err) done(null, user);
    else done(err, null);
  });
});

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/fight', routes.fight);
app.get('/auth/twitter', passport.authenticate('twitter'));
app.get('/auth/twitter/callback',
        passport.authenticate('twitter', { successRedirect: '/fight',
                                           failureRedirect: '/' }));
app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback',
        passport.authenticate('facebook', { successRedirect: '/fight',
                                            failureRedirect: '/',
                                            scope: 'read_stream'
                                            }));

const server = http.createServer(app).listen(app.get('port'), function() {
  console.log('Slowing things down on ' + app.get('port'));
});

//Twitter
const T = new Twit({
  consumer_key: config.twitter.consumerKey,
  consumer_secret: config.twitter.consumerSecret,
  access_token: config.twitter.accessToken,
  access_token_secret: config.twitter.accessTokenSecret
});

//Socket.io
const io = require('socket.io').listen(server);
const stream = T.stream('statuses/sample');

io.sockets.on('connection', function (socket) {
  // stream.on('tweet', function(tweet) {
  //   socket.emit('info', { tweet: tweet});
  // });
});
