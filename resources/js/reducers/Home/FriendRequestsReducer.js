const initialState = {
	friendRequests: []
};

const friendRequestsReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'LOAD_FRIEND_REQUESTS':
			return {
				...state,
				friendRequests: action.payload
			};
		default:
			return state;
	}
};

export default friendRequestsReducer;
