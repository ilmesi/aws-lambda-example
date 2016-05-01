var service = require('./service');

exports.bar = function (context, event) {
  if (!event.size) {
    console.log('Missing parameter: size');
    context.fail('Missing parameter: size');
  }
  
  service.posts().then(function(value) {
    context.succeed(value);
  }, function(value) {
    context.fail(value);
  });
}