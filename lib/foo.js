exports.bar = function (context, event) {
  if (!event.size) {
    context.fail('Missing parameter: size');
  }

  context.succeed({
    data: [{ 'item1', 'item2' }]
  });
}