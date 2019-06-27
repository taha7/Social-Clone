import { combineReducers } from 'redux';
import ExpectedPostsReducer from './ExpectedPostsReducer';
import FriendsReducer from './FriendsReducer';
const rootReducer = combineReducers({
	ExpectedPostsReducer: ExpectedPostsReducer,
	FriendsReducer
});

export default rootReducer;
