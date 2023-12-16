import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import csrfFetch, {restoreCSRF} from './store/csrf';
import './index.css';
import App from './App';
import configureStore from './store';
import * as sessionActions from './store/session';
import { fetchItem, getItem } from './store/items';
import { fetchCartItem } from './store/cart_items';
import { createCartItem } from './store/cart_items';
import { addReview, fetchReview, fetchReviews } from './store/reviews';

const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  window.store = store;
  window.csrfFetch = csrfFetch;
  window.sessionActions = sessionActions;
  window.fetchItem = fetchItem
  window.getItem = getItem
  window.fetchCartItem = fetchCartItem
  window.createCartItem = createCartItem
  window.fetchReviews = fetchReviews
  window.fetchReview = fetchReview
  window.addReview = addReview
}

function Root() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
}

const renderApplication = () => {
  ReactDOM.render(
    <React.StrictMode>
      <Root />
    </React.StrictMode>,
    document.getElementById('root')
  );
}

sessionStorage.getItem("X-CSRF-Token") === null ? restoreCSRF().then(renderApplication) : renderApplication();