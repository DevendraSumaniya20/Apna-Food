import {configureStore} from '@reduxjs/toolkit';

import ApiSlice from './ApiSlice';

import createSagaMiddleware from '@redux-saga/core';
import apiSaga from './saga';

const saga = createSagaMiddleware();

const store = configureStore({
  reducer: {
    ApiSlice: ApiSlice,
  },
  middleware: [saga],
});

saga.run(apiSaga);

export default store;
