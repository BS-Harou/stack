import { takeEvery } from 'redux-saga';
// import { call, put } from 'redux-saga/effects'

function * fetchUser() {
	console.log('Tamtadada');
	yield 1;
}

function * mySaga() {
	yield* takeEvery('SING', fetchUser);
}

export default mySaga;
