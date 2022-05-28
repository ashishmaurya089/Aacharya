import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { persistStore } from 'redux-persist';

import rootReducer from './rootReducer';

const initialState = {};

const middleware = [thunk];

const store = createStore(
	rootReducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

// The persistsStore will store the data in cache
const persistor = persistStore(store);

export { store, persistor };
