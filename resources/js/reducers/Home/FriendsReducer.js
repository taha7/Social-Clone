const initialState = {
	friends: []
};

const friendsReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'LOAD_FRIENDS':
			return {
				...state,
				friends: action.payload
			};
		default:
			return state;
	}
};

export default friendsReducer;
