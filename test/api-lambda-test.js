
var expect = require('chai').expect,
    lambdaToTest = require('../app');

var context = require('aws-lambda-mock-context');
var ctx = context();

describe('Lambda GET API call', function () {
    var API_Response = null;
    var API_Error = null;

    before(function (done) {
        //This fires the event as if a Lambda call was being sent in
        lambdaToTest.handler({
            "method": "GET",
            "size": 10
        }, ctx);

        //Captures the response and/or errors
        ctx.Promise
            .then(function(resp){
                API_Response = resp;
                done();

            })
            .catch(function(err){
                API_Error = err;
                done();
            });
    });

    it('should not have errored', function () {
        expect(API_Error).to.be.null
    });

    it('should have response filled', function () {
        expect(API_Response).to.not.be.null
    });

});