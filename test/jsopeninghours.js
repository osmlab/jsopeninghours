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
    describe('garbage data', function() {
        it('should not return anything with no data', function() {
            expect(jsoh("")).to.eql(null);
        });
        it('should not return anything with unparseable data', function() {
            expect(jsoh("special arrangement")).to.eql(null);
        });
        it('should not return anything with unparseable data', function() {
            expect(jsoh("whenever I feel like it, damnit!")).to.eql(null);
        });
        it('should not return anything with not quite parseable data', function() {
            expect(jsoh("9:15 - 21:15, Mon-Sat")).to.eql(null);
            expect(jsoh("Dec 10 off")).to.eql(null);
            expect(jsoh("Apr-May: 08:00-20:00; Jun-Aug: 08:00-22:00; Sep-Oct: 08:00-20:00")).to.eql(null);
            expect(jsoh("Sa-Su 24/7")).to.eql(null);
            expect(jsoh("Mo-Fr 9-19")).to.eql(null);
            expect(jsoh("sunrise-sunset")).to.eql(null);
        });
        it('should not return anything with short data', function() {
            expect(jsoh("?")).to.eql(null);
            expect(jsoh("8")).to.eql(null);
        });
        it('should not return anything when dayrange has multiple openings', function() {
            expect(jsoh("Mo-Sa 08:00-13:00,14:00-18:00")).to.eql(null);
            expect(jsoh("Mo-Su 11:30-15:00, 17:00-24:00")).to.eql(null);
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
    describe('multiple ranges of days', function() {
        it('should be open weekdays 6am to 10pm, saturday 7:30am to 10pm, sunday 8am to 10pm', function() {
            expect(jsoh("Mo-Fr 06:00-22:00; Sa 07:30-22:00; Su 08:00-22:00")).to.eql({
                'mo': ['06:00','22:00'],
                'tu': ['06:00','22:00'],
                'we': ['06:00','22:00'],
                'th': ['06:00','22:00'],
                'fr': ['06:00','22:00'],
                'sa': ['07:30','22:00'],
                'su': ['08:00','22:00']
            });
        });
        it('should be open specifying single days instead of ranges', function() {
            expect(jsoh("Mo 03:00-20:00; Tu 04:00-20:00; We 05:00-20:00; Th 06:00-20:00; Fr 07:00-20:00; Sa 08:00-18:00")).to.eql({
                'mo': ['03:00','20:00'],
                'tu': ['04:00','20:00'],
                'we': ['05:00','20:00'],
                'th': ['06:00','20:00'],
                'fr': ['07:00','20:00'],
                'sa': ['08:00','18:00'],
                'su': null
            });
        });
        it('should be open tu-su 8-15, sa 8-12', function() {
            expect(jsoh("Tu-Su 08:00-15:00;Sa 08:00-12:00")).to.eql({
                'mo': null,
                'tu': ['08:00','15:00'],
                'we': ['08:00','15:00'],
                'th': ['08:00','15:00'],
                'fr': ['08:00','15:00'],
                'sa': ['08:00','12:00'],
                'su': ['08:00','15:00']
            });
        });
    });
});