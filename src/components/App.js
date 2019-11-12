import React from 'react';
import GlobalStyle from '../theme/globalStyle';
import Stopwatch from './Stopwatch';
// import Countdown from './Countdown';
// import RequestCountdown from './RequestCountdown';
import CircleCountdown from './CircleCountdown';

const App = () => {
  return (
    <div>
      <GlobalStyle />
      <Stopwatch />
      {/* <Countdown /> */}
      {/* <RequestCountdown /> */}
      <CircleCountdown />
    </div>
  );
};

export default App;
