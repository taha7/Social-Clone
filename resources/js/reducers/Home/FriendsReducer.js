const initialState = {
	friends: [ 'name', 'name2', 'name3' ]
};

const friendsReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'LOAD_FRIENDS':
			return state;
		default:
			return state;
	}
};

export default friendsReducer;
