import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';
import createSagaMiddleware from '@redux-saga/core';
import apiSaga from './saga';
import AsyncStorage from '@react-native-async-storage/async-storage';
import themeSlice from './themeSlice';
import ApiSlice from './ApiSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  ApiSlice: ApiSlice,
  theme: themeSlice,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: persistedReducer,
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(apiSaga);

const persistor = persistStore(store);

export {store, persistor};
