import React, { Component } from 'react';

// Default countdown timer is 30 secs
const DEFAULT_TIME = 30000;

export default class Countdown extends Component {
  state = {
    timerOn: false,
    timerTime: 0,
    timerRemaining: DEFAULT_TIME,
  };

  startTimer = () => {
    this.setState(prevState => {
      return {
        timerOn: true,
        timerTime: prevState.timerRemaining,
        timerRemaining: prevState.timerRemaining,
      };
    });

    const { timerRemaining } = this.state;
    this.timerEnd = Date.now() + timerRemaining;

    this.timer = setInterval(() => {
      const time = this.timerEnd - Date.now();
      if (time >= 0) {
        this.setState(() => {
          return {
            timerRemaining: time,
          };
        });
      } else {
        this.stopTimer();
        this.setState(() => {
          return {
            timerRemaining: 0,
          };
        });
        alert('countdown ended');
      }
    }, 10);
  };

  stopTimer = () => {
    clearInterval(this.timer);
    this.setState(() => {
      return {
        timerOn: false,
      };
    });
  };

  resetTimer = () => {
    const { timerOn } = this.state;
    if (!timerOn) {
      this.setState(prevState => {
        return {
          timerRemaining: prevState.timerTime,
        };
      });
    }
  };

  adjustTimer = input => {
    const { timerOn, timerRemaining } = this.state;
    const max = 216000000;
    if (!timerOn) {
      if (input === 'incHours' && timerRemaining + 3600000 < max) {
        this.setState({ timerRemaining: timerRemaining + 3600000 });
      } else if (input === 'decHours' && timerRemaining - 3600000 >= 0) {
        this.setState({ timerRemaining: timerRemaining - 3600000 });
      } else if (input === 'incMinutes' && timerRemaining + 60000 < max) {
        this.setState({ timerRemaining: timerRemaining + 60000 });
      } else if (input === 'decMinutes' && timerRemaining - 60000 >= 0) {
        this.setState({ timerRemaining: timerRemaining - 60000 });
      } else if (input === 'incSeconds' && timerRemaining + 1000 < max) {
        this.setState({ timerRemaining: timerRemaining + 1000 });
      } else if (input === 'decSeconds' && timerRemaining - 1000 >= 0) {
        this.setState({ timerRemaining: timerRemaining - 1000 });
      }
    }
  };

  render() {
    const { timerOn, timerTime, timerRemaining } = this.state;
    const seconds = `0${Math.floor((timerRemaining / 1000) % 60) % 60}`.slice(
      -2
    );
    const minutes = `0${Math.floor((timerRemaining / 60000) % 60)}`.slice(-2);
    const hours = `0${Math.floor((timerRemaining / 3600000) % 60)}`.slice(-2);
    return (
      <div>
        <h2>Countdown Timer</h2>
        <div>Hours : Minutes : Seconds</div>
        <div>
          <button type="button" onClick={() => this.adjustTimer('incHours')}>
            &#8679;
          </button>
          <button type="button" onClick={() => this.adjustTimer('incMinutes')}>
            &#8679;
          </button>
          <button type="button" onClick={() => this.adjustTimer('incSeconds')}>
            &#8679;
          </button>
          <div>
            {hours} : {minutes} : {seconds}
          </div>
          <button type="button" onClick={() => this.adjustTimer('decHours')}>
            &#8681;
          </button>
          <button type="button" onClick={() => this.adjustTimer('decMinutes')}>
            &#8681;
          </button>
          <button type="button" onClick={() => this.adjustTimer('decSeconds')}>
            &#8681;
          </button>
        </div>
        {!timerOn && (timerTime === 0 || timerTime === timerRemaining) && (
          <button type="button" onClick={this.startTimer}>
            Start
          </button>
        )}
        {timerOn && timerRemaining >= 1000 && (
          <button type="button" onClick={this.stopTimer}>
            Stop
          </button>
        )}
        {!timerOn &&
          (timerTime !== 0 &&
            timerTime !== timerRemaining &&
            timerRemaining !== 0) && (
            <button type="button" onClick={this.startTimer}>
              Resume
            </button>
          )}
        {(!timerOn || timerRemaining < 1000) &&
          (timerTime !== timerRemaining && timerTime > 0) && (
            <button type="button" onClick={this.resetTimer}>
              Reset
            </button>
          )}
      </div>
    );
  }
}
