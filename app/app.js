var fs        = require('fs');
var functions = require('./functions');

//read the txt file with the events
var array_presentations = fs.readFileSync('./data/events.txt').toString().split("\n");

//initialize days array
var array_days = [];

for (var i = 0; i < array_presentations.length; i++) {
  functions.schedule_event(array_presentations[i], functions.getTime(array_presentations[i]), array_days);
}

//print the resulting schedule
functions.printSchedule(functions.getSchedule(array_days));