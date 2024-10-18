import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { history } from './helpers';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import { store } from './helpers';

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);

