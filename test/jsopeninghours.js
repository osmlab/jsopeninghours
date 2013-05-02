if (typeof require !== 'undefined') {
    expect = require('expect.js');
    jsoh = require('../');
}

describe('Opening Hours parser', function() {
    describe('common edge cases', function() {
        it('should be open 24/7', function() {
            expect(jsoh("24/7")).to.eql(["24/7"]);
        });
        it('should be open seasonally', function() {
            expect(jsoh("seasonal")).to.eql(["seasonal"]);
        });
    });
});