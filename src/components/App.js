import React from 'react';

import { Provider } from 'react-redux';
import store from '../store';

import GlobalStyle from '../theme/globalStyle';
import Stopwatch from './Stopwatch';
// import Countdown from './Countdown';
// import RequestCountdown from './RequestCountdown';
import CircleCountdown from './CircleCountdown';

const App = () => {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <Stopwatch />
      {/* <Countdown /> */}
      {/* <RequestCountdown /> */}
      <CircleCountdown />
    </Provider>
  );
};

export default App;
