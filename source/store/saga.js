import axios from 'axios';
import {call, put, takeEvery} from 'redux-saga/effects';
import {fetchApiDataFail, fetchApiDataSuccess} from './ApiSlice';

function* workGetFetch() {
  try {
    const response = yield call(() =>
      axios.get(
        'http://205.134.254.135/~mobile/interview/public/api/restaurants_list',
      ),
    );
    yield put(fetchApiDataSuccess(response.data));
  } catch (error) {
    yield put(fetchApiDataFail(error.message));
  }
}
function* apiSaga() {
  yield takeEvery('ApiSlice/fetchApiData', workGetFetch);
}

export default apiSaga;
