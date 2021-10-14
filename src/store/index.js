import { compose, createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import thunk from 'redux-thunk';
import { logger } from 'redux-logger';
import rootReducer from './reducers/index';

import { actions } from './actions';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(persistedReducer,compose(applyMiddleware(thunk, logger)));
const persistor = persistStore(store);

export { store, persistor, actions };