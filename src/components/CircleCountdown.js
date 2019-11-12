import React, { Component } from 'react';
import styled from 'styled-components';

import Button from './Button';

// Default countdown timer is 30 secs
const DEFAULT_TIME = 30000;

// Circumference of progress circle
const LENGTH = Math.PI * 2 * 100;

const StyledCircleCountdown = styled.div`
  margin: 0 auto;
  width: 300px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TimeDisplay = styled.div`
  position: absolute;
`;

export default class CircleCountdown extends Component {
  state = {
    timerOn: false,
    timerTime: DEFAULT_TIME,
    timerRemaining: DEFAULT_TIME,
    strokeDashOffset: -2 * LENGTH,
    rotate: 360,
  };

  // componentDidMount() {
  //   this.startTimer();
  // }

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

    this.timer();
  };

  stopTimer = () => {
    cancelAnimationFrame(this.requestId);
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
          strokeDashOffset: -2 * LENGTH,
          rotate: 360,
        };
      });
    }
  };

  timer = () => {
    const time = this.timerEnd - Date.now();
    const { timerTime } = this.state;
    if (time >= 0) {
      // const { timerTime } = this.state;
      const offset = -LENGTH - (LENGTH * time) / timerTime;
      const rotate = (360 * time) / timerTime;
      this.setState(() => {
        return {
          rotate,
          timerRemaining: time,
          strokeDashOffset: offset,
        };
      });

      this.requestId = requestAnimationFrame(this.timer);
    } else {
      this.stopTimer();
      this.resetTimer();
      // this.setState(() => {
      //   return {
      //     timerRemaining: 0,
      //   };
      // });
      // alert('countdown ended');
    }
  };

  adjustTimer = input => {
    // const { timerRemaining } = this.state;
    // const max = 216000000;
    const { timerOn } = this.state;
    const ms = input * 1000;
    this.setState(prevState => {
      return {
        timerTime: prevState.timerTime + ms,
        timerRemaining: timerOn
          ? prevState.timerRemaining
          : prevState.timerRemaining + ms,
      };
    });
    this.timerEnd += ms;
    // if (!timerOn) {
    // if (input === 'incMinutes' && timerRemaining + 60000 < max) {
    //   this.timerEnd += 60000;
    // } else if (input === 'decMinutes' && timerRemaining - 60000 >= 0) {
    //   this.timerEnd -= 60000;
    // } else if (input === 'incSeconds' && timerRemaining + 1000 < max) {
    //   this.timerEnd += 1000;
    // } else if (input === 'decSeconds' && timerRemaining - 1000 >= 0) {
    //   this.timerEnd -= 1000;
    // }
    // }
  };

  render() {
    const {
      timerOn,
      timerTime,
      timerRemaining,
      strokeDashOffset,
      rotate,
    } = this.state;
    const seconds = `0${Math.floor((timerRemaining / 1000) % 60) % 60}`.slice(
      -2
    );
    const minutes = `0${Math.floor((timerRemaining / 60000) % 60)}`.slice(-2);
    return (
      <StyledCircleCountdown>
        <svg
          width="300"
          viewBox="0 0 220 220"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g transform="translate(110,110)">
            <circle
              r="100"
              className="e-c-base"
              fill="none"
              stroke="#b6b6b6"
              strokeWidth="4px"
            />
            <g transform="rotate(-90)">
              <circle
                r="100"
                className="e-c-progress"
                fill="none"
                stroke="#f7958e"
                strokeWidth="4px"
                strokeDasharray={LENGTH}
                strokeDashoffset={strokeDashOffset}
              />
              <g id="e-pointer">
                <circle
                  cx="100"
                  cy="0"
                  r="8"
                  className="e-c-pointer"
                  fill="#fff"
                  stroke="#f7958e"
                  strokeWidth="2px"
                  style={{
                    transform: `rotate(${rotate}deg)`,
                  }}
                />
              </g>
            </g>
          </g>
        </svg>
        <TimeDisplay>
          {minutes} : {seconds}
        </TimeDisplay>
        <div>
          <Button
            type="button"
            disabled={timerRemaining <= 15000}
            onClick={() => this.adjustTimer(-15)}
          >
            -15s
          </Button>
          <Button
            type="button"
            disabled={timerRemaining <= 30000}
            onClick={() => this.adjustTimer(-30)}
          >
            -30s
          </Button>
          <Button type="button" onClick={() => this.adjustTimer(15)}>
            +15s
          </Button>
          <Button type="button" onClick={() => this.adjustTimer(30)}>
            +30s
          </Button>
          {!timerOn && (timerTime === 0 || timerTime === timerRemaining) && (
            <Button type="button" onClick={this.startTimer}>
              Start
            </Button>
          )}
          {timerOn && timerRemaining >= 1000 && (
            <Button type="button" onClick={this.stopTimer}>
              Stop
            </Button>
          )}
          {!timerOn &&
            (timerTime !== 0 &&
              timerTime !== timerRemaining &&
              timerRemaining !== 0) && (
              <Button type="button" onClick={this.startTimer}>
                Resume
              </Button>
            )}
          {(!timerOn || timerRemaining < 1000) &&
            (timerTime !== timerRemaining && timerTime > 0) && (
              <Button type="button" onClick={this.resetTimer}>
                Reset
              </Button>
            )}
        </div>
      </StyledCircleCountdown>
    );
  }
}
