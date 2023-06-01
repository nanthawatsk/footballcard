import React from 'react';
import { createRoot } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import App from './App';
import rootReducer from './reducers/rootReducer';

const store = createStore(rootReducer, applyMiddleware(thunk));

const rootElement = document.getElementById('root');

const app = (
  <Provider store={store}>
    <App />
  </Provider>
);

const root = createRoot(rootElement);
root.render(app);
