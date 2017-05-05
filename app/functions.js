var day = require('./day');

module.exports = {
   schedule_event: function(event, time, array_days) {
      var event_set = false;

      for (var i = 0; i < array_days.length; i++) {
        if (array_days[i].morning_counter - time >= 0) { //add event to morning
          array_days[i].morning.push(event);
          array_days[i].morning_counter -= time;
          event_set = true;
          break;
        } else if (array_days[i].afternoon_counter - time >= 0) { //add event to afternoon
          array_days[i].afternoon.push(event);
          array_days[i].afternoon_counter -= time;
          event_set = true;
          break;
        }
      }

      //this case asumes that any event time is not longer that morning or afternoon availbale time for an empty day
      if (!event_set) { //create new day in the days array and set the event for the morning
          var empty_day = day.emptyDay();
          empty_day.morning_counter -= time;
          empty_day.morning.push(event);
          array_days.push(empty_day);
      }
  },
  getSchedule: function(array_days) {

      var schedule_array = [];

      for (var i = 0; i < array_days.length; i++) {

          var current_time = {
              hour: '09',
              min: '00',
              type: 'AM'
          };

          schedule_array.push('Track' + ' ' + parseInt(i+1) + ':');

          //morning
          for (var j = 0; j < array_days[i].morning.length; j++) {
              // console.log(getFormatedTime(current_time), array_days[i].morning[j]);
              schedule_array.push(String(this.getFormatedTime(current_time) + ' ' + array_days[i].morning[j]));
              current_time = this.calculateTime(current_time, this.getTime(array_days[i].morning[j]));
          }

          current_time = {
              hour: '01',
              min: '00',
              type: 'PM'
          };

          schedule_array.push('12:00PM Lunch');

          //afternoon
          for (var k = 0; k < array_days[i].afternoon.length; k++) {
              schedule_array.push(String(this.getFormatedTime(current_time) + ' ' + array_days[i].afternoon[k]));
              current_time = this.calculateTime(current_time, this.getTime(array_days[i].afternoon[k]));
          }

          schedule_array.push('05:00PM Networking Event');
      }

      return schedule_array;
  },
  printSchedule: function(schedule) {

      for (var i = 0; i < schedule.length; i++) {
          console.log(schedule[i]);
      }
  },
  getTime: function(string) {

      var n = string.split(" ");
      var time = n[n.length - 1];

      if (time == "lightning") {
        time = 5;
      } else {
        time = parseInt(time.replace('min', ''));

        if (!Number.isInteger(time)) {
            time = null;
        }
      }

      return time;
  },
  getFormatedTime: function(time) {

       return time.hour + ':' +  time.min + time.type;
  },
  calculateTime: function(current_time, min) {

      var current_hour = parseInt(current_time.hour);
      var current_min = parseInt(current_time.min);

      var added_min = current_min + parseInt(min);

      if (added_min >= 60) {
          current_hour++;

          if (added_min == 60) {
              current_min = 0;
          } else {
              current_min = added_min - 60;
          }

      } else {
          current_min = added_min;
      }

      current_time.hour = String(this.pad(current_hour));
      current_time.min = String(this.pad(current_min));

      return current_time;
  },
  pad: function(n) {

       return (n < 10) ? ("0" + n) : n;
  }
};