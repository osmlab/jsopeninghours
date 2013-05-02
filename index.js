var days = ['mo', 'tu', 'we', 'th', 'fr', 'sa', 'su'];

module.exports = function(text) {
    var result = null;
    if (text == '24/7') {
        result = {'24/7': true};
    }
    else if (text == 'seasonal') {
        result = {'seasonal': true};
    }
    else {
        result = {};
        for (var k = 0; k < days.length; k++) {
            result[days[k]] = null;
        }

        var dayranges = text.toLowerCase().split(';');
        for (var i = 0; i < dayranges.length; i++) {
            var dayrange = dayranges[i],
                daytimes = dayrange.split(' ');

            var left = daytimes[0].split('-'),
                right = null;
            if (daytimes.length === 2) {
                right = daytimes[1].split('-');
            }

            var startday = 0,
                endday = 6;

            if (days.indexOf(left[0]) >= 0) {
                startday = days.indexOf(left[0]);
            }
            if (left.length === 1) {
                endday = startday;
            }
            if (left.length === 2 && days.indexOf(left[1]) >= 0) {
                endday = days.indexOf(left[1]);
            }

            if (right === null) {
                // If the right side is null then the left side contains
                // the times for the entire week.
                right = left;
            }
            if (right.length === 2) {
                for (var j = startday; j <= endday; j++) {
                    result[days[j]] = [right[0], right[1]];
                }
            }
        }
    }
    return result;
};