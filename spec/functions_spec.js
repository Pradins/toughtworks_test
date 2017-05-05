var functions = require('../app/functions');
var day = require('../app/day');

describe("Testing schedule functions", function(){

    it("should return the proper time for any schedule", function() {

        var sampleEvent1 = 'testing event ruby on rails framework talk 45min';
        var sampleEvent2 = 'networking keynote lightning';
        var sampleEvent3 = 'new framework 20min introduction event';
        var sampleEvent4 = 'Event with no time';

        expect(functions.getTime(sampleEvent1)).toBe(45);
        expect(functions.getTime(sampleEvent2)).toBe(5);
        expect(functions.getTime(sampleEvent3)).toBe(null);
        expect(functions.getTime(sampleEvent4)).toBe(null);
    });

    it("should fill the days array with the proper events", function() {

        var array_days = [];

        var expected_result = [{
                morning_counter: 0,
                afternoon_counter: 85,
                morning:
                    [ 'Writing Fast Tests Against Enterprise Rails 60min',
                        'Overdoing it in Python 45min',
                        'Lua for the Masses 30min',
                        'Ruby Errors from Mismatched Gem Versions 45min' ],
                afternoon:
                    [ 'Common Ruby Errors 45min',
                        'Rails for Python Developers lightning',
                        'Communicating Over Distance 60min',
                        'Accounting-Driven Development 45min' ]
            }
        ];

        var events_array = [
          'Writing Fast Tests Against Enterprise Rails 60min',
          'Overdoing it in Python 45min',
          'Lua for the Masses 30min',
          'Ruby Errors from Mismatched Gem Versions 45min',
          'Common Ruby Errors 45min',
          'Rails for Python Developers lightning',
          'Communicating Over Distance 60min',
          'Accounting-Driven Development 45min'
        ];

        for (var i = 0; i < events_array.length; i++) {
          functions.schedule_event(events_array[i], functions.getTime(events_array[i]), array_days);
        }

        expect(array_days).toEqual(expected_result);
    });

    it("should return a proper formated hour value", function() {
        expect(functions.pad(3)).toEqual('03');
    });

    it("should return a proper calculated time", function() {

        var test_time = {
            hour: '03',
            min: '10',
            type: 'PM'
        };

        var expected_time = {
            hour: '04',
            min: '25',
            type: 'PM'
        };

        expect(functions.calculateTime(test_time, 75)).toEqual(expected_time);
    });
});
