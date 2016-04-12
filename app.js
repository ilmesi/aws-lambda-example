var foo = require('lib/foo.js');

exports.handler = (event, context, callback) => {
    switch (event.method) {
        case "GET":
            foo.bar(context, event);
            break;
        default:
            console.log('Unsuported method', event.method);
            context.fail('Unsuported method');
    }
};