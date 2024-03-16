import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import getStore from './redux/store/configureStore';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const store = getStore()

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);