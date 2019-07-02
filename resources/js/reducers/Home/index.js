import { combineReducers } from 'redux';
import ExpectedPostsReducer from './ExpectedPostsReducer';
import FriendsReducer from './FriendsReducer';
import FriendRequestsReducer from './FriendRequestsReducer';
const rootReducer = combineReducers({
	ExpectedPostsReducer: ExpectedPostsReducer,
	FriendsReducer,
	FriendRequestsReducer
});

export default rootReducer;
