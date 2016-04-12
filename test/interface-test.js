var sinon = require('sinon');
var app = require('../app');

describe('Expected events', function () {
  var postContext, postEvent = {};

  before(function() {
    postContext = {
      fail: function(msg) {},
      succeed: function(msg) {}
    };
  });

  it('should fail when a request occurs', function () {
    var fail_spy = sinon.spy(postContext, 'fail');
    var succeed_spy = sinon.spy(postContext, 'succeed');

    postEvent.method = "POST";

    app.handler(postEvent, postContext);

    sinon.assert.calledOnce(fail_spy);
    sinon.assert.notCalled(succeed_spy);
  });

});