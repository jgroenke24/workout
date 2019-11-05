import React from 'react';
import Stopwatch from './Stopwatch';
// import Countdown from './Countdown';
// import RequestCountdown from './RequestCountdown';
import CircleCountdown from './CircleCountdown';

const App = () => {
  return (
    <div>
      <Stopwatch />
      {/* <Countdown /> */}
      {/* <RequestCountdown /> */}
      <CircleCountdown />
    </div>
  );
};

export default App;
