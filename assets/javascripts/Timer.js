"use strict";

module.exports = class Timer {
  currentTime() {
    if (this._currentTime == null) {
      this._currentTime = 0;
    }
    return this._currentTime;
  }

  stopped() {
    if (this._stopped == null) {
      this._stopped = true;
    }
    return this._stopped
  }

  stop() {
    this._stopped = true;
  }

  start() {
    this._stopped = false;
  }

  displayTime() {
    return Math.ceil(this.currentTime());
  }

  seconds() {
    return Math.ceil(this.displayTime() % 3600 % 60);
  }

  minutes() {
    return Math.ceil(((this.displayTime() - this.seconds())/60) % 60);
  }

  hours() {
    return Math.ceil((this.displayTime() - this.minutes()*60 - this.seconds())/3600);
  }

  tick(elapsed) {
    if (!this.stopped()) {
      var lastDisplayTime = this.displayTime();
      this._currentTime = this.currentTime() - elapsed/1000;
      var currentDisplayTime = this.displayTime();
      if (lastDisplayTime != currentDisplayTime) {
        this.changed();
        if (lastDisplayTime > 0 && currentDisplayTime <= 0) this.timeUp();
      }
    }
  }

  add(minutes) {
    this._currentTime = this.currentTime() + minutes*60;
    this.start();
    this.changed();
  }

  clear() {
    this._currentTime = 0;
    this.stop();
    this.changed();
    this.clearListeners().forEach(function(listener) {
      listener();
    });
  }

  changeListeners() {
    if (this._changeListeners == null) {
      this._changeListeners = [];
    }
    return this._changeListeners;
  }

  onChange(callback) {
    this.changeListeners().push(callback);
  }

  changed() {
    this.changeListeners().forEach(function(listener) {
      listener();
    });
  }

  timeUpListeners() {
    if (this._timeUpListeners == null) {
      this._timeUpListeners = [];
    }
    return this._timeUpListeners;
  }

  onTimeUp(callback) {
    this.timeUpListeners().push(callback);
  }

  timeUp() {
    this.timeUpListeners().forEach(function(listener) {
      listener();
    });
  }

  onClear(callback) {
    this.clearListeners().push(callback);
  }

  clearListeners() {
    if (this._clearListeners == null) {
      this._clearListeners = [];
    }
    return this._clearListeners;
  }
}
