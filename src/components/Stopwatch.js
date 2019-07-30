import React, { Component } from 'react';

export default class Stopwatch extends Component {
  state = {
    timerOn: false,
    timerStart: 0,
    timerTime: 0,
  };

  startTimer = () => {
    this.setState(prevState => {
      return {
        timerOn: true,
        timerStart: Date.now() - prevState.timerTime,
        timerTime: prevState.timerTime,
      };
    });

    this.timer = setInterval(() => {
      this.setState(prevState => {
        return {
          timerTime: Date.now() - prevState.timerStart,
        };
      });
    }, 10);
  };

  stopTimer = () => {
    this.setState(() => {
      return {
        timerOn: false,
      };
    });
    clearInterval(this.timer);
  };

  resetTimer = () => {
    this.setState(() => {
      return {
        timerStart: 0,
        timerTime: 0,
      };
    });
  };

  render() {
    const { timerOn, timerTime } = this.state;
    const centiseconds = `0${Math.floor(timerTime / 10) % 100}`.slice(-2);
    const seconds = `0${Math.floor(timerTime / 1000) % 60}`.slice(-2);
    const minutes = `0${Math.floor(timerTime / 60000) % 60}`.slice(-2);
    const hours = `0${Math.floor(timerTime / 3600000)}`.slice(-2);
    return (
      <div>
        <h2>Stopwatch</h2>
        <div>
          {hours} : {minutes} : {seconds} : {centiseconds}
        </div>
        {!timerOn && timerTime === 0 && (
          <button type="button" onClick={this.startTimer}>
            Start
          </button>
        )}
        {timerOn && (
          <button type="button" onClick={this.stopTimer}>
            Stop
          </button>
        )}
        {!timerOn && timerTime > 0 && (
          <button type="button" onClick={this.startTimer}>
            Resume
          </button>
        )}
        {!timerOn && timerTime > 0 && (
          <button type="button" onClick={this.resetTimer}>
            Reset
          </button>
        )}
      </div>
    );
  }
}
