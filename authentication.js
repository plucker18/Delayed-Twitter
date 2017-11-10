'use strict';

const config = require('./oauth.js');
const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;
const User = require('./User.js');

//passport
module.exports = passport.use(new TwitterStrategy({
    consumerKey: config.twitter.consumerKey,
    consumerSecret: config.twitter.consumerSecret,
    callbackURL: config.twitter.callbackURL
  },
  function(token, tokenSecret, profile, done) {
    User.findOne({oauthID: profile.id}, function(err, user) {
      if (err) { return done(err); }

      if (!err && user != null) {
        done(null, user);
      } else {
        let user = new User({
          oauthID: profile.id,
          name: profile.displayName,
          created: Date.now()
        });
        user.save(function(err) {
          if (err) {
              console.log(err);
          } else {
              console.log('saving user ...');
              done(null, user);
          }
        });
      }
    });
  }
));
