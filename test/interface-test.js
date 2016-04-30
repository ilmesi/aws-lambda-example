var sinon = require('sinon');
var app = require('../app');

describe('Expected events', function () {
  var postContext, postEvent = {};
  var fail_spy, succeed_spy;

  before(function() {
    postContext = {
      fail: function(msg) {},
      succeed: function(msg) {}
    };
  });

  beforeEach(function() {
    fail_spy = sinon.spy(postContext, 'fail');
    succeed_spy = sinon.spy(postContext, 'succeed');
  })

  afterEach(function () {
    delete postEvent.method;
    fail_spy.restore();
    succeed_spy.restore();
   });

  it('should fail when a POST request occurs', function () {
    // Prepare
    postEvent.method = "POST";
    // Call
    app.handler(postEvent, postContext);
    // Assert
    sinon.assert.calledOnce(fail_spy);
    sinon.assert.notCalled(succeed_spy);
  });

  it('should fail when a PUT request occurs', function () {
    // Prepare
    postEvent.method = "PUT";
    // Call
    app.handler(postEvent, postContext);
    // Assert
    sinon.assert.calledOnce(fail_spy);
    sinon.assert.notCalled(succeed_spy);
  });

  it('should fail when a HEAD request occurs', function () {
    // Prepare
    postEvent.method = "HEAD";
    // Call
    app.handler(postEvent, postContext);
    // Assert
    sinon.assert.calledOnce(fail_spy);
    sinon.assert.notCalled(succeed_spy);
  });

  it('should fail when a PATCH request occurs', function () {
    // Prepare
    postEvent.method = "PATCH";
    // Call
    app.handler(postEvent, postContext);
    // Assert
    sinon.assert.calledOnce(fail_spy);
    sinon.assert.notCalled(succeed_spy);
  });

  it('should fail when a DELETE request occurs', function () {
    // Prepare
    postEvent.method = "DELETE";
    // Call
    app.handler(postEvent, postContext);
    // Assert
    sinon.assert.calledOnce(fail_spy);
    sinon.assert.notCalled(succeed_spy);
  });

  it('should fail when a OPTIONS request occurs', function () {
    // Prepare
    postEvent.method = "OPTIONS";
    // Call
    app.handler(postEvent, postContext);
    // Assert
    sinon.assert.calledOnce(fail_spy);
    sinon.assert.notCalled(succeed_spy);
  });
  
    it('should fail when "event.method" is not a HTTP verb', function () {
    // Prepare
    postEvent.method = "NOTAVERB";
    // Call
    app.handler(postEvent, postContext);
    // Assert
    sinon.assert.calledOnce(fail_spy);
    sinon.assert.notCalled(succeed_spy);
  });
  
    it('should fail when "event.size" is undefined', function () {
    // Prepare
    postEvent.method = "GET";
    // Call
    app.handler(postEvent, postContext);
    // Assert
    sinon.assert.calledOnce(fail_spy);
    sinon.assert.notCalled(succeed_spy);
  });

});