import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import sessionReducer from './session';
import itemsReducer from './items';
import cartItemsReducer from './cart_items';
import reviewsReducer from './reviews';

const rootReducer = combineReducers({
    session: sessionReducer,
    items: itemsReducer,
    cart_items: cartItemsReducer,
    reviews: reviewsReducer
})

let enhancer;

if (process.env.NODE_ENV === 'production') {
    enhancer = applyMiddleware(thunk);
} else {
    const logger = require('redux-logger').default;
    const composeEnhancers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
        enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState = {}) => {
    return createStore(rootReducer, preloadedState, enhancer)
}


export default configureStore