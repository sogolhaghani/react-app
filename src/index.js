import React from 'react';
import ReactDOM from 'react-dom';

import store from './configureStore'
import { Provider } from "react-redux";
import Route from './router';

ReactDOM.render(
  <Provider store={store} >
    <Route />
  </Provider>

  ,
  document.querySelector('#root'),
);
