if (typeof require !== 'undefined') {
    expect = require('expect.js');
    jsoh = require('../');
}

describe('Opening Hours parser', function() {
    describe('common edge cases', function() {
        it('should be open 24/7', function() {
            expect(jsoh("24/7")).to.eql({
                '24/7': true
            });
        });
        it('should be open seasonally', function() {
            expect(jsoh("seasonal")).to.eql({
                'seasonal': true
            });
        });
    });
    describe('one range of days', function() {
        it('should be open weekdays 8:30am to 8:00pm', function() {
            expect(jsoh("Mo-Fr 08:30-20:00")).to.eql({
                'mo': ['08:30','20:00'],
                'tu': ['08:30','20:00'],
                'we': ['08:30','20:00'],
                'th': ['08:30','20:00'],
                'fr': ['08:30','20:00'],
                'sa': null,
                'su': null
            });
        });
        it('should be open monday through saturday 8:00am to 8:00pm', function() {
            expect(jsoh("Mo-Sa 08:00-20:00")).to.eql({
                'mo': ['08:00','20:00'],
                'tu': ['08:00','20:00'],
                'we': ['08:00','20:00'],
                'th': ['08:00','20:00'],
                'fr': ['08:00','20:00'],
                'sa': ['08:00','20:00'],
                'su': null
            });
        });
        it('should be open monday 8:00am to 8:00pm', function() {
            expect(jsoh("Mo 08:00-20:00")).to.eql({
                'mo': ['08:00','20:00'],
                'tu': null,
                'we': null,
                'th': null,
                'fr': null,
                'sa': null,
                'su': null
            });
        });
        it('should be open all week 9:00am to 9:00pm', function() {
            expect(jsoh("09:00-21:00")).to.eql({
                'mo': ['09:00','21:00'],
                'tu': ['09:00','21:00'],
                'we': ['09:00','21:00'],
                'th': ['09:00','21:00'],
                'fr': ['09:00','21:00'],
                'sa': ['09:00','21:00'],
                'su': ['09:00','21:00']
            });
        });
    });
});