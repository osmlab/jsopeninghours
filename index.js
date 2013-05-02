var days = ['mo', 'tu', 'we', 'th', 'fr', 'sa', 'su'];

module.exports = function(text) {
    if (text == '24/7') {
        return {'24/7': true};
    }
    else if (text == 'seasonal') {
        return {'seasonal': true};
    }
    else {
        var result = {};
        for (var k = 0; k < days.length; k++) {
            result[days[k]] = null;
        }

        var dayranges = text.toLowerCase().split(';');
        for (var i = 0; i < dayranges.length; i++) {
            var dayrange = dayranges[i],
                daytimes = dayrange.split(' ');

            var left = daytimes[0].split('-'),
                right;
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

            if (right.length === 2) {
                for (var j = startday; j <= endday; j++) {
                    result[days[j]] = [right[0], right[1]];
                }
            }
            console.log(result);
        }
    }
};