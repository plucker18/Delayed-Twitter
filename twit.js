console.log('this is twit');

const Twit = require('twit');

const Tweets = new Twit({
  consumer_key:         'TWDyzEAu9CjiIveKk7RXTwwbY',
  consumer_secret:      'GQuIRjbIcaBCnk9Qiy1jQnRmGUxGBbYMZJFtoSpA6YNXsE2E61',
  access_token:         '928656100156760066-iVZ4phUHsShoLqmCgAJ13W4paNeTkAt',
  access_token_secret:  'oNtjQamDhHm5tceUx3TuiGN5VDm5gfkJZjNW9l6PPTTbf',
  // timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
});

Tweets.get('search/tweets', { q: 'fsu', count: 2 }, function(err, data, response) {
  console.log(data)
});
