var service = require('./service');

exports.bar = function (context, event) {
  if (!event.size) {
    console.log('Missing parameter: size');
    context.fail('Missing parameter: size');
  }
  
  var parameter = 0;
  if (event.size == 100) {
    parameter = 20;
  } else if (event.size < 100) {
    parameter = 10;
  } else {
    parameter = 30;
  }

  service.posts(parameter).then(function(value) {
    context.succeed(value);
  }, function(value) {
    context.fail(value);
  });
}