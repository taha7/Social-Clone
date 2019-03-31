const initialeState = {
	posts: []
};

const expectedPostsReducer = (state = initialeState, action) => {
	switch (action.type) {
		case 'LOAD_POSTS':
			return {
				...state,
				posts: action.payload
			};
		case 'CREATE_POST':
			return {
				...state,
				posts: state.posts.concat(action.payload)
			};
		default:
			return state;
	}
};

export default expectedPostsReducer;
