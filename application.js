"use strict";

const $ = require('jquery');
const Timer = require('./assets/javascripts/Timer.js');
const ipc = require('ipc');

$(function() {
  var timer = new Timer();
  window.$timer = timer; // For debugging

  function formatTime(time) {
    if (time < 0) time = -time;
    var timeString = time.toString();
    if (timeString.length == 1) timeString = "0" + timeString;
    return timeString;
  }

  var currentTime = Date.now();

  window.setInterval(function() {
    var now = Date.now();
    var elapsed = now - currentTime;
    currentTime = now;
    timer.tick(elapsed);
  }, 100);

  timer.onChange(function() {
    $('#hours').text(formatTime(timer.hours()));
    $('#minutes').text(formatTime(timer.minutes()));
    $('#seconds').text(formatTime(timer.seconds()));
  });

  timer.onTimeUp(function() {
    $('.timer').addClass('time-up');
    ipc.send('timeup');
  });

  timer.onClear(function() {
    $('.timer').removeClass('time-up');
  });

  $('.time-button').click(function(event) {
    var button = $(this);
    if (button.data('clear')) {
      timer.clear();
    } else {
      timer.add(parseInt(button.data('minutes')));
    }
  });
});
