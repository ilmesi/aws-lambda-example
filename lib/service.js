var http = require('http');
var RSVP = require('rsvp');

exports.posts = function() {

  var promise = new RSVP.Promise(function(fulfill, reject) {

    var http_options = {
      'host': 'jsonplaceholder.typicode.com',
      'path': '/posts/'
    };
    var request = http.request(http_options, function(response) {
      var result = '';

      response.on('data', function(chunk) {
        result += chunk;
      });

      response.on('end', function() {
        fulfill(result);
      });

    });

    request.on('error', function(error) {
        reject(error);
    });

    request.end();
  });
  return promise;
};