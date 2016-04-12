var sinon = require('sinon');
var app = require('../app');

describe('Expected events', function () {

  it('should fail when https GET request occurs', function () {
    // Prepare
    var postContext = {
      fail: function(msg) {},
      succeed: function(msg) {}
    };
    var postEvent = {
      method: "POST"
    };
    var fail_spy = sinon.spy(postContext, 'fail');
    var succeed_spy = sinon.spy(postContext, 'succeed');

    // Shoot
    app.handler(postEvent, postContext);

    // Eval
    sinon.assert.calledOnce(fail_spy);
    sinon.assert.notCalled(succeed_spy);
  });

});