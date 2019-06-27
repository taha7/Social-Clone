import { combineReducers } from 'redux';
import ExpectedPostsReducer from './ExpectedPostsReducer';

const rootReducer = combineReducers({
	ExpectedPostsReducer: ExpectedPostsReducer
});

export default rootReducer;
